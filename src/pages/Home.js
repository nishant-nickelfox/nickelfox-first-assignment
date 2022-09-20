import React from "react";

import axios from "axios";

import Card from "@mui/material/Card";

import { Container } from "@mui/material";
import Form from "../components/Form/Form";

const Home = () => {
  const postData = async (data, cb) => {
    const { name, jobProfile, email, phone, qna } = data;
    const dataToSend = {
      Name: name,
      JobProfile: jobProfile,
      Email: email,
      Phone: phone,
      QnA: qna,
    };
    try {
      const response = await axios.post(
        "https://sheet.best/api/sheets/066f2c88-50fa-4618-ae1d-4ca2aba85e74",
        dataToSend
      );
      cb();
      console.log("response", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Card sx={{ padding: 5, minHeight: "100vh", boxSizing: "border-box" }}>
      <Container xs={{ padding: 3 }}>
        <Form postData={postData} />
      </Container>
    </Card>
  );
};

export default Home;
