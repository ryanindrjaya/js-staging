(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[8],{"+i/H":function(e,t,r){"use strict";var n=r("cpVT"),o=r("q1tI"),a=r("X52I"),u=r("2OET"),c=r("N3fz");function i(e){var t=function(){var e=o.useContext(u.a);return Object(c.c)(e),e}(),r=t.formatMessage,n=t.textComponent,a=void 0===n?o.Fragment:n,i=e.id,s=e.description,f=e.defaultMessage,l=e.values,d=e.children,p=e.tagName,v=void 0===p?a:p,y=r({id:i,description:s,defaultMessage:f},l,{ignoreTag:e.ignoreTag});return"function"===typeof d?d(Array.isArray(y)?y:[y]):v?o.createElement(v,null,o.Children.toArray(y)):o.createElement(o.Fragment,null,y)}i.displayName="FormattedMessage";var s=o.memo(i,(function(e,t){var r=e.values,n=Object(a.c)(e,["values"]),o=t.values,u=Object(a.c)(t,["values"]);return Object(c.d)(o,r)&&Object(c.d)(n,u)}));s.displayName="MemoizedFormattedMessage";var f=s,l=r("nKUr");function d(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}t.a=Object(u.c)((function(e){return Object(l.jsx)(f,function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?d(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):d(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},e))}),{withRef:!1})},"5fIB":function(e,t,r){var n=r("7eYB");e.exports=function(e){if(Array.isArray(e))return n(e)},e.exports.default=e.exports,e.exports.__esModule=!0},BdAR:function(e,t,r){"use strict";var n=r("mPvQ"),o=r("/GRZ"),a=r("i2R6"),u=(r("qXWd"),r("48fX")),c=r("tCBg"),i=r("T0f4");function s(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=i(e);if(t){var o=i(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return c(this,r)}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var f=r("q1tI"),l=function(e){u(r,e);var t=s(r);function r(e){var a;return o(this,r),(a=t.call(this,e)).emitChange=function(){a._hasHeadManager&&a.props.headManager.updateHead(a.props.reduceComponentsToState(n(a.props.headManager.mountedInstances),a.props))},a._hasHeadManager=a.props.headManager&&a.props.headManager.mountedInstances,a}return a(r,[{key:"componentDidMount",value:function(){this._hasHeadManager&&this.props.headManager.mountedInstances.add(this),this.emitChange()}},{key:"componentDidUpdate",value:function(){this.emitChange()}},{key:"componentWillUnmount",value:function(){this._hasHeadManager&&this.props.headManager.mountedInstances.delete(this),this.emitChange()}},{key:"render",value:function(){return null}}]),r}(f.Component);t.default=l},CM2u:function(e,t,r){"use strict";var n;Object.defineProperty(t,"__esModule",{value:!0}),t.HeadManagerContext=void 0;var o=((n=r("q1tI"))&&n.__esModule?n:{default:n}).default.createContext({});t.HeadManagerContext=o},YFqc:function(e,t,r){e.exports=r("cTJO")},cTJO:function(e,t,r){"use strict";var n=r("zoAU");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o,a=(o=r("q1tI"))&&o.__esModule?o:{default:o},u=r("Sgtc"),c=r("nOHt"),i=r("vNVm");var s={};function f(e,t,r,n){if(e&&u.isLocalURL(t)){e.prefetch(t,r,n).catch((function(e){0}));var o=n&&"undefined"!==typeof n.locale?n.locale:e&&e.locale;s[t+"%"+r+(o?"%"+o:"")]=!0}}var l=function(e){var t,r=!1!==e.prefetch,o=c.useRouter(),l=a.default.useMemo((function(){var t=u.resolveHref(o,e.href,!0),r=n(t,2),a=r[0],c=r[1];return{href:a,as:e.as?u.resolveHref(o,e.as):c||a}}),[o,e.href,e.as]),d=l.href,p=l.as,v=e.children,y=e.replace,h=e.shallow,m=e.scroll,b=e.locale;"string"===typeof v&&(v=a.default.createElement("a",null,v));var g=(t=a.default.Children.only(v))&&"object"===typeof t&&t.ref,O=i.useIntersection({rootMargin:"200px"}),M=n(O,2),j=M[0],_=M[1],x=a.default.useCallback((function(e){j(e),g&&("function"===typeof g?g(e):"object"===typeof g&&(g.current=e))}),[g,j]);a.default.useEffect((function(){var e=_&&r&&u.isLocalURL(d),t="undefined"!==typeof b?b:o&&o.locale,n=s[d+"%"+p+(t?"%"+t:"")];e&&!n&&f(o,d,p,{locale:t})}),[p,d,_,b,r,o]);var w={ref:x,onClick:function(e){t.props&&"function"===typeof t.props.onClick&&t.props.onClick(e),e.defaultPrevented||function(e,t,r,n,o,a,c,i){("A"!==e.currentTarget.nodeName||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&u.isLocalURL(r))&&(e.preventDefault(),null==c&&n.indexOf("#")>=0&&(c=!1),t[o?"replace":"push"](r,n,{shallow:a,locale:i,scroll:c}))}(e,o,d,p,y,h,m,b)},onMouseEnter:function(e){u.isLocalURL(d)&&(t.props&&"function"===typeof t.props.onMouseEnter&&t.props.onMouseEnter(e),f(o,d,p,{priority:!0}))}};if(e.passHref||"a"===t.type&&!("href"in t.props)){var P="undefined"!==typeof b?b:o&&o.locale,C=o&&o.isLocaleDomain&&u.getDomainLocale(p,P,o&&o.locales,o&&o.domainLocales);w.href=C||u.addBasePath(u.addLocale(p,P,o&&o.defaultLocale))}return a.default.cloneElement(t,w)};t.default=l},dTAc:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isInAmpMode=u,t.useAmp=function(){return u(o.default.useContext(a.AmpStateContext))};var n,o=(n=r("q1tI"))&&n.__esModule?n:{default:n},a=r("r55Z");function u(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.ampFirst,r=void 0!==t&&t,n=e.hybrid,o=void 0!==n&&n,a=e.hasQuery,u=void 0!==a&&a;return r||o&&u}},g4pe:function(e,t,r){e.exports=r("mLbm")},kG2m:function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.default=e.exports,e.exports.__esModule=!0},mLbm:function(e,t,r){"use strict";var n=r("oI91");function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}Object.defineProperty(t,"__esModule",{value:!0}),t.defaultHead=l,t.default=void 0;var a,u=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){var n=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,r):{};n.get||n.set?Object.defineProperty(t,r,n):t[r]=e[r]}return t.default=e,t}(r("q1tI")),c=(a=r("BdAR"))&&a.__esModule?a:{default:a},i=r("r55Z"),s=r("CM2u"),f=r("dTAc");function l(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=[u.default.createElement("meta",{charSet:"utf-8"})];return e||t.push(u.default.createElement("meta",{name:"viewport",content:"width=device-width"})),t}function d(e,t){return"string"===typeof t||"number"===typeof t?e:t.type===u.default.Fragment?e.concat(u.default.Children.toArray(t.props.children).reduce((function(e,t){return"string"===typeof t||"number"===typeof t?e:e.concat(t)}),[])):e.concat(t)}var p=["name","httpEquiv","charSet","itemProp"];function v(e,t){return e.reduce((function(e,t){var r=u.default.Children.toArray(t.props.children);return e.concat(r)}),[]).reduce(d,[]).reverse().concat(l(t.inAmpMode)).filter(function(){var e=new Set,t=new Set,r=new Set,n={};return function(o){var a=!0,u=!1;if(o.key&&"number"!==typeof o.key&&o.key.indexOf("$")>0){u=!0;var c=o.key.slice(o.key.indexOf("$")+1);e.has(c)?a=!1:e.add(c)}switch(o.type){case"title":case"base":t.has(o.type)?a=!1:t.add(o.type);break;case"meta":for(var i=0,s=p.length;i<s;i++){var f=p[i];if(o.props.hasOwnProperty(f))if("charSet"===f)r.has(f)?a=!1:r.add(f);else{var l=o.props[f],d=n[f]||new Set;"name"===f&&u||!d.has(l)?(d.add(l),n[f]=d):a=!1}}}return a}}()).reverse().map((function(e,r){var a=e.key||r;if(!t.inAmpMode&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some((function(t){return e.props.href.startsWith(t)}))){var c=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},e.props||{});return c["data-href"]=c.href,c.href=void 0,c["data-optimized-fonts"]=!0,u.default.cloneElement(e,c)}return u.default.cloneElement(e,{key:a})}))}var y=function(e){var t=e.children,r=u.useContext(i.AmpStateContext),n=u.useContext(s.HeadManagerContext);return u.default.createElement(c.default,{reduceComponentsToState:v,headManager:n,inAmpMode:f.isInAmpMode(r)},t)};t.default=y},mPvQ:function(e,t,r){var n=r("5fIB"),o=r("rlHP"),a=r("KckH"),u=r("kG2m");e.exports=function(e){return n(e)||o(e)||a(e)||u()},e.exports.default=e.exports,e.exports.__esModule=!0},oI91:function(e,t){e.exports=function(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e},e.exports.default=e.exports,e.exports.__esModule=!0},r55Z:function(e,t,r){"use strict";var n;Object.defineProperty(t,"__esModule",{value:!0}),t.AmpStateContext=void 0;var o=((n=r("q1tI"))&&n.__esModule?n:{default:n}).default.createContext({});t.AmpStateContext=o},rlHP:function(e,t){e.exports=function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)},e.exports.default=e.exports,e.exports.__esModule=!0},vNVm:function(e,t,r){"use strict";var n=r("zoAU");Object.defineProperty(t,"__esModule",{value:!0}),t.useIntersection=function(e){var t=e.rootMargin,r=e.disabled||!u,i=o.useRef(),s=o.useState(!1),f=n(s,2),l=f[0],d=f[1],p=o.useCallback((function(e){i.current&&(i.current(),i.current=void 0),r||l||e&&e.tagName&&(i.current=function(e,t,r){var n=function(e){var t=e.rootMargin||"",r=c.get(t);if(r)return r;var n=new Map,o=new IntersectionObserver((function(e){e.forEach((function(e){var t=n.get(e.target),r=e.isIntersecting||e.intersectionRatio>0;t&&r&&t(r)}))}),e);return c.set(t,r={id:t,observer:o,elements:n}),r}(r),o=n.id,a=n.observer,u=n.elements;return u.set(e,t),a.observe(e),function(){u.delete(e),a.unobserve(e),0===u.size&&(a.disconnect(),c.delete(o))}}(e,(function(e){return e&&d(e)}),{rootMargin:t}))}),[r,t,l]);return o.useEffect((function(){if(!u&&!l){var e=a.requestIdleCallback((function(){return d(!0)}));return function(){return a.cancelIdleCallback(e)}}}),[l]),[p,l]};var o=r("q1tI"),a=r("0G5g"),u="undefined"!==typeof IntersectionObserver;var c=new Map}}]);