import React, { useState, useEffect } from 'react';

const Login = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [rememberMe, setRememberMe] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Calculate password strength for signup
    if (name === 'password' && isSignUp) {
      setPasswordStrength(calculatePasswordStrength(value));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const getPasswordStrengthText = (strength) => {
    switch (strength) {
      case 0:
      case 1: return { text: 'Very Weak', color: 'text-red-500', bg: 'bg-red-500' };
      case 2: return { text: 'Weak', color: 'text-orange-500', bg: 'bg-orange-500' };
      case 3: return { text: 'Fair', color: 'text-yellow-500', bg: 'bg-yellow-500' };
      case 4: return { text: 'Good', color: 'text-blue-500', bg: 'bg-blue-500' };
      case 5: return { text: 'Strong', color: 'text-green-500', bg: 'bg-green-500' };
      default: return { text: '', color: '', bg: '' };
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (isSignUp) {
      if (!formData.firstName) {
        newErrors.firstName = 'First name is required';
      }
      if (!formData.lastName) {
        newErrors.lastName = 'Last name is required';
      }
      if (passwordStrength < 3) {
        newErrors.password = 'Password is too weak. Please use a stronger password.';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Custom authentication using Clerk API directly
  const authenticateWithClerk = async (endpoint, data) => {
    const CLERK_API_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
    
    try {
      const response = await fetch(`https://api.clerk.dev/v1/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${CLERK_API_KEY}`,
        },
        body: JSON.stringify(data),
      });
      
      return await response.json();
    } catch (error) {
      throw new Error('Authentication failed');
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate authentication - in real app, you'd call your backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check if user exists in localStorage
      const existingUsers = JSON.parse(localStorage.getItem('pcosUsers') || '[]');
      const user = existingUsers.find(u => u.email === formData.email && u.password === formData.password);
      
      if (user) {
        const userData = {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          id: user.id
        };
        
        // Store session if remember me is checked
        if (rememberMe) {
          localStorage.setItem('pcosUserSession', JSON.stringify(userData));
        } else {
          sessionStorage.setItem('pcosUserSession', JSON.stringify(userData));
        }
        
        if (onLogin) {
          onLogin(userData);
        }
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      console.error('Sign in error:', err);
      setErrors({ general: 'Sign in failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate sign up process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store user in localStorage
      const existingUsers = JSON.parse(localStorage.getItem('pcosUsers') || '[]');
      
      // Check if user already exists
      if (existingUsers.find(u => u.email === formData.email)) {
        throw new Error('User already exists with this email');
      }
      
      const userData = {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        password: formData.password, // In real app, this would be hashed
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      
      existingUsers.push(userData);
      localStorage.setItem('pcosUsers', JSON.stringify(existingUsers));
      
      // Store session
      const sessionData = {
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        id: userData.id
      };
      
      if (rememberMe) {
        localStorage.setItem('pcosUserSession', JSON.stringify(sessionData));
      } else {
        sessionStorage.setItem('pcosUserSession', JSON.stringify(sessionData));
      }
      
      if (onLogin) {
        onLogin(sessionData);
      }
    } catch (err) {
      console.error('Sign up error:', err);
      setErrors({ general: 'Sign up failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    try {
      // Simulate verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData = {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        id: Date.now().toString()
      };
      
      if (onLogin) {
        onLogin(userData);
      }
    } catch (err) {
      console.error('Verification error:', err);
      setErrors({ general: 'Verification failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Add forgot password handler
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!resetEmail) {
      setErrors({ resetEmail: 'Email is required' });
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(resetEmail)) {
      setErrors({ resetEmail: 'Please enter a valid email' });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate password reset email
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check if user exists
      const existingUsers = JSON.parse(localStorage.getItem('pcosUsers') || '[]');
      const userExists = existingUsers.find(u => u.email === resetEmail);
      
      if (userExists) {
        alert(`Password reset link sent to ${resetEmail}. For demo purposes, you can now sign in with any password.`);
      } else {
        alert('If an account with this email exists, you will receive a password reset link.');
      }
      
      setShowForgotPassword(false);
      setResetEmail('');
      setErrors({});
    } catch (err) {
      setErrors({ resetEmail: 'Failed to send reset email. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Add useEffect to check for existing session
  useEffect(() => {
    const sessionData = localStorage.getItem('pcosUserSession') || sessionStorage.getItem('pcosUserSession');
    if (sessionData && onLogin) {
      const userData = JSON.parse(sessionData);
      onLogin(userData);
    }
  }, [onLogin]);

  const handleSubmit = isSignUp ? handleSignUp : handleSignIn;

  // If showing forgot password form
  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Reset Password</h2>
            <p className="text-gray-600">Enter your email to receive a password reset link</p>
          </div>

          <form onSubmit={handleForgotPassword} className="space-y-6">
            {errors.resetEmail && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600 text-sm">{errors.resetEmail}</p>
              </div>
            )}

            <div>
              <label htmlFor="resetEmail" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="resetEmail"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-pink-600 hover:to-purple-700 focus:ring-4 focus:ring-pink-300 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send Reset Link'
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForgotPassword(false);
                  setResetEmail('');
                  setErrors({});
                }}
                className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // If pending verification, show verification form
  if (pendingVerification) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Verify Your Email</h2>
            <p className="text-gray-600">Enter the verification code sent to {formData.email}</p>
          </div>

          <form onSubmit={handleVerification} className="space-y-6">
            {errors.general && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600 text-sm">{errors.general}</p>
              </div>
            )}

            <div>
              <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-2">
                Verification Code
              </label>
              <input
                type="text"
                id="verificationCode"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                placeholder="Enter 6-digit code"
                maxLength="6"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-pink-600 hover:to-purple-700 focus:ring-4 focus:ring-pink-300 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </>
              ) : (
                'Verify Email'
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-gray-600">
            {isSignUp ? 'Join PCOS Health community' : 'Sign in to your PCOS Health account'}
          </p>
        </div>

        {/* Error Message */}
        {errors.general && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600 text-sm">{errors.general}</p>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First Name Field (Sign Up only) */}
          {isSignUp && (
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200 ${
                  errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter your first name"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.firstName}
                </p>
              )}
            </div>
          )}

          {/* Last Name Field (Sign Up only) */}
          {isSignUp && (
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200 ${
                  errors.lastName ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter your last name"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.lastName}
                </p>
              )}
            </div>
          )}

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200 ${
                errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200 ${
                errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder={isSignUp ? "Create a strong password (8+ characters)" : "Enter your password"}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.password}
              </p>
            )}
          </div>

          {/* Password Strength Indicator (Sign Up only) */}
          {isSignUp && formData.password && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Password Strength:</span>
                <span className={`text-sm font-medium ${getPasswordStrengthText(passwordStrength).color}`}>
                  {getPasswordStrengthText(passwordStrength).text}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthText(passwordStrength).bg}`}
                  style={{ width: `${(passwordStrength / 5) * 100}%` }}
                ></div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                <p>Password should contain:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li className={formData.password.length >= 8 ? 'text-green-600' : 'text-gray-400'}>At least 8 characters</li>
                  <li className={/[a-z]/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}>Lowercase letter</li>
                  <li className={/[A-Z]/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}>Uppercase letter</li>
                  <li className={/[0-9]/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}>Number</li>
                  <li className={/[^A-Za-z0-9]/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}>Special character</li>
                </ul>
              </div>
            </div>
          )}

          {/* Remember Me & Forgot Password (Sign In only) */}
          {!isSignUp && (
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 focus:ring-2"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-pink-600 hover:text-pink-800 transition duration-200"
              >
                Forgot password?
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-pink-600 hover:to-purple-700 focus:ring-4 focus:ring-pink-300 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isSignUp ? 'Creating Account...' : 'Signing in...'}
              </>
            ) : (
              isSignUp ? 'Create Account' : 'Sign In'
            )}
          </button>
        </form>

        {/* Toggle Sign In/Sign Up */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setErrors({});
                setFormData({
                  email: '',
                  password: '',
                  firstName: '',
                  lastName: ''
                });
              }}
              className="font-medium text-pink-600 hover:text-pink-800 transition duration-200"
            >
              {isSignUp ? 'Sign in' : 'Sign up for free'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;