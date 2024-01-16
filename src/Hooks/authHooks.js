import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const getOTPCode = () => {
  const [otp, setOTP] = useState(null);
  const [isOTPLoading, setLoading] = useState(false);
  const [otpError, setOTPError] = useState(null);

  const getOTP = useCallback(async (email) => {
    setLoading(true);

    try {
      const options = {
        method: 'POST',
        url: 'https://travogue-production.up.railway.app/travogue-service/auth/otp/generate',
        data: {
          email: email,
        },
      };
      const response = await axios.request(options);
      setOTP(response.data);
      setLoading(false);
    } catch (error) {
      setOTPError(error.response.data);
      console.log(error.response.data);
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = () => {
    setLoading(true);
    getOTP();
  };

  return {
    getOTP,
    otp,
    isOTPLoading,
    otpError,
    setOTP,
    refetch,
  };
};

const confirmOTPCode = () => {
  const [confirm, setConfirm] = useState(null);
  const [isConfirmLoading, setLoading] = useState(false);
  const [confirmError, setError] = useState(null);

  const confirmOTP = useCallback(async (email, otp) => {
    setLoading(true);

    try {
      const options = {
        method: 'POST',
        url: 'https://travogue-production.up.railway.app/travogue-service/auth/otp/verification',
        data: {
          email: email,
          otp: otp,
        },
      };
      const response = await axios.request(options);
      setConfirm(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.response.data);
      console.log(error.response.data);
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = () => {
    setLoading(true);
    confirmOTP();
  };

  return {
    confirmOTP,
    confirm,
    isConfirmLoading,
    confirmError,
    setError,
    refetch,
  };
};

const registerHook = () => {
  const [reg, setRegister] = useState(null);
  const [isRegisterLoading, setLoading] = useState(false);
  const [registerError, setError] = useState(null);

  const register = useCallback(async (token, email, password) => {
    setLoading(true);

    try {
      const options = {
        method: 'POST',
        url: `https://travogue-production.up.railway.app/travogue-service/auth/register?token=${token}`,
        data: {
          email: email,
          password: password,
        },
      };
      const response = await axios.request(options);
      setRegister(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.response.data);
      console.log(error.response.data);
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = () => {
    setLoading(true);
    register();
  };

  return {
    register,
    reg,
    isRegisterLoading,
    registerError,
    refetch,
  };
};

const login = () => {
  const [loginResponse, setLoginResponse] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const loginAPI = useCallback(async (email, password) => {
    setIsLoginLoading(true);

    try {
      const options = {
        method: 'POST',
        url: 'https://travogue-production.up.railway.app/travogue-service/auth/login',
        data: {
          email: email,
          password: password,
        },
      };
      const response = await axios.request(options);
      setLoginResponse(response.data);
      setIsLoginLoading(false);
    } catch (error) {
      setLoginError(error);
      console.log(error);
    } finally {
      setIsLoginLoading(false);
    }
  }, []);

  const refetch = () => {
    setIsLoginLoading(true);
    loginAPI();
  };

  return {
    loginAPI,
    loginResponse,
    isLoginLoading,
    loginError,
    refetch,
  };
};

export { getOTPCode, confirmOTPCode, registerHook, login };
