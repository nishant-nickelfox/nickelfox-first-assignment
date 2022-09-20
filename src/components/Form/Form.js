import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";

import CustomTextField from "./CustomTextField";
import CustomSelect from "./CustomSelect";
import { JOB_PROFILES, RATING } from "../../helper/constants";

const phoneRegExp = "^[0-9]{10}$";

const FORM_VALIDATION = Yup.object().shape({
  name: Yup.string().required("Required"),
  jobProfile: Yup.string().required("Required"),
  email: Yup.string()
    .email("Must be a valid email")
    .max(255)
    .required("Required"),
  phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"), //Yup.number().min(10).max(10).required("Required"),
  qna: Yup.array().of(
    Yup.object().shape({
      question: Yup.string().required("Question is required"),
      answer: Yup.string().required("Answer is required"),
      rating: Yup.number("Please enter a valid number").required("Required"),
    })
  ),
});

const FormComponent = ({ postData }) => {
  const INITIAL_STATE = {
    name: "",
    jobProfile: "",
    email: "",
    phone: "",
    qna: [],
  };

  return (
    <Formik
      initialValues={{
        ...INITIAL_STATE,
      }}
      validationSchema={FORM_VALIDATION}
      onSubmit={(values, { resetForm }) => {
        console.log("form values", values);
        postData(values, resetForm);
        // resetForm();
      }}
    >
      {({ errors, values, touched, setValues }) => (
        <Form>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h5">Interview Evaluation Form</Typography>
            </Grid>

            <Grid item xs={6}>
              <CustomTextField name="name" label="Name" />
            </Grid>

            <Grid item xs={6} textAlign="left">
              <CustomSelect
                name="jobProfile"
                label="Job Profile"
                options={JOB_PROFILES}
              />
            </Grid>

            <Grid item xs={6}>
              <CustomTextField name="email" label="Email" />
            </Grid>

            <Grid item xs={6}>
              <CustomTextField name="phone" label="Phone" />
            </Grid>

            <FieldArray name="qna">
              {({ remove, push }) => (
                <div style={{ paddingLeft: "25px", width: "100%" }}>
                  {values.qna.length > 0 &&
                    values.qna.map((qa, i) => {
                      return (
                        <Grid
                          container
                          spacing={3}
                          key={i}
                          sx={{ paddingTop: "25px" }}
                        >
                          <Grid item xs={12} textAlign="left">
                            <Typography variant="h5" gutterBottom>
                              QA {i + 1}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <CustomTextField
                              name={`qna.${i}.question`}
                              label="Interviewer Question"
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <CustomTextField
                              name={`qna.${i}.answer`}
                              label="Candidate Answer"
                            />
                          </Grid>

                          <Grid item xs={3} textAlign="left">
                            <CustomSelect
                              name={`qna.${i}.rating`}
                              label="Interviewer rating (out of 5)"
                              options={RATING}
                            />
                          </Grid>
                        </Grid>
                      );
                    })}
                  <Grid item xs={12} textAlign="right">
                    <Button
                      variant="text"
                      onClick={() =>
                        push({
                          id: values.qna.length + 1,
                          question: "",
                          answer: "",
                          rating: "",
                        })
                      }
                    >
                      Add Q&A
                    </Button>
                  </Grid>
                </div>
              )}
            </FieldArray>
            <Grid item xs={12}>
              <Button variant="contained" type="submit">
                Create
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default FormComponent;
