import React from 'react';
import { useState } from 'react';
import './App.css';
// import { uploadFile } from './helpers';
import List from './components/List';
import { Form } from './components/Form';
import { useEffect } from 'react';




// function App() {
//   const [list, setList] = useState([])


//   // useEffect(async () => {
//   //   const requestOptions = {
//   //     method: 'POST',
//   //     headers: { 'Content-Type': 'application/json' },
//   //     body: JSON.stringify({ title: 'form' })
//   //   };

//   //   fetch('http://161.97.147.182:5001/request_call', requestOptions)
//   //     .then(response => response.json())
//   //     .then(data => {
//   //       setData({
//   //         name: data.name,
//   //         email: data.email,
//   //         phone: data.phone,
//   //         detals: data.detals
//   //       })
//   //     })
//   // }, [])

//   // const emailHandler = e =>{
//   //   setData(e.target.value)
//   // }

//   return (
//     <div className="App">
//       <h1>Расскажите о своем проекте </h1>
//       <Form setList={setList} />
//     </div>
//   );
// }

// export default App;

function App() {

  const [isLoading, setIsLoading] = useState(true)

  const [list, setList] = useState([])

  const [isShowlist, setisShowlist] = useState(true)

  useEffect(() => {
    fetch('http://161.97.147.182:5001/request_call')
      .then(res => res.json())
      .then(reciepsArr => {
        setList(reciepsArr)
      })
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) return <h1>Loading...</h1>
  return (
    <div className="App">
      <button onClick={() => setisShowlist(!isShowlist)}>
        {isShowlist ? 'open form' : 'open list'}
      </button>
      <main>
        {isShowlist ? <List list={list} /> : <Form setList={setList} />}
      </main>

      {/* <Form setList={setList} /> */}
    </div>
  );
}

export default App;



