import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import ReactStars from 'react-stars'
import {getDocs} from 'firebase/firestore'
import {moviesRef} from '../firebase/firebase'
import { Link } from "react-router-dom";
const Cards = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [input,setinput] = useState("");
  useEffect(() => {
    async function getData() {
      setLoading(true);
      const _data = await getDocs(moviesRef);
      console.log(_data);

      // const data = _data.filter((data) => data.category === input);
      //   console.log(data);

      // data.forEach((doc)=>{
      //   setData((prv) => [...prv,{...(doc.data()), id: doc.id}]) 
      // })
      // Convert _data to an array
      const dataArray = _data.docs.map((doc) => ({ ...(doc.data()), id: doc.id }));

      // Filter data based on category
      const filteredData = input?dataArray.filter((item) => item.category === input): dataArray; 
      setData(filteredData);
      setLoading(false);
    }
    getData();
  },[input])
  // console.log(data);
   
  // data.map((doc)=>{
  //   if(doc.category === "Environment")
  //   {
       
  //   }
  //     // console.log(doc.category);
  // });
  return (
    <>
        <div className="w-full mt-3">
           <select className="w-1/3 md:w-[300px]  bg- px-5 rounded-lg py-1 bg-slate-200 text-black"
             value={input.category} 
  
            onChange={(e) => setinput(e.target.value)}
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
    <div className="flex flex-wrap justify-between px-3 mt-2">
    {loading ? <div className="w-full flex justify-center items-center h-96"><ThreeDots height={40} color="white" /></div> : 
      data.map((e) => {
        return (
          <Link to={`/detail/${e.id}`}>
            <div key={Math.random()} className="card font-medium shadow-lg p-2 hover:-translate-y-3 cursor-pointer mt-6 transition-all duration-500 flex first-letter:">
            <div>
            <img className="w-[144px] h-60 md:h-72 md:w-[260px] rounded-lg" src={e.image} alt="img"/>
            <h1>
              {e.title}
            </h1>
            <h1 className="flex items-center">
              <span className="text-gray-300 mr-1">Rating:</span>
              <ReactStars
                size={20}
                half={true}
                value={e.rating/e.rated}
                edit={false}
              />
            </h1>
            <h1>
              <span className="text-gray-300">Author:</span> {e.Author}
            </h1>
           </div> 
          </div>
          </Link>
        );
      })
    }
    </div>
    </>
  );
};
export default Cards;