import { useEffect, useState } from "react";

const useFetchBulkPosts = (selectedPosts) => {
  const [bulkPosts, setBulkPosts] = useState({});

  useEffect(() => {
    const fetchBulkPosts = async () => {
      const allPosts = {};
      for (const post of selectedPosts) {
        try {
          const postNumber = post.match(/\d+/)[0]; // Extract post number
          const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postNumber}`);
          const data = await response.json();
          allPosts[post] = data;
        } catch (error) {
          console.error("Error fetching bulk post data:", error);
        }
      }
      setBulkPosts(allPosts);
    };

    if (selectedPosts.length > 0) fetchBulkPosts();
  }, [selectedPosts]);

  return bulkPosts;
};

export default useFetchBulkPosts;
