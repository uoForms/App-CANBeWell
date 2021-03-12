import PropTypes from 'prop-types';
import TopicListFR from './JSONFolder/HtmlTopic-FR.json';
import TopicListEN from './JSONFolder/HtmlTopic-EN.json';
import Lang from './Lang/Lang.json';

class Data {

  ////////////////////////////////////////////Get One topics //////////////////////////////////////////////////
  getTopic(button, userInfo) {
    var app_language1 = userInfo.language;
    var topicList = "";
    if (app_language1 == "french") {
      topicList = TopicListFR;
    }
    else if (app_language1 == "english") {
      topicList = TopicListEN;
    }


    {
      //Get user info from UserInfo.js
      //var UserInfo = getUserInfo();
      var UserInfo = userInfo;
      /*if the user select patient ou want to get the text correcpondint "General Patient Text" in the json file,
      if the user select provider ou want to get the text correcpondint "Health Provider Text"*/
      var pat_prov = "General Patient Text";
      if (UserInfo.patient_provider === "patient") {
        pat_prov = "General Patient Text";
      } else if (UserInfo.patient_provider === "provider") {
        pat_prov = "Health Provider Text";
      }


      //Added by Melika : for surgeries and hormone options
      var top_surg;
      var bot_surg;
      var hormonet;
      if ( UserInfo.isTopSurgery === true)
        {
          top_surg = "Top Surgeries Text";
        }

      if ( UserInfo.isBottomSurgery === true)
        {
          bot_surg = "Bottom Surgeries Text";
        }

      if ( UserInfo.isHormoneTherapy === true)
        {
          hormonet = "Hormone Therapy Text";
        }


      var TopicItem = [];

      function handleGenderString(genderString) {

        var genderCharArray = genderString.split(';');
        var genderObj = {
          female: genderCharArray.includes("f"),
          male: genderCharArray.includes("m"),
          transMale: genderCharArray.includes("fm"),
          transFemale: genderCharArray.includes("mf"),
          allGenders: genderCharArray.includes("all"),
          nonbinary: genderCharArray.includes("nb"),
          transgender: genderCharArray.includes("tg"),
          afab:genderCharArray.includes("transfeminine"),
          amab:genderCharArray.includes("transmasculine")

        };
        return genderObj;
      }


      function filterListArray(list) {

        var filteredList = [];
        try {
          for (var i = 0; i < list.length; i++) {
            if ((list[i]['Minimum age'] <= UserInfo.age && UserInfo.age <= list[i]['Maximum age']) || (UserInfo.age == "all ages") || (UserInfo.age == null)) {
              var jsonGender = handleGenderString(list[i]['Gender']);
              if ((UserInfo.gender == "male" && jsonGender.male) || (UserInfo.gender == "female" && jsonGender.female) || (jsonGender.allGenders) || (UserInfo.gender == null) || (UserInfo.gender == "all_genders") || (UserInfo.gender == "nonbinary" && jsonGender.nonbinary)|| (UserInfo.gender == "transgender" && jsonGender.transgender) || (UserInfo.Tgender == "birth_male" && jsonGender.amab) || (UserInfo.Tgender == "birth_female" && jsonGender.afab)) {
                if (list[i]["Button"].toLowerCase() == button) {
                  filteredList.push(
                    list[i]
                  );
                }
              }
            }
          }
        }
        catch (err) { }
        return filteredList;

      }



      function findTopicToDisplay(arra1) {
        var j = 0,
          topicList = [],
          TopicListItem = [];

        const nonApplicaple = ["NA", "N/A", " NA", "NA ", " NA "];

        var text = Lang[userInfo.language];


        if (!arra1.length) { //if the array is empty we whant to say that the topic not applicable to this user
          TopicListItem.push({ name: text.topic_is_not_applicable, body: [] });
        }

        else {

          for (var i = 0; i < arra1.length; i++) {
            if (!topicList.includes(arra1[i]["Topic heading"]) && !nonApplicaple.includes(arra1[i][pat_prov].toUpperCase())) {
              topicList.push(arra1[i]["Topic heading"]);
              TopicListItem.push({ name: arra1[i]["Topic heading"], body: [] });
              TopicListItem[j].body.push({ subject: arra1[i]['Subject'], text: arra1[i][pat_prov]});

              if ( UserInfo.isTopSurgery === true && !nonApplicaple.includes(arra1[i][top_surg].toUpperCase())){
                TopicListItem[j].body.push({ subject: arra1[i]['Subject'], text: arra1[i][top_surg]});
              }

              if ( UserInfo.isBottomSurgery === true && !nonApplicaple.includes(arra1[i][bot_surg].toUpperCase())){
              TopicListItem[j].body.push({ subject: arra1[i]['Subject'], text: arra1[i][bot_surg]});
              }

              if ( UserInfo.isHormoneTherapy === true && !nonApplicaple.includes(arra1[i][hormonet].toUpperCase())){
              TopicListItem[j].body.push({ subject: arra1[i]['Subject'], text: arra1[i][hormonet]});
              }
              j++;
            }
            else if (topicList.includes(arra1[i]["Topic heading"]) && !nonApplicaple.includes(arra1[i][pat_prov].toUpperCase())) {
              let index = topicList.findIndex(topic => topic === arra1[i]["Topic heading"]);
              TopicListItem[index].body.push({ subject: arra1[i]['Subject'], text: arra1[i][pat_prov]}); //melikachange :  text: arra1[i][top_surg], text: arra1[i][bot_surg], text: arra1[i][hormonet] 
              
              if ( UserInfo.isTopSurgery === true && !nonApplicaple.includes(arra1[i][top_surg].toUpperCase())){
                TopicListItem[index].body.push({ subject: arra1[i]['Subject'], text: arra1[i][top_surg]});
              }

              if ( UserInfo.isBottomSurgery === true && !nonApplicaple.includes(arra1[i][bot_surg].toUpperCase())){
                TopicListItem[index].body.push({ subject: arra1[i]['Subject'], text: arra1[i][bot_surg]});
              }

              if ( UserInfo.isHormoneTherapy === true && !nonApplicaple.includes(arra1[i][hormonet].toUpperCase())){
                TopicListItem[index].body.push({ subject: arra1[i]['Subject'], text: arra1[i][hormonet]});
              }
            }
          }
        }

        return TopicListItem;
      }

      TopicItem = findTopicToDisplay(filterListArray(topicList));


      return (TopicItem);
    }


  }
  //////////////////////////////////////////////Get list of topics ///////////////////////////////////////////////
  getListOfTopics(listItem, userInfo) {

    //var UserInfo = getUserInfo();
    var UserInfo = userInfo;
    //to get the corresponding text for patient and provider
    var pat_prov = "General Patient Text";
    if (UserInfo.patient_provider == "patient") {
      pat_prov = "General Patient Text";
    } else if (UserInfo.patient_provider == "provider") {
      pat_prov = "Health Provider Text";
    }
    
    //Added by Melika : for surgeries and hormone options
      var top_surg;
      var bot_surg;
      var hormonet;
      if ( UserInfo.isTopSurgery === true)
      {
        top_surg = "Top Surgeries Text";
      }

    if ( UserInfo.isBottomSurgery === true)
      {
        bot_surg = "Bottom Surgeries Text";
      }

    if ( UserInfo.isHormoneTherapy === true)
      {
        hormonet = "Hormone Therapy Text";
      }



    

    var TopicsItemList = [];

    function handleGenderString(genderString) {

      var genderCharArray = genderString.split(';');
      var genderObj = {
        female: genderCharArray.includes("f"),
        male: genderCharArray.includes("m"),
        transMale: genderCharArray.includes("fm"),
        transFemale: genderCharArray.includes("mf"),
        allGenders: genderCharArray.includes("all"),
        nonbinary: genderCharArray.includes("nb"),
        transgender: genderCharArray.includes("tg"),
        afab:genderCharArray.includes("transmasculine"),
          amab:genderCharArray.includes("transfeminine")

      };
      return genderObj;
    }

    function filterListArray(list) {
      var filteredList = [];

      try {
        for (var i = 0; i < list.length; i++) {
          if ((list[i]['Minimum age'] <= UserInfo.age && UserInfo.age <= list[i]['Maximum age']) || (UserInfo.age == "all ages") || (UserInfo.age == null)) {
            var jsonGender = handleGenderString(list[i]['Gender']);
            if ((UserInfo.gender == "male" && jsonGender.male) || (UserInfo.gender == "female" && jsonGender.female) || (UserInfo.gender == "transgender" && jsonGender.transgender) || (UserInfo.gender == "nonbinary" && jsonGender.nonbinary) || (jsonGender.allGenders) || (UserInfo.gender == null) || (UserInfo.gender == "all_genders") || (UserInfo.Tgender == "birth_male" && jsonGender.amab) || (UserInfo.Tgender == "birth_female" && jsonGender.afab)) {
              filteredList.push(
                list[i]
              );
            }
          }
        }
      }
      catch (err) {
        //nothing
      }
      return filteredList;

    }

    function find_duplicate_in_array(arra1) {
      var j = 0,
        result = [],
        TopicListBundle = [];
      const nonApplicaple = ["NA", "N/A", " NA", "NA ", " NA "];

      for (var i = 0; i < arra1.length; i++) {
        if (!result.includes(arra1[i]["Topic heading"]) && !nonApplicaple.includes(arra1[i][pat_prov].toUpperCase())) {
          result.push(arra1[i]["Topic heading"]);
          TopicListBundle.push({ name: arra1[i]["Topic heading"], body: [] });
          TopicListBundle[j].body.push({ subject: arra1[i]['Subject'], text: arra1[i][pat_prov] });
          
          if ( UserInfo.isTopSurgery === true && !nonApplicaple.includes(arra1[i][top_surg].toUpperCase())){
            TopicListBundle[j].body.push({ subject: arra1[i]['Subject'], text: arra1[i][top_surg]});
          }

          if ( UserInfo.isBottomSurgery === true && !nonApplicaple.includes(arra1[i][bot_surg].toUpperCase())){
            TopicListBundle[j].body.push({ subject: arra1[i]['Subject'], text: arra1[i][bot_surg]});
          }

          if ( UserInfo.isHormoneTherapy === true && !nonApplicaple.includes(arra1[i][hormonet].toUpperCase())){
            TopicListBundle[j].body.push({ subject: arra1[i]['Subject'], text: arra1[i][hormonet]});
          }

          j++;
        }
        else if (result.includes(arra1[i]["Topic heading"]) && !nonApplicaple.includes(arra1[i][pat_prov].toUpperCase())) {

          let index = result.findIndex(topic => topic === arra1[i]["Topic heading"]);
          TopicListBundle[index].body.push({ subject: arra1[i]['Subject'], text: arra1[i][pat_prov] });
                    
          if ( UserInfo.isTopSurgery === true && !nonApplicaple.includes(arra1[i][top_surg].toUpperCase())){
            TopicListBundle[index].body.push({ subject: arra1[i]['Subject'], text: arra1[i][top_surg]});
          }

          if ( UserInfo.isBottomSurgery === true && !nonApplicaple.includes(arra1[i][bot_surg].toUpperCase())){
            TopicListBundle[index].body.push({ subject: arra1[i]['Subject'], text: arra1[i][bot_surg]});
          }

          if ( UserInfo.isHormoneTherapy === true && !nonApplicaple.includes(arra1[i][hormonet].toUpperCase())){
            TopicListBundle[index].body.push({ subject: arra1[i]['Subject'], text: arra1[i][hormonet]});
          }
          //RISHANG this was for topic part
        }
      }

      return TopicListBundle;
    }
    TopicsItemList = find_duplicate_in_array(filterListArray(listItem));

    return (TopicsItemList);
  }


  getListOfTests(listItem, userInfo) {

    //var UserInfo = getUserInfo();
    var UserInfo = userInfo;
    //to get the corresponding text for patient and provider
    var pat_prov = "Patient/Provider Text";
    if (UserInfo.patient_provider == "patient") {
      pat_prov = "Patient/Provider Text";
    } else if (UserInfo.patient_provider == "provider") {
      //youll have to change this string if they add a provider text for test in the json
      pat_prov = "Patient/Provider Text";
    }

    var TestsItemList = [];

    function handleGenderString(genderString) {

      var genderCharArray = genderString.split(';');
      var genderObj = {
        female: genderCharArray.includes("f"),
        male: genderCharArray.includes("m"),
        transMale: genderCharArray.includes("fm"),
        transFemale: genderCharArray.includes("mf"),
        allGenders: genderCharArray.includes("all"),
        nonbinary: genderCharArray.includes("nb"),
        transgender: genderCharArray.includes("tg"),
        afab:genderCharArray.includes("transfeminine"),
        amab:genderCharArray.includes("transmasculine")
      };
      return genderObj;
    }

    function filterListArray(list) {
      var filteredList = [];

      try {
        for (var i = 0; i < list.length; i++) {
          if ((list[i]['Minimum age'] <= UserInfo.age && UserInfo.age <= list[i]['Maximum age']) || (UserInfo.age == "all ages") || (UserInfo.age == null)) {
            var jsonGender = handleGenderString(list[i]['Gender']);
            if ((UserInfo.gender == "male" && jsonGender.male) || (UserInfo.gender == "female" && jsonGender.female) || (jsonGender.allGenders) || (UserInfo.gender == null) || (UserInfo.gender == "all_genders") ||(UserInfo.gender == "nonbinary" && jsonGender.nonbinary)|| (UserInfo.gender == "transgender" && jsonGender.transgender) || (UserInfo.Tgender == "birth_male" && jsonGender.amab) || (UserInfo.Tgender == "birth_female" && jsonGender.afab)) {
              filteredList.push(list[i]);
            }
          }
        }
      }
      catch (err) {
        //nothing
      }
      return filteredList;

    }

    function find_duplicate_in_array(arra1) {
      var j = 0,
        result = [],
        TestListBundle = [];

      const nonApplicaple = ["NA", "N/A", " NA", "NA ", " NA "];

      for (var i = 0; i < arra1.length; i++) {
        if (!result.includes(arra1[i]["Test"]) && !nonApplicaple.includes(arra1[i][pat_prov].toUpperCase())) {
          result.push(arra1[i]["Test"]);
          TestListBundle.push({ name: arra1[i]["Test"], body: [] });
          TestListBundle[j].body.push({ subject: arra1[i]['Test'], text: arra1[i][pat_prov] });
          j++;
        }
        else if (result.includes(arra1[i]["Test"]) && !nonApplicaple.includes(arra1[i][pat_prov].toUpperCase())) {

          let index = result.findIndex(topic => topic === arra1[i]["Test"]);
          TestListBundle[index].body.push({ subject: arra1[i]['Test'], text: arra1[i][pat_prov] });
        }
      }

      return TestListBundle;
    }
    TestsItemList = find_duplicate_in_array(filterListArray(listItem));

    return (TestsItemList);
  }

}

export default Data;
