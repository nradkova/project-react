import { useState } from "react";
import Input from "../../components/input";
import PageLayout from "../../components/pageLayout";
import SubmitButton from "../../components/submitButton";
import Title from "../../components/title";
import authServices from "../../services/user";
import './index.css'

const Login = ({ history }) => {

  const onLoginSubmitHandler = (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    authServices.login({ username, password })
      .then(userCredential => {
        console.log('Login');

        history.push('/home');
      });
  }


  return (
    <PageLayout>
      <Title title="Login" />
      <div className="signin-section-wrapper">
        <div className="signin-section">
          <div className="signin-section-info">
            <h2>Happy </h2>
            <i className="fas fa-users"></i>
            <h2>to have you here.</h2>
          </div>
          <form action="#" method="POST" className="signup-form" onSubmit={onLoginSubmitHandler}>
            <ul className="no-bullet">
              <li>
                <label htmlFor="username"></label>
                <input type="text" className="input-fields" id="username" name="username" placeholder="Username" required />
              </li>
              <li>
                <label htmlFor="password"></label>
                <input type="password" className="input-fields" id="password" name="password" placeholder="Password"  required />
              </li>
              <li >
                <input type="submit" className="join-btn" name="join" alt="Join" value="Join" />
              </li>
            </ul>
          </form>
        </div>
      </div>
    </PageLayout>
  )
}

export default Login;