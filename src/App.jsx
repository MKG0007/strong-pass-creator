import { useState, useCallback , useEffect , useRef} from 'react';
import './index.css';

function App() {
  const copyBtnRef = useRef("Copy");

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [Password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%&*^?";

    for(let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str[char];
    }
  if (copyBtnRef.current) {
    copyBtnRef.current.innerText = "Copy";
  }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed , setPassword]);

  useEffect(()=>{
    passwordGenerator();
  } , [length , charAllowed ,numberAllowed, passwordGenerator ]);

  const copyPassword = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(Password)
  if (copyBtnRef.current) {
    copyBtnRef.current.innerText = "Copied";
  }
  } , [Password]);





  return (
    <>
<div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center px-4">
  <div className="bg-white max-w-md w-full rounded-2xl shadow-lg p-6 space-y-6">
    <h1 className="text-2xl font-bold text-center text-gray-800">🔐 Password Generator</h1>

    <div className="flex items-center justify-between bg-gray-100 rounded-lg px-4 py-2">
      <input
        type="text"
        value={Password}
        placeholder="Your Secure Password"
        readOnly
        className="bg-transparent text-gray-700 text-lg w-full outline-none"
        id="passwordDisplay"
        ref={passwordRef}
      />
      <button
        id="copyBtn"
        className="ml-3 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-md text-sm transition duration-200"
        ref={copyBtnRef}
        onClick={copyPassword}
      >
        copy
      </button>

    </div>


    <div>
      <label for="lengthRange" className="block text-gray-700 font-medium mb-1">Password Length</label>
      <input type="range" min="4" max="20" value={length} id="lengthRange" className="w-full accent-orange-500" onChange={(e) =>{setLength(e.target.value)}}/>
      <div className="text-sm text-gray-600 text-right mt-1">Length: <span id="lengthValue">{length}</span></div>
    </div>

  
    <div className="flex flex-col gap-2">
      <label className="inline-flex items-center">
        <input type="checkbox" id="includeNumbers" className="accent-orange-500" onChange={(prev) => setNumberAllowed(prev.target.checked)}/>
        <span className="ml-2 text-gray-700">Include Numbers</span>
      </label>

      <label className="inline-flex items-center">
        <input type="checkbox" id="includeSymbols" className="accent-orange-500"  onChange={(prev) => setCharAllowed(prev.target.checked)}/>
        <span className="ml-2 text-gray-700">Include Symbols</span>
      </label>
    </div>

   
    <button
      id="generateBtn"
      className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg text-lg font-semibold transition duration-200"
      onClick={passwordGenerator}
    >
      Generate Password
    </button>
  </div>
</div>

    </>
  
  );
}

export default App;
