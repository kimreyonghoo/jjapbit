import axios from "axios";
import { useState,useEffect,useRef } from "react";
import { useParams } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import useInterval from "./hooks/useInterval";
import { type } from "@testing-library/user-event/dist/type";
import styled from "styled-components";
import ChartInfo from "./ChartInfo";
import { useRecoilState } from "recoil";
import { infoState } from "./atom";
const Pagediv=styled.div`
    display:flex;
    flex-direction:column;
    height:100vh;
    width:50vw;
    align-items:center;
    justify-content:center;
    `
function CoinChart(){
    const [marketInfo,setInfo]=useRecoilState(infoState); 
    const params=useParams();
    const [dateState,setDate]=useState();
    const [priceState,setPrice]=useState([]);
    const [unitState,setUnit]=useState(`/60`);
    const [candleTime,setCandleTime]=useState(`minutes`);
    const [candlePrice,setCandlePrice]=useState([]);

    async function getPrice(){
        try{
          const response=await axios({ method: 'GET',
          url: `https://api.upbit.com/v1/ticker?markets=`+`${params.market}` ,
          header: {accept: 'application/json'}})
          .then((response)=>{
            setPrice(response.data);
          })
        }
        catch(error){
          (console.log(error))
        }
      }

    async function getCandle(){
      try{
        const response=await axios({ method: 'GET',
        url: `https://api.upbit.com/v1/candles/`+`${candleTime}`+`${unitState}`+`?market=`+`${params.market}`+`&count=200`,//+`${dateState}`+`${timeState}` ,
        header: {accept: 'application/json'}})
        .then((response)=>{
            const filteredCandle=response.data.map(obj => ({
                x: new Date(obj.candle_date_time_kst), 
                y: [obj.opening_price,obj.high_price, obj.low_price , obj.trade_price]
            }));
          setCandlePrice(filteredCandle);
        })
      }
      catch(error){
        (console.log(error))
      }
    }
    useInterval(()=>{
        getPrice();
    },1000);
    useEffect(()=>{
        getCandle();
    },[candleTime,unitState,priceState]);
    const timearr=[{text:`1분`,value:1},{text:`5분`,value:5},{text:`10분`,value:10},{text:`30분`,value:30},{text:`1시간`,value:60},{text:`4시간`,value:240},{text:`1일`,value:300},{text:`1주`,value:400},{text:`1달`,value:500}];
    const [selectState,setSelect]=useState(60);
    const series = [{ data:candlePrice }];
    const option = {
        chart: {
          type: 'candlestick',
          height: 350,
          foreColor:`#ffffff`,
          zoom: {
            type: 'xy',
          }
        },
        responsive: [{
          breakpoint: 800,
          options: {
            chart: {
              height: 300,
              width:500
            }
          }
        }],
        plotOptions: {
          candlestick: {
            colors: {
              upward: '#e93c3c',
              downward: '#659eef'
            },
            wick: {
              useFillColor: false,
            }
          }
        },
        title: {
          text: `${params.market}`,
          align: 'left',
        },
        grid: {
          yaxis: {
            lines: {
              show: true
            }
          }
        },
        xaxis: {
          type: 'datetime',
        },
        yaxis: {
          tooltip: {
            enabled: true
          },
          opposite:true
        }
      };
    return(
        <Pagediv>
            <ChartInfo info={marketInfo}price={priceState[0]}></ChartInfo>
            <select defaultValue={selectState} onChange={(e)=>{
                setSelect(e.target.value);
                if (e.target.value == 300) {
                    setCandleTime('days');
                    setUnit('');
                } else if (e.target.value == 400) {
                    setCandleTime('weeks');
                    setUnit('');
                } else if (e.target.value == 500) {
                    setCandleTime('months');
                    setUnit('');
                } else {
                    setCandleTime('minutes');
                    setUnit('/' + e.target.value);
                }
            }}> 
                {timearr.map((item,index) => (
                <option value={item.value} key={index}>
                    {item.text}
                </option>))}
            </select>
            <ReactApexChart 
            options={option
            }
            series={series}
            type="candlestick"
            height={600}
            width={1000}
            /> 
        </Pagediv>
    )
}
export default CoinChart;