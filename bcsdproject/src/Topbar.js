import React from "react";
import { useRef,useEffect } from "react";
import { RecoilState, useRecoilState } from "recoil";
import { searchState } from "./atom";

function Topbar(){
    const [search,setSearch]=useRecoilState(searchState);
    const searchRef=useRef();
    function searching(){
        let word=[searchRef.current.value]
        setSearch(word);
        console.log(word);
    }
    useEffect(()=>{//set이 비동기로 작동하므로 useEffect 를 사용해
        //검색 결과

    },search);
    return(
        <div>
            <input ref={searchRef} ></input>
            <button onClick={searching}>검색</button>
        </div>
    )
}

export default Topbar;