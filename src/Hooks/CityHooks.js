import { useState, useEffect } from 'react';
import axios from 'axios';

const getTopCities = (accessToken) => {
  const [topCities, setTopCities] = useState([]);
  const [isTopCitiesLoading, setIsLoading] = useState(true);
  const [topCitiesError, setError] = useState(null);

  const options = {
    method: 'GET',
    url: `https://travogue-production.up.railway.app/travogue-service/cities/popular`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      setTopCities(response.data); // Assuming the response contains the child categories
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

  const refetchTopCities = () => {
    setIsLoading(true);
    fetchData();
  };

  return { topCities, isTopCitiesLoading, topCitiesError, refetchTopCities };
};

const searchCities = (accessToken, keyword) => {
  const [cities, setCities] = useState([]);
  const [isCitiesLoading, setIsLoading] = useState(true);
  const [citiesError, setError] = useState(null);

  const options = {
    method: 'GET',
    url: `https://travogue-production.up.railway.app/travogue-service/cities/search?keyword=${keyword}&pageNumber=0&pageSize=10&sortField=name`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      setCities(response.data); // Assuming the response contains the child categories
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
  }, [keyword]); // No dependencies for initial fetch

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { cities, isCitiesLoading, citiesError, refetch };
};

export { getTopCities, searchCities };
