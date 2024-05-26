import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const buyTicketAPI = () => {
  const [ticket, setTicket] = useState(null);
  const [isTicketLoading, setIsLoading] = useState(false);
  const [ticketError, setError] = useState(null);

  const buyTicket = useCallback(
    async (accessToken, paymentInfoId, activityTimeFrameId, data) => {
      setIsLoading(true);

      try {
        const options = {
          method: 'POST',
          url: `https://travogue-production.up.railway.app/travogue-service/tickets`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            paymentInfoId: paymentInfoId,
            activityTimeFrameId: activityTimeFrameId
          },
          data: data,
        };
        const response = await axios.request(options);
        setTicket(response.data);
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
    buyTicket();
  };

  return {
    buyTicket,
    ticket,
    isTicketLoading,
    ticketError,
    refetch,
  };
};

const getTicketsByUser = (accessToken, userId) => {
  const [tickets, setTickets] = useState([]);
  const [isTicketsLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const options = {
    method: 'GET',
    url: `https://travogue-production.up.railway.app/travogue-service/users/${userId}/tickets`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      setTickets(response.data); // Assuming the response contains the child categories
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

  const refetchGetTicketsByUser = () => {
    setIsLoading(true);
    fetchData();
  };

  return { tickets, isTicketsLoading, error, refetchGetTicketsByUser };
};

export { buyTicketAPI, getTicketsByUser };
