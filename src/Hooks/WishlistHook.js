import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const getWishlistByUser = (accessToken, userId) => {
    const [wishlist, setWishlist] = useState([]);
    const [isWishlistLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const options = {
      method: 'GET',
      url: `https://travogue-production.up.railway.app/travogue-service/wishlist?userId=${userId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
  
    const fetchData = async () => {
      setIsLoading(true);
  
      try {
        const response = await axios.request(options);
  
        setWishlist(response.data); // Assuming the response contains the child categories
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
  
    const refetchWishlistByUser = () => {
      setIsLoading(true);
      fetchData();
    };
  
    return { wishlist, isWishlistLoading, error, refetchWishlistByUser };
};

const addToWishlistHook = () => {
    const [isAddToWishlistLoading, setIsLoading] = useState(false);
    const [addWishlistError, setError] = useState(null);
  
    const addToWishlist = useCallback(
      async (accessToken, userId, activityId) => {
        setIsLoading(true);
  
        try {
          const options = {
            method: 'POST',
            url: `https://travogue-production.up.railway.app/travogue-service/wishlist`,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
                userId: userId,
                activityId: activityId
            }
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

    return {
      addToWishlist,
      isAddToWishlistLoading,
      addWishlistError,
    };
};
  
const removeFromWishlistHook = () => {
    const [isRemoveFromWishlistLoading, setIsLoading] = useState(false);
    const [removeWishlistError, setError] = useState(null);
  
    const removeFromWishlist = useCallback(
      async (accessToken, userId, activityId) => {
        setIsLoading(true);
  
        try {
          const options = {
            method: 'DELETE',
            url: `https://travogue-production.up.railway.app/travogue-service/wishlist`,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
                userId: userId,
                activityId: activityId
            }
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

    return {
        removeFromWishlist,
       isRemoveFromWishlistLoading,
       removeWishlistError,
    };
  };
  

export { getWishlistByUser, addToWishlistHook, removeFromWishlistHook };