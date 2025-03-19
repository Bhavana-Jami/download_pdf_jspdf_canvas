import React from 'react';
import '../styles/PostDetails.css';

const PostDetails = React.forwardRef(({ post }, ref) => (
  <div ref={ref} className="post-details">
    <h2>{post.title}</h2>
    <p className="post-content">{post.content}</p>
    <p className="post-author">By: {post.author}</p>
  </div>
));

export default PostDetails;
