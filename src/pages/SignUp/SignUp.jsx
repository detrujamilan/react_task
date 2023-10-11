import {
  Button,
  CssBaseline,
  TextField,
  Box,
  Container,
  FormControl,
  Typography,
} from "@mui/material";
import axios from "axios";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { DevTool } from "@hookform/devtools";
import { ToastContainer, toast } from "react-toastify";
import {
  DOB_validation,
  email_validation,
  firstName_validation,
  lastName_validation,
  mobile_validation,
  password_validation,
} from "../../../utils/InputValidation";

const signUpData = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post(
    `${import.meta.env.VITE_REACT_APP_API_URL}signup`,
    data,
    config
  );
  const Usertoken = response.data.token;
  if (response.status === 200) {
    debugger;
    localStorage.setItem("token", Usertoken);
    toast.success("Form has been submitted successfully", {
      autoClose: 5000,
    });
    window.location.href = "/dashboard";
  }
  return response.data;
};

const SignUp = () => {
  const from = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      mobile: "",
      DOB: new Date(),
    },
  });

  const { register, control, handleSubmit, formState, watch, reset } = from;
  const { errors } = formState;
  const { mutate, data, error } = useMutation(signUpData, {
    onSuccess: (data, variables, context) => {
      const token = data?.data;
    },
    onError: (error) => {
      if (error.response.data === "User already exists") {
        toast.error("User already exists");
      }
      if (error.response.data === "All fields are required") {
        toast.error("All fields are required");
      }
      console.log("Network Error", error);
    },
  });

  const formValue = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobile: "",
    DOB: "",
  };

  const submit = (formValue) => {
    localStorage.setItem("firstName", formValue.firstName);
    setSuccess;
    mutate(JSON.stringify(formValue), reset());
  };

  const validateDOB = (value) => {
    const selectedDate = new Date(value);
    const today = new Date();
    return (
      selectedDate < today || "Date of birth cannot be today or in the future"
    );
  };

  return (
    <>
      <ToastContainer />
      <Box sx={{ pt: 10 }}>
        <Container component="main" maxWidth="xs">
          <Box component="form" noValidate>
            <Typography
              component="h1"
              variant="h5"
              sx={{ textAlign: "center" }}
            >
              Sign Up
            </Typography>
            <Box sx={{ width: "100%" }}>
              <TextField
                required
                sx={{ width: "100%" }}
                margin="normal"
                type={firstName_validation.type}
                label={firstName_validation.label}
                name={firstName_validation.name}
                {...register("firstName", firstName_validation.validation)}
              />
              <Box sx={{ color: "red" }}>{errors.firstName?.message}</Box>
            </Box>
            <Box sx={{ width: "100%" }}>
              <TextField
                required
                sx={{ width: "100%" }}
                margin="normal"
                type={lastName_validation.type}
                label={lastName_validation.label}
                name={lastName_validation.name}
                {...register("lastName", lastName_validation.validation)}
              />
              <Box sx={{ color: "red" }}>{errors.lastName?.message}</Box>
            </Box>
            <Box sx={{ width: "100%" }}>
              <TextField
                required
                sx={{ width: "100%" }}
                margin="normal"
                type={email_validation.type}
                label={email_validation.label}
                name={email_validation.name}
                {...register("email", email_validation.validation)}
              />
              <Box sx={{ color: "red" }}> {errors.email?.message} </Box>
            </Box>
            <Box sx={{ width: "100%" }}>
              <TextField
                required
                sx={{ width: "100%" }}
                margin="normal"
                type={password_validation.type}
                label={password_validation.label}
                autoComplete={password_validation.autoComplete}
                name={password_validation.name}
                {...register("password", password_validation.validation)}
              />
              <Box sx={{ color: "red" }}> {errors.password?.message} </Box>
            </Box>
            <Box sx={{ width: "100%" }}>
              <TextField
                required
                sx={{ width: "100%" }}
                margin="normal"
                type={mobile_validation.type}
                label={mobile_validation.label}
                name={mobile_validation.name}
                {...register("mobile", mobile_validation.validation)}
              />
            </Box>

            <Box sx={{ color: "red" }}>{errors.mobile?.message}</Box>
            <Box sx={{ width: "100%" }}>
              <TextField
                sx={{ width: "100%" }}
                margin="normal"
                type={DOB_validation.type}
                name={DOB_validation.name}
                {...register(DOB_validation.name, DOB_validation.validation)}
              />
              <Box sx={{ color: "red" }}> {errors.DOB?.message} </Box>
            </Box>

            <Button
              sx={{
                width: "100%",
                mt: 1,
              }}
              color="primary"
              variant="contained"
              onClick={handleSubmit(submit)}
            >
              SIGN UP
            </Button>
            <Box
              sx={{
                mt: 2,
                textAlign: "end",
                textDecoration: "underline",
                color: "#00A8E6",
                fontSize: "15px",
                cursor: "pointer ",
              }}
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Already have an account? Sign in
            </Box>
          </Box>
        </Container>
      </Box>

      <DevTool control={control} />
    </>
  );
};

export default SignUp;
