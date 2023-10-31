import React, {useState} from 'react'

export default function Home() {
  const [name,setname]=useState("");
  const [text,settext]=useState("");
  
  return (
    <div>
        This Home Page
        <div className="inps">
          Enter name: 
          <input  type="text" onChange={(e)=>setname(e.target.value)} name="" id="" /> <br />
          Enter text:  <br />
          <textarea name="" id="" cols="30" onChange={(e)=>settext(e.target.value)} rows="10"></textarea>
          <br />
          <button type='button' ></button>
        </div>
        <div className="">
          <br /><br />
          your name : {name} <br />
          Your text : {text}

        </div>
    </div>
  )
}
