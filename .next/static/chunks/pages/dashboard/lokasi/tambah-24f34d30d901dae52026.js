_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[48],{MM9K:function(e,t,a){"use strict";var n=a("284h").default,r=a("TqRt").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=r(a("pVnL")),l=r(a("lSNA")),s=r(a("J4zp")),c=r(a("TSYQ")),o=r(a("sEfC")),d=r(a("+04X")),u=n(a("q1tI")),m=a("vgIT"),f=a("vCXI"),p=a("KEtS"),b=function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(n=Object.getOwnPropertySymbols(e);r<n.length;r++)t.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(e,n[r])&&(a[n[r]]=e[n[r]])}return a},h=((0,p.tuple)("small","default","large"),null);var j=function(e){var t=e.spinPrefixCls,a=e.spinning,n=void 0===a||a,r=e.delay,p=e.className,j=e.size,x=void 0===j?"default":j,v=e.tip,O=e.wrapperClassName,y=e.style,N=e.children,g=b(e,["spinPrefixCls","spinning","delay","className","size","tip","wrapperClassName","style","children"]),w=u.useState((function(){return n&&!function(e,t){return!!e&&!!t&&!isNaN(Number(t))}(n,r)})),k=(0,s.default)(w,2),T=k[0],I=k[1];u.useEffect((function(){var e=(0,o.default)((function(){I(n)}),r);return e(),function(){var t;null===(t=null===e||void 0===e?void 0:e.cancel)||void 0===t||t.call(e)}}),[r,n]);var E=function(a){var n,r=a.direction,s=(0,c.default)(t,(n={},(0,l.default)(n,"".concat(t,"-sm"),"small"===x),(0,l.default)(n,"".concat(t,"-lg"),"large"===x),(0,l.default)(n,"".concat(t,"-spinning"),T),(0,l.default)(n,"".concat(t,"-show-text"),!!v),(0,l.default)(n,"".concat(t,"-rtl"),"rtl"===r),n),p),o=(0,d.default)(g,["indicator","prefixCls"]),m=u.createElement("div",(0,i.default)({},o,{style:y,className:s,"aria-live":"polite","aria-busy":T}),function(e,t){var a=t.indicator,n="".concat(e,"-dot");return null===a?null:(0,f.isValidElement)(a)?(0,f.cloneElement)(a,{className:(0,c.default)(a.props.className,n)}):(0,f.isValidElement)(h)?(0,f.cloneElement)(h,{className:(0,c.default)(h.props.className,n)}):u.createElement("span",{className:(0,c.default)(n,"".concat(e,"-dot-spin"))},u.createElement("i",{className:"".concat(e,"-dot-item")}),u.createElement("i",{className:"".concat(e,"-dot-item")}),u.createElement("i",{className:"".concat(e,"-dot-item")}),u.createElement("i",{className:"".concat(e,"-dot-item")}))}(t,e),v?u.createElement("div",{className:"".concat(t,"-text")},v):null);if("undefined"!==typeof N){var b=(0,c.default)("".concat(t,"-container"),(0,l.default)({},"".concat(t,"-blur"),T));return u.createElement("div",(0,i.default)({},o,{className:(0,c.default)("".concat(t,"-nested-loading"),O)}),T&&u.createElement("div",{key:"loading"},m),u.createElement("div",{className:b,key:"container"},N))}return m};return u.createElement(m.ConfigConsumer,null,E)},x=function(e){var t=e.prefixCls,a=(0,u.useContext(m.ConfigContext).getPrefixCls)("spin",t),n=(0,i.default)((0,i.default)({},e),{spinPrefixCls:a});return u.createElement(j,(0,i.default)({},n))};x.setDefaultIndicator=function(e){h=e};var v=x;t.default=v},MWTW:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/dashboard/lokasi/tambah",function(){return a("VZf9")}])},QIyF:function(e,t,a){var n=a("Kz5y");e.exports=function(){return n.Date.now()}},TO8r:function(e,t){var a=/\s/;e.exports=function(e){for(var t=e.length;t--&&a.test(e.charAt(t)););return t}},VZf9:function(e,t,a){"use strict";a.r(t);var n=a("4IMT"),r=a.n(n),i=a("MM9K"),l=a.n(i),s=a("iJl9"),c=a.n(s),o=a("rg98"),d=a("qu0K"),u=a.n(d),m=a("xvhg"),f=a("vJKn"),p=a.n(f),b=a("q1tI"),h=a("g4pe"),j=a.n(h),x=a("kM/w"),v=a("0Jbt"),O=a("PKTO"),y=a("xBBV"),N=a("NyWP"),g=a.n(N),w=a("FGyW"),k=a("nKUr");t.default=function(){var e=u.a.useForm(),t=Object(m.a)(e,1)[0],a=Object(b.useState)(!1),n=a[0],i=a[1],s=g.a.get(null,"token"),d=function(){var e=Object(o.a)(p.a.mark((function e(a){var n,r,l,c,o,d;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i(!0),n={data:a},"https://js-strapi.keelola.net/api/locations",r=JSON.stringify(n),l={method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+s.token},body:r},e.next=7,fetch("https://js-strapi.keelola.net/api/locations",l);case 7:return c=e.sent,e.next=10,c.json();case 10:o=e.sent,200===c.status?(t.resetFields(),w.b.success("Data Lokasi berhasil ditambahkan!",{position:w.b.POSITION.TOP_RIGHT})):null===(d=o.error)||void 0===d||d.details.errors.map((function(e){var t=e.path[0];console.log(t),w.b.error("location_id"===t?"Lokasi yang dimasukkan sudah ada. Silahkan coba yang lain":"Tidak dapat menambahkan Lokasi",{position:w.b.POSITION.TOP_RIGHT})})),i(!1);case 13:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(k.jsxs)(k.Fragment,{children:[Object(k.jsx)(j.a,{children:Object(k.jsx)("title",{children:"Tambahkan Lokasi"})}),Object(k.jsx)(v.a,{children:Object(k.jsxs)(O.a,{style:{},children:[Object(k.jsx)(y.a,{titleText:"Tambahkan Lokasi"}),Object(k.jsx)(x.a,{children:Object(k.jsxs)(u.a,{form:t,name:"add_lokasi",initialValues:{remember:!0},onFinish:d,children:[Object(k.jsxs)("div",{className:"flex flex-wrap -mx-3 mb-6",children:[Object(k.jsx)("div",{className:"w-full md:w-1/3 px-3 mb-2 md:mb-0",children:Object(k.jsx)(u.a.Item,{name:"location_id",rules:[{required:!0,message:"Lokasi ID tidak boleh kosong!"}],children:Object(k.jsx)(c.a,{style:{height:"50px"},placeholder:"Lokasi ID"})})}),Object(k.jsx)("div",{className:"w-full md:w-1/3 px-3 mb-2 md:mb-0",children:Object(k.jsx)(u.a.Item,{name:"name",rules:[{required:!0,message:"Nama Lokasi tidak boleh kosong!"}],children:Object(k.jsx)(c.a,{style:{height:"50px"},placeholder:"Nama Lokasi"})})}),Object(k.jsx)("div",{className:"w-full md:w-1/3 px-3 mb-2 md:mb-0",children:Object(k.jsx)(u.a.Item,{name:"street",children:Object(k.jsx)(c.a,{style:{height:"50px"},placeholder:"Alamat"})})}),Object(k.jsx)("div",{className:"w-full md:w-1/3 px-3 mb-2 md:mb-0",children:Object(k.jsx)(u.a.Item,{name:"city",children:Object(k.jsx)(c.a,{style:{height:"50px"},placeholder:"Kota"})})}),Object(k.jsx)("div",{className:"w-full md:w-1/3 px-3 mb-2 md:mb-0",children:Object(k.jsx)(u.a.Item,{name:"province",children:Object(k.jsx)(c.a,{style:{height:"50px"},placeholder:"Provinsi"})})}),Object(k.jsx)("div",{className:"w-full md:w-1/3 px-3 mb-2 md:mb-0",children:Object(k.jsx)(u.a.Item,{name:"country",children:Object(k.jsx)(c.a,{style:{height:"50px"},placeholder:"Negara"})})}),Object(k.jsx)("div",{className:"w-full md:w-1/3 px-3 mb-2 md:mb-0",children:Object(k.jsx)(u.a.Item,{name:"postal_code",children:Object(k.jsx)(c.a,{style:{height:"50px"},placeholder:"Kode Pos"})})}),Object(k.jsx)("div",{className:"w-full md:w-1/3 px-3 mb-2 md:mb-0",children:Object(k.jsx)(u.a.Item,{name:"phone",children:Object(k.jsx)(c.a,{style:{height:"50px"},placeholder:"No.Telp"})})})]}),Object(k.jsx)(u.a.Item,{children:n?Object(k.jsx)("div",{className:" flex float-left ml-3",children:Object(k.jsx)(l.a,{})}):Object(k.jsx)(r.a,{htmlType:"submit",className:" hover:text-white hover:bg-cyan-700 border border-cyan-700 ml-1",children:"Submit"})})]})})]})})]})}},jXQH:function(e,t,a){var n=a("TO8r"),r=/^\s+/;e.exports=function(e){return e?e.slice(0,n(e)+1).replace(r,""):e}},"kM/w":function(e,t,a){"use strict";var n=a("vOnD"),r=a("Bk8I"),i=n.default.div.withConfig({displayName:"layoutContentstyle__LayoutContentStyle",componentId:"sc-1v6s0p-0"})(["width:100%;padding:35px;background-color:#ffffff;border:1px solid ",";height:100%;"],Object(r.palette)("border",0));t.a=i},sEfC:function(e,t,a){var n=a("GoyQ"),r=a("QIyF"),i=a("tLB3"),l=Math.max,s=Math.min;e.exports=function(e,t,a){var c,o,d,u,m,f,p=0,b=!1,h=!1,j=!0;if("function"!=typeof e)throw new TypeError("Expected a function");function x(t){var a=c,n=o;return c=o=void 0,p=t,u=e.apply(n,a)}function v(e){return p=e,m=setTimeout(y,t),b?x(e):u}function O(e){var a=e-f;return void 0===f||a>=t||a<0||h&&e-p>=d}function y(){var e=r();if(O(e))return N(e);m=setTimeout(y,function(e){var a=t-(e-f);return h?s(a,d-(e-p)):a}(e))}function N(e){return m=void 0,j&&c?x(e):(c=o=void 0,u)}function g(){var e=r(),a=O(e);if(c=arguments,o=this,f=e,a){if(void 0===m)return v(f);if(h)return clearTimeout(m),m=setTimeout(y,t),x(f)}return void 0===m&&(m=setTimeout(y,t)),u}return t=i(t)||0,n(a)&&(b=!!a.leading,d=(h="maxWait"in a)?l(i(a.maxWait)||0,t):d,j="trailing"in a?!!a.trailing:j),g.cancel=function(){void 0!==m&&clearTimeout(m),p=0,c=f=o=m=void 0},g.flush=function(){return void 0===m?u:N(r())},g}},tLB3:function(e,t,a){var n=a("jXQH"),r=a("GoyQ"),i=a("/9aa"),l=/^[-+]0x[0-9a-f]+$/i,s=/^0b[01]+$/i,c=/^0o[0-7]+$/i,o=parseInt;e.exports=function(e){if("number"==typeof e)return e;if(i(e))return NaN;if(r(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=r(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=n(e);var a=s.test(e);return a||c.test(e)?o(e.slice(2),a?2:8):l.test(e)?NaN:+e}},xBBV:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));a("q1tI");var n=a("nKUr");function r(e){var t=e.titleText;return Object(n.jsx)("div",{className:"mb-3",children:Object(n.jsxs)("h5",{className:" border-l-4 border-blue-900",children:[Object(n.jsx)("span",{className:"ml-4",children:t})," "]})})}}},[["MWTW",0,1,13,2,3,4,5,6,7,9,8,10,12,11,14,15,16]]]);