import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const getActiveDates = (accessToken, hostId) => {
    const [activeDates, setActiveDates] = useState([]);
    const [isGetActiveDatesLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const options = {
      method: 'GET',
      url: `https://travogue-production.up.railway.app/travogue-service/hosts/${hostId}/active-dates`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
  
    const fetchData = async () => {
      setIsLoading(true);
  
      try {
        const response = await axios.request(options);
  
        setActiveDates(response.data.data); // Assuming the response contains the child categories
        setIsLoading(false);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []); // No dependencies for initial fetch
  
    const refetchGetActiveDates = () => {
      setIsLoading(true);
      fetchData();
    };
  
    return { activeDates, isGetActiveDatesLoading, error, refetchGetActiveDates };
};

const getSchedule = (accessToken, hostId, date) => {
  const [schedule, setSchedule] = useState(null);
  const [isGetScheduleLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const options = {
    method: 'POST',
    url: `https://travogue-production.up.railway.app/travogue-service/hosts/${hostId}/schedule-in-a-date`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      date: date
    }
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      setSchedule(response.data); // Assuming the response contains the child categories
      setIsLoading(false);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [date]); // No dependencies for initial fetch

  const refetchGetSchedule = () => {
    setIsLoading(true);
    fetchData();
  };

  return {schedule, isGetScheduleLoading, error, refetchGetSchedule };
};

const getTicketsOfATimeFrame = (accessToken, activityTimeFrameId) => {
  const [tickets, setTickets] = useState([]);
  const [isGetTicketsLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const options = {
    method: 'GET',
    url: `https://travogue-production.up.railway.app/travogue-service/tickets?activityTimeFrameId=${activityTimeFrameId}&pageNumber=0&pageSize=100&sortField=createdAt`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      setTickets(response.data.data); // Assuming the response contains the child categories
      setIsLoading(false);
      console.log(response.data.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // No dependencies for initial fetch

  const refetchGetTicketsOfATimeFrame = () => {
    setIsLoading(true);
    fetchData();
  };

  return { tickets, isGetTicketsLoading, error, refetchGetTicketsOfATimeFrame };
};
  
export { getActiveDates, getSchedule, getTicketsOfATimeFrame };