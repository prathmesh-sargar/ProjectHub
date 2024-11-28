import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAuth,createUserWithEmailAndPassword } from 'firebase/auth';
import app from '../firebase/firebase';
import swal from 'sweetalert'
import { useContext } from 'react';
import { Appstate } from '../App';
import {useNavigate} from 'react-router-dom'
import { usersRef } from '../firebase/firebase';
import { addDoc } from 'firebase/firestore';

const auth = getAuth(app);

const Signup = () => {

     const navigate = useNavigate();
    const useAppstate = useContext(Appstate);
    const[name,setName]= useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[loading,setLoading]= useState(false);
    const signupUser = ()=>{

        try { 

          if(name !=="" && email !=="" && password !=="")
          {
            createUserWithEmailAndPassword(auth,email,password)
            .then(()=>{
                swal({
                    title:"successfully SignUp ",
                    icon: "success",
                    buttons: false,
                    timer: 3000
                  })
                  navigate("/login");
                
            })
            .catch((error)=>{
                swal({
                    title:error.message,
                    icon:"error",
                    buttons: false,
                    timer: 3000
                  })
                  // useAppstate.setUserName(name); // Here I am pass the value of username what is issued 
                  navigate("/login");
                
            });
          }
          else
          {
            swal({
              title:`Complete fill the data `,
              icon: "info",
              buttons: false,
              timer: 3000
            })
          }
           
        } catch (error) {
            swal({
                title:` Something wrong..${error}`,
                icon: "error",
                buttons: false,
                timer: 3000
              })
             
        }
    }
    const addName = async()=>{
    try{
      setLoading(true);
      await addDoc(usersRef ,
      {
        name: name,
        email : email
      } )
     .then(()=>{
         // here save the name & email in firebase ok 
     } )
     .catch((error)=>{
       alert(`some thing wrong ${error}`);
     })
      setLoading(false);
  } catch(error)
  {
     
  } 
  }
  return (
    <>
         <section>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">Sign up</h2>
            <p className="mt-2 text-base text-white">
              Already have an account?{' '}
             <Link to={"/login"} className='text-blue-400 2xl' >Login</Link>
            </p>
            <form  className="mt-8">
              <div className="space-y-5">
                <div>
                  <label  className="text-base font-medium text-white">
                    {' '}
                    Full Name{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      value={name}
                      onChange={(e)=>{setName(e.target.value)}}
                      placeholder="Full Name"
                      id="name"
                    ></input>
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="text-base font-medium text-white">
                    {' '}
                    Email address{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      value={email}
                      onChange={(e)=>{setEmail(e.target.value)}}
                      placeholder="Email"
                      id="email"
                    ></input>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label  className="text-base font-medium text-white">
                      {' '}
                      Password{' '}
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e)=>{setPassword(e.target.value)}}
                      id="password"
                    ></input>
                  </div>
                </div>
                <div  
                 onClick ={addName}
                 >
                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center rounded-md bg-white px-3.5 py-2.5 font-semibold leading-7 text-black hover:bg-gray-200 "
                    onClick={signupUser}

                  >
                    Create Account 
                  </button>
                </div>
              </div>
            </form>
            <div className="mt-3 space-y-3">
              <button
                type="button"
                className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
              >
                <span className="mr-2 inline-block">
                  <svg
                    className="h-6 w-6 text-rose-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                  </svg>
                </span>
                Sign up with Google
              </button>
            
            </div>
          </div>
        </div>
        <div className="h-full w-full">
          <img
            className="mx-auto h-full w-full rounded-md object-cover"
            src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
            alt=""
          />
        </div>
      </div>
    </section>
    </>
  )
}

export default Signup