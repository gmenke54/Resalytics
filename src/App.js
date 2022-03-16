/*global chrome*/
import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import keywords from './keywords-object.json';

function App() {
  const [finalWords, setFinalWords] = useState(null);
  const handleFileUpload = async (e) => {
    let job = '';
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: () => {
        const desc = window.getSelection().toString();
        console.log(desc);
        chrome.runtime.sendMessage({ description: desc });
      }
    });
    chrome.runtime.onMessage.addListener(function (request) {
      job = request.description;
      console.log(job);
      console.log(keywords);
      const data = {};
      for (const property in keywords) {
        let regex = new RegExp(`${property}`, 'i');
        console.log(property);
        console.log(regex.source);
        let match = job.match(regex);
        console.log(match);
        if (match) {
          console.log('match found:', property);
          data[property] = keywords[property];
        }
      }
      console.log(data);
      setFinalWords(data);
    });
    const formData = new FormData();
    console.log(e);
    const file = e.target.files[0];
    formData.append('file', file);
    formData.append('keywords', finalWords);
    const res = await axios.post(
      'https://resalytics.herokuapp.com/',
      formData,
      {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept:
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        }
      }
    );
    console.log(res);
    const f = new Blob([res.data], {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    });
    const a = document.createElement('a');
    document.body.appendChild(a);
    const url = window.URL.createObjectURL(f);
    a.href = url;
    a.download = 'test.docx';
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div>
      <input type="file" accept=".docx" onChange={handleFileUpload} />
    </div>
  );
}

export default App;
