import { AuthCredential, getAuth } from 'firebase/auth'
import React from 'react'
import { Login } from '../../pages/Login/Login'
import { Routing } from '../../routes'
import { auth } from '../../firebase'
import { SignUp } from '../../pages/Redister/SignUp'
import { Route, Routes } from 'react-router-dom'

export const Authorized = () => {
  return (
    <div>
    <Routes>

    <Route path='/Login' element={<Login />} />
    <Route path='/Register' element={<SignUp />} />
  
    </Routes>

    </div>
  )
}
