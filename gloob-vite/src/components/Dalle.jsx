import { Configuration, OpenAIApi } from "openai";
import env from "react-dotenv";
import { useState, useRef, useCallback } from "react";
import { saveAs } from 'file-saver';
import { toPng } from 'html-to-image';

import { Button } from "@mui/material";

//import { OPENAI_API_KEY } from "../APIKey";

let OPENAI_API_KEY = 123
export default function Dalle({ country, ...props }) {
    const [prompt, setPrompt] = useState("");
    const picturePrompt = `draw a beautiful picture of trees and wildlife found in ${country}`
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

    const downloadImage = (e) => {
        e.preventDefault();
        saveAs(url, 'image.jpg') // Put your image url here.
    }
    const ref = useRef(null)

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
    }, [ref]);

    return (
        <div>
            <form onSubmit={handleSubmit}
            className="flex flex-row space-x-3 p-2 justify-center">
                {/* <input type="text" name="prompt" 
                    value={prompt}
                    className="input-box"
                    onChange={(e) => setPrompt(e.target.value)} /> */}
                <Button type="submit" variant="contained" 
                    sx={{borderRadius: 10, backgroundColor: 'green',
                        '&:hover': {
                        backgroundColor: 'green',
                        border: 'solid 1px white'
                        }
                    }}
                >Generate Image!</Button>
            </form>
            <img src={url} onClick={downloadPng}
                className="rounded-xl w-1/2 h-auto"
                ref={ref} />
        </div>
    )
}


