_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[73],{"9xET":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=n("vhhj").Row;t.default=a},CtZf:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/dashboard/penjualan/toko/penjualan",function(){return n("DNEO")}])},DNEO:function(e,t,n){"use strict";n.r(t);var a=n("4IMT"),r=n.n(a),i=n("FAat"),c=n.n(i),s=n("iJl9"),l=n.n(s),o=n("9xET"),d=n.n(o),u=n("qu0K"),m=n.n(u),b=n("xvhg"),j=n("rg98"),h=n("vJKn"),x=n.n(h),p=n("g4pe"),v=n.n(p),f=n("q1tI"),O=n("kM/w"),g=n("0Jbt"),y=n("PKTO"),w=(n("20a2"),n("xBBV")),k=(n("kc6U"),n("NyWP")),N=n.n(k),_=n("nKUr");P.getInitialProps=function(){var e=Object(j.a)(x.a.mark((function e(t){var n,a,r,i,c;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=N.a.get(t),e.next=3,B(n);case 3:return a=e.sent,e.next=6,a.json();case 6:return r=e.sent,e.next=9,E(n);case 9:return i=e.sent,e.next=12,i.json();case 12:return c=e.sent,e.abrupt("return",{props:{user:r,locations:c}});case 14:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();var B=function(){var e=Object(j.a)(x.a.mark((function e(t){var n,a;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://js-strapi.keelola.net/api/users/me",n={method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer "+t.token}},e.next=4,fetch("https://js-strapi.keelola.net/api/users/me",n);case 4:return a=e.sent,e.abrupt("return",a);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),E=function(){var e=Object(j.a)(x.a.mark((function e(t){var n,a;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://js-strapi.keelola.net/api/locations",n={method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer "+t.token}},e.next=4,fetch("https://js-strapi.keelola.net/api/locations",n);case 4:return a=e.sent,e.abrupt("return",a);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();function P(e){var t=e.props,n=t.user,a=t.locations.data,i=m.a.useForm(),s=Object(b.a)(i,1)[0],o=Object(f.useState)("BEBAS"),u=o[0],j=o[1];return Object(_.jsxs)(_.Fragment,{children:[Object(_.jsx)(v.a,{children:Object(_.jsx)("title",{children:"Penjualan Toko"})}),Object(_.jsx)(g.a,{children:Object(_.jsxs)(y.a,{style:{},children:[Object(_.jsx)(w.a,{titleText:"Penjualan Toko"}),Object(_.jsx)(O.a,{children:Object(_.jsxs)(m.a,{form:s,name:"add",initialValues:{remember:!0},onFinish:function(){},children:[Object(_.jsxs)(d.a,{justify:"space-between",children:[Object(_.jsx)("button",{disabled:!0,className:"bg-yellow-500 rounded-md",children:Object(_.jsx)("p",{className:"px-3 py-2 m-0 font-bold text-white uppercase",children:u})}),Object(_.jsxs)("div",{children:["BEBAS"===u?Object(_.jsx)("button",{onClick:function(){return j("BEBAS")},className:"bg-white rounded-md border border-cyan-700 m-1 text-sm",children:Object(_.jsx)("p",{className:"px-4 py-2 m-0 text-cyan-700",children:"BEBAS"})}):Object(_.jsx)("button",{onClick:function(){return j("BEBAS")},className:"bg-cyan-700 rounded-md m-1 text-sm",children:Object(_.jsx)("p",{className:"px-4 py-2 m-0 text-white",children:"BEBAS"})}),"RESEP"===u?Object(_.jsx)("button",{onClick:function(){return j("RESEP")},className:"bg-white rounded-md border border-cyan-700 m-1 text-sm",children:Object(_.jsx)("p",{className:"px-4 py-2 m-0 text-cyan-700",children:"RESEP"})}):Object(_.jsx)("button",{onClick:function(){return j("RESEP")},className:"bg-cyan-700 rounded-md m-1 text-sm",children:Object(_.jsx)("p",{className:"px-4 py-2 m-0 text-white",children:"RESEP"})}),Object(_.jsx)("button",{className:"bg-cyan-700 rounded-md m-1 text-sm",children:Object(_.jsx)("p",{className:"px-4 py-2 m-0 text-white",children:"Laporan Penjualan"})})]}),Object(_.jsx)("div",{children:Object(_.jsx)("p",{children:n.name})})]}),Object(_.jsxs)("div",{className:"flex flex-wrap -mx-3 mb-6 mt-5",children:[Object(_.jsx)("div",{className:"w-full md:w-1/4 px-3 mb-2 md:mb-0",children:Object(_.jsx)(m.a.Item,{name:"customer_name",rules:[{required:!0,message:"Nama Pelanggan tidak boleh kosong!"}],children:Object(_.jsx)(l.a,{style:{height:"50px"},placeholder:"Nama Pelanggan"})})}),Object(_.jsx)("div",{className:"w-full md:w-1/4 px-3 mb-2 md:mb-0",children:Object(_.jsx)(m.a.Item,{name:"address",children:Object(_.jsx)(l.a,{style:{height:"50px"},placeholder:"Alamat"})})}),Object(_.jsx)("div",{className:"w-full md:w-1/4 px-3 mb-2 md:mb-0",children:Object(_.jsx)(m.a.Item,{name:"phone",children:Object(_.jsx)(l.a,{style:{height:"50px"},placeholder:"No. Telp"})})}),Object(_.jsx)("div",{className:"w-full md:w-1/4 px-3 mb-2 md:mb-0",children:Object(_.jsx)(m.a.Item,{name:"faktur",children:Object(_.jsx)(l.a,{style:{height:"50px"},placeholder:"Faktur"})})}),Object(_.jsxs)("div",{className:"w-full md:w-1/4 px-3 mb-2 md:mb-0",children:[Object(_.jsx)(m.a.Item,{name:"tempo_days",initialValue:0,noStyle:!0,children:Object(_.jsx)(l.a,{size:"large",style:{width:"50%"}})}),Object(_.jsx)(m.a.Item,{name:"tempo_time",initialValue:"Hari",noStyle:!0,children:Object(_.jsxs)(c.a,{size:"large",style:{width:"50%"},children:[Object(_.jsx)(c.a.Option,{value:"Hari",children:"Hari"},"Hari"),Object(_.jsx)(c.a.Option,{value:"Bulan",children:"Bulan"},"Bulan")]})})]}),Object(_.jsx)("div",{className:"w-full md:w-1/4 px-3 mb-2 md:mb-0",children:Object(_.jsx)(m.a.Item,{name:"location",rules:[{required:!0,message:"Lokasi tidak boleh kosong!"}],children:Object(_.jsx)(c.a,{placeholder:"Pilih Lokasi",size:"large",style:{width:"100%"},children:a.map((function(e){return Object(_.jsx)(c.a.Option,{value:e.id,children:e.attributes.name},e.attributes.name)}))})})})]}),Object(_.jsx)(r.a,{htmlType:"submit",className:" hover:text-white hover:bg-cyan-700 border border-cyan-700 ml-1",children:"Tambah"})]})})]})})]})}t.default=P},HWoU:function(e,t,n){"use strict";var a=n("284h"),r=n("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=r(n("3tO9")),c=a(n("q1tI")),s=r(n("lYt9")),l=r(n("KQxl")),o=function(e,t){return c.createElement(l.default,(0,i.default)((0,i.default)({},e),{},{ref:t,icon:s.default}))};o.displayName="CalculatorOutlined";var d=c.forwardRef(o);t.default=d},kc6U:function(e,t,n){"use strict";n.d(t,"a",(function(){return I}));var a=n("aOJk"),r=n.n(a),i=n("EQeY"),c=n.n(i),s=n("HWoU"),l=n.n(s),o=n("MUZu"),d=n.n(o),u=n("3YMB"),m=n.n(u),b=n("wIya"),j=n.n(b),h=n("FAat"),x=n.n(h),p=n("d76Q"),v=n.n(p),f=n("+P9B"),O=n.n(f),g=n("xvhg"),y=n("q1tI"),w=n.n(y),k=n("G7Ku"),N=n("jmRU"),_=n("qw/b"),B=n("3Yy8"),E=n("oun0"),P=n("vWxj"),S=n("nKUr");function C(e){var t=e.onConfirm,n=e.onCancel,a=e.title,r=e.message,i=e.id,c=w.a.useState(!1),s=Object(g.a)(c,2),l=s[0],o=s[1],d=function(){o(!1)},u=function(){n(),d()};return Object(S.jsxs)("div",{children:[Object(S.jsxs)("button",{className:"hover:bg-red-400 text-red-600 hover:text-white transition-colors  text-xs font-normal py-2 px-2 rounded-md",onClick:function(){o(!0)},children:[Object(S.jsx)(O.a,{className:"mr-2 mt-0.5 float float-left"})," Batalkan"]}),Object(S.jsxs)(N.a,{open:l,onClose:u,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[Object(S.jsxs)(P.a,{id:"alert-dialog-title",className:"font-bold",children:[" ",a]}),Object(S.jsx)(B.a,{children:Object(S.jsx)(E.a,{id:"alert-dialog-description",children:r})}),Object(S.jsxs)(_.a,{children:[Object(S.jsx)(k.a,{onClick:u,children:"Tidak"}),Object(S.jsx)(k.a,{onClick:function(){t(i),d()},className:"text-red-500",children:"Ya"})]})]})]})}var T=n("20a2"),D=n("IdFE");function I(e){var t,n,a=e.data,i=e.onDelete,s=e.onUpdate,o=e.onPageChange,u=e.onChangeStatus,b=Object(T.useRouter)(),h=x.a.Option,p="#F50",f="#87D068",O="#F4B042",g=function(){console.log("onCancel")};var y=new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}),w=function(e){return Object(S.jsxs)("div",{children:[Object(S.jsx)("div",{children:Object(S.jsxs)("button",{onClick:function(){return function(e){b.push("pembelian_barang/print/"+e.id)}(e)},className:" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md ",children:[Object(S.jsx)(j.a,{className:"mr-2 mt-0.5 float float-left"}),"Cetak"]})}),Object(S.jsx)("div",{children:Object(S.jsxs)("button",{onClick:function(){return function(e){b.push("pembelian_barang/print/"+e.id)}(e)},className:" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md ",children:[Object(S.jsx)(m.a,{className:"mr-2 mt-0.5 float float-left"}),"Lihat"]})}),"Diterima"===e.attributes.status?Object(S.jsx)("div",{}):Object(S.jsxs)("button",{onClick:function(){return t=e.id,void s(t);var t},className:" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md ",children:[Object(S.jsx)(d.a,{className:"mr-2 mt-0.5 float float-left"}),"Edit"]}),Object(S.jsx)(C,{onCancel:g,onConfirm:function(t){return function(e,t){console.log(e),i(e,t)}(t,e)},title:"Batalkan Transaksi",message:"Transaksi yang dibatalkan tidak dapat dikembalikan lagi. Lanjutkan?",id:e.id}),Object(S.jsx)("div",{className:"mt-4",children:Object(S.jsxs)("button",{onClick:function(){return function(e){b.push("pembelian_barang/pembayaran/"+e.id)}(e)},className:" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md ",children:[Object(S.jsx)(l.a,{className:"mr-2 mt-0.5 float float-left"}),"Pembayaran"]})}),Object(S.jsx)("div",{children:Object(S.jsxs)("button",{onClick:function(){return function(e){b.push("retur/"+e.id)}(e)},className:" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md ",children:[Object(S.jsx)(D.B,{className:"mr-2 mt-0.5 float float-left"}),"Retur Pembelian"]})})]})},k=[{name:"NO LPB",width:"180px",selector:function(e){var t,n;return null!==(t=null===(n=e.attributes)||void 0===n?void 0:n.no_purchasing)&&void 0!==t?t:"-"}},{name:"Supplier",width:"180px",selector:function(e){var t,n;return null!==(t=null===(n=e.attributes)||void 0===n?void 0:n.supplier.data.attributes.name)&&void 0!==t?t:"-"}},{name:"Nota Supplier",width:"180px",selector:function(e){var t,n;return null!==(t=null===(n=e.attributes)||void 0===n?void 0:n.no_nota_suppplier)&&void 0!==t?t:"-"}},{name:"Tanggal",width:"150px",selector:function(e){var t;return function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"id-ID";return new Date(e).toLocaleDateString(t)}(null===(t=e.attributes)||void 0===t?void 0:t.date_purchasing)}},{name:"Lokasi",width:"200px",selector:function(e){var t;return null===(t=e.attributes)||void 0===t?void 0:t.location.data.attributes.name}},{name:"Status",width:"200px",selector:function(e){return Object(S.jsx)(S.Fragment,{children:Object(S.jsxs)(x.a,{defaultValue:e.attributes.status,bordered:!1,disabled:"Selesai"===e.attributes.status||"Dibatalkan"===e.attributes.status,onChange:function(t){return u(t,e)},style:{width:"150px"},children:[Object(S.jsx)(h,{value:"Diproses",className:"text-black",children:Object(S.jsx)(c.a,{color:"default",children:"Diproses"})},"Diproses"),Object(S.jsx)(h,{value:"Dibatalkan",className:"text-black",children:Object(S.jsx)(c.a,{color:"error",children:"Dibatalkan"})},"Dibatalkan"),Object(S.jsx)(h,{value:"Selesai",className:"text-black",children:Object(S.jsx)(c.a,{color:"success",children:"Selesai"})},"Selesai")]})})}},{name:"Tempo",width:"150px",selector:function(e){var t,n,a,r,i,s,l=new Date(null===(t=e.attributes)||void 0===t?void 0:t.date_purchasing),o=parseInt(null!==(n=null===(a=e.attributes)||void 0===a?void 0:a.tempo_days)&&void 0!==n?n:0),d=new Date,u=!1,m=null===(r=e.attributes)||void 0===r?void 0:r.status_pembayaran,b=null===(i=e.attributes)||void 0===i?void 0:i.purchasing_payments.data;return"Hari"===(null===(s=e.attributes)||void 0===s?void 0:s.tempo_time)?l.setDate(l.getDate()+o):l.setDate(l.getMonth()+o),l<d&&(u=!0),u?"Belum Lunas"===m?Object(S.jsx)(c.a,{color:"red",children:"Tempo"}):"Lunas"===m?Object(S.jsx)(c.a,{color:"green",children:"Selesai"}):Object(S.jsx)(c.a,{color:O,children:"Menunggu"}):"Belum Lunas"===m&&b.length>0?Object(S.jsx)(c.a,{color:p,children:"Tempo"}):"Lunas"===m&&b.length>0?Object(S.jsx)(c.a,{color:f,children:"Selesai"}):Object(S.jsx)(c.a,{color:O,children:"Menunggu"})}},{name:"Pembayaran",width:"150px",selector:function(e){var t,n,a=null===(t=e.attributes.purchasing_payments)||void 0===t||null===(n=t.data)||void 0===n?void 0:n.length,r=e.attributes.purchasing_payments.data[a-1];return(null===r||void 0===r?void 0:r.attributes.payment_remaining)===(null===r||void 0===r?void 0:r.attributes.total_payment)?Object(S.jsx)(c.a,{color:p,children:"Belum Dibayar"}):(null===r||void 0===r?void 0:r.attributes.payment_remaining)>0&&(null===r||void 0===r?void 0:r.attributes.payment_remaining)<(null===r||void 0===r?void 0:r.attributes.total_payment)?Object(S.jsx)(c.a,{color:O,children:"Dibayar Sebagian"}):(null===r||void 0===r?void 0:r.attributes.payment_remaining)<=0?Object(S.jsx)(c.a,{color:f,children:"Selesai"}):Object(S.jsx)(c.a,{color:O,children:"Dibayar Sebagian"})}},{name:"Total Beli",width:"150px",selector:function(e){var t,n;return y.format(null!==(t=null===(n=e.attributes)||void 0===n?void 0:n.total_purchasing)&&void 0!==t?t:0)}},{name:"Tindakan",width:"250px",selector:function(e){return Object(S.jsx)(S.Fragment,{children:Object(S.jsx)(r.a,{content:w(e),placement:"bottom",trigger:"click",children:Object(S.jsx)("button",{className:" text-cyan-700  transition-colors  text-xs font-normal py-2 rounded-md ",children:"Tindakan"})})})}}];return Object(S.jsx)(v.a,{customStyles:{headerStyle:{textAlign:"center"},headCells:{style:{color:"white",background:"#036B82"}}},onChangePage:o,paginationRowsPerPageOptions:[10],paginationTotalRows:null===a||void 0===a||null===(t=a.meta)||void 0===t||null===(n=t.pagination)||void 0===n?void 0:n.total,columns:k,data:a.data,pagination:!0,noDataComponent:"Belum ada data Pembelian"})}},lYt9:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M251.2 387H320v68.8c0 1.8 1.8 3.2 4 3.2h48c2.2 0 4-1.4 4-3.3V387h68.8c1.8 0 3.2-1.8 3.2-4v-48c0-2.2-1.4-4-3.3-4H376v-68.8c0-1.8-1.8-3.2-4-3.2h-48c-2.2 0-4 1.4-4 3.2V331h-68.8c-1.8 0-3.2 1.8-3.2 4v48c0 2.2 1.4 4 3.2 4zm328 0h193.6c1.8 0 3.2-1.8 3.2-4v-48c0-2.2-1.4-4-3.3-4H579.2c-1.8 0-3.2 1.8-3.2 4v48c0 2.2 1.4 4 3.2 4zm0 265h193.6c1.8 0 3.2-1.8 3.2-4v-48c0-2.2-1.4-4-3.3-4H579.2c-1.8 0-3.2 1.8-3.2 4v48c0 2.2 1.4 4 3.2 4zm0 104h193.6c1.8 0 3.2-1.8 3.2-4v-48c0-2.2-1.4-4-3.3-4H579.2c-1.8 0-3.2 1.8-3.2 4v48c0 2.2 1.4 4 3.2 4zm-195.7-81l61.2-74.9c4.3-5.2.7-13.1-5.9-13.1H388c-2.3 0-4.5 1-5.9 2.9l-34 41.6-34-41.6a7.85 7.85 0 00-5.9-2.9h-50.9c-6.6 0-10.2 7.9-5.9 13.1l61.2 74.9-62.7 76.8c-4.4 5.2-.8 13.1 5.8 13.1h50.8c2.3 0 4.5-1 5.9-2.9l35.5-43.5 35.5 43.5c1.5 1.8 3.7 2.9 5.9 2.9h50.8c6.6 0 10.2-7.9 5.9-13.1L383.5 675zM880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-36 732H180V180h664v664z"}}]},name:"calculator",theme:"outlined"}},rg98:function(e,t,n){"use strict";function a(e,t,n,a,r,i,c){try{var s=e[i](c),l=s.value}catch(o){return void n(o)}s.done?t(l):Promise.resolve(l).then(a,r)}function r(e){return function(){var t=this,n=arguments;return new Promise((function(r,i){var c=e.apply(t,n);function s(e){a(c,r,i,s,l,"next",e)}function l(e){a(c,r,i,s,l,"throw",e)}s(void 0)}))}}n.d(t,"a",(function(){return r}))}},[["CtZf",0,1,13,2,3,4,5,6,7,9,8,10,12,11,14,16,17,18,19,20,23]]]);