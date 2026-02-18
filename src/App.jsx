import { useState, useCallback,useEffect, useRef } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
const [charAllowed, setCharAllowed]= useState(false);
const [password, setPassword] = useState("")

// useRef hook
const passwordRef = useRef(null)

const passwordGenrator = useCallback(()=>{
  let pass = ""  // final password isme store krne k liye
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
if(numberAllowed) str += "0123456789"
if(charAllowed) str += "~`!@#$%^&*()_-+=[]{}|;:',.<>?"

for(let i=1;i<=length;i++){
  let char = Math.floor(Math.random() * str.length + 1)
pass += str.charAt(char)
                            
}
setPassword(pass)
},[length, numberAllowed, charAllowed,setPassword])

const copyPasswordToClipboard = useCallback(()=>{
  passwordRef.current?.select();  // passwordRef k andr ab inputbox hai or hum us input box k andr text ko slect kr rhe hai
  passwordRef.current?.setSelectionRange();// range mai value select krne k liye hai  (.current = real HTML input element)
  window.navigator.clipboard.writeText(password)
                         
},[password])

useEffect(() =>{
  passwordGenrator()
},[length, numberAllowed, charAllowed, passwordGenrator])

  return (
    <>
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8  bg-gray-800 text-orange-500">
    <h1 className="text-white text-center my-3">Password genrator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
      <input type="text" 
      value={password}
     className='outline-none w-full py-1 px-3' 
     placeholder="password"
     readOnly
     ref={passwordRef}  //👉 ref = reference = seedha connection actual DOM element se. (ref -> passwordRef.current (matlab 👉 ref usme daalta hai. ye daalta hai ref ->passwordRef.current))
      />
      <button onClick ={copyPasswordToClipboard}
      className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
</div>


<div className='flex text-sm gap-x-2'>
  <div className='flex items-center gap-x-1'> 
    <input type="range" min={8} max={100} value={length} className='cursor-pointer' onChange={(e) =>{setLength(e.target.value)}}/>  
    <label>length:{length}</label>
  </div>


  <div className='flex items-center gap-x-1'>
 <input type="checkbox" 
 defaultChecked={numberAllowed}
 id="numberInput"
 onChange={()=>{
   setNumberAllowed((prev)=> !prev);
 }}
 />
<label htmlFor="numberInput">Numbers</label>
  </div>

  
                   <div className='flex items-center gap-x-1'>
 <input type="checkbox" 
 defaultChecked={charAllowed}
 id="characterInput"
 onChange={()=>{
   setCharAllowed((prev)=> !prev);
 }}
 />
<label htmlFor="numberInput">Characters</label>
  </div> 
</div>
</div>
    </>
  )
}
export default App




//isme passwordRef jo hai Ref isi ki wajah se hum inputbox tak pauch rhe hai 


  // passwordRef.current?.select(); 
// part	                                   matlab
// passwordRef	                           input box ka connection
// current	                               asli input element
// select()	                               andar ka text highlight
// 👉 input box me jo password hai → usko blue highlight kar do.
// Jaise mouse se drag karte ho


// passwordRef.current?.setSelectionRange();
// 👉 selection ko confirm / strong kar deta hai.
// Mostly mobile ke liye helpful.
// Tum isko samjho:
// haan bhai pura select ho gaya 👍


// }, [password])
// 👉 agar password change hota hai
// toh function updated value ke saath ready rahe.


// w-full
// matlab jitni width parent ki hogi utni width child ki hogi


// max-w-md 
// ✅ Ye bolta hai width 448px se zyada nahi ho sakti


// ✅ mx-auto
// 👉 center me le aao horizontally.
// m = margin
// x = left + right
// auto = browser khud equal space dega
// Result → box beech me aa jayega.


// 🎯 shadow-md
// 👉 box shadow.
// 📍 div ke border ke bahar halka shadow.
// 📦 utha hua / floating look.


// 🎯 rounded-lg
// 👉 border radius.
// 📍 corners par.
// 📦 kone gol.


// ✅ px-4
// matlab left-right dono taraf se 4px ki padding

// my-8
// 👉 margin top + bottom.
// Matlab:
// upar space
// neeche space
// dusre elements se duri.


//  bg-gray-800
// ye passwordgenrator k andr k color ko grey kar dega

// text-orange-500
// text k color ko orange kar dega

// mb-Margin Bottom
// mb-4 = phone ke neeche thoda space de diya
// taaki next cheez chipke nahi.
// Common bhai-bahen (family) 👨‍👩‍👧‍👦
// Class	Meaning
// mt-4	upar gap
// mb-4	neeche gap
// ml-4	left gap
// mr-4	right gap
// mx-4	left + right
// my-4	top + bottom


// 1️⃣ readOnly kya karta hai?
// 👉 user ko typing se rokta hai.
// input me cursor aa sakta hai
// text select ho sakta hai
// par edit nahi kar sakte.



// 🎯 Short Final Summary
// Cheez	                                   Meaning
// useRef()	                         ek object banata hai
// current	                           us object ki property hai
// ref={passwordRef}	                 React ko bolta hai element connect karo
// passwordRef.current	               real HTML input element                           

// text-sm font-size chota krne k liye hota hai

// (<div className='flex text-sm gap-x-2'> ) gap-x-2 isse gap aajayega length , number, character mai

//   <div className='flex items-center gap-x-1'> isse length,number,character slider se dur jaayega

// defaultChecked - variable nahi hai.
// Ye ek React ka prop (attribute) hai jo checkbox ke liye use hota hai.






