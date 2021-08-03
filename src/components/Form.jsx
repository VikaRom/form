import React from 'react'
import { useState } from 'react'
import { uploadFile } from '../helpers'


export const Form = ({ setList }) => {
    const [email, setEmail] = useState('')
    const [emailErr, setEmailErr] = useState('Это поле не может быть пустым')
    const [emailDirty, setEmailDirty] = useState(false)
    const [phone, setPhone] = useState('')
    const [phoneErr, setPhoneErr] = useState('Это поле не может быть пустым')
    const [phoneDirty, setPhoneDirty] = useState(false)
    const [name, setName] = useState('')
    const [nameDirty, setNameDirty] = useState(false)
    const [nameErr, setNameErr] = useState('Это поле не может быть пустым')


    let file = '';
    const handleChangeFile = async e => {
        const fileUrl = await uploadFile(e.target.files[0])
        console.log(fileUrl)
        file = fileUrl
    }
    const checkEmail = (e) => {
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailErr('Не корректный email')
        } else {
            setEmailErr('')
        }
    }
    const checkPhone = (e) => {
        setPhone(e.target.value)

        const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

        if (!re.test(String(e.target.value))) {
            setPhoneErr('Не корректный номер телефона')
        }
        else {
            setPhoneErr('')
        }
    }
    const checkName = (e) => {
        setName(e.target.value)
        if (e.target.value.length < 3 || e.target.value.length > 20) {
            setNameErr('Не корректные данные')
        }
        else {
            setNameErr('')
        }
    }

    const blurHandler = e => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true)
                break
            case 'phone':
                setPhoneDirty(true)
                break
            case 'name':
                setNameDirty(true)
                break
        }

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
            .then(res => res)
            .then(reciep => setList(list => [...list, reciep]))
            .catch(err => {
                console.log('error Reading data' + err)
            })

    }

    return (
        <>
            <h1>Расскажите о своем проекте </h1>
            <form action="" className="form" onSubmit={handleSubmit}>
                {(nameDirty && nameErr) && <div style={{ color: 'red' }}>{nameErr}</div>}
                <input onChange={e => checkName(e)}
                    onBlur={e => blurHandler(e)}
                    type="text"
                    placeholder="Ваше имя"
                    name="name"
                    className="inputForText"
                    value={name} />
                {(emailDirty && emailErr) && <div style={{ color: 'red' }}>{emailErr}</div>}
                <input onChange={e => checkEmail(e)}
                    onBlur={e => blurHandler(e)}
                    type="text"
                    placeholder="E-mail"
                    name="email"
                    className="inputForText"
                    value={email} />
                {(phoneDirty && phoneErr) && <div style={{ color: 'red' }}>{phoneErr}</div>}
                <input onChange={e => checkPhone(e)}
                    onBlur={e => blurHandler(e)}
                    type="text"
                    placeholder="Номер телефона"
                    name="phone"
                    className="inputForText"
                    value={phone}
                />
                <input type="text" placeholder="Детали проекта" name="detals" className="inputForText" />
                <input type="file" placeholder="Прикрепить файл" name="file" onChange={handleChangeFile} className="input" />
                <button type="submit" className="submit-btn">Отправить</button>
            </form>
        </>

    )

}




