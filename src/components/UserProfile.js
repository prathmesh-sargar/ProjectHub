import React from 'react'
import { useContext } from 'react'
import { Appstate } from '../App'

function UserProfile() {

  const userAppState = useContext(Appstate);
  console.log(userAppState.userName);

  return (
    <>
     <h1>User name is :{userAppState.userName}</h1>
     <h1>user login : {userAppState.login}</h1>

    </>
  )
}
export default UserProfile