(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{19:function(t,e,i){},20:function(t,e,i){},28:function(t,e,i){"use strict";i.r(e);var n,c=i(0),a=i.n(c),r=i(7),o=i.n(r),l=(i(19),i(20),i(5)),s=i(1),d=a.a.memo((function(t){var e=Object(c.useState)(""),i=Object(l.a)(e,2),n=i[0],a=i[1],r=Object(c.useState)(null),o=Object(l.a)(r,2),d=o[0],u=o[1],j=function(){n.trim()?(t.addItem(n.trim()),a("")):u("Title is required")};return Object(s.jsxs)("div",{children:[Object(s.jsx)("input",{value:n,onChange:function(t){a(t.currentTarget.value)},onKeyPress:function(t){u(null),13===t.charCode&&j()},className:d?"error":""}),Object(s.jsx)("button",{onClick:j,children:"+"}),d&&Object(s.jsx)("div",{className:"error-message",children:d})]})})),u=a.a.memo((function(t){var e=Object(c.useState)(!0),i=Object(l.a)(e,2),n=i[0],a=i[1],r=Object(c.useState)(t.title),o=Object(l.a)(r,2),d=o[0],u=o[1],j=Object(c.useState)(""),b=Object(l.a)(j,2),O=b[0],f=b[1];return n?Object(s.jsx)("span",{onDoubleClick:function(){a(!n)},children:t.title}):Object(s.jsx)("input",{className:"editItem",value:d,onChange:function(t){u(t.currentTarget.value),f("")},onKeyPress:function(e){"Enter"===e.key&&d.trim()?(t.editStateItem(d.trim()),a(!n)):f("value not valid")},placeholder:O})})),j=i(4),b=i(9),O=i(2),f=i(29),m="DELETE_TL",h="SET_FILTER",p="ADD_TL",v="CHANGETITLE_TL",D=Object(f.a)(),I=Object(f.a)(),x=[{id:D,title:"What to learn",filter:"all"},{id:I,title:"What to buy",filter:"all"}],k=function(t,e){return{type:h,id:t,filter:e}},y=i(3),S="DELETETASK",g="ADD_TASK",T="CHANGECHECKED",C="CHANGETITLETASK",E=(n={},Object(y.a)(n,D,[{id:Object(f.a)(),title:"HTML",isDone:!0},{id:Object(f.a)(),title:"CSS",isDone:!0},{id:Object(f.a)(),title:"JS",isDone:!1},{id:Object(f.a)(),title:"TS",isDone:!1},{id:Object(f.a)(),title:"Java",isDone:!1}]),Object(y.a)(n,I,[{id:Object(f.a)(),title:"Beer",isDone:!0},{id:Object(f.a)(),title:"Fish",isDone:!0},{id:Object(f.a)(),title:"Chips",isDone:!1},{id:Object(f.a)(),title:"Some milk",isDone:!1},{id:Object(f.a)(),title:"Vine",isDone:!1}]),n),N=a.a.memo((function(t){var e=Object(j.c)((function(t){return t.tasks})),i=Object(j.c)((function(e){return e.todolists.filter((function(e){return e.id===t.todolistId}))[0]})),n=Object(j.b)(),c=e[t.todolistId];return"active"===i.filter&&(c=c.filter((function(t){return!t.isDone}))),"completed"===i.filter&&(c=c.filter((function(t){return t.isDone}))),Object(s.jsxs)("div",{children:[Object(s.jsxs)("h3",{children:[Object(s.jsx)(u,{title:i.title,editStateItem:function(e){n(function(t,e){return{type:v,id:t,title:e}}(t.todolistId,e))}}),Object(s.jsx)("button",{onClick:function(){return n((e=t.todolistId,{type:m,id:e}));var e},children:"deleteTL"})]}),Object(s.jsx)(d,{addItem:function(e){n(function(t,e){return{type:g,id:t,title:e}}(t.todolistId,e))}}),Object(s.jsx)("ul",{children:c.map((function(e){return Object(s.jsxs)("li",{className:e.isDone?"is-done":"",children:[Object(s.jsx)("input",{type:"checkbox",onChange:function(i){var c,a,r;n((c=t.todolistId,a=e.id,r=i.currentTarget.checked,{type:T,id:c,taskID:a,isDone:r}))},checked:e.isDone}),Object(s.jsx)(u,{title:e.title,editStateItem:function(i){n(function(t,e,i){return{type:C,payload:{id:t,taskID:e,title:i}}}(t.todolistId,e.id,i))}}),Object(s.jsx)("button",{onClick:function(){return n((i=t.todolistId,c=e.id,{type:S,id:i,taskID:c}));var i,c},children:"x"})]},e.id)}))}),Object(s.jsxs)("div",{children:[Object(s.jsx)("button",{className:"all"===i.filter?"active-filter":"",onClick:function(){return n(k(t.todolistId,"all"))},children:"All"}),Object(s.jsx)("button",{className:"active"===i.filter?"active-filter":"",onClick:function(){return n(k(t.todolistId,"active"))},children:"Active"}),Object(s.jsx)("button",{className:"completed"===i.filter?"active-filter":"",onClick:function(){return n(k(t.todolistId,"completed"))},children:"Completed"})]})]})}));var A=function(){var t=Object(j.b)(),e=Object(j.c)((function(t){return t.todolists})),i=Object(c.useCallback)((function(e){t(function(t){return{type:p,id:Object(f.a)(),title:t}}(e))}),[t]);return Object(s.jsxs)("div",{className:"App",children:[Object(s.jsx)(d,{addItem:i}),e.map((function(t){return Object(s.jsx)(N,{todolistId:t.id},t.id)}))]})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var w,L=i(12),J=localStorage.getItem("state");J&&(w=JSON.parse(J));var K=Object(L.a)({tasks:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case m:var i=Object(O.a)({},t);return delete i[e.id],i;case p:return Object(O.a)(Object(O.a)({},t),{},Object(y.a)({},e.id,[]));case S:return Object(O.a)(Object(O.a)({},t),{},Object(y.a)({},e.id,t[e.id].filter((function(t){return t.id!==e.taskID}))));case g:var n={id:Object(f.a)(),title:e.title,isDone:!1};return Object(O.a)(Object(O.a)({},t),{},Object(y.a)({},e.id,[n].concat(Object(b.a)(t[e.id]))));case T:return Object(O.a)(Object(O.a)({},t),{},Object(y.a)({},e.id,t[e.id].map((function(t){return t.id===e.taskID?Object(O.a)(Object(O.a)({},t),{},{isDone:e.isDone}):t}))));case C:return Object(O.a)(Object(O.a)({},t),{},Object(y.a)({},e.payload.id,t[e.payload.id].map((function(t){return t.id===e.payload.taskID?Object(O.a)(Object(O.a)({},t),{},{title:e.payload.title}):t}))));default:return t}},todolists:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:x,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case h:return t.map((function(t){return t.id===e.id?Object(O.a)(Object(O.a)({},t),{},{filter:e.filter}):t}));case m:return t.filter((function(t){return t.id!==e.id}));case p:var i={id:e.id,title:e.title,filter:"all"};return[].concat(Object(b.a)(t),[i]);case v:return t.map((function(t){return t.id===e.id?Object(O.a)(Object(O.a)({},t),{},{title:e.title}):t}));default:return t}}}),H=Object(L.b)(K,w);H.subscribe((function(){localStorage.setItem("state",JSON.stringify(H.getState()))})),o.a.render(Object(s.jsx)(j.a,{store:H,children:Object(s.jsx)(A,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[28,1,2]]]);
//# sourceMappingURL=main.1eae7c4c.chunk.js.map