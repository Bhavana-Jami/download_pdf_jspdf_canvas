import React, { useState } from "react";
import useFetchPosts from "../custom_hooks/useFetchPosts";
import useFetchBulkPosts from "../custom_hooks/useFetchBulkPosts";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import BulkPostDetails from "./BulkPostDetails"; // Import bulk data component
import "../styles/PostList.css";

const postNumbers = Array.from({ length: 10 }, (_, i) => `Post ${i + 1}`);

function PostList() {
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [popupPost, setPopupPost] = useState(null);
  const { postData, loading } = useFetchPosts(popupPost);
  const bulkPosts = useFetchBulkPosts(selectedPosts);

  // Handle checkbox selection
  const handleCheckboxChange = (event) => {
    const post = event.target.value;
    setSelectedPosts((prev) =>
      prev.includes(post) ? prev.filter((p) => p !== post) : [...prev, post]
    );
  };

  // Handle post click (open pop-up if not checked)
  const handlePostClick = (post) => {
    if (!selectedPosts.includes(post)) {
      setPopupPost(post);
    }
  };

  // Generate PDF for a single post
  const downloadPDF = async () => {
    const content = document.getElementById("pdf-content");
    if (!content) return;

    const canvas = await html2canvas(content, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    pdf.addImage(imgData, "PNG", 10, 10, 190, (canvas.height * 190) / canvas.width);
    pdf.save(`${popupPost}_Details.pdf`);
  };

  // Generate Bulk PDF (Capture BulkPostDetails Component)
  const downloadBulkPDF = async () => {
    const content = document.getElementById("bulk-pdf-content");
    if (!content) return;

    const canvas = await html2canvas(content, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save("Selected_Posts_Details.pdf");
  };

  return (
    <div className="container">
      <div className="container-header">
        <h2>Select Post Statements</h2>

        {/* Bulk Download Button */}
        <button
          onClick={downloadBulkPDF}
          className="bulk-download-btn"
          disabled={selectedPosts.length === 0}
        >
          Download
        </button>
      </div>
      {/* Post List */}
      <ul className="post-list">
        {postNumbers.map((post, index) => (
          <li key={index} className="post-item">
            <input
              type="checkbox"
              value={post}
              onChange={handleCheckboxChange}
              checked={selectedPosts.includes(post)}
            />
            <span onClick={() => handlePostClick(post.slice(-1))} className="post-name">
              {post}
            </span>
          </li>
        ))}
      </ul>

      {/* Bulk Posts Section */}
      <BulkPostDetails selectedPosts={selectedPosts} bulkPosts={bulkPosts} />

      {/* Pop-up for Single Post View */}
      {popupPost && (
        <div className="popup">
          <div className="popup-content">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div id="pdf-content">
                {Object.keys(postData).length !== 0 ?
                  <div>
                    <h2 >{postData.title}</h2>
                    <p>{postData.body}</p>
                    <p>{postData.body}</p>
                    <p>{postData.body}</p>
                    <p>{postData.body}</p>

                  </div>
                  : <p>No details found.</p>}
              </div>
            )}
            <div className="container-footer">
              <button onClick={downloadPDF} className="download-btn">Download PDF</button>
              <button onClick={() => setPopupPost(null)} className="close-btn">Close</button>
            </div>  </div>
        </div>
      )}
    </div>
  );
}

export default PostList;
