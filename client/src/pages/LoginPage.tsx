import { useState, useEffect } from "react";
import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../store/useAuth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {login , isSucess} = useAuth()

  useEffect(() => {
    if (isSucess) {
      navigate("/");
    }
  }, [isSucess]);
  const sendData  =  ()=>{
    console.log("hi, did you clled me");
    const finalData = {
        email,
        password
    }
    console.log(finalData)
    login(finalData)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-[#F7F7DF] font-serif">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-6xl font-[medium] mb-3 text-[#1e3d1a] tracking-tight">
          Welcome Back
        </h1>
        <p className="font-[font3] text-[17px] text-[#7a6e4a] italic">
          Manage your digital estate with precision.
        </p>
      </div>

      {/* Card */}
      <div className="w-full max-w-md rounded-2xl px-10 py-10 relative bg-[#f5f8ec] border border-[#1e3d1a]/10 shadow-[0_4px_40px_rgba(30,61,26,0.08),0_1px_4px_rgba(30,61,26,0.06)]">
        {/* Leaf badge */}
        <div className="absolute -top-4 -right-4 w-14 h-14 rounded-2xl flex items-center justify-center bg-[#e8edda] border border-[#1e3d1a]/10 shadow-[0_2px_12px_rgba(30,61,26,0.12)]">
          <Leaf className="w-7 h-7 text-[#2d5a27]" />
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="block text-[15px] font-[font5] tracking-[0.12em] mb-2 text-[#4a6741]">
            EMAIL ADDRESS
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="farmer@estate.com"
            className="w-full rounded-xl px-4 py-3.5 text-[15px] outline-none bg-[#e8edda] text-[#1e3d1a] caret-[#2d5a27] transition-all font-[font3] duration-200 focus:bg-[#eef2e2] focus:border focus:border-[#2d5a27]"
          />
        </div>

        {/* Password */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-[15px] font-[font5] tracking-[0.12em] text-[#4a6741]">
              PASSWORD
            </label>
          </div>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••"
            className="w-full rounded-xl px-4 py-3.5 text-[15px] outline-none bg-[#e8edda] text-[#1e3d1a] caret-[#2d5a27] tracking-widest  transition-all font-[font3] duration-200 focus:bg-[#eef2e2] focus:border focus:border-[#2d5a27]"
          />
        </div>

        {/* Login Button */}
        <button onClick={sendData} className="w-full rounded-xl py-4 text-[16px] font-[font5] tracking-wider text-white bg-[#2d5a27] hover:bg-[#1e3d1a] shadow-[0_4px_16px_rgba(45,90,39,0.25)] hover:shadow-[0_6px_20px_rgba(45,90,39,0.35)] active:scale-[0.98] transition-all duration-200">
          Login
        </button>

        {/* Sign up */}
        <p className="text-center font-[font3] text-sm mt-6 text-[#7a6e4a]">
          Don't have an account?{" "}
          <Link
            to="/auth/signup"
            className="font-[font5] text-[#1e3d1a] hover:text-[#2d5a27] transition-colors"
          >
            Request Access
          </Link>
        </p>
      </div>

      {/* Decorative lines */}
      <div className="flex gap-3 mt-10 items-center">
        <div className="h-px w-24 rounded bg-[#c8d4a8]" />
        <div className="h-px w-16 rounded bg-[#c8d4a8]" />
        <div className="h-px w-24 rounded bg-[#c8d4a8]" />
      </div>

      <div className="flex gap-3 mt-2 items-center">
        <div className="h-px w-16 rounded bg-[#dce6c0]" />
        <div className="h-px w-28 rounded bg-[#dce6c0]" />
        <div className="h-px w-16 rounded bg-[#dce6c0]" />
      </div>
    </div>
  );
}
