import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import { Button } from "@mui/material";

export default function GPT() {
    const openai = new OpenAIApi(new Configuration({
        apiKey: "",
    }));
    const [prompt, setPrompt] = useState("");
    const [messages, setMessages] = useState([{ role: "assistant", content: "Hello, how can I help you?" }]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const message = prompt
        const newMessages = []
        const oldMessages = messages
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
    }


    return (
        <div>

            <div className="flex flex-col justify-center space-y-2 w-1/2">
                <form onSubmit={handleSubmit} className="space-x-3 p-2 flex flex-row justify-center items-center">
                    <input type="text" name="prompt" value={prompt}
                        className="input-box"
                        onChange={(e) => setPrompt(e.target.value)} />
                    
                    <Button type="submit" sx={{borderRadius: 25}}>
                        <SendIcon/>
                    </Button>
                </form>
                {messages.map((message) => {
                    return (
                        <>
                            <p></p>
                            <div className="role">
                                <p>{message.role}</p>
                            </div>
                            <div className={"max-w-prose p-2 h-auto rounded-xl " + (message.role == "assistant" ? " bg-slate-400 ml-0 mr-auto" : " bg-blue-300 ml-auto mr-0")}>
                                <p>{message.content}</p>
                            </div>
                        </>
                    )
                })}
            </div>
        </div>
    )
}