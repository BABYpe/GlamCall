import{r as t}from"./react-vendor-D92mXBJ3.js";let e,o,r,i={data:""},a=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,n=/\/\*[^]*?\*\/|  +/g,s=/\n+/g,l=(t,e)=>{let o="",r="",i="";for(let a in t){let n=t[a];"@"==a[0]?"i"==a[1]?o=a+" "+n+";":r+="f"==a[1]?l(n,a):a+"{"+l(n,"k"==a[1]?"":e)+"}":"object"==typeof n?r+=l(n,e?e.replace(/([^,])+/g,t=>a.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,e=>/&/.test(e)?e.replace(/&/g,t):t?t+" "+e:e)):a):null!=n&&(a=/^--/.test(a)?a:a.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=l.p?l.p(a,n):a+":"+n+";")}return o+(e&&i?e+"{"+i+"}":i)+r},d={},c=t=>{if("object"==typeof t){let e="";for(let o in t)e+=o+c(t[o]);return e}return t};function u(t){let e=this||{},o=t.call?t(e.p):t;return((t,e,o,r,i)=>{let u=c(t),p=d[u]||(d[u]=(t=>{let e=0,o=11;for(;e<t.length;)o=101*o+t.charCodeAt(e++)>>>0;return"go"+o})(u));if(!d[p]){let e=u!==t?t:(t=>{let e,o,r=[{}];for(;e=a.exec(t.replace(n,""));)e[4]?r.shift():e[3]?(o=e[3].replace(s," ").trim(),r.unshift(r[0][o]=r[0][o]||{})):r[0][e[1]]=e[2].replace(s," ").trim();return r[0]})(t);d[p]=l(i?{["@keyframes "+p]:e}:e,o?"":"."+p)}let f=o&&d.g?d.g:null;return o&&(d.g=d[p]),m=d[p],y=e,b=r,(g=f)?y.data=y.data.replace(g,m):-1===y.data.indexOf(m)&&(y.data=b?m+y.data:y.data+m),p;var m,y,b,g})(o.unshift?o.raw?((t,e,o)=>t.reduce((t,r,i)=>{let a=e[i];if(a&&a.call){let t=a(o),e=t&&t.props&&t.props.className||/^go/.test(t)&&t;a=e?"."+e:t&&"object"==typeof t?t.props?"":l(t,""):!1===t?"":t}return t+r+(null==a?"":a)},""))(o,[].slice.call(arguments,1),e.p):o.reduce((t,o)=>Object.assign(t,o&&o.call?o(e.p):o),{}):o,(r=e.target,"object"==typeof window?((r?r.querySelector("#_goober"):window._goober)||Object.assign((r||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:r||i),e.g,e.o,e.k);var r}u.bind({g:1});let p=u.bind({k:1});function f(t,i){let a=this||{};return function(){let i=arguments;return function n(s,l){let d=Object.assign({},s),c=d.className||n.className;a.p=Object.assign({theme:o&&o()},d),a.o=/ *go\d+/.test(c),d.className=u.apply(a,i)+(c?" "+c:"");let p=t;return t[0]&&(p=d.as||t,delete d.as),r&&p[0]&&r(d),e(p,d)}}}var m=(t,e)=>(t=>"function"==typeof t)(t)?t(e):t,y=(()=>{let t=0;return()=>""+ ++t})(),b=(()=>{let t;return()=>{if(void 0===t&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");t=!e||e.matches}return t}})(),g=(t,e)=>{switch(e.type){case 0:return{...t,toasts:[e.toast,...t.toasts].slice(0,20)};case 1:return{...t,toasts:t.toasts.map(t=>t.id===e.toast.id?{...t,...e.toast}:t)};case 2:let{toast:o}=e;return g(t,{type:t.toasts.find(t=>t.id===o.id)?1:0,toast:o});case 3:let{toastId:r}=e;return{...t,toasts:t.toasts.map(t=>t.id===r||void 0===r?{...t,dismissed:!0,visible:!1}:t)};case 4:return void 0===e.toastId?{...t,toasts:[]}:{...t,toasts:t.toasts.filter(t=>t.id!==e.toastId)};case 5:return{...t,pausedAt:e.time};case 6:let i=e.time-(t.pausedAt||0);return{...t,pausedAt:void 0,toasts:t.toasts.map(t=>({...t,pauseDuration:t.pauseDuration+i}))}}},h=[],v={toasts:[],pausedAt:void 0},x=t=>{v=g(v,t),h.forEach(t=>{t(v)})},w={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},$=t=>(e,o)=>{let r=((t,e="blank",o)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:e,ariaProps:{role:"status","aria-live":"polite"},message:t,pauseDuration:0,...o,id:(null==o?void 0:o.id)||y()}))(e,t,o);return x({type:2,toast:r}),r.id},j=(t,e)=>$("blank")(t,e);j.error=$("error"),j.success=$("success"),j.loading=$("loading"),j.custom=$("custom"),j.dismiss=t=>{x({type:3,toastId:t})},j.remove=t=>x({type:4,toastId:t}),j.promise=(t,e,o)=>{let r=j.loading(e.loading,{...o,...null==o?void 0:o.loading});return"function"==typeof t&&(t=t()),t.then(t=>{let i=e.success?m(e.success,t):void 0;return i?j.success(i,{id:r,...o,...null==o?void 0:o.success}):j.dismiss(r),t}).catch(t=>{let i=e.error?m(e.error,t):void 0;i?j.error(i,{id:r,...o,...null==o?void 0:o.error}):j.dismiss(r)}),t};var k,O=(t,e)=>{x({type:1,toast:{id:t,height:e}})},z=()=>{x({type:5,time:Date.now()})},D=new Map,A=p`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,M=p`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,N=p`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,T=f("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${t=>t.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${A} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${M} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${t=>t.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${N} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,I=p`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,P=f("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${t=>t.secondary||"#e0e0e0"};
  border-right-color: ${t=>t.primary||"#616161"};
  animation: ${I} 1s linear infinite;
`,F=p`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,H=p`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,_=f("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${t=>t.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${F} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${H} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${t=>t.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,C=f("div")`
  position: absolute;
`,L=f("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,E=p`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,S=f("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${E} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,U=({toast:e})=>{let{icon:o,type:r,iconTheme:i}=e;return void 0!==o?"string"==typeof o?t.createElement(S,null,o):o:"blank"===r?null:t.createElement(L,null,t.createElement(P,{...i}),"loading"!==r&&t.createElement(C,null,"error"===r?t.createElement(T,{...i}):t.createElement(_,{...i})))},Y=t=>`\n0% {transform: translate3d(0,${-200*t}%,0) scale(.6); opacity:.5;}\n100% {transform: translate3d(0,0,0) scale(1); opacity:1;}\n`,Z=t=>`\n0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}\n100% {transform: translate3d(0,${-150*t}%,-1px) scale(.6); opacity:0;}\n`,q=f("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,B=f("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,G=t.memo(({toast:e,position:o,style:r,children:i})=>{let a=e.height?((t,e)=>{let o=t.includes("top")?1:-1,[r,i]=b()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[Y(o),Z(o)];return{animation:e?p(r)+" 0.35s cubic-bezier(.21,1.02,.73,1) forwards":p(i)+" 0.4s forwards cubic-bezier(.06,.71,.55,1)"}})(e.position||o||"top-center",e.visible):{opacity:0},n=t.createElement(U,{toast:e}),s=t.createElement(B,{...e.ariaProps},m(e.message,e));return t.createElement(q,{className:e.className,style:{...a,...r,...e.style}},"function"==typeof i?i({icon:n,message:s}):t.createElement(t.Fragment,null,n,s))});k=t.createElement,l.p=void 0,e=k,o=void 0,r=void 0;var J=({id:e,className:o,style:r,onHeightUpdate:i,children:a})=>{let n=t.useCallback(t=>{if(t){let o=()=>{let o=t.getBoundingClientRect().height;i(e,o)};o(),new MutationObserver(o).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,i]);return t.createElement("div",{ref:n,className:o,style:r},a)},K=u`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,Q=({reverseOrder:e,position:o="top-center",toastOptions:r,gutter:i,children:a,containerStyle:n,containerClassName:s})=>{let{toasts:l,handlers:d}=(e=>{let{toasts:o,pausedAt:r}=((e={})=>{let[o,r]=t.useState(v),i=t.useRef(v);t.useEffect(()=>(i.current!==v&&r(v),h.push(r),()=>{let t=h.indexOf(r);t>-1&&h.splice(t,1)}),[]);let a=o.toasts.map(t=>{var o,r,i;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(o=e[t.type])?void 0:o.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(r=e[t.type])?void 0:r.duration)||(null==e?void 0:e.duration)||w[t.type],style:{...e.style,...null==(i=e[t.type])?void 0:i.style,...t.style}}});return{...o,toasts:a}})(e);t.useEffect(()=>{if(r)return;let t=Date.now(),e=o.map(e=>{if(e.duration===1/0)return;let o=(e.duration||0)+e.pauseDuration-(t-e.createdAt);if(o>=0)return setTimeout(()=>j.dismiss(e.id),o);e.visible&&j.dismiss(e.id)});return()=>{e.forEach(t=>t&&clearTimeout(t))}},[o,r]);let i=t.useCallback(()=>{r&&x({type:6,time:Date.now()})},[r]),a=t.useCallback((t,e)=>{let{reverseOrder:r=!1,gutter:i=8,defaultPosition:a}=e||{},n=o.filter(e=>(e.position||a)===(t.position||a)&&e.height),s=n.findIndex(e=>e.id===t.id),l=n.filter((t,e)=>s>e&&t.visible).length;return n.filter(t=>t.visible).slice(...r?[l+1]:[0,l]).reduce((t,e)=>t+(e.height||0)+i,0)},[o]);return t.useEffect(()=>{o.forEach(t=>{if(t.dismissed)((t,e=1e3)=>{if(D.has(t))return;let o=setTimeout(()=>{D.delete(t),x({type:4,toastId:t})},e);D.set(t,o)})(t.id,t.removeDelay);else{let e=D.get(t.id);e&&(clearTimeout(e),D.delete(t.id))}})},[o]),{toasts:o,handlers:{updateHeight:O,startPause:z,endPause:i,calculateOffset:a}}})(r);return t.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:s,onMouseEnter:d.startPause,onMouseLeave:d.endPause},l.map(r=>{let n=r.position||o,s=((t,e)=>{let o=t.includes("top"),r=o?{top:0}:{bottom:0},i=t.includes("center")?{justifyContent:"center"}:t.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:b()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${e*(o?1:-1)}px)`,...r,...i}})(n,d.calculateOffset(r,{reverseOrder:e,gutter:i,defaultPosition:o}));return t.createElement(J,{id:r.id,key:r.id,onHeightUpdate:d.updateHeight,className:r.visible?K:"",style:s},"custom"===r.type?m(r.message,r):a?a(r):t.createElement(G,{toast:r,position:n}))}))};export{Q as O,j as c};
