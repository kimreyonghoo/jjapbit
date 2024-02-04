import React from "react";
import Coininfo from "./Coininfo";
import { useRecoilState } from "recoil";
import { infoState } from "./atom";

function Coinlist(){
  const [info,setInfo]=useRecoilState(infoState);
  let i=0;
  console.log(info);
  const list=info.map((c,index)=>{  
    if(/^KRW-/.test(c.market)&&i<10){//원화/BTC/USD 정규식으로 state,page 나눠서 보여주기
      i+=1;
      return <Coininfo key={c.market} info={info[index]}></Coininfo>
    }
  });
  return (
    <div>
        {list}
    </div>
  );
}

export default Coinlist;