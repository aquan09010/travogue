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
    url: `https://travogue-production.up.railway.app/travogue-service/cities/search?keyword=${keyword}&pageNumber=0&pageSize=100&sortField=name`,
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

const getActivityByCategoryInACity = (accessToken, cityId, categoryId, filter, keyword) => {
  const [activities, setActivities] = useState([]);
  const [isActivitiesLoading, setIsLoading] = useState(true);
  const [activitiesError, setError] = useState(null);

  const options = {
    method: 'GET',
    url: `https://travogue-production.up.railway.app/travogue-service/cities/${cityId}/travel-activities`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      mainCategoryId: categoryId,
      filter: filter,
      pageNumber: 0,
      pageSize: 100,
      keyword: keyword,
      sortField: 'average_rating',
    },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      setActivities(response.data); // Assuming the response contains the child categories
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
  }, [categoryId, filter]);

  const refetchActivityByCategory = () => {
    setIsLoading(true);
    fetchData();
  };

  return { activities, isActivitiesLoading, activitiesError, refetchActivityByCategory };
};



export { getTopCities, searchCities, getActivityByCategoryInACity };
