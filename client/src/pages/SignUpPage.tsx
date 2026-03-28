import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUpPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    console.log("Form submitted", form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F7DF] relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute right-0 top-0 h-full w-1/2  bg-[#F7F7DF] pointer-events-none" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-2xl mx-6 rounded-2xl p-10 shadow-xl bg-[#eef2e2]">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4 text-[#6b7f5e]">
          Establish Your Legacy
        </p>

        <h1 className="text-5xl font-[medium] leading-tight mb-4 text-[#1e3a1e] ">
          The Cultivated Earth
        </h1>

        <p className="text-base mb-8 font-[font3] text-[#4a5c3f]">
          Join the digital estate where heritage meets precision agriculture.
        </p>

        {/* Full Name */}
        <div className="mb-5">
          <label className="block text-xs font-semibold tracking-widest uppercase mb-2 text-[#5a6e4e]">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            required
            placeholder="Arthur Pemberton"
            value={form.fullName}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg text-[15px] outline-none  font-[font3]  bg-[#e4ebcf] text-[#2c3e22] placeholder-[#9aab88] focus:border-green-700"
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="block text-xs font-semibold tracking-widest uppercase mb-2 text-[#5a6e4e]">
            Professional Email
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="apemberton@estate.com"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg text-[15px] outline-none font-[font3]  bg-[#e4ebcf] text-[#2c3e22] placeholder-[#9aab88] focus:border-green-700"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-xs font-semibold tracking-widest uppercase mb-2 text-[#5a6e4e]">
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            placeholder="••••••••••"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg text-[15px] outline-none font-[font3]  bg-[#e4ebcf] text-[#2c3e22] placeholder-[#9aab88] focus:border-green-700"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        <p className="text-[15px] mb-6 text-[#4a5c3f]">
          By creating an account, you agree to our{' '}
          <a href="#" className="font-semibold underline text-[#1e3a1e] hover:opacity-75">
            Terms of Stewardship
          </a>{' '}
          and{' '}
          <a href="#" className="font-semibold underline text-[#1e3a1e] hover:opacity-75">
            Privacy Charter
          </a>
          .
        </p>

        <div className="flex items-center gap-6">
          <button
            onClick={handleSubmit}
            className="px-8 py-3 rounded-lg text-[15px] font-[font5] font-semibold text-white bg-[#2d5a27] hover:opacity-90 active:scale-95 transition"
          >
            Create Account
          </button>
          <p className=" font-[font5] text-[#4a5c3f]">
            Already a member?{' '}
            <Link to="/auth/login" className="font-semibold underline text-[#1e3a1e] hover:opacity-75">
              Log In
            </Link>
          </p>
        </div>

        <div className="flex items-center justify-between mt-12 pt-6 border-t border-[#d3dbb8]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-greenPASSWORD
-500 inline-block" />
            <span className="text-xs font-semibold tracking-widest uppercase text-[#5a6e4e]">
              System Status: Fertile
            </span>
          </div>
          <span className="text-xs text-[#8a9e78]">v2.4 Arable Pro</span>
        </div>
      </div>
    </div>
  );
}
