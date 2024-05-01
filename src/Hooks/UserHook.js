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
  
    const refetch = () => {
      setIsLoading(true);
      fetchData();
    };
  
    return { userProfile, isUserLoading, error, refetch };
};

export {getUserProfile}