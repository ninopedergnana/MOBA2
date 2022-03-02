import React from "react";
import { useState } from "react";
import {
  Link
} from "react-router-dom";


export default function Navbar() {
  const [keyword, setKeyword] = useState("")

  function handleChange (e) {
    setKeyword(e.target.value)
  }

  return (
    <>
    <div className="flex flex-col">
        <div className="mb-3 pt-0">
          <input type="text" value={keyword} onChange={handleChange} placeholder="BTC" className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative 
          bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"/>
        </div>
          <Link to = {{
            pathname: '/table',
            state: {
              keyword: keyword ? keyword : "BTC"
            }
          }}>
          <div className="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg 
            outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
              Submit
          </div>
          </Link>
    </div>

    </>
  );
}
