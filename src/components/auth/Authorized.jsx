import { AuthCredential, getAuth } from 'firebase/auth'
import React from 'react'
import { Login } from '../../pages/Login/Login'
import { Routing } from '../../routes'
import { auth } from '../../firebase'
import { SignUp } from '../../pages/Redister/SignUp'

export const Authorized = () => {
  return (
    <div>


   <SignUp/>
    </div>
  )
}
