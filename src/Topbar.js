import React from "react";
import { useRef,useEffect } from "react";
import { RecoilState, useRecoilState } from "recoil";
import { searchState } from "./atom";
import styled from "styled-components";
const Logo=styled.div`
position:absolute;
left:20vw;
color:white;
font-size:20px;

`
const BarDiv=styled.div`
    display:flex;
    flex-direction:row;
    justify-Content:center;
    padding:10px;
    background-Color:black;
`
function Topbar(){
    const [search,setSearch]=useRecoilState(searchState);
    const searchRef=useRef();
    function searching(){
        let word=searchRef.current.value.toUpperCase();
        setSearch(word);
        console.log(word);
    }
    return(
        <BarDiv>
            <Logo>JJAPBIT</Logo>
            <input ref={searchRef} ></input>
            
            <button onClick={()=>{
                searchRef.current.value=``;
                searching();
            }}>X</button>
            <button onClick={searching}>검색</button>
        </BarDiv>
    )
}

export default Topbar;