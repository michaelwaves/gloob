import { Configuration, OpenAIApi } from "openai";
import env from "react-dotenv";
import { useState } from "react";

export default function Dalle() {
    const [prompt, setPrompt] = useState("");
    const configuration = new Configuration({
        apiKey: env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: "1024x1024",
        });
        image_url = response.data.data[0].url;
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="prompt" value={prompt}
                    onChange={(e) => setPrompt(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
            <img src={image_url} />
        </div>
    )
}


