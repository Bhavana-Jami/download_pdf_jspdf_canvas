import { useState, useEffect } from 'react';

const useFetchPosts = (postNumber) => {
  console.log('postNumber: ', postNumber);
  const [postData, setPostData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!postNumber) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postNumber}`);
        if (!response.ok) throw new Error('Failed to fetch');
        
        const data = await response.json();
        
        setPostData(data);
      } catch (error) {
        console.error('Error fetching post data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [postNumber]);

  return { postData, loading };
};

export default useFetchPosts;
