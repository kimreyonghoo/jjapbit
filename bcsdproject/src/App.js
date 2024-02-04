import './App.css';
import axios from 'axios';
import { Router } from 'react-router-dom';
import Coinlist from './Coinlist';
import { useRecoilState } from 'recoil';
import { infoState } from './atom';
import { useEffect } from 'react';

function App() {
  const [info,setInfo]=useRecoilState(infoState);
  async function getCoin(){
    await axios	// 코인 데이터를 가져오기 위해 axios 사용
    .request({
      method: 'GET',
      url: 'https://api.upbit.com/v1/market/all?isDetails=false',
      headers: {accept: 'application/json'}
    })
    .then(function (response) {
      setInfo(response.data);
    })
  }
  useEffect(
    ()=>{getCoin()}
  ,[]);
  
  return (
    <div className="App">
      <Coinlist></Coinlist>
    </div>
  );
}

export default App;
