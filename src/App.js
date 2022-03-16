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
        // this logs to the windows console:
        const desc = window.getSelection().toString();
        console.log(desc);
        // this throws error "Uncaught ReferenceError: f is not defined":
        // console.log(keywords);
        chrome.runtime.sendMessage({ description: desc });
      }
    });
    // this logs to the extensions console:
    console.log(keywords);
    // this returns blank string from line 28:
    // console.log(desc);
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
