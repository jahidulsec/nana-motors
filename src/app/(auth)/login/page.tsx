"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="max-w-xl min-w-[25rem] p-5 shadow-sm rounded-md bg-white">
        <header>
          <h2 className="text-primary text-3xl text-center">Sign in</h2>
          <h4 className="text-sm text-center text-gray-400 my-3">
            Welcome back! Please enter your details
          </h4>
        </header>

        {/* form */}
        <form action="" className="flex flex-col gap-5 my-8">
          <p>
            <Label className="text-primary" htmlFor="username">
              Username
            </Label>
            <Input type="text" name="username" id="username" />
          </p>

          <p className="relative">
            <Label className="text-primary" htmlFor="username">
              Password
            </Label>
            <Input type={!showPassword ? "password" : "text"} name="username" id="username" />
            <div className="eye absolute top-9 right-3 cursor-pointer" onClick={() => {setShowPassword(!showPassword)}}>
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </div>
          </p>

          <Button>Login</Button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
