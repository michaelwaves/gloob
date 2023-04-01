<mesh id="australia" geometry={nodes.australia.geometry} material={materials.continent} scale={6.37} />
      <mesh id="madagascar" geometry={nodes.madagascar.geometry} material={materials.continent} scale={6.37} />
      <mesh id="indonesia" geometry={nodes.indonesia.geometry} material={materials.continent} scale={6.37} />
      <mesh id="iceland" geometry={nodes.iceland.geometry} material={materials.continent} scale={6.37} />
      <mesh id="phillipines" geometry={nodes.phillipines.geometry} material={materials.continent} scale={6.37} />
      <mesh id="indonesia001" geometry={nodes.indonesia001.geometry} material={materials.continent} scale={6.37} />
      <mesh id="papa_new_guinea" geometry={nodes.papa_new_guinea.geometry} material={materials.continent} scale={6.37} />
      <mesh id="africa" geometry={nodes.africa.geometry} material={materials.continent} scale={6.37} />
      <mesh id="new_zealand001" geometry={nodes.new_zealand001.geometry} material={materials.continent} scale={6.37} />
      <mesh geometry={nodes.ocean.geometry} material={materials.water} rotation={[0, -1.13, 0]} scale={6.09} />
      <mesh id="india" geometry={nodes.india.geometry} material={materials.continent} scale={6.37} />
      <mesh id="china" geometry={nodes.china.geometry} material={materials.continent} scale={6.37} />
      <mesh id="middle_east" geometry={nodes.middle_east.geometry} material={materials.continent} scale={6.37} />
      <mesh id="europe" geometry={nodes.europe.geometry} material={materials.continent} scale={6.37} />
      <mesh id="north_america002" geometry={nodes.north_america002.geometry} material={materials.continent} scale={6.37} />
      <mesh id="central_america" geometry={nodes.central_america.geometry} material={materials.continent} scale={6.37} />

      <div className="card relative">
        <button onClick={() => setCount((count) => count + 1)}>
          tree count is {count}
        </button>
        <p>
          Click to add a random <code>TREE</code>
        </p>
      </div>

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