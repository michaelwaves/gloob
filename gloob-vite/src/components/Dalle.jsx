import { Configuration, OpenAIApi } from "openai";
import env from "react-dotenv";
import { useState, useRef, useCallback } from "react";
import { saveAs } from 'file-saver';
import { toPng } from 'html-to-image';

import { Button, CircularProgress, Box, IconButton } from "@mui/material";
import FileDownloadIcon from '@mui/icons-material/FileDownload';

//let OPENAI_API_KEY  = 123

import { OPENAI_API_KEY } from "../APIKey";

//let OPENAI_API_KEY = 123
export default function Dalle({location, ...props }) {
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const picturePrompt = `draw an oil painting of a beautiful, sunny, bright picture of a healthy forest in ${location}`
    const pessimisticPrompt = `draw a picture of deforestation in ${location}  in an abstract impressionist style`
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

    let saveImage3 = () => {
        let imageT = document.getElementById('dalle-image')
        console.log(imageT)
        saveAs(imageT.src, 'image.png')
    }

    let saveImage = () => {
        let image = document.getElementById('image-generated')

        toPng(image)
        .then(dataURL => {
            download(dataURL, 'image.png')
        })
        .catch((err) => {
            console.log("An error occurred")
        })
        
    }

    return (
        <div>
            <div 
            className="flex flex-row space-x-3 p-2 justify-center">
                {/* <input type="text" name="prompt" 
                    value={prompt}
                    className="input-box"
                    onChange={(e) => setPrompt(e.target.value)} /> */}
                <Button onClick={()=>handleClick(picturePrompt)} 
                    variant="contained" 
                    sx={{borderRadius: 1, textTransform: 'none',backgroundColor: '#008000',
                        '&:hover': {
                            backgroundColor: '#004d00'
                        }
                    }}
                >Save the trees!</Button>
                <Button onClick={()=>handleClick(pessimisticPrompt)} 
                    variant="contained" 
                    sx={{borderRadius: 1, textTransform: 'none',backgroundColor: '#cc0000',
                    '&:hover': {
                        backgroundColor: '#800000',
                    }
                    }}
                >Do nothing and let Glooby down</Button>
            </div>

            <Box sx={{height: 330, my: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>

            {
                loading ? (
                    <CircularProgress size={50} sx={{color: "white", textAlign: 'center'}}/>
                ): (
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>

                        <div id="image-generated">
                            <img src={url}
                                id="dalle-image"
                                className="rounded-xl w-1/2 h-auto m-auto"
                            ref={ref} />
                        </div>
                        
                        {
                            url !== '' && (
                                <IconButton sx={{textAlign: 'center', mx: 'auto', color: 'white', my: 1.5}}
                                    onClick={saveImage}
                                >
                                    <FileDownloadIcon/>
                                </IconButton>
                            )
                        }

                    </Box>
                )
            }
            </Box>
        </div>
    )
}


