
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import {useState} from "react";
import { Link } from 'react-router-dom';


const SpeechToText = () => {
    const [textToCopy, setTextToCopy] = useState();
    const [isCopied, setCopied] = useClipboard(textToCopy, {
        successDuration:1000
    });

    //subscribe to thapa technical for more awesome videos

    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return null
    }

    return (
        <>
            <div className="tcontainer">
                
                <div className='closehead' >
                <span>Speech to Text Converter</span>  <Link to={"/addmovie"} ><span className='text-blue-300 text-2xl'>X</span></Link>
                </div>
                <br/>
                <div>
                   
                <div className="tmaintext">
                <div className="tmain-content" onClick={() =>  setTextToCopy(transcript)}>
                    {transcript}
                </div>

                </div>
                <div className="tbtn-style">

                    
                    <button className="tButton" onClick={setCopied}>
                        {isCopied ? 'Done..👍' : 'Copy'}
                    </button>
        
                    <button  className="tButton"  onClick={startListening}>start</button>
                    <button className="tButton"   onClick={SpeechRecognition.stopListening}>Stop</button>

                </div>

            </div>

                </div>
        </>
    );
};

export default SpeechToText;
