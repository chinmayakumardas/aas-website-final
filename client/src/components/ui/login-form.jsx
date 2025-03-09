

'use client';
import Cookies from "js-cookie";
import { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from 'react-toastify';
import { loginApi, sendOtpApi, verifyOtpApi, resetPasswordApi,getUserDetails } from '@/api/authApi';
import { Eye, EyeOff } from "lucide-react";
 
export function LoginForm({ className, ...props }) {
  const [step, setStep] = useState("login");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
   const role = Cookies.get('role');
  const router = useRouter();
  useEffect(() => {
    if(role)
        router.push("/blogs");
    
    }, [role,router]);
 
  // Validation Regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  const otpRegex = /^\d{6}$/;
 
  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!emailRegex.test(email)) {
      toast.error("Enter valid Credentials!");
      return;
    }
    if (!passwordRegex.test(password)) {
      toast.error("Password must be at least 8 characters, include 1 uppercase letter and 1 special character");
      return;
    }
 
    try {
      const { token } = await loginApi(email, password);
      setStep("otp");
      toast.success('OTP sent!');
    } catch (error) {
      //setErrorMessage(error.message);
      toast.error(error.message);
    }
  };
 
  // Handle OTP Verification
  const handleOtpValidate = async () => {
    if (!otpRegex.test(otp)) {
      toast.error("OTP must be a 6-digit number");
      return;
    }
 
    try {
      await verifyOtpApi(email, otp);
      // localStorage.setItem('token', token);
      toast.success('Login successfully!');
      
      router.push('/blogs');
    } catch (error) {
      //setErrorMessage(error.message);
      toast.error(error.message);
    }
  };
  
 
  // Handle Forgot Password
  const handleResetPassword = async () => {
    if (!emailRegex.test(email)) {
      toast.error("Invalid email!");
      return;
    }
 
    try {
      await sendOtpApi(email);
      setStep("new-password");
      toast.success('OTP sent!');
    } catch (error) {
      //setErrorMessage(error.message);
      toast.error(error.message);
    }
  };
 
  // Handle New Password Submission
  const handleSubmitNewPassword = async () => {
    if (!otpRegex.test(otp)) {
      toast.error("OTP must be a 6-digit number!");
      return;
    }
    if (!passwordRegex.test(newPassword)) {
      toast.error("Password must be at least 8 characters, include 1 uppercase letter and 1 special character");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords Mismatch!');
      return;
    }
 
    try {
      await resetPasswordApi(email, otp, newPassword);
      toast.success('Password changed!');
      setStep("login");
    } catch (error) {
      //setErrorMessage(error.message);
      toast.error(error.message);
    }
  };
  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // Allow only digits
    const newOtp = otp.split("");
    newOtp[index] = value;
    setOtp(newOtp.join(""));
 
    // Move to next field if a digit is entered
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };
 
  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };
 
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim().slice(0, 6);
    if (/^\d{6}$/.test(pastedData)) {
      setOtp(pastedData);
    }
  };
 
 
  return (
    <div className={cn("flex flex-col gap-4 min-h-[400px]", className)} {...props}>
      <Card>
        <CardHeader className="text-center mb-4">
          <CardTitle className="text-3xl">
            {step === "login" ? "Welcome Back !" : step === "otp" ? "Enter OTP" : "Reset Password"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {step === "login" && (
            <form onSubmit={handleLogin} className="py-4">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-lg">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@aasit.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 text-lg placeholder:text-lg"
                   
                  />
                </div>
 
                <div className="grid gap-2 relative">
                  <Label htmlFor="password" className="text-lg">Password</Label>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter Password!"
                    className="h-12 text-lg placeholder:text-lg"
                  />
                  <div className="text-right">
                    <a href="#" className="text-md underline text-black hover:text-black" onClick={() => setStep("reset")}>
                      Forgot Password?
                    </a>
                  </div>
                  <button
                    type="button"
                    className="absolute right-4 top-12 transform -translate-y-1/2 text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Eye size={25} /> : <EyeOff size={25} />}
                  </button>
                </div>
 
                {errorMessage && <div className="text-red-500">{errorMessage}</div>}
                <Button variant="createBtn" type="submit" className="w-full">Login</Button>
              </div>
            </form>
          )}
 
            {step === "otp" && (
              <div className="flex flex-col items-center gap-10">
              <Label htmlFor="otp" className="text-lg text-gray-600">
                      OTP is sent to Registered Email
              </Label>
                <div className="flex space-x-2">
                  {Array(6).fill("").map((_, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength="1"
                      value={otp[index] || ""}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      onPaste={handlePaste}
                      className="w-12 h-12 border-b-2 border-gray-700 text-center text-2xl focus:outline-none focus:border-gray-900 transition-all"
                    />
                  ))}
                </div>
                <Button variant="ghost" onClick={() => setStep("login")} className="w-full">Back to Login</Button>
                <Button variant="createBtn" type="button" onClick={handleOtpValidate} className="w-full mt-4">Validate OTP</Button>
              </div>
            )}
           
       
 
          {step === "reset" && (
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="reset-email" className="text-lg">Enter your email</Label>
                <Input  className="h-12 text-lg pr-10 placeholder:text-lg" id="reset-email" type="email" placeholder="admin@aasit.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <Button variant="ghost" onClick={() => setStep("login")} className="w-full">Back to Login</Button>
              <Button variant="createBtn" type="button" onClick={handleResetPassword} className="w-full">Reset Password</Button>
            </div>
          )}
 
          {step === "new-password" && (
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="otp">Enter OTP</Label>
                {/* <Input id="otp" type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required /> */}
                <div className="flex space-x-2 md:space-x-5">
                  {Array(6).fill("").map((_, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength="1"
                      value={otp[index] || ""}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      onPaste={handlePaste}
                      className="w-12 h-12 border-b-2 border-gray-700 text-center text-2xl focus:outline-none focus:border-gray-900 transition-all"
                    />
                  ))}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              </div>
              <Button variant="ghost" onClick={() => setStep("login")} className="w-full">Back to Login</Button>
              <Button variant="createBtn" type="button" onClick={handleSubmitNewPassword} className="w-full">Submit</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
 