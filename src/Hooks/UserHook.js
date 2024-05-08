import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const getUserProfile = (accessToken, userId) => {
    const [userProfile, setUser] = useState([]);
    const [isUserLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const options = {
      method: 'GET',
      url: `https://travogue-production.up.railway.app/travogue-service/users/${userId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
  
    const fetchData = async () => {
      setIsLoading(true);
  
      try {
        const response = await axios.request(options);
  
        setUser(response.data.data); // Assuming the response contains the child categories
        setIsLoading(false);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []); // No dependencies for initial fetch
  
    const refetchUserProfile = () => {
      setIsLoading(true);
      fetchData();
    };
  
    return { userProfile, isUserLoading, error, refetchUserProfile };
};

const getHostInfo = (accessToken, hostId) => {
  const [host, setHost] = useState();
  const [isHostLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const options = {
    method: 'GET',
    url: `https://travogue-production.up.railway.app/travogue-service/hosts/${hostId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      setHost(response.data.data); // Assuming the response contains the child categories
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // No dependencies for initial fetch

  const refetchHostInfo = () => {
    setIsLoading(true);
    fetchData();
  };

  return { host, isHostLoading, error, refetchHostInfo };
};



export {getUserProfile, getHostInfo}