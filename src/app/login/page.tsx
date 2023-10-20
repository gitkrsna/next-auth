import React from "react";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-violet-500 to-fuchsia-500">
      <div className="bg-slate-50 p-24 rounded-lg">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
