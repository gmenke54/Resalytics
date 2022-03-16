/*global chrome*/
import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import keywords from './keywords-object.json';

function App() {
  const [desc, setDesc] = useState(null);
  const handleFileUpload = async (e) => {
    const formData = new FormData();
    const file = this.files[0];
    const keywords = { react: ['react.js', 'reactjs'] };
    formData.append('file', file);
    formData.append('keywords', keywords);
    const res = await axios.post(
      'https://resalytics.herokuapp.com/',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    console.log(res);
  };

  const filter = async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: () => {
        const desc = window.getSelection().toString();
        console.log(desc);
        chrome.runtime.sendMessage({ description: desc });
      }
    });
    console.log(keywords);
    chrome.runtime.onMessage.addListener(function (request, sender) {
      console.log(request.description);
    });
  };

  return (
    <div>
      <input type="file" accept=".docx" onChange={handleFileUpload} />
      <button onClick={filter}>Save Job Description</button>
    </div>
  );
}

export default App;
