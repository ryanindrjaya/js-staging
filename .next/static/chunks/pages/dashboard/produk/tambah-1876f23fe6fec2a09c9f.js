_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[92],{"12ph":function(e,t,n){"use strict";function a(e,t,n){var a;return function(){for(var r=arguments.length,s=new Array(r),o=0;o<r;o++)s[o]=arguments[o];var c=function(){a=null,n||e.apply(void 0,s)},i=n&&!a;clearTimeout(a),a=setTimeout(c,t),i&&e.apply(void 0,s)}}n.r(t),n.d(t,"default",(function(){return a}))},FkZG:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/dashboard/produk/tambah",function(){return n("wgPJ")}])},wgPJ:function(e,t,n){"use strict";n.r(t),function(e){var a=n("4IMT"),r=n.n(a),s=n("MM9K"),o=n.n(s),c=n("Vti8"),i=n.n(c),u=n("rR1Q"),l=n.n(u),p=n("cpVT"),d=n("QpBz"),h=n.n(d),b=n("rg98"),j=n("iJl9"),f=n.n(j),m=n("B8+X"),O=n.n(m),v=n("qu0K"),x=n.n(v),g=n("xvhg"),k=n("vJKn"),y=n.n(k),w=n("q1tI"),S=n("g4pe"),_=n.n(S),T=n("kM/w"),P=n("PKTO"),N=n("NyWP"),C=n.n(N),K=n("FGyW"),U=n("0Jbt"),I=n("xBBV"),q=n("zf01"),A=n("ml6N"),E=n("k1kd"),F=n("+zqw"),B=n("Sqsd"),G=n("20a2"),z=n("Aiso"),R=n.n(z),D=n("HAFu"),J=n("RnN9"),L=n("lzg3"),H=n("n6RN"),M=n("12ph"),V=n("nKUr");function X(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function Q(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?X(Object(n),!0).forEach((function(t){Object(p.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):X(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var W=function(t){var n=t.props,a=Object(w.useState)(),s=a[0],c=a[1],u=Object(w.useState)(),p=u[0],d=u[1],j=Object(w.useState)(!0),m=j[0],v=j[1],k=Object(w.useState)([]),S=k[0],N=k[1],z=Object(w.useState)({status:"",message:""}),X=z[0],W=z[1],Z=x.a.useForm(),$=Object(g.a)(Z,1)[0],Y=Object(w.useState)(!1),ee=Y[0],te=Y[1],ne=Object(w.useState)(!0),ae=ne[0],re=(ne[1],C.a.get(null,"token")),se=Object(G.useRouter)(),oe=Object(w.useRef)(),ce=O.a.Dragger,ie=f.a.TextArea,ue=n.manufactures,le=n.groups,pe=n.locations,de=Object(w.useState)({}),he=de[0],be=de[1],je=Object(w.useState)({}),fe=je[0],me=je[1],Oe=Object(w.useState)({}),ve=(Oe[0],Oe[1]),xe=Object(w.useState)([]),ge=xe[0],ke=xe[1],ye=Object(w.useState)(),we=ye[0],Se=ye[1],_e=Object(w.useState)(),Te=_e[0],Pe=_e[1],Ne={name:"files",multiple:!1,fileList:S,showUploadList:{showDownloadIcon:!1,showRemoveIcon:!0},onRemove:function(e){v(!0),c(),N([])},onChange:function(e){return Object(b.a)(y.a.mark((function t(){var n,a,r,s,o;return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(1!==e.fileList.length){t.next=18;break}if("https://js-strapi.keelola.net/api/upload",n=e.file.originFileObj,(a=new FormData).append("files",n),N(e.fileList),r={method:"POST",headers:{Authorization:"Bearer "+re.token},body:a},!m){t.next=16;break}return v(!1),t.next=11,fetch("https://js-strapi.keelola.net/api/upload",r);case 11:return s=t.sent,t.next=14,s.json();case 14:o=t.sent,200===s.status?(c(o[0]),h.a.success("".concat(e.file.name," berhasil diupload"))):h.a.error("".concat(e.file.name," gagal upload"));case 16:t.next=19;break;case 18:0===e.fileList.length?h.a.info("Gambar berhasil dihapus"):h.a.error("Hanya dapat menambahkan 1 gambar");case 19:case"end":return t.stop()}}),t)})))()}},Ce=function(){var e=Object(b.a)(y.a.mark((function e(t){var n,a,r,o,c,i,u,l,p;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return te(!0),a={id:parseInt(null===t||void 0===t?void 0:t.category_id)},r={id:null===t||void 0===t?void 0:t.subCategories},o={id:null===t||void 0===t?void 0:t.manufactures},c={id:null===t||void 0===t?void 0:t.groups},i=t.locations.map((function(e){return e})),delete t.locations,delete t.category_id,delete t.subCategories,delete t.manufactures,delete t.groups,u=Q(Q({},t),{},{locations:i}),l={category:a,sub_category:r,manufacture:o,group:c,locations:i,image:{id:null===s||void 0===s?void 0:s.id}},console.log("put data",l),e.next=16,Ke(u);case 16:return p=e.sent,console.log(p),e.next=20,Ue(null===p||void 0===p||null===(n=p.data)||void 0===n?void 0:n.id,l);case 20:te(!1);case 21:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Ke=function(){var e=Object(b.a)(y.a.mark((function e(t){var n,a,r,s,o;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://js-strapi.keelola.net/api/products",n={data:t},a=JSON.stringify(n),r={method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+re.token},body:a},e.next=6,fetch("https://js-strapi.keelola.net/api/products",r);case 6:return s=e.sent,e.next=9,s.json();case 9:return o=e.sent,e.abrupt("return",o);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Ue=function(){var e=Object(b.a)(y.a.mark((function e(t,n){var a,r,s,o,i,u,l,p,d;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(r in a="https://js-strapi.keelola.net/api/products/"+t,n)void 0!==n[r].id&&NaN!==n[r].id||delete n[r];return s={data:n},o=JSON.stringify(s),i={method:"PUT",headers:{"Content-Type":"application/json",Authorization:"Bearer "+re.token},body:o},e.prev=5,e.next=8,fetch(a,i);case 8:return u=e.sent,e.next=11,u.json();case 11:l=e.sent,200===u.status?(c(),$.resetFields(),K.b.success("Produk berhasil ditambahkan!",{position:K.b.POSITION.TOP_RIGHT}),se.reload()):null===l||void 0===l||null===(p=l.error)||void 0===p||null===(d=p.details)||void 0===d||d.errors.map((function(e){var t=e.path[0];K.b.error("SKU"===t?"SKU sudah digunakan":"Tidak dapat menambahkan Produk",{position:K.b.POSITION.TOP_RIGHT})})),e.next=18;break;case 15:e.prev=15,e.t0=e.catch(5),K.b.error("Tidak dapat menambahkan Produk",{position:K.b.POSITION.TOP_RIGHT});case 18:case"end":return e.stop()}}),e,null,[[5,15]])})));return function(t,n){return e.apply(this,arguments)}}(),Ie=function(){var e=Object(b.a)(y.a.mark((function e(t){var n,a,r,s;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return W({status:"validating",message:""}),n="https://js-strapi.keelola.net/api/products?filters[SKU][$eq]="+t,a={method:"GET",headers:{Authorization:"Bearer "+re.token}},e.next=5,fetch(n,a);case 5:return r=e.sent,e.next=8,r.json();case 8:s=e.sent,200===r.status?s.data.length>0?W({status:"error",message:"SKU sudah digunakan"}):W({status:"success",message:""}):W({status:"error",message:"Error ketika mengambil data SKU"});case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),qe=function(){var e=Object(b.a)(y.a.mark((function e(t,n){var a,r,s;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=Object.keys(t)[0],r=a.split("_"),s=r[r.length-1],"SKU"===a&&""!==n.SKU?Object(M.default)(Ie,1e3)(n.SKU):"SKU"===a&&""===n.SKU&&W({status:"error",message:"SKU tidak boleh kosong"}),Object(J.default)($,t,n,a,ae),Object(L.default)($,t,n,s,ae);case 6:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}();return Object(V.jsxs)(V.Fragment,{children:[Object(V.jsx)(_.a,{children:Object(V.jsx)("title",{children:"Tambahkan Produk"})}),Object(V.jsx)(U.a,{children:Object(V.jsxs)(P.a,{style:{},children:[Object(V.jsx)(I.a,{titleText:"Tambahkan Produk"}),Object(V.jsx)(T.a,{children:Object(V.jsxs)(x.a,{form:$,name:"add_product",initialValues:{remember:!0},onFinishFailed:function(){$.getFieldsError().forEach((function(e){if(0!==e.errors.length){var t=e.errors[0];l.a.error({message:"Field Masih Kosong",description:t})}}))},onFinish:Ce,onValuesChange:qe,children:[Object(V.jsxs)("div",{className:"flex flex-wrap -mx-3 mb-3",children:[Object(V.jsxs)("div",{className:"w-full md:w-1/3 px-3 mb-2 md:mb-0",children:[Object(V.jsx)(x.a.Item,{name:"name",rules:[{required:!0,message:"Nama Produk tidak boleh kosong!"}],children:Object(V.jsx)(f.a,{style:{height:"40px"},placeholder:"Nama Produk"})}),Object(V.jsx)(q.a,{selectedCategory:p,onSelectCategory:d,setSubCategories:ke,setSelectedSubCategory:Se,selectedSubCategory:we}),Object(V.jsx)(E.a,{subCategories:ge,onSelect:Se,selectedSubCategory:we}),Object(V.jsx)(x.a.Item,{name:"description",children:Object(V.jsx)(ie,{rows:4,placeholder:"Deskripsi"})})]}),Object(V.jsxs)("div",{className:"w-full md:w-1/3 px-3 mb-2 md:mb-0",children:[Object(V.jsx)(x.a.Item,{name:"SKU",hasFeedback:!0,validateStatus:X.status,help:X.message,rules:[{required:!0,message:"SKU tidak boleh kosong!"}],children:Object(V.jsx)(f.a,{style:{height:"40px"},placeholder:"SKU"})}),Object(V.jsx)(A.a,{data:ue.data,selectedManufactures:he,onSelect:be}),Object(V.jsx)(F.a,{data:le,selectedGroups:fe,onSelect:me}),Object(V.jsx)(B.a,{data:pe,onSelect:ve,required:!0})]}),Object(V.jsx)("div",{className:"w-full md:w-1/3 px-3 mb-2 md:mb-0",children:Object(V.jsx)(ce,Q(Q({},Ne),{},{children:null==s?Object(V.jsxs)(V.Fragment,{children:[Object(V.jsx)("p",{className:"ant-upload-drag-icon",children:Object(V.jsx)(i.a,{})}),Object(V.jsx)("p",{className:"ant-upload-text",children:"Klik atau tarik gambar ke kotak ini"}),Object(V.jsx)("p",{className:"ant-upload-hint  m-3",children:"Gambar akan digunakan sebagai contoh tampilan produk"})]}):Object(V.jsx)(R.a,{layout:"fill",loader:function(t){t.src;return e.env.BASE_URL+(null===s||void 0===s?void 0:s.url)},src:e.env.BASE_URL+(null===s||void 0===s?void 0:s.url)})}))})]}),Object(V.jsx)("div",{children:Object(V.jsx)("h6",{className:"",children:"HARGA"})}),Object(V.jsx)(D.a,{getDescUnit:function(){var e,t,n,a,r,s,o,c,i,u,l=$.getFieldsValue(["unit_1","qty_1","unit_2","qty_2","unit_3","qty_3","unit_4","qty_4","unit_5","qty_5"]),p="".concat(null!==(e=l.qty_1)&&void 0!==e?e:""," ").concat(null!==(t=l.unit_1)&&void 0!==t?t:""," "),d="".concat(null!==(n=l.qty_2)&&void 0!==n?n:""," ").concat(null!==(a=l.unit_2)&&void 0!==a?a:""," "),h="".concat(null!==(r=l.qty_3)&&void 0!==r?r:""," ").concat(null!==(s=l.unit_3)&&void 0!==s?s:""," "),b="".concat(null!==(o=l.qty_4)&&void 0!==o?o:""," ").concat(null!==(c=l.unit_4)&&void 0!==c?c:""," "),j="".concat(null!==(i=l.qty_5)&&void 0!==i?i:""," ").concat(null!==(u=l.unit_5)&&void 0!==u?u:""," ");Pe(p+d+h+b+j)},descUnit:Te}),Object(V.jsx)(x.a.Item,{className:"mt-5",children:ee?Object(V.jsx)("div",{className:" flex float-left ml-3 ",children:Object(V.jsx)(o.a,{})}):Object(V.jsxs)(V.Fragment,{children:[Object(V.jsx)(H.a,{onConfirm:function(){var e;return null===oe||void 0===oe||null===(e=oe.current)||void 0===e?void 0:e.click()},onCancel:function(){},title:"Tambah Produk",message:"Apakah anda yakin ingin menambahkan produk ini?",component:Object(V.jsx)(r.a,{className:" hover:text-white hover:bg-cyan-700 border border-cyan-700 ml-1",children:"Simpan"})}),Object(V.jsx)(r.a,{htmlType:"submit",ref:oe})]})})]})})]})})]})};W.getInitialProps=function(){var e=Object(b.a)(y.a.mark((function e(t){var n,a,r,s,o,c,i,u,l,p,d;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=C.a.get(t),e.next=3,Z(n);case 3:return a=e.sent,e.next=6,a.json();case 6:return r=e.sent,e.next=9,ee(n);case 9:return s=e.sent,e.next=12,s.json();case 12:return o=e.sent,e.next=15,te(n);case 15:return c=e.sent,e.next=18,c.json();case 18:return i=e.sent,e.next=21,$(n);case 21:return u=e.sent,e.next=24,u.json();case 24:return l=e.sent,e.next=27,Y(n);case 27:return p=e.sent,e.next=30,p.json();case 30:return d=e.sent,e.abrupt("return",{props:{categories:r,groups:o,locations:i,manufactures:l,subCategories:d}});case 32:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();var Z=function(){var e=Object(b.a)(y.a.mark((function e(t){var n,a;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://js-strapi.keelola.net/api/categories",n={method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer "+t.token}},e.next=4,fetch("https://js-strapi.keelola.net/api/categories",n);case 4:return a=e.sent,e.abrupt("return",a);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),$=function(){var e=Object(b.a)(y.a.mark((function e(t){var n,a;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://js-strapi.keelola.net/api/manufactures",n={method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer "+t.token}},e.next=4,fetch("https://js-strapi.keelola.net/api/manufactures",n);case 4:return a=e.sent,e.abrupt("return",a);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Y=function(){var e=Object(b.a)(y.a.mark((function e(t){var n,a;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://js-strapi.keelola.net/api/sub-categories",n={method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer "+t.token}},e.next=4,fetch("https://js-strapi.keelola.net/api/sub-categories",n);case 4:return a=e.sent,e.abrupt("return",a);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ee=function(){var e=Object(b.a)(y.a.mark((function e(t){var n,a;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://js-strapi.keelola.net/api/groups",n={method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer "+t.token}},e.next=4,fetch("https://js-strapi.keelola.net/api/groups",n);case 4:return a=e.sent,e.abrupt("return",a);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),te=function(){var e=Object(b.a)(y.a.mark((function e(t){var n,a;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://js-strapi.keelola.net/api/locations",n={method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer "+t.token}},e.next=4,fetch("https://js-strapi.keelola.net/api/locations",n);case 4:return a=e.sent,e.abrupt("return",a);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();t.default=W}.call(this,n("8oxB"))}},[["FkZG",0,1,13,2,3,4,5,6,7,9,8,10,12,11,14,15,16,17,18,19,21,22,25,26,30]]]);