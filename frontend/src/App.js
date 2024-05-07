import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'http://localhost:3001';

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [fileList, setFileList] = useState([]);

  const fetchFiles = async () => {
    try {
      const response = await fetch(`${API_URL}/files`);
      if (response.ok) {
        const files = await response.json();
        setFileList(files);
      } else {
        console.error('Failed to fetch files');
      }
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        setMessage('File uploaded successfully');
        fetchFiles();
      } else {
        setMessage('Error uploading file');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('Error uploading file');
    }
  };

  return (
    <div className="container">
      <h1>File Upload</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      <p>{message}</p>

      <h2>Uploaded Files:</h2>
      <ul>
        {fileList.map((fileName, index) => (
          <li key={index}>{fileName}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
