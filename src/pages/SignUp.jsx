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
import { useNavigate } from "react-router-dom";

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
    localStorage.setItem("token", Usertoken);
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
      <Box sx={{ py: 6 }}>
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
                label="First Name"
                name="firstName"
                {...register("firstName", {
                  required: "firstName is required",
                })}
              />
              <Box sx={{ color: "red" }}>{errors.firstName?.message}</Box>
            </Box>
            <Box sx={{ width: "100%" }}>
              <TextField
                required
                sx={{ width: "100%" }}
                margin="normal"
                label="Last Name"
                name="lastName"
                {...register("lastName", {
                  required: "lastName is required",
                })}
              />
              <Box sx={{ color: "red" }}>{errors.lastName?.message}</Box>
            </Box>
            <Box sx={{ width: "100%" }}>
              <TextField
                required
                sx={{ width: "100%" }}
                margin="normal"
                label="Email Address"
                name="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "plz enter valid email",
                  },
                  validate: {
                    notAdmin: (fieldValue) => {
                      return (
                        fieldValue !== "milan123@gmail.com" ||
                        "Please enter different email address"
                      );
                    },
                    notBlackListed: (fieldValue) => {
                      return (
                        !fieldValue.endsWith("baddomain.com") ||
                        "this domain is blacklisted"
                      );
                    },
                  },
                })}
              />
              <Box sx={{ color: "red" }}> {errors.email?.message} </Box>
            </Box>
            <Box sx={{ width: "100%" }}>
              <TextField
                required
                sx={{ width: "100%" }}
                margin="normal"
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                {...register("password", {
                  required: "Password Is Required",
                })}
              />
              <Box sx={{ color: "red" }}> {errors.password?.message} </Box>
            </Box>
            <Box sx={{ width: "100%" }}>
              <TextField
                required
                sx={{ width: "100%" }}
                margin="normal"
                type="text"
                label="Mobile"
                name="mobile"
                {...register("mobile", {
                  required: "Mobile is required",
                  minLength: {
                    value: 10,
                    message: "Mobile must be exactly 10 digits",
                  },
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "Mobile must contain only numeric digits",
                  },
                })}
              />
            </Box>

            <Box sx={{ color: "red" }}>{errors.mobile?.message}</Box>
            <Box sx={{ width: "100%" }}>
              <TextField
                sx={{ width: "100%" }}
                margin="normal"
                type="date"
                name="DOB"
                {...register("DOB", {
                  required: "Date of birth cannot be today or in the Future",
                  validate: validateDOB,
                })}
              />
              <Box sx={{ color: "red" }}> {errors.DOB?.message} </Box>
            </Box>

            <Button
              sx={{
                width: "100%",
                mt: 1,
              }}
              color="success"
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
