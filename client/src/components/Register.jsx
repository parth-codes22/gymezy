import React, { useState } from "react";
import { Button, Input, Checkbox, NumberInput, Image } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { MaleIcon } from "../assets/MaleIcon";
import { FemaleIcon } from "../assets/FemaleIcon";
import { OtherGenderIcon } from "../assets/OtherGenderIcon";
import GymLogo from '../assets/logo.jpg';
import axios from '../axios';

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    age: 0,
    username: "",
    password: "",
    confirmPassword: ""
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target === undefined) setFormData({ ...formData, ["age"]: e });
    else setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("/signup", {
        name: formData.name,
        email: formData.email,
        gender: formData.gender,
        age: formData.age,
        username: formData.username,
        password: formData.password
      });
      const data = await response.json();
      if (response.ok) {
        navigate("/auth/login");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="flex h-full w-full flex-wrap gap-10 items-center justify-center">
      <Image src={GymLogo} width={300} height={300} />
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large px-8 pb-10 pt-6">
        <p className="pb-4 text-left text-3xl font-semibold">Sign Up 👋</p>
        {error && <p className="text-red-500">{error}</p>}
        <form className="flex flex-col gap-4" onSubmit={handleRegister}>
          <Input isRequired label="Name" name="name" placeholder="Enter your name" onChange={handleChange} variant="bordered" />
          <Input isRequired label="Email" name="email" type="email" placeholder="Enter your email" onChange={handleChange} variant="bordered" />
          
          <div className="flex flex-row gap-10 justify-around align-middle items-center p-2">
            {["Male", "Female", "Other"].map((g, i) => (
              <div key={g} className="flex flex-col items-center justify-center gap-3">
                <Button
                  className="p-2"
                  size="lg"
                  variant={formData.gender === g ? "shadow" : "faded"}
                  onPress={() => setFormData({ ...formData, gender: g })}
                  isIconOnly
                  aria-label={g}
                  color={g === "Male" ? "primary" : g === "Female" ? "danger" : "warning"}
                >
                  {g === "Male" ? <MaleIcon /> : g === "Female" ? <FemaleIcon /> : <OtherGenderIcon />}
                </Button>
                <p className={formData.gender === g ? "font-bold" : ""}>{g}</p>
              </div>
            ))}
          </div>

          <NumberInput maxValue={100} minValue={14} className="max-w-xs font-bold" fullWidth placeholder="Enter your age" label="Age" name="age" onChange={handleChange} />
          <Input isRequired label="Username" name="username" placeholder="Enter your username" onChange={handleChange} variant="bordered" />
          
          <Input
            isRequired
            label="Password"
            name="password"
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
            onChange={handleChange}
            variant="bordered"
            endContent={<button type="button" onClick={() => setIsVisible(!isVisible)}><Icon className="text-2xl text-default-400" icon={isVisible ? "solar:eye-closed-linear" : "solar:eye-bold"} /></button>}
          />

          <Input
            isRequired
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Confirm your password"
            type={isConfirmVisible ? "text" : "password"}
            onChange={handleChange}
            variant="bordered"
            endContent={<button type="button" onClick={() => setIsConfirmVisible(!isConfirmVisible)}><Icon className="text-2xl text-default-400" icon={isConfirmVisible ? "solar:eye-closed-linear" : "solar:eye-bold"} /></button>}
          />

          <Checkbox isRequired className="py-4" size="sm"> I agree with the <Link to="#">Terms</Link> and <Link to="#">Privacy Policy</Link></Checkbox>
          <Button color="primary" type="submit">Sign Up</Button>
        </form>
        <p className="text-center text-small">
          <Link to="/auth/login" className="text-blue-600 hover:text-blue-800">Already have an account? Log In</Link>
        </p>
      </div>
    </div>
  );
}
