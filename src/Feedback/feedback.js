import React, { useState } from "react";
import {
  Modal,
  Box,
  Button,
  Typography,
  TextField,
  Rating,
} from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
import logo from "../assets/Logos/logo_21-02-02.png";

const style = {
  position: "absolute",
  top: "10%",
  left: "50%",
  right: "10%",
  transform: "translate(-50%, 0%)",
  maxWidth: "600px", // Sets the maximum width
  minWidth: "350px", // Sets the minimum width
  height: "100%",
  bgcolor: "background.paper",
  borderRadius: "16px",
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
  maxHeight: "90vh",
};

const Feedback = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 0,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRatingChange = (event, newValue) => {
    setFormData({ ...formData, rating: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    handleClose();
  };

  return (
    <div>
      <Button
        sx={{
          position: "fixed",
          right: "0",
          top: "50%",
          transform: "translateY(-50%) rotate(270deg)",
          transformOrigin: "right center",
          zIndex: 1000,
          fontSize: "1.5rem",
          bgcolor: "#2596be",
          color: "white",
          borderRadius: "16px",
          marginRight:'10px',
          '&:hover': {
            bgcolor: "#2596be",  // Maintain the same background color on hover
            color: "white",      // Maintain the same text color on hover
          }
        }}
        onClick={handleOpen}
      >
        <strong>Feedback</strong>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Button
            sx={{
              position: "absolute",
              right: 0,
              top: 8,
            }}
            onClick={handleClose}
          >
            {/* <CloseIcon sx={{color:"#2596be", bgcolor:"#d7df21", borderRadius:"16px"}}/> */}
            <span
              style={{
                backgroundColor: "#d7df21",
                borderRadius: "16px",
                width: "30px",
                height: "30px",
                fontSize: "16px",
                fontWeight: "bold",
                border:'2px solid #2596be'
              }}
            >
              X
            </span>
          </Button>
          <Box sx={{ textAlign: "center", marginBottom: "16px" }}>
            <img src={logo} alt="Logo" width="100px" />
          </Box>
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "2rem",
              marginBottom: "20px",
              color: "#2596be",
            }}
          >
            <strong>Help us improve!</strong>
          </Typography>
          <Typography
            variant="h5"
            component="label"
            htmlFor="email"
            sx={{ marginBottom: "4px", marginTop: "12px" }}
          >
            How would you like to rate your experience with icanbewell.ca?
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <Typography sx={{ fontSize: "1.3rem" }}>Poor</Typography>
            <Rating
              name="rating"
              value={formData.rating}
              onChange={handleRatingChange}
              size="large"
            />
            <Typography sx={{ fontSize: "1.3rem" }}>Excellent</Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <Typography
              variant="h5"
              component="label"
              htmlFor="name"
              sx={{ marginBottom: "4px", marginTop: "12px" }}
            >
              Tell us a bit about your rank.
            </Typography>
            <TextField
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              InputProps={{ style: { fontSize: "1.5rem" } }} // Increase input font size
              multiline
              rows={4}
              placeholder="E.g. did you learn something new? What other resources would you like on the top? Any techinal diffuculties using the app?"
            />
            <Typography
              variant="h5"
              component="label"
              htmlFor="email"
              sx={{ marginBottom: "4px", marginTop: "12px" }}
            >
              Your e-mail if you wish to hear back from us.
            </Typography>
            <TextField
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              placeholder="example@example.com"
              InputProps={{ style: { fontSize: "1.5rem" } }} // Increase input font size
            />
            <div style={{ marginTop: "10px", fontSize: "12px", color: "gray" }}>
              <p>
                <em>
                  Do not leave requests for a family doctor or nurse
                  practitioner, we have no information about this
                </em>
              </p>
            </div>
            <Button
              sx={{
                fontSize: "1.5rem",
                marginTop: "20px",
                width: "100%",
                bgcolor: "#d7df21",
                color: "#1285a9",
              }}
              type="submit"
              variant="contained"
              color="primary"
            >
              <strong> Done</strong>
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default Feedback;
