"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { adminLogin } from "../_actions/login";
import { toast } from "react-toastify";


const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, action] = useFormState(adminLogin, null);

  useEffect(() => {
    if(data?.db != null) {
      toast.error(data.db)
    }
  })

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
        <form action={action} className="flex flex-col gap-5 my-8">
          <p>
            <Label className="text-primary" htmlFor="username">
              Username
            </Label>
            <Input type="text" name="username" id="username" />
            {data?.error?.username && <p className="error-msg">{data.error.username}</p>}
          </p>

          <p className="relative">
            <Label className="text-primary" htmlFor="password">
              Password
            </Label>
            <Input
              type={!showPassword ? "password" : "text"}
              name="password"
              id="password"
            />
            <div
              className="eye absolute top-9 right-3 cursor-pointer"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </div>
            {data?.error?.password && <p className="error-msg">{data.error.password}</p>}
          </p>

          <SubmitButton />
        </form>
      </div>
    </>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? `Login...` : `Login`}
    </Button>
  );
};

export default LoginPage;
