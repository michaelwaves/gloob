import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";

export default function GPT() {
    const openai = new OpenAIApi(new Configuration({
        apiKey: "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",
    }));
    const [prompt, setPrompt] = useState("");
    const [messages, setMessages] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const message = prompt
        const newMessages = []
        const oldMessages = messages
        newMessages.push({ role: "user", content: message })
        setMessages([...oldMessages, ...newMessages]);
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
            <form onSubmit={handleSubmit}>
                <input type="text" name="prompt" value={prompt}
                    onChange={(e) => setPrompt(e.target.value)} />
                <button className="rounded-full bg-white hover:rounded-xl" type="submit">{'>'}</button>
            </form>
            <p>
                {messages.map((message) => {
                    return (
                        <div>
                            <p>{message.role}</p>
                            <p>{message.content}</p>
                        </div>
                    )
                })}
            </p>
        </div>
    )
}