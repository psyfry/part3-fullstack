(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{21:function(e,n,t){},42:function(e,n,t){"use strict";t.r(n);var c=t(1),r=t(16),a=t.n(r),o=(t(21),t(7)),l=t(3),u=t(0),i=function(e){var n=e.name,t=e.phone,c=e.id,r=e.handleDelete;return Object(u.jsx)(u.Fragment,{children:Object(u.jsxs)("tr",{children:[Object(u.jsx)("td",{children:n}),Object(u.jsx)("td",{children:t}),Object(u.jsx)("td",{children:Object(u.jsx)("button",{id:c,value:n,onClick:r,className:"deleteButton",children:"Delete"})})]})})},d=function(e){var n=e.persons,t=e.handleDelete;return console.log("Table Props: ",n),Object(u.jsx)("div",{children:Object(u.jsxs)("table",{id:"entries",children:[Object(u.jsx)("thead",{children:Object(u.jsxs)("tr",{children:[Object(u.jsx)("th",{children:"Name"}),Object(u.jsx)("th",{children:"Phone Number"})]})}),Object(u.jsx)("tbody",{children:n.map((function(e){return Object(u.jsx)(i,{name:e.name,phone:e.number,id:e.id,handleDelete:t},e.name)}))})]})})},s=function(e){var n=e.handleFilter,t=e.filterQuery;return Object(u.jsxs)("div",{children:[Object(u.jsx)("label",{id:"filterLabel",children:"Filter by Name: "}),Object(u.jsx)("input",{id:"filterInput",onChange:n,value:t})]})},b=function(e){var n=e.handleAddPerson,t=e.handleNameInput,c=e.handlePhoneInput,r=e.newNumber,a=e.newName;return Object(u.jsx)("div",{children:Object(u.jsxs)("form",{onSubmit:n,children:[Object(u.jsxs)("div",{children:[Object(u.jsx)("label",{id:"namelabel",children:"Name: "}),Object(u.jsx)("input",{id:"name",onChange:t,value:a})]}),Object(u.jsxs)("div",{children:[Object(u.jsx)("label",{id:"phonelabel",children:"Phone: "}),Object(u.jsx)("input",{id:"phoneInput",onChange:c,value:r})]}),Object(u.jsx)("div",{children:Object(u.jsx)("button",{className:"buttonBar",type:"submit",children:"Add"})})]})})},j=function(e){var n=e.handleAddPerson,t=e.handleNameInput,c=e.handlePhoneInput,r=e.newNumber,a=e.newName,o=e.clearInput,l=""===a&&""===r;return Object(u.jsxs)("div",{children:[Object(u.jsx)(b,{handleNameInput:t,handlePhoneInput:c,newName:a,newNumber:r,handleAddPerson:n}),l?"":Object(u.jsx)("button",{onClick:o,disabled:l,className:"buttonBar",children:"Clear"})]})},h=t(4),f=t.n(h),m="/api/persons",O=function(){return f.a.get(m).then((function(e){return e.data}))},p=function(e){return f.a.post(m,e).then((function(e){return e.data}))},x=function(e){return f.a.delete("".concat(m,"/").concat(e)).then((function(e){return e.data}))},v=function(e,n){return f.a.put("".concat(m,"/").concat(e),n).then((function(e){return e.data}))},g=function(e){var n=e.notice;return null===n?null:Object(u.jsx)("div",{style:{backgroundColor:"#D0F5FB",border:"1px solid black",width:"75vw",boxShadow:"0px 0px 16px 4px #E5E5E5",margin:"10px",textIndent:"2rem"},children:Object(u.jsx)("h4",{children:n})})},w=function(){var e=Object(c.useState)([]),n=Object(l.a)(e,2),t=n[0],r=n[1],a=Object(c.useState)(""),i=Object(l.a)(a,2),b=i[0],h=i[1],f=Object(c.useState)(""),m=Object(l.a)(f,2),w=m[0],N=m[1],P=Object(c.useState)(""),I=Object(l.a)(P,2),E=I[0],y=I[1],k=Object(c.useState)(null),C=Object(l.a)(k,2),T=C[0],D=C[1];Object(c.useEffect)((function(){O().then((function(e){r(e),console.log("Response successful")}))}),[]);var S=t.filter((function(e){var n=E.replace(/[#-.]|[[-^]|[?|{}]/g,"\\$&");return new RegExp(n,"i").test(e.name)}));return Object(u.jsxs)("div",{children:[Object(u.jsx)("h1",{children:"Phonebook"}),Object(u.jsx)(g,{notice:T}),Object(u.jsx)(j,{handleNameInput:function(e){return h(e.target.value)},handlePhoneInput:function(e){return N(e.target.value)},newName:b,newNumber:w,handleAddPerson:function(e){e.preventDefault();var n;n=b,t.some((function(e){return Object.values(e).includes(n)}))?window.confirm("".concat(b," is already added to phonebook, replace old number with new one?"))?function(e){var n=t.find((function(n){return n.name===e})),c=n.id;console.log("name: ",e,"Person: ",n);var a=Object(o.a)(Object(o.a)({},n),{},{number:w});v(c,a).then((function(n){D("Updated ".concat(e,"'s phone number")),setTimeout((function(){D(null)}),5e3),r(t.map((function(t){return t.name!==e?t:n})))})).catch((function(n){D("Error updating entry for ".concat(e)),setTimeout((function(){D(null)}),5e3)}))}(b):console.log("Please change name"):function(){var e={name:b,number:w};console.log("PersonObj: ",e),p(e).then((function(e){r(t.concat(e)),D("Added ".concat(b)),setTimeout((function(){D(null)}),5e3),O().then((function(e){r(e),console.log("GET complete")})),h(""),N("")})).catch((function(e){D("Error: Unable to add ".concat(b)),setTimeout((function(){D(null)}),5e3)}))}()},clearInput:function(){h(""),N(""),console.log("state cleared. newName: ",b,"|newNumber: ",w)}}),Object(u.jsx)("br",{}),Object(u.jsx)(s,{handleFilter:function(e){return y(e.target.value)},value:E}),Object(u.jsx)("h1",{children:"Numbers"}),Object(u.jsx)(d,{persons:S,handleDelete:function(e){var n=e.target.id;window.confirm("Confirm delete ".concat(e.target.value," ? "))?x(n).then((function(n){D("Entry for ".concat(e.target.value," deleted")),setTimeout((function(){D(null)}),5e3),O().then((function(e){r(e)}))})).catch((function(n){D("Error: Entry for ".concat(e.target.value," has already been deleted")),setTimeout((function(){D(null)}),5e3),r(t.filter((function(n){return n.name!==e.target.value})))})):console.log("delete cancelled")}})]})};a.a.render(Object(u.jsx)(w,{}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.c04af48b.chunk.js.map