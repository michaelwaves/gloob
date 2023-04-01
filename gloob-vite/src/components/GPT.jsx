import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";
import { OPENAI_API_KEY } from "../APIKey";

export default function GPT() {
    const openai = new OpenAIApi(new Configuration({
        apiKey: OPENAI_API_KEY,
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

            <div className="flex flex-col justify-center space-y-2 w-1/2 m-auto">
                <h1 className="text-2xl font-bold">Ask Gloob to learn more about </h1>
                <form onSubmit={handleSubmit} className="space-x-3 p-2 flex flex-row justify-center items-center">
                    <input type="text" name="prompt" value={prompt}
                        className="input-box"
                        onChange={(e) => setPrompt(e.target.value)} />
                    <button className="rounded-full bg-white hover:rounded-xl" type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                    </button>
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