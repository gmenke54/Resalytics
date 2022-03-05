import React from "react";
import {render} from "react-dom";

function Popup() {
  return (
    <div>
      <input type="file" accept=".docx" />
    </div>
  )
}

render(<Popup />, document.getElementById("react-target"));