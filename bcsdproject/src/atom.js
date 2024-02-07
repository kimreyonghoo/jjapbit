import { atom, selector, selectorFamily } from "recoil";

export const marketState= atom({
    key:'marketState',
    default:[],
});

export const marketSelector=selectorFamily({
    key:`marketSelector`,
    get:(unit)=>({get})=>{
        
        const filtered=get(marketState).filter((item)=>item.market.includes(unit));
       
        return filtered;
    },
})

export const searchState=atom({
    key:`searchState`,
    default:[``],
});

export const tickerState=atom({
    key:`tickerState`,
    default:``,
});
