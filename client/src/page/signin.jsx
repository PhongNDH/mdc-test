import { Button, Form } from "react-bootstrap";
import "../App.scss";
import axios from "axios";
import { useState } from "react";

const Signin = () => {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");

   const handleSignin = () => {
      axios
         .post("http://localhost:5000/signin", {
            username: username,
            password: password,
         })
         .then(({ data }) => {
            console.log({ data });
         })
         .catch((err) => {
            console.log(err);
         });
   };

   const handleSignup = () => {
      axios
         .post("http://localhost:5000/signup", {
            username: username,
            password: password,
         })
         .then(({ data }) => {
            console.log({ data });
         })
         .catch((err) => {
            console.log(err);
         });
   };

   const handleCreate = () => {
      axios
         .post("http://localhost:5000/create-user")
         .then(({ data }) => {
            console.log({ data });
         })
         .catch((err) => {
            console.log(err);
         });
   };

   const handleCheckUsername = () => {
      axios
         .post("http://localhost:5000/check-username", {
            username: username,
         })
         .then(({ data }) => {
            console.log({ data });
         })
         .catch((err) => {
            console.log(err);
         });
   };

   const handleDetectPassword = () => {
      axios
         .post("http://localhost:5000/detect-password", {
            username: username,
         })
         .then(({ data }) => {
            console.log(data)
         })
         .catch((err) => {
            console.log(err);
         });
   };
   return (
      <div className="signin">
         <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
               <Form.Label>Username</Form.Label>
               <Form.Control
                  type="email"
                  placeholder="Enter username"
                  onChange={(e) => {
                     setUsername(e.target.value);
                  }}
               />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
               <Form.Label>Password</Form.Label>
               <Form.Control
                  type="text"
                  placeholder="Password"
                  onChange={(e) => {
                     setPassword(e.target.value);
                  }}
               />
            </Form.Group>
            <Button
               variant="primary"
               type="button"
               className="mx-2 mt-3"
               onClick={() => {
                  handleSignin();
               }}
            >
               Signin
            </Button>
            <Button
               variant="primary"
               type="button"
               className="mx-2 mt-3"
               onClick={() => {
                  handleSignup();
               }}
            >
               Signup
            </Button>
            <Button
               variant="success"
               type="button"
               className="mx-2 mt-3"
               onClick={() => {
                  handleCheckUsername();
               }}
            >
               Check Username
            </Button>
            <Button
               variant="success"
               type="button"
               className="mx-2 mt-3"
               onClick={() => {
                  handleDetectPassword();
               }}
            >
               Detect Password
            </Button>
            <Button
               variant="info"
               type="button"
               className="mx-2 mt-3"
               onClick={(e) => {
                  handleCreate();
               }}
            >
               Create 1.000.000 user randomly
            </Button>
         </Form>
      </div>
   );
};

export default Signin;
