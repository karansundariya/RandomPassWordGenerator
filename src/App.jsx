import { useState } from 'react'
import './index.css'

function App() {
  const [Length, setLength] = useState(2);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [Password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const updatePassword = () => {
    let s = "abcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) s += "1234567890";
    if (charAllowed) s += "!@#$%^&*()~";
    let p = '';
    for (let i = 1; i <= Length; i++) {
      let index = Math.floor(Math.random() * s.length);
      p += s[index];
    }
    setPassword(p);
    setCopied(false); // reset copy message on new password
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(Password).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // message disappears after 2s
    });
  };

  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen p-4 gap-4 bg-gray-100'>  
        <h1 className='text-xl font-semibold'>Random Password Generator</h1>

        <input
          type="text"
          placeholder='Your Password'
          readOnly
          value={Password}
          className="border border-gray-400 rounded px-3 py-2 w-64 text-center"
        />

        {Password && (
          <button
            className='bg-indigo-500 text-white px-3 py-1 rounded'
            onClick={copyToClipboard}
          >
            📋 Copy
          </button>
        )}

        {copied && <p className='text-green-600 text-sm'>Password copied!</p>}

        <div className="flex flex-wrap gap-2 justify-center">
          <button
            className='bg-blue-500 text-white px-3 py-1 rounded'
            onClick={() => {
              setLength(Length + 1);
              updatePassword();
            }}
          >
            Increase Length
          </button>

          <button
            className='bg-green-500 text-white px-3 py-1 rounded'
            onClick={() => {
              setnumberAllowed(!numberAllowed);
              updatePassword();
            }}
          >
            Toggle Numbers
          </button>

          <button
            className='bg-yellow-500 text-white px-3 py-1 rounded'
            onClick={() => {
              setcharAllowed(!charAllowed);
              updatePassword();
            }}
          >
            Toggle Special Chars
          </button>

          <button
            className='bg-gray-700 text-white px-3 py-1 rounded'
            onClick={updatePassword}
          >
            Generate New Password
          </button>
        </div>
      </div>
    </>
  )
}

export default App
