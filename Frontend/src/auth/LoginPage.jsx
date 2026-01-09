import React, { useState } from 'react';
import { Mail, Lock, Check } from 'lucide-react';
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.password) newErrors.password = 'Required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      alert('Login successful!');
      setFormData({ email: '', password: '' });
      setRememberMe(false);
    } else {
      setErrors(newErrors);
    }
  };

  const inputStyle = (error) => ({
    backgroundColor: '#303133',
    borderColor: error ? '#ef4444' : '#777777',
    borderWidth: '1px'
  });

  const handleFocus = (e, hasError) => {
    if (!hasError) {
      e.target.style.borderColor = '#BB8C4B';
      e.target.style.boxShadow = '0 0 0 2px rgba(187, 140, 75, 0.2)';
    }
  };

  const handleBlur = (e, hasError) => {
    if (!hasError) {
      e.target.style.borderColor = '#777777';
      e.target.style.boxShadow = 'none';
    }
  };

  return (
    <div className="h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#222227' }}>
      <div className="w-full h-full max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          
          {/* Left Side - Branding */}
          <div className="hidden lg:flex flex-col justify-center relative overflow-hidden" 
               style={{
                 backgroundImage: 'url(https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1000)',
                 backgroundSize: 'cover',
                 backgroundPosition: 'center'
               }}>
            {/* Overlay */}
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(135deg, rgba(187, 140, 75, 0.95) 0%, rgba(34, 34, 39, 0.98) 100%)'
            }}></div>
            
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #FFFFFF 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #FFFFFF 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }}></div>
            
            {/* Content */}
            <div className="relative z-10 px-12 py-10">
              <div className="mb-8">
               
                <h1 className="text-5xl font-bold mb-3 leading-tight" style={{ color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                  Diamond Trim<br/>Beauty Studio
                </h1>
                <div className="w-20 h-1 rounded-full mb-4" style={{ backgroundColor: '#BB8C4B' }}></div>
                <p className="text-lg font-medium mb-1" style={{ color: '#FFFFFF', letterSpacing: '0.02em' }}>Welcome Back</p>
                <p className="text-sm italic" style={{ color: '#DDDDDD', opacity: 0.95 }}>Sign in to continue your premium experience</p>
              </div>
              
              {/* Features */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3 group">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all" style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <Check className="w-5 h-5" style={{ color: '#FFFFFF' }} />
                  </div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: '#FFFFFF' }}>Easy Booking</p>
                    <p className="text-xs" style={{ color: '#DDDDDD', opacity: 0.9 }}>Schedule appointments anytime</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 group">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all" style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <Check className="w-5 h-5" style={{ color: '#FFFFFF' }} />
                  </div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: '#FFFFFF' }}>Track History</p>
                    <p className="text-xs" style={{ color: '#DDDDDD', opacity: 0.9 }}>View your service records</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 group">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all" style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <Check className="w-5 h-5" style={{ color: '#FFFFFF' }} />
                  </div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: '#FFFFFF' }}>Exclusive Offers</p>
                    <p className="text-xs" style={{ color: '#DDDDDD', opacity: 0.9 }}>Access member-only deals</p>
                  </div>
                </div>
              </div>
              
              {/* Contact Info */}
              <div className="pt-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.25)' }}>
                <div className="space-y-2 text-sm" style={{ color: '#FFFFFF' }}>
                  <p className="flex items-center"><span className="mr-2" style={{ color: '#BB8C4B', fontSize: '16px' }}>📍</span> <span className="opacity-95 text-xs">Club Road, Near Dessert Palm Hotel, Rahim Yar Khan</span></p>
                  <p className="flex items-center"><span className="mr-2" style={{ color: '#BB8C4B', fontSize: '16px' }}>📞</span> <span className="opacity-95 text-xs">0685872060 | 03406465222</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="flex items-center justify-center p-6 lg:p-8 h-full overflow-y-auto" style={{ backgroundColor: '#222227' }}>
            <div className="w-full max-w-md my-auto">
              {/* Mobile Header */}
              <div className="lg:hidden text-center mb-8">
                <h2 className="text-3xl font-bold" style={{ color: '#FFFFFF' }}>Diamond Trim Beauty Studio</h2>
              </div>

              {/* Form Header */}
              <div className="mb-6">
                <h2 className="text-2xl lg:text-3xl font-bold mb-2" style={{ color: '#FFFFFF', letterSpacing: '-0.01em' }}>Welcome Back</h2>
                <p className="text-sm" style={{ color: '#999999' }}>Sign in to your account to continue</p>
              </div>

              {/* Form */}
              <div className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-xs font-medium mb-1.5" htmlFor="email" style={{ color: '#FFFFFF' }}>
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: '#BB8C4B' }} />
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none transition-all"
                      style={{ ...inputStyle(errors.email), color: '#FFFFFF' }} placeholder="email@example.com"
                      onFocus={(e) => handleFocus(e, errors.email)} onBlur={(e) => handleBlur(e, errors.email)} />
                  </div>
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-medium mb-1.5" htmlFor="password" style={{ color: '#FFFFFF' }}>
                    Password <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: '#BB8C4B' }} />
                    <input type={showPassword ? "text" : "password"} id="password" name="password" value={formData.password} onChange={handleChange}
                      className="w-full pl-10 pr-11 py-2.5 border rounded-xl text-sm focus:outline-none transition-all"
                      style={{ ...inputStyle(errors.password), color: '#FFFFFF' }} placeholder="Enter your password"
                      onFocus={(e) => handleFocus(e, errors.password)} onBlur={(e) => handleBlur(e, errors.password)} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-sm transition-colors"
                      style={{ color: '#999999' }}
                      onMouseEnter={(e) => e.target.style.color = '#BB8C4B'} onMouseLeave={(e) => e.target.style.color = '#999999'}>
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        id="remember" 
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded border cursor-pointer appearance-none transition-all"
                        style={{ 
                          backgroundColor: rememberMe ? '#BB8C4B' : '#303133',
                          borderColor: rememberMe ? '#BB8C4B' : '#777777'
                        }}
                      />
                      {rememberMe && (
                        <Check className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none" style={{ color: '#FFFFFF' }} />
                      )}
                    </div>
                    <label htmlFor="remember" className="ml-2 text-xs cursor-pointer" style={{ color: '#DDDDDD' }}>
                      Remember me
                    </label>
                  </div>
                  <a href="#" className="text-xs font-semibold hover:underline transition-colors" style={{ color: '#BB8C4B' }}>
                    Forgot Password?
                  </a>
                </div>

                {/* Submit Button */}
                <button onClick={handleSubmit}
                  className="w-full font-semibold text-base py-3 px-6 rounded-xl focus:outline-none transition-all shadow-lg"
                  style={{ 
                    background: 'linear-gradient(135deg, #BB8C4B 0%, #d4a574 100%)',
                    color: '#FFFFFF',
                    boxShadow: '0 4px 15px rgba(187, 140, 75, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(187, 140, 75, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(187, 140, 75, 0.3)';
                  }}>
                  Sign In
                </button>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t" style={{ borderColor: '#444444' }}></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-2" style={{ backgroundColor: '#222227', color: '#999999' }}>OR</span>
                  </div>
                </div>

                {/* Social Login Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    className="flex items-center justify-center py-2.5 px-4 border rounded-xl text-sm font-medium transition-all"
                    style={{ 
                      backgroundColor: '#303133',
                      borderColor: '#777777',
                      color: '#FFFFFF'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.borderColor = '#BB8C4B';
                      e.target.style.backgroundColor = 'rgba(187, 140, 75, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderColor = '#777777';
                      e.target.style.backgroundColor = '#303133';
                    }}>
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Google
                  </button>
                  
                  <button 
                    className="flex items-center justify-center py-2.5 px-4 border rounded-xl text-sm font-medium transition-all"
                    style={{ 
                      backgroundColor: '#303133',
                      borderColor: '#777777',
                      color: '#FFFFFF'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.borderColor = '#BB8C4B';
                      e.target.style.backgroundColor = 'rgba(187, 140, 75, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderColor = '#777777';
                      e.target.style.backgroundColor = '#303133';
                    }}>
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="#1877F2">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </button>
                </div>

                {/* Sign Up Link */}
                <div className="text-center pt-3">
                  <p className="text-sm" style={{ color: '#999999' }}>
                    Don't have an account? <Link
  to="/register"
  className="font-semibold hover:underline transition-colors"
  style={{ color: '#BB8C4B' }}
>
  Sign Up
</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}