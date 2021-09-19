import React, { useState } from "react";
import axios from "../axios/axios";
import {
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
  Form,
  Container,
} from "reactstrap";
import { v4 } from "uuid";

const BASE_URL = "http://localhost:9000/api/v1/";
const BASE_AUTH_URL = "auth";

const LoginForm = (props) => {
  const { authorizeUser } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginCheck = async () => {
    console.log(email);
    await axios
      .post(`${BASE_URL}${BASE_AUTH_URL}/login`, {
        emailId: email.toLowerCase(),
        password: password,
      })
      .then((response) => {
        console.log(response);
        localStorage.setItem("user", JSON.stringify(response.data));
        authorizeUser(response.data);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      return alert("Please enter credentials");
    }
    loginCheck();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <InputGroup>
          <Input
            type='email'
            name='email'
            id='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Input
            type='password'
            name='password'
            id='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button color='success'>Login</Button>
        </InputGroup>
      </FormGroup>
    </Form>
  );
};

export default LoginForm;
