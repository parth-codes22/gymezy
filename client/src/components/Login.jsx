import React, { useEffect, useState } from "react";
import { Button, Input, Checkbox, Form, Image } from "@heroui/react";
import { addToast } from "@heroui/toast";
import { Icon } from "@iconify/react";
import GymLogo from '../assets/logo.jpg';
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";
import axios from "../axios";

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { user, setUser } = useGlobalContext();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (user !== null) navigateTo("/user/dashboard");
  }, []);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const formData = new FormData(event.target);
    const credentials = {
      username: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const { data } = await axios.post("/login", credentials);

      const userData = {
        username: credentials.username,
        user_id: data.user_id,
        token: data.token || "",
      };

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      addToast({
        title: "Login Successfull",
        description: "You have logged in to the application.",
        color: "success"
      });
      navigateTo("/user/dashboard");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Login failed. Try again.");
      addToast({
        title: "Login Failed",
        description: error.response?.data?.message || "Login failed. Try again.",
        color: "danger"
      });
    }

    setLoading(false);
  };

  return (
    <div className="flex h-full w-full flex-wrap gap-10 items-center justify-center">
      <Image src={GymLogo} width={300} height={300} />
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large px-8 pb-10 pt-6">
        <p className="pb-4 text-left text-3xl font-semibold">
          Log In
          <span aria-label="emoji" className="ml-2" role="img">
            👋
          </span>
        </p>
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        <Form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            isRequired
            label="Username"
            labelPlacement="outside"
            name="email"
            placeholder="Enter your username"
            type="text"
            variant="bordered"
          />

          <Input
            isRequired
            endContent={
              <button type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <Icon className="pointer-events-none text-2xl text-default-400" icon="solar:eye-closed-linear" />
                ) : (
                  <Icon className="pointer-events-none text-2xl text-default-400" icon="solar:eye-bold" />
                )}
              </button>
            }
            label="Password"
            labelPlacement="outside"
            name="password"
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
            variant="bordered"
          />

          <div className="flex w-full items-center justify-between px-1 py-2">
            <Checkbox defaultSelected name="remember" size="sm">
              Remember me
            </Checkbox>
            <Link className="text-default-500" to="#">
              Forgot password?
            </Link>
          </div>
          <Button className="w-full" color="primary" type="submit" isDisabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </Button>
        </Form>
        <p className="text-center text-small">
          <Link to="/auth/register" className="text-blue-600 hover:text-blue-800 transition-all">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
