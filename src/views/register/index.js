import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import ErrorMessage from "../../components/ErrorMessage";
import { Link } from "react-router-dom";
import styles from "./register.module.css";
import axios from "axios";
import Loading from "../../components/Loading";

function BasicExample() {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setMessage("Passwords do not match");
    } else {
      setMessage(null)
      try {
        const config = {
          headers: {
              "Content-type":"application/json"
          },
        };

      setLoading(true)

      const {data} = await axios.post("/api/users",
      {name, email, password});
      

      setLoading(false)
      localStorage.setItem("userInfo", JSON.stringify(data));
      console.log(data)
      } catch (error) {
          setError(error.response.data.message)
          setLoading(false)
      }
    }
  };

  return (
    <div className={styles.Authformcontainer}>
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
      <div className={styles.loginContainer}>
        <h3 className={styles.Authformtitle}>Sign Up</h3>
        <Form onSubmit={submitHandler} >
          <Form.Group className="form-group mt-3">
            <label>Name</label>
            <Form.Control 
              type="name"
              value={name}
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="form-group mt-3">
            <label>Email address</label>
            <Form.Control
              type="email"
              value={email}
              className={styles.form}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="form-group mt-3">
            <label>Password</label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="form-group mt-3">
            <label>Confirm Password</label>
            <Form.Control
              type="password"
              value={confirmpassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

              <button type="submit" className="btn btn-primary gap-2 mt-3">
                Register
              </button>
      
        </Form>
        <Row className="py-3">
          <Col>
            Have an Account ? <Link to="/login">Login</Link>
          </Col>
        </Row>
    </div>
  </div>
  );
}

export default BasicExample;