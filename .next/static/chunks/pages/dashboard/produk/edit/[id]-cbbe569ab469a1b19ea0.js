_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[76],{BZEI:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/dashboard/produk/edit/[id]",function(){return n("bAmt")}])},bAmt:function(e,t,n){"use strict";n.r(t);var a=n("4IMT"),r=n.n(a),i=n("MM9K"),o=n.n(i),s=n("Vti8"),u=n.n(s),c=n("rR1Q"),l=n.n(c),d=n("cpVT"),p=n("QpBz"),b=n.n(p),j=n("rg98"),v=n("iJl9"),h=n.n(v),f=n("B8+X"),m=n.n(f),g=n("qu0K"),O=n.n(g),x=n("xvhg"),y=n("vJKn"),k=n.n(y),_=n("q1tI"),w=n("g4pe"),S=n.n(w),T=n("kM/w"),N=n("PKTO"),P=n("NyWP"),C=n.n(P),I=n("FGyW"),E=n("20a2"),q=n("Aiso"),A=n.n(q),V=n("0Jbt"),B=n("xBBV"),F=n("zf01"),z=n("ml6N"),G=n("k1kd"),K=n("+zqw"),R=n("Sqsd"),D=n("HAFu"),U=n("n6RN"),J=n("lzg3"),H=n("RnN9"),L=n("nKUr");function M(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function X(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?M(Object(n),!0).forEach((function(t){Object(d.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):M(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var Q=function(e){var t,n,a,i,s,c,d,p,v,f,g,y,w,P,q,M,Q,W,Z,$,Y,ee,te,ne,ae,re,ie,oe=e.props,se=null===oe||void 0===oe?void 0:oe.product.data.id,ue=null===oe||void 0===oe||null===(t=oe.product)||void 0===t?void 0:t.data,ce=null===oe||void 0===oe?void 0:oe.manufactures,le=null===oe||void 0===oe?void 0:oe.groups,de=null===oe||void 0===oe?void 0:oe.locations,pe=null===ue||void 0===ue||null===(n=ue.attributes)||void 0===n||null===(a=n.category)||void 0===a?void 0:a.data,be=null===ue||void 0===ue||null===(i=ue.attributes)||void 0===i||null===(s=i.sub_category)||void 0===s?void 0:s.data,je=null===ue||void 0===ue||null===(c=ue.attributes)||void 0===c||null===(d=c.manufacture)||void 0===d?void 0:d.data,ve=null===ue||void 0===ue||null===(p=ue.attributes)||void 0===p||null===(v=p.group)||void 0===v?void 0:v.data,he=Object(_.useState)(null!==(f=ue.attributes)&&void 0!==f&&null!==(g=f.image)&&void 0!==g&&g.data?null===(y=ue.attributes)||void 0===y||null===(w=y.image)||void 0===w?void 0:w.data[0].attributes:null),fe=he[0],me=he[1],ge=Object(_.useState)(),Oe=ge[0],xe=ge[1],ye=Object(_.useState)(pe.id),ke=ye[0],_e=(ye[1],Object(_.useState)(je.id)),we=(_e[0],_e[1],Object(_.useState)(!0)),Se=we[0],Te=we[1],Ne=Object(_.useState)([]),Pe=Ne[0],Ce=Ne[1],Ie=Object(_.useState)(!0),Ee=Ie[0],qe=(Ie[1],O.a.useForm()),Ae=Object(x.a)(qe,1)[0],Ve=Object(_.useState)(!1),Be=Ve[0],Fe=Ve[1],ze=C.a.get(null,"token"),Ge=Object(E.useRouter)(),Ke=Object(_.useRef)(),Re=m.a.Dragger,De=h.a.TextArea,Ue=Object(_.useState)({}),Je=(Ue[0],Ue[1]),He=Object(_.useState)({}),Le=(He[0],He[1]),Me=Object(_.useState)(),Xe=(Me[0],Me[1]),Qe=Object(_.useState)([]),We=Qe[0],Ze=Qe[1],$e=Object(_.useState)(),Ye=$e[0],et=$e[1],tt=Object(_.useState)(),nt=tt[0],at=tt[1];var rt={name:"files",multiple:!1,fileList:Pe,showUploadList:{showDownloadIcon:!1,showRemoveIcon:!0},onRemove:function(e){Te(!0),me(),Ce([])},onChange:function(e){return Object(j.a)(k.a.mark((function t(){var n,a,r,i,o;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(1!==e.fileList.length){t.next=18;break}if("https://js-strapi.keelola.net/api/upload",n=e.file.originFileObj,(a=new FormData).append("files",n),Ce(e.fileList),r={method:"POST",headers:{Authorization:"Bearer "+ze.token},body:a},!Se){t.next=16;break}return Te(!1),t.next=11,fetch("https://js-strapi.keelola.net/api/upload",r);case 11:return i=t.sent,t.next=14,i.json();case 14:o=t.sent,200===i.status?(me(o[0]),b.a.success("".concat(e.file.name," berhasil diupload"))):b.a.error("".concat(e.file.name," gagal upload"));case 16:t.next=19;break;case 18:0===e.fileList.length?b.a.info("Gambar berhasil dihapus"):b.a.error("Hanya dapat menambahkan 1 gambar");case 19:case"end":return t.stop()}}),t)})))()}},it=function(e){return e.category_id==="".concat(pe.attributes.category_id," - ").concat(pe.attributes.name)?e.category_id=ke:e.category_id=parseInt(e.category_id),e},ot=function(e){return e.subCategories===(null===be||void 0===be?void 0:be.attributes.name)?e.subCategories=be.id:be&&(e.subCategories=parseInt(e.subCategories)),e},st=function(e){return e.manufactures===(null===je||void 0===je?void 0:je.attributes.name)?e.manufactures=je.id:je&&(e.manufactures=parseInt(e.manufactures)),e},ut=function(e){return e.groups===(null===ve||void 0===ve?void 0:ve.attributes.name)?e.groups=ve.id:ve&&(e.groups=parseInt(e.groups)),e},ct=function(){var e=Object(j.a)(k.a.mark((function e(t){var n,a,r,i,o,s,u,c,l,d,p,b,j,v,h,f,m,g,O,x,y,_,w,S;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(j in console.log("values",t),Fe(!0),t=it(t),t=ot(t),t=st(t),t=ut(t),c={id:parseInt(null===(n=t)||void 0===n?void 0:n.category_id)},l={id:null!==(a=parseInt(null===(r=t)||void 0===r?void 0:r.subCategories))&&void 0!==a?a:null},d={id:parseInt(null===(i=t)||void 0===i?void 0:i.manufactures)},p={id:parseInt(null===(o=t)||void 0===o?void 0:o.groups)},t.locations=(null===(s=t)||void 0===s||null===(u=s.locations)||void 0===u?void 0:u.map((function(e){return e.value?{id:e.value}:{id:e}})))||[],delete t.category_id,delete t.subCategories,delete t.manufactures,delete t.groups,""===(b={category:c,sub_category:l,manufacture:d,group:p,image:{id:null===fe||void 0===fe?void 0:fe.id}}).sub_category.id&&delete b.sub_category,t)void 0!==t[j]&&null!==t[j]||delete t[j];for(v in b)(null===(null===(h=b[v])||void 0===h?void 0:h.id)||isNaN(null===(f=b[v])||void 0===f?void 0:f.id))&&delete b[v];for(m=X(X({},t),b),g=1;g<6;g++)"-"===m["purchase_discount_".concat(g)]&&delete m["purchase_discount_".concat(g)];return O={data:m},x=JSON.stringify(O),console.log("tester",b),y={method:"PUT",headers:{"Content-Type":"application/json",Authorization:"Bearer "+ze.token},body:x},_="https://js-strapi.keelola.net/api/products/"+se,e.next=28,fetch(_,y);case 28:return w=e.sent,e.next=31,w.json();case 31:S=e.sent,200===w.status?(I.b.success("Produk berhasil diperbarui!",{position:I.b.POSITION.TOP_RIGHT}),Ge.push("/dashboard/produk")):(console.log(S),I.b.error("Tidak dapat memperbarui Produk",{position:I.b.POSITION.TOP_RIGHT})),Fe(!1);case 34:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(L.jsxs)(L.Fragment,{children:[Object(L.jsx)(S.a,{children:Object(L.jsx)("title",{children:"Edit Produk"})}),Object(L.jsx)(V.a,{children:Object(L.jsxs)(N.a,{style:{},children:[Object(L.jsx)(B.a,{titleText:"Edit Produk"}),Object(L.jsx)(T.a,{children:Object(L.jsxs)(O.a,{form:Ae,name:"edit_product",initialValues:{remember:!0},onFinish:ct,onFinishFailed:function(){Ae.getFieldsError().forEach((function(e){if(0!==e.errors.length){var t=e.errors[0];l.a.error({message:"Field Masih Kosong",description:t})}}))},onValuesChange:function(e,t){var n=Object.keys(e)[0],a=n.split("_"),r=a[a.length-1];Object(H.default)(Ae,e,t,n,Ee),Object(J.default)(Ae,e,t,r,Ee)},children:[Object(L.jsxs)("div",{className:"flex flex-wrap -mx-3 mb-3",children:[Object(L.jsxs)("div",{className:"w-full md:w-1/3 px-3 mb-2 md:mb-0",children:[Object(L.jsx)(O.a.Item,{name:"name",initialValue:null===ue||void 0===ue||null===(P=ue.attributes)||void 0===P?void 0:P.name,rules:[{required:!0,message:"Nama Produk tidak boleh kosong!"}],children:Object(L.jsx)(h.a,{style:{height:"40px"},placeholder:"Nama Produk"})}),Object(L.jsx)(F.a,{initialValue:"".concat(pe.attributes.category_id," - ").concat(pe.attributes.name),selectedCategory:Oe,onSelectCategory:xe,setSubCategories:Ze,setSelectedSubCategory:et,selectedSubCategory:Ye}),Object(L.jsx)(G.a,{subCategories:We,onSelect:et,selectedSubCategory:Ye,initialValue:"".concat(null!==(q=null===(M=ue.attributes)||void 0===M||null===(Q=M.sub_category)||void 0===Q||null===(W=Q.data)||void 0===W?void 0:W.attributes.name)&&void 0!==q?q:"")}),Object(L.jsx)(O.a.Item,{name:"description",initialValue:null!==(Z=null===($=ue.attributes)||void 0===$?void 0:$.description)&&void 0!==Z?Z:"",children:Object(L.jsx)(De,{rows:4,placeholder:"Deskripsi"})})]}),Object(L.jsxs)("div",{className:"w-full md:w-1/3 px-3 mb-2 md:mb-0",children:[Object(L.jsx)(O.a.Item,{name:"SKU",rules:[{required:!0,message:"SKU tidak boleh kosong!"}],initialValue:null!==(Y=null===(ee=ue.attributes)||void 0===ee?void 0:ee.SKU)&&void 0!==Y?Y:"",children:Object(L.jsx)(h.a,{style:{height:"40px"},placeholder:"SKU"})}),Object(L.jsx)(z.a,{data:ce.data,initialValue:null===(te=ue.attributes)||void 0===te||null===(ne=te.manufacture)||void 0===ne?void 0:ne.data,onSelect:Je}),Object(L.jsx)(K.a,{data:le,onSelect:Le,initialValue:null===(ae=ue.attributes)||void 0===ae||null===(re=ae.group)||void 0===re?void 0:re.data}),Object(L.jsx)(R.a,{required:!0,data:de,onSelect:Xe,initialValue:null===(ie=ue.attributes)||void 0===ie?void 0:ie.locations.data})]}),Object(L.jsx)("div",{className:"w-full md:w-1/3 px-3 mb-2 md:mb-0",children:Object(L.jsx)(Re,X(X({},rt),{},{children:null==fe?Object(L.jsxs)(L.Fragment,{children:[Object(L.jsx)("p",{className:"ant-upload-drag-icon",children:Object(L.jsx)(u.a,{})}),Object(L.jsx)("p",{className:"ant-upload-text",children:"Klik atau tarik gambar ke kotak ini"}),Object(L.jsx)("p",{className:"ant-upload-hint  m-3",children:"Gambar akan digunakan sebagai contoh tampilan produk"})]}):Object(L.jsx)(A.a,{layout:"fill",loader:function(e){e.src;return"https://js-strapi.keelola.net/api"+(null===fe||void 0===fe?void 0:fe.url)},src:"https://js-strapi.keelola.net/api"+(null===fe||void 0===fe?void 0:fe.url)})}))})]}),Object(L.jsx)("div",{children:Object(L.jsx)("h6",{className:"",children:"HARGA"})}),Object(L.jsx)(D.a,{initialValue:ue.attributes,getDescUnit:function(){var e,t,n,a,r,i,o,s,u,c,l=Ae.getFieldsValue(["unit_1","qty_1","unit_2","qty_2","unit_3","qty_3","unit_4","qty_4","unit_5","qty_5"]),d="".concat(null!==(e=l.qty_1)&&void 0!==e?e:""," ").concat(null!==(t=l.unit_1)&&void 0!==t?t:""," "),p="".concat(null!==(n=l.qty_2)&&void 0!==n?n:""," ").concat(null!==(a=l.unit_2)&&void 0!==a?a:""," "),b="".concat(null!==(r=l.qty_3)&&void 0!==r?r:""," ").concat(null!==(i=l.unit_3)&&void 0!==i?i:""," "),j="".concat(null!==(o=l.qty_4)&&void 0!==o?o:""," ").concat(null!==(s=l.unit_4)&&void 0!==s?s:""," "),v="".concat(null!==(u=l.qty_5)&&void 0!==u?u:""," ").concat(null!==(c=l.unit_5)&&void 0!==c?c:""," ");at(d+p+b+j+v)},descUnit:nt}),Object(L.jsx)(O.a.Item,{children:Be?Object(L.jsx)("div",{className:" flex float-left ml-3 ",children:Object(L.jsx)(o.a,{})}):Object(L.jsxs)(L.Fragment,{children:[Object(L.jsx)(U.a,{onConfirm:function(){var e;return null===Ke||void 0===Ke||null===(e=Ke.current)||void 0===e?void 0:e.click()},onCancel:function(){},title:"Edit Produk",message:"Apakah anda yakin ingin mengedit produk ini?",component:Object(L.jsx)(r.a,{className:" hover:text-white hover:bg-cyan-700 border border-cyan-700 ml-1",children:"Simpan"})}),Object(L.jsx)(r.a,{htmlType:"submit",ref:Ke})]})})]})})]})})]})};Q.getInitialProps=function(){var e=Object(j.a)(k.a.mark((function e(t){var n,a,r,i,o,s,u,c,l,d,p,b,j,v,h;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=C.a.get(t),e.next=3,W(a,t);case 3:return r=e.sent,e.next=6,r.json();case 6:return i=e.sent,o=null===(n=i.data.attributes.category.data)||void 0===n?void 0:n.id,e.next=10,Z(a);case 10:return s=e.sent,e.next=13,s.json();case 13:return u=e.sent,e.next=16,ee(a);case 16:return c=e.sent,e.next=19,c.json();case 19:return l=e.sent,e.next=22,te(a);case 22:return d=e.sent,e.next=25,d.json();case 25:return p=e.sent,e.next=28,$(a);case 28:return b=e.sent,e.next=31,b.json();case 31:return j=e.sent,e.next=34,Y(a,o);case 34:return v=e.sent,e.next=37,v.json();case 37:return h=e.sent,e.abrupt("return",{props:{product:i,categories:u,groups:l,locations:p,manufactures:j,subCategories:h}});case 39:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();var W=function(){var e=Object(j.a)(k.a.mark((function e(t,n){var a,r,i,o;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=n.query.id,r="https://js-strapi.keelola.net/api/products/"+a+"?populate=*",i={method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer "+t.token}},e.next=5,fetch(r,i);case 5:return o=e.sent,e.abrupt("return",o);case 7:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),Z=function(){var e=Object(j.a)(k.a.mark((function e(t){var n,a;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://js-strapi.keelola.net/api/categories",n={method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer "+t.token}},e.next=4,fetch("https://js-strapi.keelola.net/api/categories",n);case 4:return a=e.sent,e.abrupt("return",a);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),$=function(){var e=Object(j.a)(k.a.mark((function e(t){var n,a;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://js-strapi.keelola.net/api/manufactures",n={method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer "+t.token}},e.next=4,fetch("https://js-strapi.keelola.net/api/manufactures",n);case 4:return a=e.sent,e.abrupt("return",a);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Y=function(){var e=Object(j.a)(k.a.mark((function e(t,n){var a,r,i;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a="https://js-strapi.keelola.net/api/sub-categories?populate[category][filters][id][$eq]="+n,r={method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer "+t.token}},e.next=4,fetch(a,r);case 4:return i=e.sent,e.abrupt("return",i);case 6:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),ee=function(){var e=Object(j.a)(k.a.mark((function e(t){var n,a;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://js-strapi.keelola.net/api/groups",n={method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer "+t.token}},e.next=4,fetch("https://js-strapi.keelola.net/api/groups",n);case 4:return a=e.sent,e.abrupt("return",a);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),te=function(){var e=Object(j.a)(k.a.mark((function e(t){var n,a;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://js-strapi.keelola.net/api/locations",n={method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer "+t.token}},e.next=4,fetch("https://js-strapi.keelola.net/api/locations",n);case 4:return a=e.sent,e.abrupt("return",a);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();t.default=Q}},[["BZEI",0,1,13,2,3,4,5,6,7,9,8,10,12,11,14,15,16,17,18,19,21,22,25,26,30]]]);