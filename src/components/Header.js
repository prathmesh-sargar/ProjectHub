import React, { useContext } from 'react'
import { Button} from '@mui/material';
import { Link } from 'react-router-dom';
import ProjectHUb from './ProjectHub.png'

import {Appstate} from '../App'

const Header = () => {
  const useAppstate = useContext(Appstate);

  return (
    <div className='sticky z-10 header top-0 text-3xl flex justify-between items-center text-white font-bold p-3 border-b-2 border-gray-500'>
      < Link to={'/'}><span><img className='h-[70px] ' src={ProjectHUb} alt="project hub"/></span></Link>
      {useAppstate.login ?
        <Link to={'/addmovie'} ><h1 className='text-lg cursor-pointer flex items-center'>
                
          <Button> + <span className='text-white'>Add New</span></Button>
      </h1></Link>
      :
      
      <Link to={'/login'}><h1 className='text-lg bg-green-500 cursor-pointer flex items-center rounded-lg'>
          <Button><span className='text-white font-medium capitalize'>Login</span></Button>
      </h1></Link>
      }
    </div>
  )
}

export default Header
