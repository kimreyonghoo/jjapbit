import React, { useState,useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { infoState } from "./atom";

const List=styled.div`
  display:flex;
  flex-direction:row;
  justify-Content:space-between;
  align-items:center;
  width:60vw;
  height:60px;
  border:2px solid #dadada;
  background-Color:white;
  &:hover{
    background-Color:#cbcbcb;
    text-decoration: underline;
  }

  & > * {
    margin:20px;
    width:180px;
  }
  `
const PriceDiv=styled.div`
  color:${(props)=>props.color};
  font-weight:bold;
`
function Coininfo({info,price}){//코인 정보 한줄
  const [marketInfo,setInfo]=useRecoilState(infoState);
  console.log(price);
  const chartNav=useNavigate();
  if(price){
    let tardeVolume=price.acc_trade_price_24h;
    if(tardeVolume>=1000000){
      tardeVolume=Math.floor(price.acc_trade_price_24h/1000000);
    }
    let change=`black`;
    switch(price.change){
      case `FALL`:
        change=`blue`
        break;
      case `RISE`:
        change=`#e11b1b`
        break;
      default:
        break;
    }
    let plus=``;
    if(price.signed_change_price>0){
      plus=`+`
    }
    return(
      <List className="coinList" onClick={()=>{
        chartNav(`/${price.market}`);
        setInfo(info);
      }}>
        <div>
          <h4>{info.korean_name}</h4>
        </div>
        <PriceDiv color={change}>{price.trade_price.toLocaleString()} {price.market.substr(0,3)}</PriceDiv>
        <div>
          <PriceDiv color={change}>{plus}{(price.signed_change_price*100).toFixed(2)}</PriceDiv>
          <PriceDiv color={change}>{plus}{(price.signed_change_rate*100).toFixed(2)}%</PriceDiv>
        </div>
        <div>{tardeVolume.toLocaleString()} {(tardeVolume>0)?`백만`:``}</div>
 
     </List>
    );
  }
}
export default Coininfo;