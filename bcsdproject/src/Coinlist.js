import React, { useState,useEffect,useRef } from "react";
import Coininfo from "./Coininfo";
import { useRecoilState,useRecoilValue } from "recoil";
import { marketState, marketSelector,tickerState,searchState } from "./atom";
import axios from "axios";

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
  },110);

  useEffect(()=>{
   
  },[search])
 
  return (
    <div>
      <div>
        <button onClick={()=>{
          setUnit(`KRW-`);
        }}>KRW</button>
        <button onClick={()=>{
          setUnit(`USDT-`);
        }}>USD</button>
        <button onClick={()=>{
          setUnit(`BTC-`);
        }}>BTC</button>
      </div>
      <div>{list}</div>
    </div>
  );
}

export default Coinlist;