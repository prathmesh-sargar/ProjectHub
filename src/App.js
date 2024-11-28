import Header from "./components/Header";
import Cards from "./components/Cards";
import AddProject from './components/AddProject'
import {Route, Routes} from 'react-router-dom'
import Detail from './components/Detail';
import { createContext, useState } from "react";
import Login from './components/Login'
import Signup from './components/Signup'
import Reviews from "./components/Reviews";
import SpeechToText from "./components/SpeechToText";
import UserProfile from "./components/UserProfile";

const Appstate = createContext();

function App() {
  const [login, setLogin] = useState(false);
  const [userName, setUserName] = useState("");

  return (
    <Appstate.Provider value={{login, userName, setLogin, setUserName}} >
    <div className="App relative">
      <Header />
      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/addmovie" element={<AddProject />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/reviews"  element={<Reviews/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/AiSpeech" element={<SpeechToText />} />
        <Route path="/userprofile" element={<UserProfile/>} />
      </Routes>
    </div>
    </Appstate.Provider>
  );
}

export default App;
export {Appstate}

