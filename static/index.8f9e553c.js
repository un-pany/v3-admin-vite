import{_ as n,o as a,f as e,b as s,y as r,a as i,i as t,j as d}from"./index.e1a14bd2.js";const o={class:"app-container"};const c=n({},[["render",function(n,s){return a(),e("div",o,"Admin 权限可见")}]]),u={class:"app-container"};const l=n({},[["render",function(n,s){return a(),e("div",u,"Editor 权限可见")}]]),m=s({__name:"index",setup(n){const e=r(),s=i("admin");return e.roles.includes("admin")||(s.value="editor"),(n,e)=>(a(),t(d("admin"===s.value?c:l)))}});export{m as default};