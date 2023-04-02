import { Configuration, OpenAIApi } from "openai";
import env from "react-dotenv";
import { useState, useRef, useCallback } from "react";
import { saveAs } from 'file-saver';
import { toPng } from 'html-to-image';

import { Button, CircularProgress } from "@mui/material";

//let OPENAI_API_KEY  = 123

import { OPENAI_API_KEY } from "../APIKey";

//let OPENAI_API_KEY = 123
export default function Dalle({country, ...props }) {
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const picturePrompt = `draw a beautiful picture of trees in ${country} in an abstract impressionist style`
    const pessimisticPrompt = `draw a picture of deforestation in ${country}  in an abstract impressionist style`
    const configuration = new Configuration({
        apiKey: OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const [url, setUrl] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: "1024x1024",
        });
        const image_url = response.data.data[0].url;
        setUrl(image_url);
    }

    const handleClick = async (p) => {
        setLoading(true);
        const response = await openai.createImage({
            prompt: p,
            n: 1,
            size: "1024x1024",
        });
        const image_url = response.data.data[0].url;
        setLoading(false);
        setUrl(image_url);
    }

    const downloadImage = (e) => {
        e.preventDefault();
        saveAs(url, 'image.jpg') // Put your image url here.
    }
    const ref = useRef(null)
    /*
    const downloadPng = useCallback(() => {
        if (ref.current === null) {
            return
        } toPng(ref.current, { cacheBust: true, })
            .then((url) => {
                const link = document.createElement('a')
                link.download = 'image.png'
                link.href = url
                link.click()
            })
            .catch((err) => {
                console.log(err)
            })
    }, [ref]);*/

    return (
        <div>
            <div 
            className="flex flex-row space-x-3 p-2 justify-center">
                {/* <input type="text" name="prompt" 
                    value={prompt}
                    className="input-box"
                    onChange={(e) => setPrompt(e.target.value)} /> */}
                <Button onClick={()=>handleClick(picturePrompt)} variant="contained" 
                    sx={{borderRadius: 10, backgroundColor: 'green',
                        '&:hover': {
                        backgroundColor: 'green',
                        border: 'solid 1px white'
                        }
                    }}
                >Save the trees!</Button>
                <Button onClick={()=>handleClick(pessimisticPrompt)} variant="contained" 
                    sx={{borderRadius: 10, backgroundColor: 'red',
                        '&:hover': {
                        backgroundColor: 'red',
                        border: 'solid 1px white'
                        }
                    }}
                >Do nothing and let Glooby down</Button>
            </div>

            {
                loading ? (
                    <CircularProgress size='large' sx={{color:"white"}}/>
                ): (
                    <img src={url} onClick={downloadImage}
                    className="rounded-xl w-1/2 h-auto m-auto"
                    ref={ref} />
                )
            }
            
        </div>
    )
}


