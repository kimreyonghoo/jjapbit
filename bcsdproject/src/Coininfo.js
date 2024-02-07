import React, { useState,useEffect } from "react";
import { useRecoilState } from "recoil";

function Coininfo({info,price}){//코인 정보 한줄
  if(price){
    let tardeVolume=price.acc_trade_price_24h;
    if(tardeVolume>=1000000){
      tardeVolume=Math.floor(price.acc_trade_price_24h/1000000);
    }
    return(
      <div className="coinList" style={{
        display:`flex`,
        flexDirection:`row`,
        justifyContent:`space-between`,
        width:`800px`,
        backgroundColor:`#cbcbcb`
      }}>
          <div>{info.korean_name}</div>
          <div>{price.trade_price.toLocaleString()} {price.market.substr(0,3)}</div>
          <div>{tardeVolume.toLocaleString()} 백만</div>
     </div>
    );
  }
}
export default Coininfo;