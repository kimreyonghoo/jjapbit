import React, { useState,useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const List=styled.div`
  display:flex;
  flex-direction:row;
  justify-Content:space-between;
  align-items:center;
  width:40vw;
  height:100px;
  border:2px solid #dadada;
  padding:20px 80px;
  background-Color:white;
  `
const Namediv=styled.div`
  display:flex;
  flex-direction:row;
  align-item:center;
  margin:5px;
  margin-top:0px;
  & div:nth-child(1){
    font-size:large;
    font-weight:bold;
  }
  & div:nth-child(2){
    font-size:small;
    color:#cbcbcb;
  }
`
const MainPrice=styled.div`
    display:flex;
    color:${(props)=>props.color};
    font-weight:bold;
    font-size:xx-large;
    margin-bottom:5px;
`
const Changediv=styled.div`
  display:flex;
  & div:nth-child(2){
    margin-left:5px;
  }
`
const HLPrice=styled.div`
  & div:nth-child(1){
    border-bottom:1px solid #cbcbcb;
    padding-bottom:5px;
    color:red;
  }
  & div:nth-child(2){
    border-top:1px solid #cbcbcb;
    padding-top:5px;
    color:blue;
  }
`
const PriceDiv=styled.div`
  color:${(props)=>props.color};
  font-weight:bold;
`
function ChartInfo({info,price}){//코인 정보 한줄
    if(price){
        console.log(price);
        let tardeVolume=price.acc_trade_price_24h;
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
      <List className="coinList">
        <div>
            <Namediv>
                <div>{info.korean_name}</div>
                <div>{info.market}</div>
            </Namediv>
            <MainPrice color={change}>{price.trade_price.toLocaleString()} {price.market.substr(0,3)}</MainPrice>
            <PriceDiv color={change}></PriceDiv>
            <Changediv>
                <PriceDiv color={change}>{plus}{(price.change_price*100).toFixed(2)}</PriceDiv>
                <PriceDiv color={change}>{plus}{(price.signed_change_rate*100).toFixed(2)}%</PriceDiv>
            </Changediv>
        </div>
        <HLPrice>
            <div>고가 {price.high_price}</div>
            <div>저가 {price.low_price}</div>
        </HLPrice>
        
        <div>거래량 {tardeVolume.toLocaleString()} KRW</div>
 
     </List>
    );
  }
}
export default ChartInfo;