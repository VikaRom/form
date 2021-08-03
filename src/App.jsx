import React from 'react';
import { useState } from 'react';
import './App.css';
import { Form } from './components/Form';

function App() {
  const [list, setList] = useState([])

  return (
    <div className="App">
     
      <Form setList={setList} />
    </div>
  );
}

export default App;



