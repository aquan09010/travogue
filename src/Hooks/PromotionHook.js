import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const checkDiscountCodeHook = () => {
    const [discount, setDiscount] = useState(null);
    const [isCheckDiscountLoading, setIsLoading] = useState(false);
    const [checkDiscountError, setError] = useState(null);
  
    const checkDiscount = useCallback(
      async (accessToken, activityId, discountCode) => {
            setIsLoading(true);
            setError(null);
  
        try {
          const options = {
            method: 'POST',
            url: `https://travogue-production.up.railway.app/travogue-service/promotions/validation`,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
                activityId: activityId,
                discountCode: discountCode
            },
          };
          const response = await axios.request(options);
          setDiscount(parseInt(response.data.data));
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
      checkDiscount();
    };
  
    return {
      checkDiscount,
      discount,
        isCheckDiscountLoading,
      checkDiscountError,
      refetch,
    };
};

export { checkDiscountCodeHook };
  