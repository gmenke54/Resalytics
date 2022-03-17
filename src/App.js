/*global chrome*/
import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import keywords from './keywords-object.json';

function App() {
  const [name, setName] = useState(null);
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
    chrome.runtime.onMessage.addListener(async function (request) {
      job = request.description;
      console.log(job);
      console.log(keywords);
      const data = {};
      for (const property in keywords) {
        let regex = new RegExp(`.*(${property})`, 'img');
        console.log(property);
        console.log(regex);
        let match = job.match(regex);
        console.log(match);
        if (match) {
          console.log('match found:', property);
          data[property] = keywords[property];
        }
      }
      console.log(data);
      const formData = new FormData();
      console.log(e);
      const file = e.target.files[0];
      console.log(JSON.stringify(data));
      formData.append('file', file);
      formData.append('keywords', JSON.stringify(data));
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
      if (name) {
        a.download = `${name}.docx`;
      } else {
        a.download = 'resume.docx';
      }
      a.click();
      document.body.removeChild(a);
    });
  };

  const handleChange = (e) => {
    setName(e.target.value);
    console.log(name);
  };

  return (
    <div class="app">
      <input type="file" accept=".docx" onChange={handleFileUpload} />
      <div>1. Highlight the job description</div>
      <div>2. Upload your current resume</div>
      <div>3. Your curated resume will download automatically</div>
      <input
        type="text"
        placeholder="name your new resume"
        value={name}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
}

export default App;
