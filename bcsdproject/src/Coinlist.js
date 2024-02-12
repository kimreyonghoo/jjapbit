import React, { useState,useEffect,useRef } from "react";
import Coininfo from "./Coininfo";
import { useRecoilState,useRecoilValue } from "recoil";
import { marketState, marketSelector,tickerState,searchState } from "./atom";
import axios from "axios";
import styled from 'styled-components'

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
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

  const [ticker,setTicker]=useRecoilState(tickerState);
  const [price,setPrice]=useState([]);
  const [unit,setUnit]=useState(``);
  let filteredMarket = useRecoilValue(marketSelector(unit));
  const [search,setSearch]=useRecoilState(searchState);
  if(search[0]!=``){
    filteredMarket=filteredMarket.filter((item)=>item.market.endsWith(search));
  }

  let tickers=``;
  let list=filteredMarket.map((c,index)=>{
    tickers+=filteredMarket[index].market+`%2c`;  
    return <Coininfo key={index} info={filteredMarket[index]} price={price[index]}></Coininfo>
  });

  tickers=tickers.substring(0,tickers.length-3);
  setTicker(tickers);
  async function getPrice(){
    await axios	
      .request({
        method: 'GET',
        url: `https://api.upbit.com/v1/ticker?markets=`+`${ticker}` ,
        header: {accept: 'application/json'}
      })
      .then((response)=>{
          setPrice(response.data);
        })
      .catch((error)=>(console.log(error)))
  }

  useEffect(()=>{
    setUnit(`KRW-`);
  },[]);

  const interval= useInterval(()=>{
    getPrice();
  },1000);
 
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
        <p>이름</p>
        <p>현재가</p>
        <p>전일대비</p>
        <p>거래량</p>
      </Guides>
      <CoinList>{list}</CoinList>
    </ListBody>
  );
}

export default Coinlist;