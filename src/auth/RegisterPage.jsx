import React, { useState } from 'react';
import { User, Mail, Lock, Phone, Check } from 'lucide-react';
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Required';
    if (!formData.email.trim()) newErrors.email = 'Required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Required';
    if (!formData.role) newErrors.role = 'Required';
    if (!formData.password) newErrors.password = 'Required';
    else if (formData.password.length < 8) newErrors.password = 'Min 8';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Required';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'No match';
    if (!agreedToTerms) newErrors.terms = 'Required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      alert('Registration successful!');
      setFormData({
        fullName: '', email: '', phone: '', role: '', password: '', confirmPassword: ''
      });
      setAgreedToTerms(false);
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
                <p className="text-lg font-medium mb-1" style={{ color: '#FFFFFF', letterSpacing: '0.02em' }}>Join Our Premium Experience</p>
                <p className="text-sm italic" style={{ color: '#DDDDDD', opacity: 0.95 }}>It's Not Just a Haircut, It's an Experience</p>
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
                    <p className="font-bold text-sm" style={{ color: '#FFFFFF' }}>Professional Services</p>
                    <p className="text-xs" style={{ color: '#DDDDDD', opacity: 0.9 }}>Expert barbers & stylists at your service</p>
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
                    <p className="font-bold text-sm" style={{ color: '#FFFFFF' }}>Premium Packages</p>
                    <p className="text-xs" style={{ color: '#DDDDDD', opacity: 0.9 }}>Gold, Platinum & Diamond tiers</p>
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
                    <p className="font-bold text-sm" style={{ color: '#FFFFFF' }}>Luxury Experience</p>
                    <p className="text-xs" style={{ color: '#DDDDDD', opacity: 0.9 }}>Modern salon atmosphere & amenities</p>
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

          {/* Right Side - Form */}
          <div className="flex items-center justify-center p-6 lg:p-8 h-full overflow-y-auto" style={{ backgroundColor: '#222227' }}>
            <div className="w-full max-w-xl my-auto">
              {/* Mobile Header */}
              <div className="lg:hidden text-center mb-8">
                <div className="w-20 h-20 rounded-2xl mx-auto flex items-center justify-center shadow-xl mb-4" 
                     style={{ background: 'linear-gradient(135deg, #BB8C4B 0%, #d4a574 100%)' }}>
                  <span className="text-3xl font-bold" style={{ color: '#FFFFFF' }}>DT</span>
                </div>
                <h2 className="text-3xl font-bold" style={{ color: '#FFFFFF' }}>Diamond Trim Beauty Studio</h2>
              </div>

              {/* Form Header */}
              <div className="mb-6">
                <h2 className="text-2xl lg:text-3xl font-bold mb-2" style={{ color: '#FFFFFF', letterSpacing: '-0.01em' }}>Create Account</h2>
                <p className="text-sm" style={{ color: '#999999' }}>Fill in your details to get started with Diamond Trim</p>
              </div>

              {/* Form */}
              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-medium mb-1.5" htmlFor="fullName" style={{ color: '#FFFFFF' }}>
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: '#BB8C4B' }} />
                    <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none transition-all"
                      style={{ ...inputStyle(errors.fullName), color: '#FFFFFF' }} placeholder="Enter your full name"
                      onFocus={(e) => handleFocus(e, errors.fullName)} onBlur={(e) => handleBlur(e, errors.fullName)} />
                  </div>
                  {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1.5" htmlFor="email" style={{ color: '#FFFFFF' }}>
                      Email <span className="text-red-400">*</span>
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

                  <div>
                    <label className="block text-xs font-medium mb-1.5" htmlFor="phone" style={{ color: '#FFFFFF' }}>
                      Phone <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: '#BB8C4B' }} />
                      <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none transition-all"
                        style={{ ...inputStyle(errors.phone), color: '#FFFFFF' }} placeholder="03XX-XXXXXXX"
                        onFocus={(e) => handleFocus(e, errors.phone)} onBlur={(e) => handleBlur(e, errors.phone)} />
                    </div>
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>

                {/* Role */}
                <div>
                  <label className="block text-xs font-medium mb-1.5" htmlFor="role" style={{ color: '#FFFFFF' }}>
                    Role <span className="text-red-400">*</span>
                  </label>
                  <select id="role" name="role" value={formData.role} onChange={handleChange}
                    className="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none transition-all"
                    style={{ ...inputStyle(errors.role), color: '#FFFFFF' }}
                    onFocus={(e) => handleFocus(e, errors.role)} onBlur={(e) => handleBlur(e, errors.role)}>
                    <option value="" style={{ backgroundColor: '#303133' }}>Select Role</option>
                    <option value="admin" style={{ backgroundColor: '#303133' }}>Admin</option>
                    <option value="staff" style={{ backgroundColor: '#303133' }}>Staff</option>
                    <option value="customer" style={{ backgroundColor: '#303133' }}>Customer</option>
                  </select>
                  {errors.role && <p className="text-red-400 text-xs mt-1">{errors.role}</p>}
                </div>

                {/* Passwords */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1.5" htmlFor="password" style={{ color: '#FFFFFF' }}>
                      Password <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: '#BB8C4B' }} />
                      <input type={showPassword ? "text" : "password"} id="password" name="password" value={formData.password} onChange={handleChange}
                        className="w-full pl-10 pr-11 py-2.5 border rounded-xl text-sm focus:outline-none transition-all"
                        style={{ ...inputStyle(errors.password), color: '#FFFFFF' }} placeholder="Min 8 characters"
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

                  <div>
                    <label className="block text-xs font-medium mb-1.5" htmlFor="confirmPassword" style={{ color: '#FFFFFF' }}>
                      Confirm <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: '#BB8C4B' }} />
                      <input type={showConfirmPassword ? "text" : "password"} id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
                        className="w-full pl-10 pr-11 py-2.5 border rounded-xl text-sm focus:outline-none transition-all"
                        style={{ ...inputStyle(errors.confirmPassword), color: '#FFFFFF' }} placeholder="Repeat password"
                        onFocus={(e) => handleFocus(e, errors.confirmPassword)} onBlur={(e) => handleBlur(e, errors.confirmPassword)} />
                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-sm transition-colors"
                        style={{ color: '#999999' }}
                        onMouseEnter={(e) => e.target.style.color = '#BB8C4B'} onMouseLeave={(e) => e.target.style.color = '#999999'}>
                        {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
                  </div>
                </div>

                {/* Terms */}
                <div>
                  <div className="flex items-start p-3.5 rounded-xl border backdrop-blur-sm" style={{ 
                    backgroundColor: 'rgba(187, 140, 75, 0.05)',
                    borderColor: errors.terms ? '#ef4444' : 'rgba(187, 140, 75, 0.3)'
                  }}>
                    <div className="flex items-center h-5">
                      <div className="relative">
                        <input 
                          type="checkbox" 
                          id="terms" 
                          checked={agreedToTerms}
                          onChange={(e) => {
                            setAgreedToTerms(e.target.checked);
                            if (errors.terms && e.target.checked) setErrors(prev => ({ ...prev, terms: '' }));
                          }}
                          className="w-4 h-4 rounded-lg border cursor-pointer appearance-none transition-all"
                          style={{ 
                            backgroundColor: agreedToTerms ? '#BB8C4B' : '#303133',
                            borderColor: agreedToTerms ? '#BB8C4B' : '#777777'
                          }}
                        />
                        {agreedToTerms && (
                          <Check className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none" style={{ color: '#FFFFFF' }} />
                        )}
                      </div>
                    </div>
                    <label htmlFor="terms" className="ml-2.5 text-xs cursor-pointer leading-relaxed" style={{ color: '#DDDDDD' }}>
                      I agree to the <span className="font-semibold" style={{ color: '#BB8C4B' }}>Terms & Conditions</span> and <span className="font-semibold" style={{ color: '#BB8C4B' }}>Privacy Policy</span>
                    </label>
                  </div>
                  {errors.terms && <p className="text-red-400 text-xs mt-1">{errors.terms}</p>}
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
                  Create Account
                </button>

                {/* Login Link */}
                <div className="text-center pt-3">
                  <p className="text-sm" style={{ color: '#999999' }}>
                    Already have an account?
                    <Link
  to="/login"
  className="font-semibold hover:underline transition-colors"
  style={{ color: '#BB8C4B' }}
>
  Sign In
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