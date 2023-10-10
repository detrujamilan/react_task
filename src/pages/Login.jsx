import React from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { Link, json, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { ToastContainer, toast } from "react-toastify";

const LoginData = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post(
    `${import.meta.env.VITE_REACT_APP_API_URL}login`,
    data,
    config
  );
  if (response.status === 200) {
    window.location.href = "/dashboard";
  }
  return response.data;
};

const Login = () => {
  const navigate = useNavigate();
  const from = useForm({
    email: "",
    password: "",
  });
  const { register, control, handleSubmit, formState, watch, reset } = from;
  const { errors } = formState;

  const { mutate, data, error } = useMutation(LoginData, {
    onSuccess: (data, variables, context) => {
      localStorage.setItem("token", data.token);
    },
    onError: (error) => {
      if (error.response.status === 400) {
        toast.error("User not found");
      }
      console.error(" failed!", error);
    },
  });

  const formValue = {
    email: "",
    password: "",
  };

  const submit = (formValue) => {
    mutate(JSON.stringify(formValue), reset());
  };
  return (
    <>
      <ToastContainer />
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" noValidate sx={{ width: "100%" }}>
            <TextField
              sx={{ width: "100%" }}
              margin="normal"
              name="email"
              label="Email"
              {...register("email", {
                required: " Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Plz enter valid email address",
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
              margin="normal"
              sx={{ width: "100%" }}
              label="Password"
              name="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                  message:
                    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                },
              })}
            />
            <Box sx={{ color: "red" }}> {errors.password?.message} </Box>
          </Box>
          <Box sx={{ mt: 1 }}>
            <Button variant="contained" onClick={handleSubmit(submit)}>
              Login
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            mt: 2,
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/signUp");
          }}
        >
          <Box sx={{ textAlign: "center" }}>Create New Register</Box>
        </Box>
      </Container>
      <DevTool control={control} />
    </>
  );
};

export default Login;
