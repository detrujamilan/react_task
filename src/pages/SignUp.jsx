import {
  Button,
  CssBaseline,
  TextField,
  Box,
  Container,
  FormControl,
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
    "http://localhost:3005/api/user/signup",
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

  return (
    <>
      <ToastContainer />
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Box sx={{ my: 3 }} component="form" noValidate>
          <Box sx={{ textAlign: "center" }}>SignUp</Box>
          <Box sx={{ width: "100%" }}>
            <TextField
              sx={{ width: "100%" }}
              margin="normal"
              label="first Name"
              name="firstName"
              {...register("firstName")}
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <TextField
              sx={{ width: "100%" }}
              margin="normal"
              label="last Name"
              name="lastName"
              {...register("lastName")}
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <TextField
              sx={{ width: "100%" }}
              margin="normal"
              label="Email"
              name="email"
              {...register("email", {
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
              sx={{ width: "100%" }}
              margin="normal"
              label="Password"
              name="password"
              {...register("password", {
                required: "Password Is Required",
              })}
            />
            <Box sx={{ color: "red" }}> {errors.password?.message} </Box>
          </Box>
          <Box sx={{ width: "100%" }}>
            <TextField
              sx={{ width: "100%" }}
              margin="normal"
              type="text"
              label="mobile"
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
              {...register("DOB")}
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Button
              sx={{
                width: "50%",
                mt: 1,
              }}
              color="success"
              variant="contained"
              onClick={handleSubmit(submit)}
            >
              submit
            </Button>
            <Button
              sx={{
                width: "50%",
                mt: 1,
              }}
              variant="contained"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
      <DevTool control={control} />
    </>
  );
};

export default SignUp;
