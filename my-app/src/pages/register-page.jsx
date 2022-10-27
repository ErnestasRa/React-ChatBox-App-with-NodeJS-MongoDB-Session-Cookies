import * as React from 'react'
import { get, post } from '../plugins/https'
import { useNavigate } from 'react-router-dom'
import '../App.css'

const RegisterPage = () => {
  const nameRef = React.useRef()
  const passwordRef = React.useRef()
  const colorRef = React.useRef()
  const checkRef = React.useRef()
  const navigate = useNavigate()

  async function registerUser(){
    const data = {
      email: nameRef.current.value,
      password: passwordRef.current.value,
      color: colorRef.current.value,
    }

    const res = await post('register', data)
    if(!res.error){
      navigate('/mainpage')
    }
  }

  async function isLoggedIn(){
    const res = await get('autologin')
    console.log(res)
  }

  const autoLoginCheckBox = (e) => {
    localStorage.setItem('autoLogin', e.target.checked)
  }

  React.useEffect(() => {
    const autoLogin = localStorage.getItem('autoLogin')

    if(autoLogin === true) {
      checkRef.current.checked = true
      isLoggedIn()
    }
  }, [])

  return (
    <div className='form-registration'>
        <div className='form-registration-inside'>
            <input type={'text'} ref={nameRef} placeholder={'name'}/>
            <input type={'text'} ref={passwordRef} placeholder={'password'}/>
            <input type={'color'} ref={colorRef}/>
            <div>
                <label htmlFor="checkbox">stay logged in</label>
                <input type={'checkbox'} ref={checkRef} onChange={autoLoginCheckBox} id={'checkbox'}/>
            </div>
            <button onClick={registerUser}>Login</button>
        </div>
    </div>
  )
}

export default RegisterPage