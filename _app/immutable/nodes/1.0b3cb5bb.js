import{s as E,n as g,k as y}from"../chunks/scheduler.be0e0057.js";import{S,i as k,g as b,m as _,h as f,j as v,n as m,f as d,k as x,a as j,A as u,o as $}from"../chunks/index.a4331c7f.js";import{d as q}from"../chunks/singletons.af04fdeb.js";const A=()=>{const e=q;return{page:{subscribe:e.page.subscribe},navigating:{subscribe:e.navigating.subscribe},updated:e.updated}},C={subscribe(e){return A().page.subscribe(e)}};function D(e){var h;let s,t,r=e[0].status+"",i,p,l=((h=e[0].error)==null?void 0:h.message)+"",c;return{c(){s=b("div"),t=b("h1"),i=_(r),p=_(": "),c=_(l),this.h()},l(a){s=f(a,"DIV",{class:!0});var o=v(s);t=f(o,"H1",{});var n=v(t);i=m(n,r),p=m(n,": "),c=m(n,l),n.forEach(d),o.forEach(d),this.h()},h(){x(s,"class","error svelte-2l8l59")},m(a,o){j(a,s,o),u(s,t),u(t,i),u(t,p),u(t,c)},p(a,[o]){var n;o&1&&r!==(r=a[0].status+"")&&$(i,r),o&1&&l!==(l=((n=a[0].error)==null?void 0:n.message)+"")&&$(c,l)},i:g,o:g,d(a){a&&d(s)}}}function H(e,s,t){let r;return y(e,C,i=>t(0,r=i)),[r]}let z=class extends S{constructor(s){super(),k(this,s,H,D,E,{})}};export{z as component};
