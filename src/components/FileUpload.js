

// import React, { useState } from 'react';
import React, {  useRef,useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

const FileUpload = () => {
  const summaryRef = useRef(null);



  const token = localStorage.getItem("token");
  const navigate = useNavigate();

   useEffect(() => {
      if (!token) navigate("/login");
    }, [token, navigate]);
  
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('document', file);
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/summarizes', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setSummary(data.summary || 'Summarization failed.');
    } catch (error) {
      console.error('Error:', error);
      setSummary('An error occurred during summarization.');
    }
    setLoading(false);
  };

  return (
   




























































<>
<div className="container vh-10  d-flex flex-column justify-content-center align-items-center mt-5">
  {/* File Upload Section */}
  <div className="row w-100 mb-5 ">
    <div className="col-lg-6 mx-auto">
      <div
        className="card p-4 rounded-4 shadow-lg text-white w-100"
        style={{
          background: "rgba(255, 255, 255, 0.15)",
          // backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
<div 
  className="p-3 rounded text-center mx-auto" 
  style={{ 
    background: "rgba(0, 0, 0, 0.6)", 
    display: "inline-block", 
    maxWidth: "90%", // Prevents overflow
    padding: "1.2rem", // Adds consistent spacing
  }}
>
  <h2 
    className="fw-bold text-uppercase text-light"
    style={{
      fontSize: "clamp(1.2rem, 2vw, 2rem)", // Adjusts font size based on screen width
      marginBottom: "0.5rem"
    }}
  >
    📄 Upload Document  
  </h2>
  <span 
    className="text-lowercase text-warning"
    style={{
      fontSize: "clamp(0.9rem, 1.5vw, 1.2rem)", // Responsive font for smaller screens
      fontWeight: "bold"
    }}
  >
    provide a txt file or csv file
  </span>
</div>




        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="document" className="form-label fw-bold fs-5">Select File</label>
            <input
              type="file"
              className="form-control bg-dark text-white border-light"
              id="document"
              // accept=".txt,.csv"
              accept=".txt,.csv,.pdf,.docx,.pptx,.xlsx"

              onChange={handleFileChange}
            />
          </div>

          {/* Show selected file */}
          {file && (
            <div className="alert alert-light py-2 text-dark rounded-3">
              📂 <strong>Selected:</strong> {file.name}
            </div>
          )}

          {/* Submit Button */}
          <button type="submit" className="btn btn-light w-100 fw-bold fs-5">
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span> Summarizing...
              </>
            ) : (
              "Summarize Document"
            )}
          </button>
        </form>
      </div>
    </div>
  </div>
</div>

{/* Summary Section */}
<div className="row w-1200 mt-0">
  <div className="col-lg-10 mx-auto">
    {summary && (
      <div
        ref={summaryRef}
        className="card p-5 rounded-4 shadow-lg text-white w-100"
        style={{
          background: "rgba(30, 30, 30, 0.85)",
          // backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          minHeight: "350px",
          marginBottom: "80px",
        }}
      >
        <h3 className="text-warning fw-bold text-center">📌 Summary</h3>
      
<p
  className="p-4 rounded"
  style={{
    maxHeight: "400px",
    overflowY: "auto",
    fontSize: "clamp(14px, 1.2vw, 1.3rem)", 
    lineHeight: "1.9", // Slightly increased for better readability
    fontFamily: "Georgia, serif",
    whiteSpace: "pre-line",
    wordWrap: "break-word",
    textAlign: "justify",
    color: "#f8f9fa",
    padding: "20px", // Adds clean spacing
    letterSpacing: "0.5px", // Slightly improves character spacing
    wordSpacing: "1px", // Improves word separation
    borderRadius: "10px", // Slightly rounded edges for aesthetics
  }}
>
  {summary}
</p>


      </div>
    )}
  </div>
</div>
</>






  );
};

export default FileUpload;
