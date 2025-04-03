import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
} from 'shared/constants/ActionTypes';
import jwtAxios, { setAuthToken } from './index';
import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

const JWTAuthContext = createContext();
const JWTAuthActionsContext = createContext();

export const useJWTAuth = () => useContext(JWTAuthContext);

export const useJWTAuthActions = () => useContext(JWTAuthActionsContext);

const JWTAuthAuthProvider = ({ children }) => {
  // const navigate = useNavigate();

  const [firebaseData, setJWTAuthData] = useState({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const getAuthUser = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setJWTAuthData({
          user: undefined,
          isLoading: false,
          isAuthenticated: false,
        });
        return;
      }
      setAuthToken(token);
      getUserProfile();
    };

    getAuthUser();
  }, []);

  const signInUser = async ({ email, password }) => {
    dispatch({ type: FETCH_START });
    try {
      const result = await jwtAxios.post('/DataloadingController/login', { userId: email, password: password, role: "ADMIN" });
      console.log("hello", result.data.status_code)
      if (result.data.status_code == "200") {
        console.log("newwdata")
        dispatch({ type: FETCH_SUCCESS });
        setAuthToken("eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMjM0NTYiLCJVU0VSX0lEIjoiMTIzNDU2IiwiVVNFUl9OQU1FIjoiU2Fu");
        getUserProfile();
      } else {
        console.log("errrrr")
      }

    } catch (error) {
      toast.error('INVALID CREDENTIALS', { autoClose: 2000 });
      setJWTAuthData({
        ...firebaseData,
        isAuthenticated: false,
        isLoading: false,
      });
      dispatch({
        type: FETCH_ERROR,
        payload: error?.response?.data?.error || 'INVALID CREDENTIALS',
      });
    }
  };

  const getUserProfile = async () => {
    // const userResult = await jwtAxios.post('userauth/authenticate/getLoggedInUserProfile', {});
    const userResult = [{
      name: "admin",
      mob: "4656748645"
    }]
    if (userResult) {
      setJWTAuthData({
        user: userResult[0],
        isAuthenticated: true,
        isLoading: false,
      });
      sessionStorage.setItem("userData", JSON.stringify(userResult[0]));
    } else {
      setJWTAuthData({
        user: undefined,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }


  const signUpUser = async ({ name, email, password }) => {
    dispatch({ type: FETCH_START });
    try {
      const { data } = await jwtAxios.post('users', { name, email, password });
      localStorage.setItem('token', data.token);
      setAuthToken(data.token);
      const res = await jwtAxios.get('/auth');
      setJWTAuthData({
        user: res.data,
        isAuthenticated: true,
        isLoading: false,
      });
      dispatch({ type: FETCH_SUCCESS });
    } catch (error) {
      setJWTAuthData({
        ...firebaseData,
        isAuthenticated: false,
        isLoading: false,
      });
      console.log('error:', error.response.data.error);
      dispatch({
        type: FETCH_ERROR,
        payload: error?.response?.data?.error || 'Something went wrong',
      });
    }
  };

  const logout = async () => {
    localStorage.removeItem('token');
    setAuthToken();
    setJWTAuthData({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  return (
    <JWTAuthContext.Provider
      value={{
        ...firebaseData,
      }}
    >
      <JWTAuthActionsContext.Provider
        value={{
          signUpUser,
          signInUser,
          logout,
        }}
      >
        {children}
      </JWTAuthActionsContext.Provider>
    </JWTAuthContext.Provider>
  );
};
export default JWTAuthAuthProvider;

JWTAuthAuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
