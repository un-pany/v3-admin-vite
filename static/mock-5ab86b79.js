function e(){return new Promise(((e,a)=>{setTimeout((()=>{Math.random()>.5?e({code:0,data:[{key:1,label:"苹果",value:1},{key:2,label:"香蕉",value:2},{key:3,label:"橘子",value:3}],message:"成功"}):a(new Error("不小心出错了！"))}),3e3)}))}const a=()=>new Promise((e=>{setTimeout((()=>{e([...Array(5)].map(((e,a)=>({id:a,name:`t${a}`}))))}),1e3)})),r=e=>new Promise(((a,r)=>{setTimeout((()=>{r(new Error("sorry"+e))}),1e3)}));export{r as a,a as b,e as g};
