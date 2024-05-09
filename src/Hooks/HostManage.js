import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const getActivityByHost = (accessToken, hostId) => {
    const [activities, setActivities] = useState([]);
    const [isActivitiesLoading, setIsLoading] = useState(true);
    const [activitiesError, setError] = useState(null);
  
    const options = {
      method: 'GET',
      url: `https://travogue-production.up.railway.app/travogue-service/travel-activities`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        hostId: hostId,
        pageNumber: 0,
        pageSize: 100,
        sortField: 'updatedAt',
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
    }, []);
  
    const refetchActivityByHost = () => {
      setIsLoading(true);
      fetchData();
    };
  
    return { activities, isActivitiesLoading, activitiesError, refetchActivityByHost };
};
  
export { getActivityByHost };