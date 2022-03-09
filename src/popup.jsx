import React from 'react';
import { render } from 'react-dom';


function Popup() {
    const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();

    fileReader.onload = function (e) {
      console.log('Finished reading file:', e.target.result);
    };

    fileReader.readAsBinaryString(file);
  };

  function saveJob () {
    console.log('running helper')
    // let [tab] = chrome.tabs.query({ active: true, currentWindow: true }).then(() => {
    //   chrome.scripting.executeScript({
    //     target: { tabId: tab.id },
    //     file: 'countCharacters.js'
    //   });
    // })
    // chrome.tabs.executeScript(null, { file: 'countCharacters.js' });
    // chrome.scripting.executeScript(null, { file: 'countCharacters.js' });
    console.log(chrome)
}
return (
<div>
  <input type="file" accept=".docx" onChange={handleFileUpload} />
  <button onClick={saveJob}>Save Job Description</button>
</div>
);
}

render(<Popup />, document.getElementById('react-target'));
