////LOGIN WITHOUT CAPTCHA
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import logo from '../assests/SoftTrails.png'
import { FaEnvelope, FaKey, FaEye, FaEyeSlash, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
// import login from '../assests/login.jpg';
// import PasswordResetPopup from '../Components/PasswordResetPopup';
// import OtpVerificationPopup from '../Components/OtpVerificationPopup';
// import ForgotPasswordPopup from '../Components/ForgotPasswordPopup1';
import { MAIN_API_BASE } from '../config/apiBase';
import { motion, AnimatePresence } from 'framer-motion';
import '../index.css';
import { useAuth } from '../AuthContext';



const Login = () => { 
  const [email, setEmail] = useState('');
  const [isPasswordResetFlow, setIsPasswordResetFlow] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordResetPopup, setShowPasswordResetPopup] = useState(false);
  const [showOtpVerificationPopup, setShowOtpVerificationPopup] = useState(false);
  const [showOtpVerificationPopup1, setShowOtpVerificationPopup1] = useState(false);
  const [showForgotPasswordPopup, setForgotPasswordPopup] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isEmailAutoPrefilled, setIsEmailAutoPrefilled] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Check if email was verified after password reset
  useEffect(() => {
    const verifiedEmail = sessionStorage.getItem('emailVerified');
    if (verifiedEmail) {
      setEmail(verifiedEmail);
      // Email is auto-prefilled after password reset; require re-verification
      setIsEmailAutoPrefilled(true);
      setIsPasswordResetFlow(true);
      sessionStorage.removeItem('emailVerified');
    }
  }, []);

  const handleEmailVerify = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      // const response = await axios.post(`${MAIN_API_BASE}/users/mail-verify`, { email });
      const response = await axios.post(`${MAIN_API_BASE}/users/mail-verify`, { email: email.toLowerCase() });

      if (response.status === 403) {
        setShowPasswordResetPopup(true);
      } else if (response.data.message === "User found. You can proceed to login.") {
        setIsEmailVerified(true);
        // clear auto-prefill flag once user re-verifies
        setIsEmailAutoPrefilled(false);
        setSuccess('Email verified! Please enter your password.');
        setError('');
      } else {
        setError('Unexpected response.');
      }
    } catch (err) {
      if (err.response && err.response.status === 403) {
        setShowPasswordResetPopup(true);
      } else {
        setError('Error verifying email. Please try again.');
      }
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      // const response = await axios.post(`${MAIN_API_BASE}/users/login`, { email, password, });
      const response = await axios.post(`${MAIN_API_BASE}/users/login`, {
        email: email.toLowerCase(),
        password,
      });

      const { token, userId } = response.data;
      if (token && userId) {
        login(token, userId);
        
        setSuccess('Login successful!');
        setError('');
        setTimeout(() => navigate('/dms'), 1000);
      } else {
        throw new Error('Token or User ID not received');
      }
    } catch (err) {
      setError('Invalid email or password.');
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleOtpSent = () => {
    setForgotPasswordPopup(false);
    setShowOtpVerificationPopup1(true);
  };

  const handleOtpSent1 = () => {
    setForgotPasswordPopup(false);
    setShowOtpVerificationPopup1(true);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-app-bg overflow-hidden relative px-4 sm:px-6 md:px-8 py-8">
      {/* Animated Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 md:w-96 md:h-96 bg-indigo-500/20 rounded-full blur-[80px] md:blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 md:w-96 md:h-96 bg-emerald-500/10 rounded-full blur-[80px] md:blur-[120px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-[1100px] h-auto min-h-[500px] lg:h-[650px] flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-app-surface/50 backdrop-blur-md"
      >
        {/* Left Side: Animated Branding/Illustration */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-600 to-violet-700 p-12 flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
             {/* Logo Placeholder */}
            <div className="h-10 w-10 bg-white rounded-lg mb-6 flex items-center justify-center font-bold text-indigo-600">H</div>
            <h1 className="text-4xl font-bold text-white leading-tight">
              Manage your <br /> workforce <span className="text-indigo-200">smarter.</span>
            </h1>
            <p className="mt-4 text-indigo-100/80">Streamline HR processes, track performance, and empower your team with our next-gen HRMS.</p>
          </div>
          
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10"
          >
             {/* Replace with a 3D-like icon or modern illustration */}
             <div className="w-64 h-64 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-md mx-auto flex items-center justify-center shadow-inner">
                <div className="text-white text-6xl opacity-50">📊</div>
             </div>
          </motion.div>

          {/* Decorative Circle */}
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full" />
        
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-app-surface">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-white">
              {isPasswordResetFlow ? (isEmailVerified ? 'New Password' : 'Verify Email') : 'Welcome Back'}
            </h2>
            <p className="text-app-muted mt-2">
               {isPasswordResetFlow ? 'Please follow the steps to reset access.' : 'Please enter your details to sign in.'}
            </p>
          </div>

          <form onSubmit={isEmailVerified ? handleLogin : handleEmailVerify} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Work Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-400 text-slate-500">
                  <FaEnvelope />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isEmailVerified || isEmailAutoPrefilled}
                  className={`w-full bg-slate-800/50 border border-app-border text-white py-3.5 pl-11 pr-4 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all ${
                    (isEmailVerified || isEmailAutoPrefilled) ? 'opacity-60 cursor-not-allowed' : 'hover:bg-slate-900/50'
                  }`}
                  placeholder="name@company.com"
                />
              </div>
            </div>

            {/* Password Field (Animated Entrance) */}
            <AnimatePresence>
              {isEmailVerified && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-2 overflow-hidden"
                >
                  <label className="text-sm font-medium text-slate-300">Password</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400">
                      <FaKey />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-800/50 border border-app-border text-white py-3.5 pl-11 pr-12 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-white"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {!isPasswordResetFlow && (
                    <div className="text-right">
                      <button 
                        type="button" 
                        onClick={() => setForgotPasswordPopup(true)}
                        className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                      >
                        Forgot Password?
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-app-primary hover:bg-app-primaryHover text-white font-semibold py-4 rounded-xl shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 transition-all"
            >
              {isEmailVerified ? 'Sign In' : 'Verify Email'}
              <FaArrowRight className="text-sm" />
            </motion.button>
          </form>

          {/* Feedback Messages */}
          <div className="mt-6 h-4">
             {error && <p className="text-red-400 text-sm text-center animate-bounce">{error}</p>}
             {success && <p className="text-emerald-400 text-sm text-center">{success}</p>}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
export default Login;

