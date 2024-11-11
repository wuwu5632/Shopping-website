"use client";
import { useWixClient } from "@/hooks/useWixClient";
import { LoginState } from "@wix/sdk";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import React, { useState } from "react";


enum MODE {
  LOGIN = "login",
  REGISTER = "register",
  RESET_PASSWORD = "reset-password",
  EMAIL_VERIFICATION = "email-verification",
}

const LoginPage = () => {
  const wixClient = useWixClient();
  const router = useRouter();
  const isLoggedIn = wixClient.auth.loggedIn();
  if (isLoggedIn) {
    router.push("/");
  }

  const [mode, setMode] = React.useState(MODE.LOGIN);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      let response;
      switch (mode) {
        case MODE.LOGIN:
          response = await wixClient.auth.login({
            email: email,
            password: password,
          });
          console.log("responseLogin", response);
          break;
        case MODE.REGISTER:
          response = await wixClient.auth.register({
            email,
            password,
            profile: { nickname: userName },
          });
          console.log("responseRegister", response);
          break;
        case MODE.RESET_PASSWORD:
          response = await wixClient.auth.sendPasswordResetEmail(
            email,
            window.location.href
          );
          setMessage("Password Reset Email Sent,Please check your e-mail.");
          break;
        case MODE.EMAIL_VERIFICATION:
          response = await wixClient.auth.processVerification({
            verificationCode: emailCode,
          });
          break;
        default:
          break;
      }
      console.log("response", response);
    

      switch (response?.loginState) {
        case LoginState.SUCCESS:
          if (response?.data?.sessionToken) {
            setMessage("Successful! You are being redirected.");

            try {
              const tokens = await wixClient.auth.getMemberTokensForDirectLogin(
                response.data.sessionToken
              );

              Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
                expires: 2,
              });
              wixClient.auth.setTokens(tokens);
              router.push("/");
            } catch (error) {
              if (error instanceof Error) {
                console.error("Error message:", error.message);
                console.error("Error stack:", error.stack);
              }
              setMessage("Error: Unable to complete login. Please try again.");
            }
          } else {
            setMessage("Error: Session token is missing.");
            console.error("Session token is missing in the response.");
          }
          break;

        case LoginState.FAILURE:
          if (
            response.errorCode === "invalidEmail" ||
            response.errorCode === "invalidPassword"
          ) {
            setError("Invalid Email or Password");
          } else if (response.errorCode === "emailAlreadyExists") {
            setError("Email Already Exists");
          } else if (response.errorCode === "resetPassword") {
            setError("You need to reset your password!");
          } else {
            setError("Something went wrong");
          }
          break;

        case LoginState.EMAIL_VERIFICATION_REQUIRED:
          setMode(MODE.EMAIL_VERIFICATION);
          break;
          
        case LoginState.OWNER_APPROVAL_REQUIRED:
          setError("Your account is pending approval");
          break;
        default:
          break;
      }
    } catch (error) {
      console.log("error", error);
      setError("something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const formTitle =
    mode === MODE.LOGIN
      ? "Log in"
      : mode === MODE.REGISTER
      ? "Register"
      : mode === MODE.RESET_PASSWORD
      ? "Reset Your Password"
      : "Verify Your Email";

  const buttonTitle =
    mode === MODE.LOGIN
      ? "Login"
      : mode === MODE.REGISTER
      ? "Register"
      : mode === MODE.RESET_PASSWORD
      ? "Reset"
      : "Verify";

  return (
    <div className="h-[calc(100vh-80px)] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex items-center justify-center">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-semibold">{formTitle}</h1>
        {mode === MODE.REGISTER ? (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Username</label>
            <input
              type="text"
              placeholder="Username"
              name="username"
              className="ring-2 ring-gray-300 rounded-md p-4 w-96"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
        ) : null}

        {mode !== MODE.EMAIL_VERIFICATION ? (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">E_mail</label>
            <input
              type="email"
              placeholder="john@gmail.com"
              name="email"
              className="ring-2 ring-gray-300 rounded-md p-4 w-96"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">E_mail</label>
            <input
              type="text"
              placeholder="emailCode"
              name="code"
              className="ring-2 ring-gray-300 rounded-md p-4 w-96"
              onChange={(e) => setEmailCode(e.target.value)}
            />
          </div>
        )}
        {mode === MODE.LOGIN || mode === MODE.REGISTER ? (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Password"
              name="Enter your password"
              className="ring-2 ring-gray-300 rounded-md p-4 w-96"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        ) : null}

        {mode === MODE.LOGIN && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.RESET_PASSWORD)}
          >
            Forgot Password
          </div>
        )}
        <button
          className="bg-lama text-white text-sm p-2 rounded-md disabled:cursor-not-allowed disabled:bg-pink-200"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : buttonTitle}
        </button>
        {error && <div className="text-red-600">{error}</div>}
        {mode === MODE.LOGIN && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.REGISTER)}
          >
            Don't have an account? Register
          </div>
        )}
        {mode === MODE.REGISTER && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.LOGIN)}
          >
            Already have an account? Login
          </div>
        )}
        {mode === MODE.RESET_PASSWORD && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.LOGIN)}
          >
            Go back to login
          </div>
        )}
        {message && <div className="text-green-600 text-sm">{message}</div>}
      </form>
    </div>
  );
};

export default LoginPage;
