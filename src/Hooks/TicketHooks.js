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
          url: `https://travogue-production.up.railway.app/travogue-service/tickets?paymentInfoId=${paymentInfoId}&activityTimeFrameId=${activityTimeFrameId}`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
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

export { buyTicketAPI };
