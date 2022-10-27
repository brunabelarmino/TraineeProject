import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import styles from './login.module.css'
import React, { useState } from "react"
import axios from 'axios'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import { Link } from "react-router-dom";

export default function (props) {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      const config = {
        headers: {
            "Content-type":"application/json"
        },
      };

      setLoading(true);
      const {data} = await axios.post('http://localhost:5000/api/users/login', {email, password})
      console.log(data)
      localStorage.setItem('userInfo', JSON.stringify(data))
      setLoading(false);
    }
    catch (error) {
      setError(error.response.data.message);
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <div className={styles.Authformcontainer}>
      {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
      {loading && <Loading/>}
      <form className={styles.Authform} onSubmit = {submitHandler}>
        <div className={styles.Authformcontent}>
          <h3 className={styles.Authformtitle}>Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
        
            <button type="submit" className="btn btn-primary mt-3">
              Submit
            </button>
     
          <p >
            New user? <Link to="/register">Sign up Here</Link>
          </p>
        </div>
      </form>
    </div>
  )
}