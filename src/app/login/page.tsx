import React from "react";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div className="flex justify-center items-center bg-black h-screen bg-gradient-to-r from-violet-500 to-fuchsia-500">
      <div className="bg-black p-24 rounded-lg">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
