const fs = require("fs");
const axios = require("axios");

// Function to read JSON from a file
function readJSONFromFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading JSON file:", err);
    return null;
  }
}

// Function to extract links from the JSON data
function extractLinks(data) {
  const links = [];
  const linkPattern = /https?:\/\/[^\s\]]+/g;

  data.forEach((item) => {
    Object.values(item).forEach((value) => {
      if (typeof value === "string") {
        const foundLinks = value.match(linkPattern);
        if (foundLinks) {
          links.push(...foundLinks);
        }
      }
    });
  });

  return links;
}

// Function to check if a link is working
// Function to check if a link is working
async function isLinkWorking(url) {
  console.log("Checking url", url);
  try {
    const response = await axios.get(url, { timeout: 60000 }); // 60 seconds timeout
    return response.status === 200 || response.status === 403; // Allow 200 OK and 403 Forbidden
  } catch (error) {
    if (error.response && error.response.status === 403) {
      console.log(`403 Forbidden for URL (${url})`); // Log 403 Forbidden
      return true; // Treat 403 as valid
    } else {
      console.error(`Error checking URL (${url}):`, error.message);
      return false;
    }
  }
}

// Function to process multiple JSON files
async function processFiles(filePaths) {
  let allLinks = [];

  for (const filePath of filePaths) {
    const jsonArray = readJSONFromFile(filePath);
    if (jsonArray) {
      const links = extractLinks(jsonArray);
      if (links.length > 0) {
        allLinks.push(`\n${filePath}\n${"-".repeat(filePath.length)}\n`);

        // Check all links in parallel
        const linkChecks = links.map(async (link) => {
          const working = await isLinkWorking(link);
          if (!working) {
            allLinks.push(link);
          }
        });

        await Promise.all(linkChecks);
      }
    }
  }

  const fileContent = allLinks.join("\n");
  fs.writeFile("extractedLinks.txt", fileContent, (err) => {
    if (err) {
      console.error("Error writing to file", err);
    } else {
      console.log("Links successfully written to extractedLinks.txt");
    }
  });
}

// List of files to process
const filesToProcess = [
  "HtmlTest-EN.json",
  "HtmlTest-FR.json",
  "HtmlTopic-EN.json",
  "HtmlTopic-FR.json",
];
processFiles(filesToProcess);
