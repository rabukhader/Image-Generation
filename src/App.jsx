import React, {useState, useEffect} from 'react'
import './App.css'
import {Configuration, OpenAIApi} from 'openai'
import ClipLoader from "react-spinners/ClipLoader";

const App = () => {

    const [prompt, setPrompt] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    let start = false; 
    
    
    useEffect(() => {
      setLoading(true),
      setTimeout(() => {
        setLoading(false)
      }, 6000)
      
    }, [start])
    
    const configuration = new Configuration({apiKey: import.meta.env.VITE_Open_AI_Key});


    const openai = new OpenAIApi(configuration);

    const generateImg = async () => {
      const res = await openai.createImage({prompt: prompt, n: 1, size: "1024x1024"});
      setResult(res.data.data[0].url);
      start = !start;
    }

    return (
        <>
            <h1>Generate an Image using Open AI API</h1>
            <div className='app-main'>
                <input onChange={
                        (e) => setPrompt(e.target.value)
                    }
                    type="text"
                    placeholder='Type Something to generate an Image'/>
                <button onClick={generateImg}>Generate an Image</button>
            </div>
            {
            loading ? <ClipLoader color='#e2dc12'
                loading={loading}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"/> : <> {
                result.length > 0 ? <img className='app-img'
                    src={result}/> : <></>
            } </>
        } </>
    )
}

export default App
