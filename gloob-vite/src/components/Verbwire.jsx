import { useState } from "react";

/*const sdk = require('api')('@verbwire/v1.0#4psk2mplfwliyql');

sdk.auth('sk_live_c8903223-1641-43c7-83f8-6da710b7f291');
sdk.postNftMintQuickmintfromfile({
  allowPlatformToOperateToken: 'true',
  chain: 'goerli',
  filePath: 'chile.png',
  name: 'CHile',
  description: 'a beautiful ai generated image of chile'
}, { accept: 'application/json' })
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err)); */

const Verbwire = () => {
  const [file, setFile] = useState(null);
  function handleFile(e) {
    setFile(e.target.files[0])
    console.log(e.target.files[0])
  }
  return (
    <div>
      <h2>
        Verbwire
      </h2>
      <form >
        <input type="file" name="file" onChange={(e) => handleFile(e)} />
      </form>
      <button> Upload</button>
    </div>
  )
}

export default Verbwire;