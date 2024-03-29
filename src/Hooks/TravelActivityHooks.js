import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const getChildCategories = (accessToken, categoryId) => {
  const [childCategories, setChildCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const options = {
    method: 'GET',
    url: `https://travogue-production.up.railway.app/travogue-service/activity-categories/${categoryId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      setChildCategories(response.data); // Assuming the response contains the child categories
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

  return { childCategories, isLoading, error, refetch };
};

const getPopularByCategory = (accessToken, categoryId) => {
  const [popularActivities, setPopularActivities] = useState([]);
  const [isPopularLoading, setIsLoading] = useState(true);
  const [popularError, setError] = useState(null);

  const options = {
    method: 'GET',
    url: `https://travogue-production.up.railway.app/travogue-service/activity-categories/${categoryId}/popular-activities`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      setPopularActivities(response.data); // Assuming the response contains the child categories
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

  return { popularActivities, isPopularLoading, popularError, refetch };
};

const getActivityByCategory = (accessToken, categoryId) => {
  const [activities, setActivities] = useState([]);
  const [isActivitiesLoading, setIsLoading] = useState(true);
  const [activitiesError, setError] = useState(null);

  const options = {
    method: 'GET',
    url: `https://travogue-production.up.railway.app/travogue-service/activity-categories/${categoryId}/travel-activities`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      pageNumber: 0,
      pageSize: 100,
      sortField: 'created_at',
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
  }, [categoryId]);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { activities, isActivitiesLoading, activitiesError, refetch };
};

const getDetailActivity = (accessToken, activityId) => {
  const [activity, setActivity] = useState([]);
  const [isActivityLoading, setIsLoading] = useState(true);
  const [activityError, setError] = useState(null);

  const options = {
    method: 'GET',
    url: `https://travogue-production.up.railway.app/travogue-service/travel-activities/${activityId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      setActivity(response.data); // Assuming the response contains the child categories
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

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { activity, isActivityLoading, activityError, refetch };
};

const getCommentsByActivity = () => {
  const [comments, setComments] = useState(null);
  const [isCommentLoading, setIsLoading] = useState(false);
  const [commentError, setError] = useState(null);

  const getComments = useCallback(async (accessToken, activityId) => {
    setIsLoading(true);

    try {
      const options = {
        method: 'GET',
        url: `https://travogue-production.up.railway.app/travogue-service/travel-activities/${activityId}/comments`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.request(options);
      setComments(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error.response.data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refetch = () => {
    setIsLoading(true);
    getComments();
  };

  return {
    getComments,
    comments,
    isCommentLoading,
    commentError,
    refetch,
  };
};

const postCommentsByActivity = () => {
  const [newComment, setComments] = useState(null);
  const [isPostCommentLoading, setIsLoading] = useState(false);
  const [postCommentError, setError] = useState(null);

  const postComments = useCallback(
    async (accessToken, activityId, rating, cmt) => {
      setIsLoading(true);

      try {
        const options = {
          method: 'POST',
          url: `https://travogue-production.up.railway.app/travogue-service/travel-activities/${activityId}/comments`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          data: {
            rating: rating,
            comment: cmt,
          },
        };
        const response = await axios.request(options);
        setComments(response.data);
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
    postComments();
  };

  return {
    postComments,
    newComment,
    isPostCommentLoading,
    postCommentError,
    refetch,
  };
};

export {
  getChildCategories,
  getPopularByCategory,
  getActivityByCategory,
  getDetailActivity,
  getCommentsByActivity,
  postCommentsByActivity,
};
