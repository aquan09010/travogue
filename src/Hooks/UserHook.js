import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Platform } from 'react-native';

const getUserProfile = (accessToken, userId) => {
    const [userProfile, setUser] = useState([]);
    const [isUserLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const options = {
      method: 'GET',
      url: `https://travogue-production.up.railway.app/travogue-service/users/${userId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
  
    const fetchData = async () => {
      setIsLoading(true);
  
      try {
        const response = await axios.request(options);
  
        setUser(response.data.data); // Assuming the response contains the child categories
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
  
    const refetchUserProfile = () => {
      setIsLoading(true);
      fetchData();
    };
  
    return { userProfile, isUserLoading, error, refetchUserProfile };
};

const getHostInfo = (accessToken, hostId) => {
  const [host, setHost] = useState();
  const [isHostLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const options = {
    method: 'GET',
    url: `https://travogue-production.up.railway.app/travogue-service/hosts/${hostId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      setHost(response.data.data); // Assuming the response contains the child categories
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

  const refetchHostInfo = () => {
    setIsLoading(true);
    fetchData();
  };

  return { host, isHostLoading, error, refetchHostInfo };
};

const updateAvatarHook = () => {
  const [userProfile, setUser] = useState(null);
  const [isUpdateAvatarLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateAvatar = useCallback(
    async (accessToken, userId, photoUri) => {
      setIsLoading(true);

      const formData = new FormData();

      formData.append("image", {
        name: "image.jpg",
        type: "image/jpeg",
        uri: Platform.OS === "ios" ? photoUri.replace("file://", "") : photoUri,
      });

      try {
        const response = await fetch(
          `https://travogue-production.up.railway.app/travogue-service/users/${userId}/avatars`,
          {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            }, // Assuming imageFile is a File object or similar
          }
        );
        let responseJson = await response.json();
        console.log("POST IMAGE: ". responseJson);
        setUser(responseJson)
        setIsLoading(false);
        return responseJson;
      } catch (error) {
        setError(error.response.data);
        console.log("POST IMAGE ERROR: ", error)
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const refetch = () => {
    setIsLoading(true);
    updateAvatar();
  };

  return { updateAvatar, userProfile, isUpdateAvatarLoading, error, refetch };
};

const searchUsersHook = () => {
  const [users, setUsers] = useState(null);
  const [isSearchUsersLoading, setIsLoading] = useState(false);
  const [searchUsersError, setError] = useState(null);

  const searchUsers = useCallback(
    async (accessToken, keyword) => {
      setIsLoading(true);

      try {
        const options = {
          method: 'GET',
          url: `https://travogue-production.up.railway.app/travogue-service/users?keyword=${keyword}&pageNumber=0&pageSize=20&sortField=first_name`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const response = await axios.request(options);
        setUsers(response.data);
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
    searchUsers();
  };

  return {
     searchUsers,
    users,
    isSearchUsersLoading,
    searchUsersError,
    refetch,
  };
};




export { getUserProfile, getHostInfo, updateAvatarHook, searchUsersHook };