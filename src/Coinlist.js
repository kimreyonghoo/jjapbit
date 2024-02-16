import React, { useState,useEffect,useRef } from "react";
import Coininfo from "./Coininfo";
import { useRecoilState,useRecoilValue } from "recoil";
import { marketState, marketSelector,tickerState,searchState } from "./atom";
import axios from "axios";
import styled from 'styled-components'
import useInterval from "./hooks/useInterval";
const ListBody=styled.div`
display:flex;
flex-direction:column;
justify-Content:center;
align-items:center;
background-color:#1a2a3e;
`
const Guides=styled.div`
display:flex;
justify-Content:space-between;
align-items:center;
width:60vw;
height:60px;
border:2px solid #cbcbcb;
background-Color:#cbcbcb;
& > * {
  margin:20px;
  width:180px;
}
& > *:hover {
  text-decoration: underline;
}
`
const CoinList=styled.div`
display-flex;
flex-direction:column;
justify-Content:center;
align-items:center;
`
const UnitBtn=styled.button`
background: white;
border: 0px solid
color: #black;
margin: 0 1em;
padding: 0.25;
&:active{
  background-color:#cbcbcb;
}
`
function Coinlist(){
  const [ticker,setTicker]=useRecoilState(tickerState);//가격정보불러오기위한티커
  const [price,setPrice]=useState([]);//가격정보배열
  const [unit,setUnit]=useState(``);//단위
  const [isClicked,setIsClicked]=useState(true);//오름/내림차순
  const [guideState,setGuideState]=useState(1);
  let filteredMarket = useRecoilValue(marketSelector(unit));
  const [search,setSearch]=useRecoilState(searchState);
  if(search[0]!=``){
    filteredMarket=filteredMarket.filter((item)=>item.market.endsWith(search));
  }

  let tickers=``;

  filteredMarket.map((c,index)=>{
    tickers+=filteredMarket[index].market+`%2c`;  
  });

  tickers=tickers.substring(0,tickers.length-3);

  setTicker(tickers);
  
  async function getPrice(){
    try{
      const response=await axios({ method: 'GET',
      url: `https://api.upbit.com/v1/ticker?markets=`+`${ticker}` ,
      header: {accept: 'application/json'}})
      .then((response)=>{
        setPrice(response.data);
      })
    }
    catch(error){
      (console.log(error))
    }
  }

  useEffect(()=>{
    setUnit(`KRW-`);
  },[]);

  const interval= useInterval(()=>{
    getPrice();
  },1000);
  useEffect(()=>{
    setGuideState(3);
  },[]);
  const sortByVolume=(a,b)=>{
    switch(guideState){
      case 1:
        if(isClicked){
          return b.trade_price-a.trade_price;
        }
        else{
          return a.trade_price-b.trade_price;
        }
      case 2:
        if(isClicked){
          return b.signed_change_price-a.signed_change_price;
        }
        else{
          return a.signed_change_price-b.signed_change_price;
        }
      case 3:
        if(isClicked){
          return b.acc_trade_price_24h - a.acc_trade_price_24h;
        }
        else{
          return a.acc_trade_price_24h - b.acc_trade_price_24h;
        }
    default:
      break;
    }
  }

  let func=sortByVolume;
  filteredMarket = price.map(item2 => ({
    ...item2,
    korean_name: filteredMarket.find(item1 => item1.market === item2.market)?.korean_name
  }));
  filteredMarket=filteredMarket.sort(func);
  const list=filteredMarket.map((c,index)=>{
    return <Coininfo key={index} info={filteredMarket[index]} price={filteredMarket[index]}></Coininfo>
  });
  
  return (
    <ListBody>
      <div>
        <UnitBtn onClick={()=>{
          setUnit(`KRW-`);
        }}>KRW</UnitBtn>
        <UnitBtn onClick={()=>{
          setUnit(`USDT-`);
        }}>USD</UnitBtn>
        <UnitBtn onClick={()=>{
          setUnit(`BTC-`);
        }}>BTC</UnitBtn>
      </div>
      <Guides>
        <p >이름</p>
        <p onClick={()=>{
          setGuideState(1);
          setIsClicked(!isClicked);
        }
        }>현재가</p>
        <p onClick={()=>{
          setGuideState(2);
          setIsClicked(!isClicked);
        }}>전일대비</p>
        <p onClick={()=>{
          setGuideState(3);
          setIsClicked(!isClicked);
        }}>거래량</p>
      </Guides>
      <CoinList>{list}</CoinList>
    </ListBody>
  );
}

export default Coinlist;