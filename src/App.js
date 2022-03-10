/*global chrome*/
import './App.css';
import axios from 'axios';

function App() {
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
    let desc = '';
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: () => {
        console.log('running');
        desc = window.getSelection().toString();
        console.log(desc);
      }
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
