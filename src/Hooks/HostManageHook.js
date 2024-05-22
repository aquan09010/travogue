import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const createExperienceHook = () => {
    const [newExperience, setNewExperience] = useState(null);
    const [isCreateExperienceLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const createExperience = useCallback(
      async (accessToken, categoryId, cityId, body) => {
        setIsLoading(true);
  
        try {
          const options = {
            method: 'POST',
            url: `https://travogue-production.up.railway.app/travogue-service/travel-activities/experiences`,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
                categoryId: categoryId,
                cityId: cityId
            },
            data: body
          };
          const response = await axios.request(options);
          setNewExperience(response.data)
          setIsLoading(false);
          return response.data
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
      createExperience();
    };
  
    return { createPost, newExperience, isCreateExperienceLoading, error, refetch };
};

const getInsurances = (accessToken) => {
  const [insurances, setInsurances] = useState([]);
  const [isGetInsurancesLoading, setIsLoading] = useState(true);
  const [getInsurancesError, setError] = useState(null);

  const options = {
    method: 'GET',
    url: `https://travogue-production.up.railway.app/travogue-service/insurances`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      setInsurances(response.data); // Assuming the response contains the child categories
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

  const refetchGetInsurances = () => {
    setIsLoading(true);
    fetchData();
  };

  return { insurances, isGetInsurancesLoading, getInsurancesError, refetchGetInsurances };
};


  
export { createExperienceHook, getInsurances };
  