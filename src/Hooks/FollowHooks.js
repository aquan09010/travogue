import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const getFollowers = (accessToken) => {
    const [followers, setFollowers] = useState([]);
    const [isFollowerLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const options = {
      method: 'GET',
      url: `https://travogue-production.up.railway.app/travogue-service/follow/followers`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
  
    const fetchData = async () => {
      setIsLoading(true);
  
      try {
        const response = await axios.request(options);
  
        setFollowers(response.data); // Assuming the response contains the child categories
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
  
    return { followers, isFollowerLoading, error, refetch };
};

const getFollowing = (accessToken) => {
    const [following, setFollowing] = useState([]);
    const [isFollowingLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const options = {
      method: 'GET',
      url: `https://travogue-production.up.railway.app/travogue-service/follow/following`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
  
    const fetchData = async () => {
      setIsLoading(true);
  
      try {
        const response = await axios.request(options);
  
        setFollowing(response.data); // Assuming the response contains the child categories
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
  
    return { following, isFollowingLoading, error, refetch };
};

const followUserHook = () => {
  const [isFollowUserLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const followUser = useCallback(
    async (accessToken, userId) => {
      setIsLoading(true);

      try {
        const options = {
          method: 'POST',
          url: `https://travogue-production.up.railway.app/travogue-service/follow/${userId}`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const response = await axios.request(options);
        setIsLoading(false);
      } catch (error) {
        setError(error.response.data);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const refetch = () => {
    setIsLoading(true);
    followUser();
  };

  return {
    followUser,
    isFollowUserLoading,
    error,
    refetch,
  };
};

const unFollowUserHook = () => {
  const [isUnFollowUserLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const unFollowUser = useCallback(
    async (accessToken, userId) => {
      setIsLoading(true);

      try {
        const options = {
          method: 'DELETE',
          url: `https://travogue-production.up.railway.app/travogue-service/follow/${userId}`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const response = await axios.request(options);
        setIsLoading(false);
      } catch (error) {
        setError(error.response.data);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const refetch = () => {
    setIsLoading(true);
    unFollowUser();
  };

  return {
    unFollowUser,
    isUnFollowUserLoading,
    error,
    refetch,
  };
};

export { getFollowers, getFollowing, followUserHook, unFollowUserHook };