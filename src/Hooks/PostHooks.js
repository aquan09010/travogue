import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Platform } from 'react-native';

const getPostsByUser = (accessToken, userId) => {
    const [posts, setPosts] = useState([]);
    const [isPostsLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const options = {
      method: 'GET',
      url: `https://travogue-production.up.railway.app/travogue-service/posts?userId=${userId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
  
    const fetchData = async () => {
      setIsLoading(true);
  
      try {
        const response = await axios.request(options);
  
        setPosts(response.data); // Assuming the response contains the child categories
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
  
    const refetchPostsByUser = () => {
      setIsLoading(true);
      fetchData();
    };
  
    return { posts, isPostsLoading, error, refetchPostsByUser };
};

const postLikeHook = () => {
  const [isLikeLoading, setIsLoading] = useState(false);
  const [likeError, setError] = useState(null);

  const postLike = useCallback(
    async (accessToken, postId) => {
      setIsLoading(true);

      try {
        const options = {
          method: 'POST',
          url: `https://travogue-production.up.railway.app/travogue-service/posts/${postId}/likes`,
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

  const refetch = () => {
    setIsLoading(true);
    postComments();
  };

  return {
    postLike,
    isLikeLoading,
    likeError,
    refetch,
  };
};

const deleteLikeHook = () => {
  const [isDeleteLikeLoading, setIsLoading] = useState(false);
  const [deletelikeError, setError] = useState(null);

  const deleteLike = useCallback(
    async (accessToken, postId) => {
      setIsLoading(true);

      try {
        const options = {
          method: 'DELETE',
          url: `https://travogue-production.up.railway.app/travogue-service/posts/${postId}/likes`,
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

  const refetch = () => {
    setIsLoading(true);
    postComments();
  };

  return {
    deleteLike,
    isDeleteLikeLoading,
    deletelikeError,
    refetch,
  };
};

const getCommentsByPost = () => {
  const [comments, setComments] = useState(null);
  const [isCommentLoading, setIsLoading] = useState(false);
  const [commentError, setError] = useState(null);

  const getComments = useCallback(async (accessToken, postId) => {
    setIsLoading(true);

    try {
      const options = {
        method: 'GET',
        url: `https://travogue-production.up.railway.app/travogue-service/posts/${postId}/comments`,
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

const getLikesListByPost = () => {
  const [likeList, setLikeList] = useState(null);
  const [isLikeListLoading, setIsLoading] = useState(false);
  const [likeListError, setError] = useState(null);

  const getLikeListByPost = useCallback(async (accessToken, postId) => {
    setIsLoading(true);

    try {
      const options = {
        method: 'GET',
        url: `https://travogue-production.up.railway.app/travogue-service/posts/${postId}/likes`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.request(options);
      setLikeList(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error.response.data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refetch = () => {
    setIsLoading(true);
    getLikeListByPost();
  };

  return {
    getLikeListByPost,
    likeList,
    isLikeListLoading,
    likeListError,
    refetch,
  };
};

const postCommentsByPost = () => {
  const [newComment, setNewComments] = useState(null);
  const [isPostCommentLoading, setIsLoading] = useState(false);
  const [postCommentError, setError] = useState(null);

  const postComments = useCallback(
    async (accessToken, postId, cmt) => {
      setIsLoading(true);

      try {
        const options = {
          method: 'POST',
          url: `https://travogue-production.up.railway.app/travogue-service/posts/${postId}/comments`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          data: {
            comment: cmt,
          },
        };
        const response = await axios.request(options);
        setNewComments(response.data);
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

const getFeed = (accessToken) => {
  const [feed, setFeed] = useState([]);
  const [isFeedLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const options = {
    method: 'GET',
    url: `https://travogue-production.up.railway.app/travogue-service/posts/feeds?pageNumber=0&pageSize=100`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      setFeed(response.data); // Assuming the response contains the child categories
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

  const refetchFeed = () => {
    setIsLoading(true);
    fetchData();
  };

  return { feed, isFeedLoading, error, refetchFeed };
};

const createPostHook = () => {
  const [newPost, setNewPost] = useState(null);
  const [isCreatePostLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createPost = useCallback(
    async (accessToken, travelActivityId, caption, usersTagged) => {
      setIsLoading(true);

      try {
        const options = {
          method: 'POST',
          url: `https://travogue-production.up.railway.app/travogue-service/posts`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            travelActivityId: travelActivityId
          },
          data: {
            caption: caption,
            usersTagged: usersTagged
          }
        };
        const response = await axios.request(options);
        setNewPost(response.data)
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
    createPost();
  };

  return { createPost, newPost, isCreatePostLoading, error, refetch };
};

const addImageToPost = () => {
  const [post, setPost] = useState(null);
  const [isAddImageLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addImage = useCallback(
    async (accessToken, postId, photoUri) => {
      setIsLoading(true);

      const formData = new FormData();

      formData.append("image", {
        name: "image.jpg",
        type: "image/jpeg",
        uri: Platform.OS === "ios" ? photoUri.replace("file://", "") : photoUri,
      });

      try {
        const response = await fetch(
          `https://travogue-production.up.railway.app/travogue-service/posts/${postId}/images`,
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
        setPost(responseJson)
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

  return { addImage, post, isAddImageLoading, error, refetch };
};

  
export { getPostsByUser, postLikeHook, deleteLikeHook, getCommentsByPost, postCommentsByPost, getLikesListByPost, getFeed, createPostHook, addImageToPost};