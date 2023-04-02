import { Configuration, OpenAIApi } from "openai";
import { useState, useRef, useEffect } from "react";
import SendIcon from '@mui/icons-material/Send';
import { Button, Box, TextField } from "@mui/material";
import glooby from "/glooby.png"


//let OPENAI_API_KEY  = 123

//import { OPENAI_API_KEY } from "../APIKey";

import PublicIcon from '@mui/icons-material/Public';

export default function GPT({location}) {
    const openai = new OpenAIApi(new Configuration({
        apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    }));
    const [prompt, setPrompt] = useState("");
    const [disabledSubmit, setDisabledSubmit] = useState(false)
    const [messages, setMessages] = useState([
        {role: "system", content: "please keep the subject of the conversation on " + location + " with a focus on sustainability and the environment."},
        { role: "assistant", content: "Hello, how can I help you?" },
    ]);

    const messagesEndRef = useRef()

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "center"})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(import.meta.env.VITE_OPENAI_API_KEY)
        setDisabledSubmit(true)
        const message = prompt
        const newMessages = []
        const oldMessages = messages

        //let m = 'Lorem ipsum I goood and nice'
        newMessages.push({ role: "user", content: message })
        setMessages([...oldMessages, ...newMessages]);
        console.log(prompt)
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: messages,
        });
        console.log(response)
        const completion = response.data.choices[0].message.content;
        newMessages.push({ role: "assistant", content: completion })
        setMessages([...oldMessages, ...newMessages]);
        setPrompt("");
        setDisabledSubmit(false)
        //scrollToBottom()
       
    }


    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    return (
       
        <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
           
            <Box sx={{height: 400,  width: '90%', overflowY: 'auto'}}>
                {messages.slice(1).map((message, i) => {
                    return (
                        <Box sx={{display: 'flex', alignItems: 'center', m: 1}} key={i}>
                            {
                                message.role === 'assistant' && <img src={glooby} className={"w-12 h-12"}></img>
                            }
                            <div className={"max-w-prose p-2 h-auto rounded-xl " + (message.role == "assistant" ? " bg-slate-400 ml-0 mr-auto" : " bg-blue-300 ml-auto mr-0")}>
                                <p>{message.content}</p>
                            </div>
                        </Box>
                    )
                })}

                <div ref={messagesEndRef} />
            </Box>

            <form onSubmit={handleSubmit} className="space-x-3 p-2 flex flex-row justify-center items-center">
                        
                <TextField
                    required
                    type="text" 
                    name="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    InputProps={{
                        sx: {
                            color: 'white'
                        }
                    }}
                    sx={{width: '90%', color: 'white', border: 'solid white', borderRadius: 5}}
                
                />
                <Button type="submit" sx={{borderRadius: 25}} disabled={disabledSubmit}>
                    <SendIcon/>
                </Button>
            </form>

        </Box>
  
    )
}