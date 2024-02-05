import React from "react";
import Coininfo from "./Coininfo";
import { useRecoilState,useRecoilValue } from "recoil";
import { marketState, marketSelector } from "./atom";

function Coinlist(){
  const [info,setInfo]=useRecoilState(marketState);
  console.log(info);
  let unit=`BTC`;
  const filteredMarket = useRecoilValue(marketSelector(unit));
  console.log(filteredMarket);
  const list=filteredMarket.map((c,index)=>{  
   //원화/BTC/USD 정규식으로 state,page 나눠서 보여주기
    return <Coininfo key={c.market} info={filteredMarket[index]}></Coininfo>
  });
  return (
    <div>
      <div style={{
        display:`flex`,
        border:`0.5px solid`,
        flexDirection:`column`,
        alignItems:`center`
    }}>{list}</div>
        
    </div>
  );
}

export default Coinlist;