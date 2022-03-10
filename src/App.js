import './App.css';
import { readPage } from './main';
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

  return (
    <div>
      <input type="file" accept=".docx" onChange={handleFileUpload} />
      <button onClick={readPage}>Save Job Description</button>
    </div>
  );
}

export default App;
