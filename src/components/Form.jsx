import React from 'react'
import {uploadFile} from '../helpers'


export const Form = ({ setList }) => {
    let file = '';
    const handleChangeFile = async e => {
      const fileUrl = await uploadFile(e.target.files[0])
      console.log(fileUrl)
      file = fileUrl
    }
  
    const handleSubmit = e => {
      e.preventDefault();
      const data = {
        name: e.target.elements.name.value,
        email: e.target.elements.email.value,
        phone: e.target.elements.phone.value,
        detals: e.target.elements.detals.value,
        file: file
      }
      const dataAsJson = JSON.stringify(data);
  
      fetch('http://161.97.147.182:5001/request_call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: dataAsJson
      })
        .then(res => res.json())
        .then(reciep => setList(list => [...list, reciep]))
  
  
  
    }
  
    return (
      <>
      <h1>Расскажите о своем проекте </h1>
      <form action="" className="form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Ваше имя" name="name" />
        <input type="text" placeholder="E-mail" name="email" />
        <input type="text" placeholder="Номер телефона" name="phone" />
        <input type="text" placeholder="Детали проекта" name="detals" />
        <input type="file" placeholder="Прикрепить файл" name="file" onChange={handleChangeFile} />
        <button type="submit" >Отправить</button>
      </form>
      </>
  
    )
  
  }
  