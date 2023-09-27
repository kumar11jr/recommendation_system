import React, { useState } from 'react';
import axios from 'axios';
function App() {
  const [formData, setFormData] = useState("");

  const formD = new FormData()
  formD.append('data',formData)

  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios.post('http://127.0.0.1:8000/', formD)
      .then((resp) => {
        console.log(resp);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="fieldName1"
        value={formData}
        onChange={(e)=>setFormData(e.target.value)}
      />
      
      {/* Add more form fields here */}
      <button type="submit">Submit</button>
    </form>
  );
}

export default App;

9