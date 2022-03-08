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

  return (
    <div>
      <input type="file" accept=".docx" onChange={handleFileUpload} />
    </div>
  );
}

render(<Popup />, document.getElementById('react-target'));
