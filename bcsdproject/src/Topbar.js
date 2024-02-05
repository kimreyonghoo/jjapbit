import React from "react";
import { useRef } from "react";

function Topbar(){
    const searchRef=useRef();
    return(
        <div>
            <input ref={searchRef}></input>
        </div>
    )
}