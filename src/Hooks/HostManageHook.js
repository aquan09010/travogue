import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Platform } from 'react-native';

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
  
    return { createExperience, newExperience, isCreateExperienceLoading, error, refetch };
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

const addMainImage = () => {
  const [activity, setActivity] = useState(null);
  const [isAddImageLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addImage = useCallback(
    async (accessToken, activityId, photoUri) => {
      setIsLoading(true);

      const formData = new FormData();

      formData.append("image", {
        name: "image.jpg",
        type: "image/jpeg",
        uri: Platform.OS === "ios" ? photoUri.replace("file://", "") : photoUri,
      });

      try {
        const response = await fetch(
          `https://travogue-production.up.railway.app/travogue-service/travel-activities/${activityId}/main-image`,
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
        setActivity(responseJson)
        setIsLoading(false);
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
    addImage();
  };

  return { addImage, activity, isAddImageLoading, error, refetch };
};

const addOtherImageHook = () => {
  const [activity, setActivity] = useState(null);
  const [isAddOtherImageLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addOtherImage = useCallback(
    async (accessToken, activityId, photoUri) => {
      setIsLoading(true);

      const formData = new FormData();

      formData.append("image", {
        name: "image.jpg",
        type: "image/jpeg",
        uri: Platform.OS === "ios" ? photoUri.replace("file://", "") : photoUri,
      });

      try {
        const response = await fetch(
          `https://travogue-production.up.railway.app/travogue-service/travel-activities/${activityId}/images`,
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
        setActivity(responseJson)
        setIsLoading(false);
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
    addOtherImage();
  };

  return { addOtherImage, activity, isAddOtherImageLoading, error, refetch };
};

const deleteExperienceHook = () => {
  const [isDeleteExperienceLoading, setIsLoading] = useState(false);
  const [deleteExperienceError, setError] = useState(null);

  const deleteExperience = useCallback(
    async (accessToken, activityId) => {
      setIsLoading(true);

      try {
        const options = {
          method: 'DELETE',
          url: `https://travogue-production.up.railway.app/travogue-service/travel-activities/${activityId}`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        };
        const response = await axios.request(options);
        setIsLoading(false);
      } catch (error) {
        setError(error.response.data);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    deleteExperience,
    isDeleteExperienceLoading,
    deleteExperienceError,
  };
};

export { createExperienceHook, getInsurances, addMainImage, addOtherImageHook, deleteExperienceHook };
  