import React, { useState,useEffect } from "react";
import axios from "axios";

function Coininfo({info}){//코인 정보 한줄
    const ticker=info.market;
    const [priceInfo, setPriceInfo] = useState({});
    async function getPrice(){
        await axios	
        .request({
          method: 'GET',
          url: `https://api.upbit.com/v1/ticker?markets=${ticker}`,
          header: {accept: 'application/json'}
        })
        .then((response)=>{
            setPriceInfo(response.data[0]);
            })
        .catch((error)=>(console.log(error)))
      }
      useEffect(
        ()=>{
            getPrice()
        }
      ,[]);
    return(
        <div className="coinList">
            <div>{info.korean_name}</div>
            <div>{priceInfo.trade_price}</div>
        </div>
    );
}
export default Coininfo;