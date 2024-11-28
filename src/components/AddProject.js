import React, { useContext,  useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { addDoc } from "firebase/firestore";
import { moviesRef } from "../firebase/firebase";
import swal from 'sweetalert'
import { Appstate } from "../App";
import { useNavigate } from "react-router-dom";
import { imageDb } from "../firebase/firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Link } from "react-router-dom";

const AddProject = () => {

  const [loadingImg, setLoadingImg] = useState(false); // Separate loading state for image upload
  const [loadingVideo, setLoadingVideo] = useState(false); // Separate loading state for video upload
  const [loading, setLoading] = useState(false);
  const [img,setImg] = useState('');  
  // const [pdf,setpdf] = useState('');
  const [video,setVideo] = useState();
  
  
    // for image upload --
  const handleClick = () =>{
    
   if(img !== ""){
    setLoadingImg(true);
      const imgRef =  ref(imageDb,`files/${v4()}`)
      uploadBytes(imgRef,img).then(value=>{
          console.log(value)
          getDownloadURL(value.ref).then(url=>{ 
            setForm({ ...form, image: url });
            setLoadingImg(false);
              swal({
                  title :"successfully uploaded image ",
                  icon :"success",
                  buttons :false,
                  timer : 3000  
                });
                setImg("")
          })
          .catch(()=>{
            swal({
              title :" Image not Uploaded try again ..",
              icon :"error",
              buttons :false,
              timer : 3000  
            });
            
          })
      })
   }
  }
  

  // handleclick  for video ok ...
  const handleClickvideo = () =>{
   
   if(video !==""){
    setLoadingVideo(true);
      const videoRef =  ref(imageDb,`videos/${v4()}`)
      uploadBytes(videoRef,video).then(value=>{
          console.log(value)
          getDownloadURL(value.ref).then(url=>{ 
          setForm({ ...form, video: url });
          setLoadingVideo(false);
              swal({
                  title :"successfully uploaded video ",
                  icon :"success",
                  buttons :false,
                  timer : 3000  
                });
                setVideo("");
          })
          .catch(()=>{
            swal({
              title :" video not Uploaded try again ..",
              icon :"error",
              buttons :false,
              timer : 3000  
            });
            
          })
      })
   }
  }

 
  

  function formValidation() {
    if (form.Author !== "" && form.title !== "" && form.description !== "" && form.image !== "" && form.video !== "" ) {
        addMovie();
        setTimeout(()=>{
          navigate('/');
        },4500);
    
    } else {
        swal({
            title: "Fill all the data ok 😉📲 ",
            icon: "info",
            buttons: false,
            timer: 3000
        });
    }
}

  const useAppstate = useContext(Appstate)
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    Author: "",
    category :"",
    description: "",
    image: "",
    video :"",
    rated: 0,
    rating: 0
  });

  const addMovie = async () => {
    setLoading(true);
    try {
      if(useAppstate.login) {
        await addDoc(moviesRef, form);
        swal({
          title: "Successfully Added",
          icon: "success",
          buttons: false,
          timer: 3000
        })
        setForm({
          title: "",
          Author: "",
          description: "",
          image: "",
          video: "",
          category : ""
        })
      } else {
        navigate('/login')
      }
    } catch(err) {
      swal({
        title: err,
        icon: "error",
        buttons: false,
        timer: 3000
      })
    }
    setLoading(false);
  }
  return (
    <div>
      <section class="text-gray-600 body-font relative">
        <div class="container px-5 py-8 mx-auto">
          <div class="flex flex-col text-center w-full mb-4">
            <h1 class="sm:text-3xl text-xl font-medium title-font mb-4 text-white flex justify-between px-3 " >
             <span className="md:hidden block" >Add Project</span> <span ><Link to={"/AiSpeech"} ><button className="bg-blue-300 rounded-lg text-black px-3  ">AI🔊</button></Link></span>
            </h1>
            <div className="text-3xl text-white hidden md:block " >Add project </div>
          </div>
          
          <div class="lg:w-1/2 md:w-2/3 mx-auto">
            <div class="flex flex-wrap -m-2">
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="name" class="leading-7 text-sm text-gray-300">
                    Title
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.title}
                    required
                    onChange={(e) => setForm({...form, title: e.target.value})}
                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="email" class="leading-7 text-sm text-gray-300">
                    Your name 
                  </label>
                  <input
                    type="name"
                    id="email"
                    name="Author"
                    value={form.Author}
                    required
                    onChange={(e) => setForm({...form, Author: e.target.value})}
                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
          
         <div className="w-full mt-3">
           <select className="w-full bg- px-5 rounded-lg py-1 bg-blue-300 text-black" value={form.category} 
  
            onChange={(e) => setForm({...form, category: e.target.value})}
           >
            <option value="">category Of porject</option>
            <option value="Healthcare">Healthcare </option>
            <option value="Education">Education</option>
            <option value="Environment">Environment </option>
            <option value="Smart City">Smart City </option>
            <option value="Rural development">Rural development </option>
            <option value="Open Innovation ">Open Innovation </option>
            <option value="Finance and Fintech">Finance and Fintech</option>
            <option value="AL/ML">AI/ML </option>
            <option value="Others">others</option>
           


          </select>
         </div>
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="message" class="leading-7 text-sm text-gray-300">
                    Upload Image 
                  </label>
                   <div></div>
                   <div>
                    <input className=" px-[50px] bg-white" type="file"
                     accept = "image/*"  // imp always remember ok 
                     onChange={(e)=>setImg(e.target.files[0])}
                    />
                   </div>
                   {/* -- */}
                <button className="bg-blue-300 px-4 py-1 text-black rounded-lg mt-2 " onClick={handleClick}>{loadingImg ? <TailSpin height={25} color="black" /> :"Upload"}</button>

          
                </div>
              </div>

              <div class="p-2 w-full">
                <div class="relative">
                  <label for="message" class="leading-7 text-sm text-gray-300">
                    Upload Video 
                  </label>
                   <div></div>
                   <div>
                    <input className="px-[50px] bg-white" type="file"
                     accept = "video/*"  // imp always remember ok 
                     onChange={(e)=>setVideo(e.target.files[0])}
                    />
                   </div>
                   {/* -- */}
              <button className="bg-blue-300 px-4 py-1 text-black rounded-lg mt-2 " onClick={handleClickvideo}>{loadingVideo ? <TailSpin height={25} color="black" /> :"Upload"}</button>

          
                </div>
              </div>
              
  
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="message" class="leading-7 text-sm text-gray-300">
                    Description
                  </label>
                  <div>
                  <textarea
                    type= "text"
                    id="message"
                    name="description"
                    value={form.description}
                    onChange={(e) => setForm({...form, description: e.target.value})}
                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                  </div>
                </div>
              </div>
              <div class="p-2 w-full">
                <button onClick={formValidation} class="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg">
                  {loading ? <TailSpin height={25} color="white" /> : 'Submit'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddProject;

