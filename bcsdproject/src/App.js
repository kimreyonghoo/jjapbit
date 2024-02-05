import './App.css';
import axios from 'axios';
import { Router } from 'react-router-dom';
import Coinlist from './Coinlist';
import Topbar from './Topbar';
import { useRecoilState } from 'recoil';
import { marketState } from './atom';
import { useEffect } from 'react';

function App() {
  const [info,setInfo]=useRecoilState(marketState);
  async function getCoin(){
    await axios	
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
      <Topbar></Topbar>
      <Coinlist></Coinlist>
    </div>
  );
}

export default App;
