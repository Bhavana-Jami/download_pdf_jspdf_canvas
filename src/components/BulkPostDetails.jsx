import React from "react";
import "../styles/BulkPostDetails.css"; 

const BulkPostDetails = ({ selectedPosts, bulkPosts }) => {
  return (
    <div id="bulk-pdf-content" className="bulk-container">
      {selectedPosts.length > 0 ? (
        selectedPosts.map((post) => (
          <div key={post} className="post-section">
            <ul className="post-list">
              {bulkPosts[post] ? (
                <>
                  <h3>{bulkPosts[post].title}</h3>
                  <p>{bulkPosts[post].body}</p>
                </>
              ) : (
                <p className="no-data">No details available.</p>
              )}
            </ul>
          </div>
        ))
      ) : (
        <p className="no-selection">No posts selected.</p>
      )}
    </div>
  );
};

export default BulkPostDetails;
