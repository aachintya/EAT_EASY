import React, { useState } from "react";
import "../assets/styles/register.css";
import Navbar from "../components/common/Navbar";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "../utils/constants";
import { sendOtp } from "../services/operations/authAPI";
import { setSignupData } from "../slices/authSlice";
import GoogleOAuthButton from "../components/AuthRoute/GoogleOAuthButton"; // Use "AuthRoute" instead of "Authroute"

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    registrationNumber: "",
    email: "",
    hostelName: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    firstName,
    lastName,
    registrationNumber,
    email,
    hostelName,
    password,
    confirmPassword,
  } = formData;

  // Handle input fields, when some value changes
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle Form Submission
  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }
    const signupData = { ...formData };

    // Setting signup data to state
    dispatch(setSignupData(signupData));

    // Send OTP to user for verification
    dispatch(sendOtp(formData.email, navigate));

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      hostelName: "",
      registrationNumber: "",
    });
  };

  return (
    <div>
      <section className="vh-100 bg-image">
        <div className="mask d-flex align-items-center h-100 gradient-custom-3 overflow-x-hidden">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-19 col-md-15 col-lg-7 col-xl-6">
                <div className="mt-5 p-2">
                  <div className="p-5 ">
                    <h2 className="text-uppercase font-bold text-center mb-5">
                      Create an account
                    </h2>
                    <form
                      onSubmit={handleOnSubmit}
                      className="flex w-full flex-col gap-y-4"
                    >
                      {/* Input fields for first and last name */}
                      <div className="flex gap-x-4">
                        <label>
                          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            First Name <sup className="text-red-900">*</sup>
                          </p>
                          <input
                            required
                            type="text"
                            name="firstName"
                            value={firstName}
                            onChange={handleOnChange}
                            placeholder="Enter first name"
                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                          />
                        </label>
                        <label>
                          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Last Name <sup className="text-red-900">*</sup>
                          </p>
                          <input
                            required
                            type="text"
                            name="lastName"
                            value={lastName}
                            onChange={handleOnChange}
                            placeholder="Enter last name"
                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                          />
                        </label>
                      </div>

                      {/* Registration number */}
                      <div className="flex gap-x-4">
                        <label className="">
                          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Registration no <sup className="text-red-900">*</sup>
                          </p>
                          <input
                            required
                            type="text"
                            name="registrationNumber"
                            value={registrationNumber}
                            onChange={handleOnChange}
                            placeholder="Enter Reg No"
                            className="w-full rounded-[0.5rem] bg-richblack-500 p-[12px] text-richblack-5"
                          />
                        </label>
                      </div>

                      {/* Email and hostel fields */}
                      <div className="flex gap-x-4">
                        <label className="">
                          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Email Address <sup className="text-red-900">*</sup>
                          </p>
                          <input
                            required
                            type="text"
                            name="email"
                            value={email}
                            onChange={handleOnChange}
                            placeholder="Enter email address"
                            className="w-full rounded-[0.5rem] bg-richblack-500 p-[12px] text-richblack-5"
                          />
                        </label>
                        <label>
                          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Hostel <sup className="text-red-900">*</sup>
                          </p>
                          <input
                            required
                            type="text"
                            name="hostelName"
                            value={hostelName}
                            onChange={handleOnChange}
                            placeholder="Enter your hostel"
                            className="w-full rounded-[0.5rem] bg-richblack-500 p-[12px] text-richblack-5"
                          />
                        </label>
                      </div>

                      {/* Password fields */}
                      <div className="flex gap-x-4">
                        <label className="relative">
                          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Create Password <sup className="text-red-900">*</sup>
                          </p>
                          <input
                            required
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={password}
                            onChange={handleOnChange}
                            placeholder="Enter Password"
                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                          />
                          <span
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                          >
                            {showPassword ? (
                              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) : (
                              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                          </span>
                        </label>
                        <label className="relative">
                          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Confirm Password <sup className="text-red-900">*</sup>
                          </p>
                          <input
                            required
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleOnChange}
                            placeholder="Confirm Password"
                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                          />
                          <span
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                          >
                            {showConfirmPassword ? (
                              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) : (
                              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                          </span>
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-bold text-richblack-900 hover:bg-blue-500"
                      >
                        Create Account
                      </button>

                      {/* Google OAuth Button */}
                      <div className="mt-4">
                        <GoogleOAuthButton />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;
