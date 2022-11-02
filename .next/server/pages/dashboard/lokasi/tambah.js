module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/_next/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ({

/***/ "+i/H":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("k004");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_intl__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("F5FC");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





const InjectMassage = props => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__["jsx"])(react_intl__WEBPACK_IMPORTED_MODULE_1__["FormattedMessage"], _objectSpread({}, props));

/* harmony default export */ __webpack_exports__["a"] = (Object(react_intl__WEBPACK_IMPORTED_MODULE_1__["injectIntl"])(InjectMassage, {
  withRef: false
}));

/***/ }),

/***/ "0Bsm":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = withRouter;

var _react = _interopRequireDefault(__webpack_require__("cDcd"));

var _router = __webpack_require__("nOHt");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function withRouter(ComposedComponent) {
  function WithRouterWrapper(props) {
    return /*#__PURE__*/_react.default.createElement(ComposedComponent, Object.assign({
      router: (0, _router).useRouter()
    }, props));
  }

  WithRouterWrapper.getInitialProps = ComposedComponent.getInitialProps;
  WithRouterWrapper.origGetInitialProps = ComposedComponent.origGetInitialProps;

  if (false) {}

  return WithRouterWrapper;
}

/***/ }),

/***/ "0G5g":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestIdleCallback = exports.cancelIdleCallback = void 0;

const requestIdleCallback = typeof self !== 'undefined' && self.requestIdleCallback && self.requestIdleCallback.bind(window) || function (cb) {
  let start = Date.now();
  return setTimeout(function () {
    cb({
      didTimeout: false,
      timeRemaining: function () {
        return Math.max(0, 50 - (Date.now() - start));
      }
    });
  }, 1);
};

exports.requestIdleCallback = requestIdleCallback;

const cancelIdleCallback = typeof self !== 'undefined' && self.cancelIdleCallback && self.cancelIdleCallback.bind(window) || function (id) {
  return clearTimeout(id);
};

exports.cancelIdleCallback = cancelIdleCallback;

/***/ }),

/***/ "0Jbt":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ DashboardLayout; });

// EXTERNAL MODULE: external "antd/lib/layout"
var layout_ = __webpack_require__("VzA1");
var layout_default = /*#__PURE__*/__webpack_require__.n(layout_);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__("h74D");

// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__("YFqc");
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);

// EXTERNAL MODULE: external "react-custom-scrollbars"
var external_react_custom_scrollbars_ = __webpack_require__("qC9r");

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__("F5FC");

// CONCATENATED MODULE: ./components/utility/customScrollBar.js




const CustomScrollBar = ({
  id,
  style,
  children,
  className
}) => /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_react_custom_scrollbars_["Scrollbars"], {
  id: id,
  className: className,
  style: style,
  autoHide: true,
  autoHideTimeout: 1000,
  autoHideDuration: 200 // autoHeight
  ,
  autoHeightMin: 0,
  autoHeightMax: 200,
  thumbMinSize: 30,
  universal: true,
  children: children
});

/* harmony default export */ var customScrollBar = (CustomScrollBar);
// EXTERNAL MODULE: external "antd/lib/menu"
var menu_ = __webpack_require__("a5Fm");
var menu_default = /*#__PURE__*/__webpack_require__.n(menu_);

// CONCATENATED MODULE: ./components/uielements/menu.js

/* harmony default export */ var menu = (menu_default.a);
// EXTERNAL MODULE: ./redux/app/actions.js
var actions = __webpack_require__("Rv81");

// CONCATENATED MODULE: ./config/site.config.js
/* harmony default export */ var site_config = ({
  siteName: 'ISOMORPHIC',
  siteIcon: 'ion-flash',
  footerText: `ERP @ 2022 Created Keelola Teams`,
  enableAnimatedRoute: false,
  apiUrl: 'http://yoursite.com/api/',
  google: {
    analyticsKey: 'UA-xxxxxxxxx-1'
  },
  dashboard: '/dashboard'
});
// EXTERNAL MODULE: external "react-icons/io"
var io_ = __webpack_require__("2yjL");

// CONCATENATED MODULE: ./components/utility/Logo.next.js





function LogoNext({
  collapsed
}) {
  return /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
    className: "isoLogoWrapper",
    children: collapsed ? /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
      children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("h3", {
        children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
          href: "/dashboard",
          children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("a", {
            children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("center", {
              children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(io_["IoIosFlash"], {
                className: "mt-3",
                size: 27
              })
            })
          })
        })
      })
    }) : /*#__PURE__*/Object(jsx_runtime_["jsx"])("h3", {
      children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
        href: "/dashboard",
        children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("a", {
          className: "text-black",
          children: " JAYA SEHAT "
        })
      })
    })
  });
}
// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__("Dtiu");
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// EXTERNAL MODULE: external "styled-theme"
var external_styled_theme_ = __webpack_require__("BnVt");

// EXTERNAL MODULE: ./library/helpers/style_utils.js
var style_utils = __webpack_require__("9OqM");

// EXTERNAL MODULE: ./library/helpers/rtl.js
var rtl = __webpack_require__("evxR");

// CONCATENATED MODULE: ./containers/Sidebar/Sidebar.styles.js




const SidebarWrapper = external_styled_components_default.a.div.withConfig({
  displayName: "Sidebarstyles__SidebarWrapper",
  componentId: "sc-1e24q4y-0"
})([".isomorphicSidebar{z-index:1000;background:", ";width:280px;flex:0 0 280px;.scrollarea{height:calc(100vh - 70px);}@media only screen and (max-width:767px){width:240px !important;flex:0 0 240px !important;}&.ant-layout-sider-collapsed{@media only screen and (max-width:767px){width:0;min-width:0 !important;max-width:0 !important;flex:0 0 0 !important;}}.isoLogoWrapper{height:70px;background:#fff;margin:0;padding:0 10px;text-align:center;overflow:hidden;", ";h3{a{font-size:21px;font-weight:300;line-height:70px;letter-spacing:3px;text-transform:uppercase;color:", ";display:block;text-decoration:none;}}}&.ant-layout-sider-collapsed{.isoLogoWrapper{padding:0;h3{a{font-size:27px;font-weight:500;letter-spacing:0;}}}}.isoDashboardMenu{padding-top:35px;padding-bottom:35px;background:transparent;a{text-decoration:none;font-weight:400;}.ant-menu-item{width:100%;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;margin:0;}.isoMenuHolder{display:flex;align-items:center;svg{color:inherit;margin:", ";", ";}}.anticon{font-size:18px;margin-right:30px;color:inherit;", ";}.nav-text{font-size:14px;color:inherit;font-weight:400;", ";}.ant-menu-item-selected{background-color:rgba(0,0,0,0.4) !important;.anticon{color:#fff;}svg{color:#fff;}.nav-text{color:#fff;}}> li{&:hover{svg,.nav-text{color:#ffffff;}}}}.ant-menu-dark .ant-menu-inline.ant-menu-sub{background:", ";}.ant-menu-submenu-inline,.ant-menu-submenu-vertical{> .ant-menu-submenu-title{width:100%;display:flex;align-items:center;> span{display:flex;align-items:center;}.ant-menu-submenu-arrow{left:", ";right:", ";&:before,&:after{width:8px;", ";}&:before{transform:rotate(-45deg) translateX(3px);}&:after{transform:rotate(45deg) translateX(-3px);}", ";}&:hover{.ant-menu-submenu-arrow{&:before,&:after{color:#ffffff;}}}}.ant-menu-inline,.ant-menu-submenu-vertical{> li:not(.ant-menu-item-group){padding-left:", ";padding-right:", ";font-size:13px;font-weight:400;margin:0;color:inherit;", ";&:hover{a{color:#ffffff !important;}}}.ant-menu-item-group{padding-left:0;.ant-menu-item-group-title{padding-left:100px !important;}.ant-menu-item-group-list{.ant-menu-item{padding-left:125px !important;}}}}.ant-menu-sub{box-shadow:none;background-color:transparent !important;}}&.ant-layout-sider-collapsed{.nav-text{display:none;}.ant-menu-submenu-inline >{.ant-menu-submenu-title:after{display:none;}}.ant-menu-submenu-vertical{> .ant-menu-submenu-title:after{display:none;}.ant-menu-sub{background-color:transparent !important;.ant-menu-item{height:35px;}}}}}"], Object(external_styled_theme_["palette"])("secondary", 0), Object(style_utils["a" /* borderRadius */])(), Object(external_styled_theme_["palette"])("grayscale", 6), props => props["data-rtl"] === "rtl" ? "0 0 0 30px" : "0 30px 0 0", Object(style_utils["c" /* transition */])(), Object(style_utils["c" /* transition */])(), Object(style_utils["c" /* transition */])(), Object(external_styled_theme_["palette"])("secondary", 5), props => props["data-rtl"] === "rtl" ? "25px" : "auto", props => props["data-rtl"] === "rtl" ? "auto" : "25px", Object(style_utils["c" /* transition */])(), ""
/* &:after {
content: '\f123';
font-family: 'Ionicons' !important;
font-size: 16px;
color: inherit;
left: ${props => (props['data-rtl'] === 'rtl' ? '16px' : 'auto')};
right: ${props => (props['data-rtl'] === 'rtl' ? 'auto' : '16px')};
${transition()};
} */
, props => props["data-rtl"] === "rtl" ? "0px !important" : "74px !important", props => props["data-rtl"] === "rtl" ? "74px !important" : "0px !important", Object(style_utils["c" /* transition */])());
/* harmony default export */ var Sidebar_styles = (Object(rtl["a" /* default */])(SidebarWrapper));
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__("4Q3z");

// EXTERNAL MODULE: ./components/utility/intlMessages.js
var intlMessages = __webpack_require__("+i/H");

// CONCATENATED MODULE: ./containers/Sidebar/SidebarMenu.js
const _excluded = ["item", "submenuStyle", "submenuColor"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }









const SubMenu = menu.SubMenu;
function SidebarMenu(_ref) {
  let {
    item,
    submenuStyle,
    submenuColor
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  const router = Object(router_["useRouter"])();
  const {
    key,
    label,
    leftIcon,
    children
  } = item;
  const url = site_config.dashboard;

  const handleClick = (event, linkTo) => {
    event.preventDefault();
    router.push(linkTo);
  };

  if (children) {
    return /*#__PURE__*/Object(jsx_runtime_["jsx"])(SubMenu, _objectSpread(_objectSpread({
      title: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("span", {
        className: "isoMenuHolder",
        style: submenuColor,
        children: [leftIcon, /*#__PURE__*/Object(jsx_runtime_["jsx"])("span", {
          className: "nav-text",
          children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(intlMessages["a" /* default */], {
            id: label
          })
        })]
      })
    }, rest), {}, {
      children: children.map(({
        key,
        label,
        withoutDashboard
      }) => {
        const linkTo = withoutDashboard ? `/${key}` : `${url}/${key}`;
        return /*#__PURE__*/Object(jsx_runtime_["jsx"])(menu.Item, {
          style: submenuStyle,
          children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("a", {
            href: linkTo,
            onClick: even => handleClick(event, linkTo),
            className: "isoMenuHolder",
            style: submenuColor,
            children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(intlMessages["a" /* default */], {
              id: label
            })
          })
        }, key);
      })
    }), key);
  }

  return /*#__PURE__*/Object(jsx_runtime_["jsx"])(menu.Item, _objectSpread(_objectSpread({}, rest), {}, {
    children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
      href: `${url}/${key}`,
      children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("a", {
        className: "isoMenuHolder",
        style: submenuColor,
        children: [leftIcon, /*#__PURE__*/Object(jsx_runtime_["jsx"])("span", {
          className: "nav-text",
          children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(intlMessages["a" /* default */], {
            id: label
          })
        })]
      })
    })
  }), key);
}
// CONCATENATED MODULE: ./config/icon.config.js

 // TopBar Icons

const TopbarMenuIcon = io_["IoMdMenu"]; // Menu icon

const TopbarSearchIcon = io_["IoIosSearch"]; // Search icon

const TopbarNotifyIcon = io_["IoIosNotifications"]; // Notification icon

const TopbarMailIcon = io_["IoMdMail"]; // Notification icon

const TopbarMessageIcon = io_["IoIosChatbubbles"]; // Chat icon

const TopbarCartIcon = io_["IoMdCart"]; // Cart icon
// SideBar Icons

const SidebarBussinesIcon = io_["IoIosBusiness"];
const SidebarPersonIcon = io_["IoIosPerson"];
const SidebarSettingsIcon = io_["IoIosSettings"];
const SidebarReportIcon = io_["IoIosBrowsers"];
const SidebarAccountPayment = io_["IoIosAddCircleOutline"];
const SidebarReceiptIcon = io_["IoIosSwap"];
const SidebarAdjustmentIcon = io_["IoIosTrain"];
const SidebarSaleIcon = io_["IoIosArrowRoundUp"];
const SidebarPurchasesIcon = io_["IoIosArrowRoundDown"];
const SidebarProductIcon = io_["IoIosCube"];
const SidebarContactIcon = io_["IoIosContact"]; // Email icon

const SidebarEmailIcon = io_["IoMdMail"]; // Email icon

const SidebarChatIcon = io_["IoIosChatbubbles"]; // Chat icon

const SidebarEcommerceIcon = io_["IoMdBasket"]; // E-commerce icon

const SidebarMapsIcon = io_["IoMdMap"]; // Map icon

const SidebarProfileIcon = io_["IoIosPerson"]; // Profile icon

const SidebarScrumBoardIcon = io_["IoIosApps"]; // Scrum Board icon

const SidebarInvoiceIcon = io_["IoIosToday"]; // Invoice icon

const SidebarYouTubeIcon = io_["IoLogoYoutube"]; // YouTube icon

const SidebarCalendarIcon = io_["IoIosCalendar"]; // Calendar icon

const SidebarNotesIcon = io_["IoIosPaper"]; // Notes icon

const SidebarToDosIcon = io_["IoMdCheckboxOutline"]; // ToDos icon

const SidebarFireStoreIcon = io_["IoMdFlame"]; // FireStore Crud icon

const SidebarContactsIcon = io_["IoMdPersonAdd"]; // Contacts icon

const SidebarShuffleIcon = io_["IoIosKeypad"]; // Shuffle icon

const SidebarChartsIcon = io_["IoMdTrendingUp"]; // Chart icon

const SidebarFormsIcon = io_["IoMdListBox"]; // Forms icon

const SidebarUIIcon = io_["IoIosLeaf"]; // UI Elements icon

const SidebarAdvancedIcon = io_["IoIosFlash"]; // Advanced Elements icon

const SidebarFeedbackIcon = io_["IoMdThumbsUp"]; // Feedback icon

const SidebarTablesIcon = io_["IoMdGrid"]; // Tables icon

const SidebarPagesIcon = io_["IoIosCopy"]; // Pages icon

const SidebarGithubIcon = io_["IoLogoGithub"]; // Github Search icon

const SidebarBlankIcon = io_["IoIosDocument"]; // Blank Page icon

const SidebarMenuLevelIcon = io_["IoMdOptions"]; // Menu levels icon
// Dashboard Widgets Icons

const StickerWidgetUnreadMailIcon = io_["IoIosMailUnread"]; // Unread email icon

const StickerWidgetImgUploadIcon = io_["IoMdCamera"]; // Image Upload icon

const StickerWidgetMessageIcon = io_["IoIosChatbubbles"]; // Total Messages icon

const StickerWidgetOrderIcon = io_["IoMdCart"]; // Order Post icon

const CardWidgetNewMsgIcon = io_["IoMdChatboxes"]; // Card New Message icon

const CardWidgetVolumeIcon = io_["IoIosMusicalNotes"]; // Card Volume icon

const CardWidgetAchievementIcon = io_["IoMdTrophy"]; // Card Achievement icon

const ProgressDownloadIcon = io_["IoMdCloudDownload"]; // Card Download icon

const ProgressPieChartIcon = io_["IoIosPie"]; // Card Pie icon

const ProgressUploadIcon = io_["IoMdCloudUpload"]; // Card Upload icon

const SocialFacebookIcon = io_["IoLogoFacebook"]; // Social Facebook icon

const SocialTwitterIcon = io_["IoLogoTwitter"]; // Social Twitter icon

const SocialGooglePlusIcon = io_["IoLogoGoogleplus"]; // Social Google Plus icon

const SocialLinkedinIcon = io_["IoLogoLinkedin"]; // Social Linkedin icon

const SocialDribbbleIcon = io_["IoLogoDribbble"]; // Social Dribbble icon
// Mail Icons

const MailDeleteIcon = io_["IoMdTrash"]; // Mail Delete icon

const MailFolderIcon = io_["IoMdFolder"]; // Mail Move icon

const MailTagIcon = io_["IoMdPricetags"]; // Mail Tag icon

const MailArchiveIcon = io_["IoMdArchive"]; // Mail Archive icon

const MailSpamReportIcon = io_["IoMdAlert"]; // Mail Report icon
// E-commerce Icons

const VoiceSearchMicIcon = io_["IoMdMic"]; // Voice Search icon

const VoiceSearchStopIcon = io_["IoIosSquare"]; // Voice Search icon

const GridViewIcon = io_["IoIosKeypad"]; // Grid View icon

const ListViewIcon = io_["IoMdMenu"]; // List View icon
// Common Icons

const ArrowLeftIcon = io_["IoIosArrowBack"]; // Arrow Left icon

const ArrowRightIcon = io_["IoIosArrowForward"]; // Arrow Right icon

const AddIcon = io_["IoMdAdd"]; // Add icon

const CloseIcon = io_["IoMdClose"]; // Close icon

const CartIcon = io_["IoMdCart"]; // Cart icon

const DeleteIcon = io_["IoMdTrash"]; // Delete icon

const EditIcon = io_["IoMdCreate"]; // Edit icon

const MenuIcon = io_["IoMdMenu"]; // Edit icon

const FlameIcon = io_["IoMdFlame"]; // Flame icon
// CONCATENATED MODULE: ./containers/Sidebar/sidebar.navigations.js



/* harmony default export */ var sidebar_navigations = ([{
  key: "",
  label: "sidebar.dashboard",
  leftIcon: /*#__PURE__*/Object(jsx_runtime_["jsx"])(SidebarShuffleIcon, {
    size: 19
  })
}, {
  key: "lokasi",
  label: "sidebar.location",
  leftIcon: /*#__PURE__*/Object(jsx_runtime_["jsx"])(SidebarBussinesIcon, {
    size: 19
  })
}]);
// CONCATENATED MODULE: ./containers/Sidebar/Sidebar.js
















const Sidebar_SubMenu = menu.SubMenu;
const MenuItemGroup = menu.ItemGroup;
const {
  Sider
} = layout_default.a;
const {
  toggleOpenDrawer,
  changeOpenKeys,
  changeCurrent,
  toggleCollapsed: Sidebar_toggleCollapsed
} = actions["a" /* default */];
function Sidebar(props) {
  const {
    view,
    openKeys,
    collapsed,
    openDrawer,
    height,
    current
  } = Object(external_react_redux_["useSelector"])(state => state.App);
  const {
    sidebarTheme
  } = Object(external_react_redux_["useSelector"])(state => state.ThemeSwitcher);
  const dispatch = Object(external_react_redux_["useDispatch"])();

  function handleClick(e) {
    dispatch(changeCurrent([e.key]));

    if (view === "MobileView") {
      setTimeout(() => {
        dispatch(Sidebar_toggleCollapsed()); // dispatch(toggleOpenDrawer());
      }, 100);
    }
  }

  function onOpenChange(newOpenKeys) {
    const latestOpenKey = newOpenKeys.find(key => !(openKeys.indexOf(key) > -1));
    const latestCloseKey = openKeys.find(key => !(newOpenKeys.indexOf(key) > -1));
    let nextOpenKeys = [];

    if (latestOpenKey) {
      nextOpenKeys = getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }

    if (latestCloseKey) {
      nextOpenKeys = getAncestorKeys(latestCloseKey);
    }

    dispatch(changeOpenKeys(nextOpenKeys));
  }

  const getAncestorKeys = key => {
    const map = {
      sub3: ["sub2"]
    };
    return map[key] || [];
  };

  const isCollapsed = collapsed && !openDrawer;
  const mode = isCollapsed === true ? "vertical" : "inline"; // const scrollheight = height;

  const styling = {
    // backgroundColor: process.env.MAIN_COLOR,
    backgroundColor: "#1a6677"
  };
  const submenuStyle = {
    backgroundColor: "rgba(0,0,0,0)",
    color: sidebarTheme.textColor
  };
  const submenuColor = {
    color: "white"
  };

  const onMouseEnter = () => {
    if (collapsed && openDrawer === false) {
      dispatch(toggleOpenDrawer());
    }

    return;
  };

  const onMouseLeave = () => {
    if (collapsed && openDrawer === true) {
      dispatch(toggleOpenDrawer());
    }

    return;
  };

  return /*#__PURE__*/Object(jsx_runtime_["jsx"])(Sidebar_styles, {
    children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])(Sider, {
      trigger: null,
      collapsible: true,
      collapsed: isCollapsed,
      width: 240,
      className: "isomorphicSidebar",
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave,
      style: styling,
      children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(LogoNext, {
        collapsed: isCollapsed
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(customScrollBar, {
        style: {
          height: height - 70
        },
        children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])(menu, {
          onClick: handleClick,
          theme: "dark",
          mode: mode,
          openKeys: isCollapsed ? [] : openKeys,
          selectedKeys: current,
          onOpenChange: onOpenChange,
          className: "isoDashboardMenu" // inlineCollapsed={isCollapsed}
          ,
          children: [sidebar_navigations.map(option => /*#__PURE__*/Object(jsx_runtime_["jsx"])(SidebarMenu, {
            item: option,
            submenuColor: submenuColor,
            submenuStyle: submenuStyle
          }, option.key)), /*#__PURE__*/Object(jsx_runtime_["jsxs"])(Sidebar_SubMenu, {
            title: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("span", {
              className: "isoMenuHolder",
              style: submenuColor,
              children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(SidebarPersonIcon, {
                size: 18
              }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("span", {
                className: "nav-text",
                children: "Kelola Pengguna"
              })]
            }),
            children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(menu.Item, {
              style: submenuStyle,
              children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
                href: "/dashboard/pengguna",
                children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("a", {
                  children: "Pengguna"
                })
              })
            }, "pengguna"), /*#__PURE__*/Object(jsx_runtime_["jsx"])(menu.Item, {
              style: submenuStyle,
              children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
                href: "/dashboard/role",
                children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("a", {
                  children: "Role"
                })
              })
            }, "wewenang"), /*#__PURE__*/Object(jsx_runtime_["jsx"])(menu.Item, {
              style: submenuStyle,
              children: "Agen Komisi Penjualan"
            }, "agen")]
          }, "kelola_pengguna"), /*#__PURE__*/Object(jsx_runtime_["jsx"])(Sidebar_SubMenu, {
            title: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("span", {
              className: "isoMenuHolder",
              style: submenuColor,
              children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(SidebarContactIcon, {
                size: 18
              }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("span", {
                className: "nav-text",
                children: "Kontak"
              })]
            }),
            children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(menu.Item, {
              style: submenuStyle,
              children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
                href: "/dashboard/supplier",
                children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("a", {
                  children: "Supplier"
                })
              })
            }, "supplier")
          }, "kontak"), /*#__PURE__*/Object(jsx_runtime_["jsxs"])(Sidebar_SubMenu, {
            title: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("span", {
              className: "isoMenuHolder",
              style: submenuColor,
              children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(SidebarEcommerceIcon, {
                size: 18
              }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("span", {
                className: "nav-text",
                children: "Produk"
              })]
            }),
            children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(menu.Item, {
              style: submenuStyle,
              children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
                href: "/dashboard/produk/",
                children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("a", {
                  children: "Daftar Produk"
                })
              })
            }, "produk"), /*#__PURE__*/Object(jsx_runtime_["jsx"])(menu.Item, {
              style: submenuStyle,
              children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
                href: "/dashboard/produk/kategori",
                children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("a", {
                  children: "Kategori"
                })
              })
            }, "kategori"), /*#__PURE__*/Object(jsx_runtime_["jsx"])(menu.Item, {
              style: submenuStyle,
              children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
                href: "/dashboard/produk/subkategori",
                children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("a", {
                  children: "Sub Kategori"
                })
              })
            }, "subkategori"), /*#__PURE__*/Object(jsx_runtime_["jsx"])(menu.Item, {
              style: submenuStyle,
              children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
                href: "/dashboard/produk/pabrikasi",
                children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("a", {
                  children: "Pabrikasi"
                })
              })
            }, "pabrikasi"), /*#__PURE__*/Object(jsx_runtime_["jsx"])(menu.Item, {
              style: submenuStyle,
              children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
                href: "/dashboard/produk/golongan",
                children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("a", {
                  children: "Golongan"
                })
              })
            }, "golongan")]
          }, "product"), /*#__PURE__*/Object(jsx_runtime_["jsxs"])(Sidebar_SubMenu, {
            title: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("span", {
              className: "isoMenuHolder",
              style: submenuColor,
              children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(SidebarPurchasesIcon, {
                size: 18
              }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("span", {
                className: "nav-text",
                children: "Pembelian"
              })]
            }),
            children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(menu.Item, {
              style: submenuStyle,
              children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
                href: "/dashboard/pembelian/order_pembelian",
                children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("a", {
                  children: "Order Pembelian"
                })
              })
            }, "order_pembelian"), /*#__PURE__*/Object(jsx_runtime_["jsx"])(menu.Item, {
              style: submenuStyle,
              children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
                href: "/dashboard/pembelian/pembelian_barang",
                children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("a", {
                  children: "Pembelian Barang"
                })
              })
            }, "pembelian_barang"), /*#__PURE__*/Object(jsx_runtime_["jsx"])(menu.Item, {
              style: submenuStyle,
              children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
                href: "/dashboard/pembelian/retur",
                children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("a", {
                  children: "Retur Pembelian"
                })
              })
            }, "retur_pembelian")]
          }, "pembelian"), /*#__PURE__*/Object(jsx_runtime_["jsxs"])(Sidebar_SubMenu, {
            title: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("span", {
              className: "isoMenuHolder",
              style: submenuColor,
              children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(io_["IoIosArrowRoundUp"], {
                size: 18
              }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("span", {
                className: "nav-text",
                children: "Penjualan"
              })]
            }),
            children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(menu.Item, {
              style: submenuStyle,
              children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
                href: "/dashboard/penjualan/toko",
                children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("a", {
                  children: "Penjualan Toko"
                })
              })
            }, "penjualan_toko"), /*#__PURE__*/Object(jsx_runtime_["jsx"])(menu.Item, {
              style: submenuStyle,
              children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
                href: "/dashboard/penjualan/sales",
                children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("a", {
                  children: "Penjualan Sales"
                })
              })
            }, "penjualan_sales"), /*#__PURE__*/Object(jsx_runtime_["jsx"])(menu.Item, {
              style: submenuStyle,
              children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
                href: "/dashboard/penjualan/non_panel",
                children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("a", {
                  children: "Penjualan Non Panel"
                })
              })
            }, "penjualan_non_panel")]
          }, "penjualan")]
        })
      })]
    })
  });
}
// EXTERNAL MODULE: ./redux/themeSwitcher/actions.js
var themeSwitcher_actions = __webpack_require__("n+6I");

// CONCATENATED MODULE: ./components/ThemeSwitcher/ThemeSwitcher.js





const ThemeSwitcher = ({
  config,
  changeTheme,
  selectedId
}) => {
  const {
    id,
    label,
    options
  } = config;
  return /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
    className: "themeSwitchBlock",
    children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("h4", {
      children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(intlMessages["a" /* default */], {
        id: label
      })
    }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
      className: "themeSwitchBtnWrapper",
      children: options.map(option => {
        const {
          themeName,
          buttonColor
        } = option;

        const onClick = () => {
          changeTheme(id, themeName);
        };

        const customClass = themeName === selectedId ? 'selectedTheme' : '';
        return /*#__PURE__*/Object(jsx_runtime_["jsx"])("button", {
          type: "button",
          onClick: onClick,
          className: customClass,
          style: {
            backgroundColor: buttonColor
          }
        }, themeName);
      })
    })]
  });
};

/* harmony default export */ var ThemeSwitcher_ThemeSwitcher = (ThemeSwitcher);
// EXTERNAL MODULE: ./redux/languageSwitcher/actions.js
var languageSwitcher_actions = __webpack_require__("V2m7");

// EXTERNAL MODULE: ./config/language.config.js
var language_config = __webpack_require__("9tsR");

// EXTERNAL MODULE: ./assets/images/flag/uk.svg
var uk = __webpack_require__("KV8h");

// EXTERNAL MODULE: ./assets/images/flag/china.svg
var china = __webpack_require__("UP2L");

// EXTERNAL MODULE: ./assets/images/flag/spain.svg
var spain = __webpack_require__("0bIN");

// EXTERNAL MODULE: ./assets/images/flag/france.svg
var france = __webpack_require__("xfH5");

// EXTERNAL MODULE: ./assets/images/flag/italy.svg
var italy = __webpack_require__("ICFD");

// CONCATENATED MODULE: ./containers/LanguageSwitcher/config.js






const config_config = {
  defaultLanguage: language_config["a" /* default */],
  options: [{
    languageId: 'english',
    locale: 'en',
    text: 'English',
    icon: uk["a" /* default */]
  }, {
    languageId: 'chinese',
    locale: 'zh',
    text: 'Chinese',
    icon: china["a" /* default */]
  }, {
    languageId: 'spanish',
    locale: 'es',
    text: 'Spanish',
    icon: spain["a" /* default */]
  }, {
    languageId: 'french',
    locale: 'fr',
    text: 'French',
    icon: france["a" /* default */]
  }, {
    languageId: 'italian',
    locale: 'it',
    text: 'Italian',
    icon: italy["a" /* default */]
  }]
};
function getCurrentLanguage(lang) {
  let selecetedLanguage = config_config.options[0];
  config_config.options.forEach(language => {
    if (language.languageId === lang) {
      selecetedLanguage = language;
    }
  });
  return selecetedLanguage;
}
/* harmony default export */ var LanguageSwitcher_config = (config_config);
// CONCATENATED MODULE: ./containers/LanguageSwitcher/LanguageSwitcher.js







const {
  changeLanguage
} = languageSwitcher_actions["a" /* default */];
function LanguageSwitcher() {
  const {
    language
  } = Object(external_react_redux_["useSelector"])(state => state.LanguageSwitcher);
  const dispatch = Object(external_react_redux_["useDispatch"])();
  return /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
    className: "themeSwitchBlock",
    children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("h4", {
      children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(intlMessages["a" /* default */], {
        id: "languageSwitcher.label"
      })
    }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
      className: "themeSwitchBtnWrapper",
      children: LanguageSwitcher_config.options.map(option => {
        const {
          languageId,
          icon
        } = option;
        const customClass = languageId === language.languageId ? 'selectedTheme languageSwitch' : 'languageSwitch';
        return /*#__PURE__*/Object(jsx_runtime_["jsx"])("button", {
          type: "button",
          className: customClass,
          onClick: () => {
            dispatch(changeLanguage(languageId));
          },
          children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("img", {
            src: icon,
            alt: "flag"
          })
        }, languageId);
      })
    })]
  });
}
// EXTERNAL MODULE: ./config/theme/theme.config.js + 2 modules
var theme_config = __webpack_require__("mEA0");

// CONCATENATED MODULE: ./containers/ThemeSwitcher/config.js

const changeThemes = {
  id: 'changeThemes',
  label: 'themeSwitcher',
  defaultTheme: theme_config["b" /* themeConfig */].theme,
  options: [{
    themeName: 'defaultTheme',
    buttonColor: '#ffffff',
    textColor: '#323332'
  }, {
    themeName: 'theme2',
    buttonColor: '#ffffff',
    textColor: '#323332'
  }]
};
const config_topbarTheme = {
  id: 'topbarTheme',
  label: 'themeSwitcher.Topbar',
  defaultTheme: theme_config["b" /* themeConfig */].topbar,
  options: [{
    themeName: 'defaultTheme',
    buttonColor: '#ffffff',
    textColor: '#323332'
  }, {
    themeName: 'theme1',
    buttonColor: '#e0364c',
    backgroundColor: '#e0364c',
    textColor: '#ffffff'
  }, {
    themeName: 'theme2',
    buttonColor: '#6534ff',
    backgroundColor: '#6534ff',
    textColor: '#ffffff'
  }, {
    themeName: 'theme3',
    buttonColor: '#4482FF',
    backgroundColor: '#4482FF',
    textColor: '#ffffff'
  }, {
    themeName: 'theme4',
    buttonColor: '#422e62',
    backgroundColor: '#422e62',
    textColor: '#ffffff'
  }, {
    themeName: 'theme5',
    buttonColor: '#22144c',
    backgroundColor: '#22144c',
    textColor: '#ffffff'
  }, {
    themeName: 'theme6',
    buttonColor: '#4670a2',
    backgroundColor: '#4670a2',
    textColor: '#ffffff'
  }, {
    themeName: 'theme7',
    buttonColor: '#494982',
    backgroundColor: '#494982',
    textColor: '#ffffff'
  }]
};
const config_sidebarTheme = {
  id: 'sidebarTheme',
  label: 'themeSwitcher.Sidebar',
  defaultTheme: theme_config["b" /* themeConfig */].sidebar,
  options: [{
    themeName: 'defaultTheme',
    buttonColor: '#323332',
    backgroundColor: undefined,
    textColor: '#788195'
  }, {
    themeName: 'theme1',
    buttonColor: '#e0364c',
    backgroundColor: '#e0364c',
    textColor: '#ffffff'
  }, {
    themeName: 'theme2',
    buttonColor: '#6534ff',
    backgroundColor: '#6534ff',
    textColor: '#ffffff'
  }, {
    themeName: 'theme3',
    buttonColor: '#4482FF',
    backgroundColor: '#4482FF',
    textColor: '#ffffff'
  }, {
    themeName: 'theme4',
    buttonColor: '#422e62',
    backgroundColor: '#422e62',
    textColor: '#ffffff'
  }, {
    themeName: 'theme5',
    buttonColor: '#22144c',
    backgroundColor: '#22144c',
    textColor: '#ffffff'
  }, {
    themeName: 'theme6',
    buttonColor: '#4670a2',
    backgroundColor: '#4670a2',
    textColor: '#ffffff'
  }, {
    themeName: 'theme7',
    buttonColor: '#494982',
    backgroundColor: '#494982',
    textColor: '#ffffff'
  }]
};
const config_layoutTheme = {
  id: 'layoutTheme',
  label: 'themeSwitcher.Background',
  defaultTheme: theme_config["b" /* themeConfig */].layout,
  options: [{
    themeName: 'defaultTheme',
    buttonColor: '#ffffff',
    backgroundColor: '#F1F3F6',
    textColor: undefined
  }, {
    themeName: 'theme1',
    buttonColor: '#ffffff',
    backgroundColor: '#ffffff',
    textColor: '#323232'
  }, {
    themeName: 'theme2',
    buttonColor: '#F9F9F9',
    backgroundColor: '#F9F9F9',
    textColor: '#ffffff'
  }, {
    themeName: 'theme3',
    buttonColor: '#ebebeb',
    backgroundColor: '#ebebeb',
    textColor: '#ffffff'
  }]
};
const customizedThemes = {
  changeThemes,
  topbarTheme: config_topbarTheme,
  sidebarTheme: config_sidebarTheme,
  layoutTheme: config_layoutTheme
};
function getCurrentTheme(attribute, selectedThemename) {
  let selecetedTheme = {};
  customizedThemes[attribute].options.forEach(theme => {
    if (theme.themeName === selectedThemename) {
      selecetedTheme = theme;
    }
  });
  return selecetedTheme;
}
/* harmony default export */ var ThemeSwitcher_config = (customizedThemes);
// CONCATENATED MODULE: ./assets/images/bucket.svg
/* harmony default export */ var bucket = ("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBkPSJNNTkuMDE0IDc5Ljc1MXYzNjQuNjY1YzAgMTkuMzc2IDE1LjcwNiAzNS4wODQgMzUuMDggMzUuMDg0aDMyMy44MTRjMTkuMzc0IDAgMzUuMDgtMTUuNzA4IDM1LjA4LTM1LjA4NFY3OS43NTFINTkuMDE0eiIgZmlsbD0iI2ZmY2M1YSIvPjxwYXRoIGQ9Ik00MjQuMTgxIDc5Ljc1MXYzNjQuNjY1YzAgMTkuMzc2LTE1LjcwNiAzNS4wODQtMzUuMDggMzUuMDg0aDI4LjgwNmMxOS4zNzQgMCAzNS4wNzktMTUuNzA4IDM1LjA3OS0zNS4wODRWNzkuNzUxaC0yOC44MDV6IiBmaWxsPSIjZmZiMDAwIi8+PHBhdGggZD0iTTQ2NC4wOTIgOTAuNzUySDQ3LjkwOGMtOC43MzMgMC0xNS44MTMtNy4wOC0xNS44MTMtMTUuODEzVjQ4LjMxNmMwLTguNzMzIDcuMDgtMTUuODEzIDE1LjgxMy0xNS44MTNoNDE2LjE4NGM4LjczMyAwIDE1LjgxMyA3LjA4IDE1LjgxMyAxNS44MTN2MjYuNjIzYy4wMDEgOC43MzMtNy4wNzkgMTUuODEzLTE1LjgxMyAxNS44MTN6IiBmaWxsPSIjZmZhMjI3Ii8+PHBhdGggZD0iTTQ2NC4wOTMgMzIuNTAyaC0xMi45OTR2MTAuMTQ5YzAgMTAuNjU0LTguNjM2IDE5LjI5MS0xOS4yODkgMTkuMjkxSDMyLjA5NXYxMi45OTZjMCA4LjczNCA3LjA3OSAxNS44MTQgMTUuODEyIDE1LjgxNGg0MTYuMTg2YzguNzMzIDAgMTUuODEyLTcuMDggMTUuODEyLTE1LjgxNFY0OC4zMTdjLjAwMS04LjczNC03LjA3OS0xNS44MTUtMTUuODEyLTE1LjgxNXoiIGZpbGw9IiNmNzhiMGIiLz48cGF0aCBkPSJNMzQwLjU1MSAzNzYuNDM0SDE3MS40NDljLTcuMjk3IDAtMTMuMjEyLTUuOTE1LTEzLjIxMi0xMy4yMTJ2LTI0LjA3OGMwLTcuMjk3IDUuOTE1LTEzLjIxMiAxMy4yMTItMTMuMjEyaDE2OS4xMDJjNy4yOTcgMCAxMy4yMTIgNS45MTUgMTMuMjEyIDEzLjIxMnYyNC4wNzhjMCA3LjI5Ni01LjkxNSAxMy4yMTItMTMuMjEyIDEzLjIxMnoiIGZpbGw9IiNmZjM5NWEiLz48cGF0aCBkPSJNMzQwLjU1MiAzMjUuOTMyaC0yOC44MDZjNy4yOTYgMCAxMy4yMTEgNS45MTYgMTMuMjExIDEzLjIxM3YyNC4wNzdjMCA3LjI5Ny01LjkxNSAxMy4yMTMtMTMuMjExIDEzLjIxM2gyOC44MDZjNy4yOTYgMCAxMy4yMTEtNS45MTYgMTMuMjExLTEzLjIxM3YtMjQuMDc3YzAtNy4yOTgtNS45MTUtMTMuMjEzLTEzLjIxMS0xMy4yMTN6IiBmaWxsPSIjZDgxOTQyIi8+PHBhdGggZD0iTTkzLjU1MiAzMi41MDJ2MTQ0LjI5NmMwIDE4LjgxMSAxNS4yNDcgMzQuMDU5IDM0LjA1NSAzNC4wNTlzMzQuMDU2LTE1LjI0OSAzNC4wNTYtMzQuMDU5di03LjAwNmMwLTE4LjgxIDE1LjI0Ny0zNC4wNTkgMzQuMDU1LTM0LjA1OXMzNC4wNTYgMTUuMjQ5IDM0LjA1NiAzNC4wNTl2NTEuNjM1YzAgMTguODExIDE1LjI0NyAzNC4wNTkgMzQuMDU1IDM0LjA1OXMzNC4wNTUtMTUuMjQ5IDM0LjA1NS0zNC4wNTl2LTk3LjQzOWMwIDE4LjgxMSAxNS4yNDcgMzQuMDYgMzQuMDU1IDM0LjA2czM0LjA1NS0xNS4yNDkgMzQuMDU1LTM0LjA2VjMyLjUwMkg5My41NTJ6IiBmaWxsPSIjMDg4YWZmIi8+PHBhdGggZD0iTTI5Ny44ODUgMTIzLjk4OGMtMTUuOTA5IDAtMjguODA2IDEyLjg5OS0yOC44MDYgMjguODF2NjguNjNjMCAxMy42NjEtOC4wNDUgMjUuNDM3LTE5LjY1MiAzMC44NjRhMzMuOTA4IDMzLjkwOCAwIDAwMTQuNDAzIDMuMTk1YzE4LjgwOCAwIDM0LjA1NS0xNS4yNDkgMzQuMDU1LTM0LjA1OXYtOTcuNDR6bS0xMzAuOTczIDExLjc0NGMtMTguODA4IDAtMzQuMDU1IDE1LjI0OS0zNC4wNTUgMzQuMDZ2Ny4wMDZjMCAxMy42NjEtOC4wNDUgMjUuNDM3LTE5LjY1MiAzMC44NjRhMzMuOTExIDMzLjkxMSAwIDAwMTQuNDAzIDMuMTk1YzE4LjgwOCAwIDM0LjA1Ni0xNS4yNDkgMzQuMDU2LTM0LjA1OXYtNy4wMDZjMC0xMy42NjEgOC4wNDUtMjUuNDM3IDE5LjY1Mi0zMC44NjRhMzMuOTIgMzMuOTIgMCAwMC0xNC40MDQtMy4xOTZ6bTE3MC4yNzctMTAzLjIzdjkxLjQ4NmMwIDEzLjY2MS04LjA0NSAyNS40MzctMTkuNjUyIDMwLjg2NGEzMy45MDggMzMuOTA4IDAgMDAxNC40MDMgMy4xOTVjMTguODA4IDAgMzQuMDU1LTE1LjI0OSAzNC4wNTUtMzQuMDU5VjMyLjUwMmgtMjguODA2eiIgZmlsbD0iIzAwNzZjZSIvPjxwYXRoIGQ9Ik00ODcuNDA1IDU1LjM1N3YtNy4wNDJjMC0xMi44NTUtMTAuNDU4LTIzLjMxMy0yMy4zMTMtMjMuMzEzSDQ3LjkwOGMtMTIuODU1IDAtMjMuMzEzIDEwLjQ1OC0yMy4zMTMgMjMuMzEzdjcuMDQyQzEwLjQ4OCA1OC44NjMgMCA3MS42MzIgMCA4Ni44MXY4NS4wMDJjMCA0NC43MTIgMTYuMDQ4IDg3Ljk2OSA0NS4xODggMTIxLjgwMmExODcuNzQgMTg3Ljc0IDAgMDA2LjMyNSA2Ljk2OHY4MS43OTVhNy41IDcuNSAwIDAwMTUgMHYtNjcuNjkzYzI0LjE1NCAyMC4zMjcgNTMuMTQ4IDM0LjI5OSA4NC4yMjQgNDAuMzc4djguMTZjMCAxMS40MiA5LjI5MiAyMC43MTIgMjAuNzEyIDIwLjcxMmgxNjkuMTAyYzExLjQyMSAwIDIwLjcxMi05LjI5MiAyMC43MTItMjAuNzEydi04LjE2YzMxLjA3Ny02LjA4IDYwLjA3MS0yMC4wNTIgODQuMjI1LTQwLjM3OXYxMjkuNzMzYzAgMTUuMjA5LTEyLjM3MiAyNy41ODMtMjcuNTggMjcuNTgzSDk0LjA5M2MtMTUuMjA4IDAtMjcuNTgtMTIuMzc0LTI3LjU4LTI3LjU4M3YtMzEuNzExYTcuNSA3LjUgMCAwMC0xNSAwdjMxLjcxMWMwIDIzLjQ4IDE5LjEwMSA0Mi41ODMgNDIuNTggNDIuNTgzaDMyMy44MTRjMjMuNDc5IDAgNDIuNTgtMTkuMTAzIDQyLjU4LTQyLjU4M1YzMDAuNThhMTg2LjgwNCAxODYuODA0IDAgMDA2LjMyNC02Ljk2N0M0OTUuOTUyIDI1OS43ODEgNTEyIDIxNi41MjMgNTEyIDE3MS44MTJWODYuODFjMC0xNS4xNzgtMTAuNDg4LTI3Ljk0Ny0yNC41OTUtMzEuNDUzem0tMTUtNy4wNDJ2MjYuNjIzYzAgNC41ODQtMy43MjkgOC4zMTMtOC4zMTMgOC4zMTNoLTkwLjU5N3YtNDMuMjVoOTAuNTk3YzQuNTg1LjAwMSA4LjMxMyAzLjczIDguMzEzIDguMzE0ek0zNTguNDk2IDkwLjc1MnYzMy4yMzZjMCAxNC42NDUtMTEuOTEzIDI2LjU2LTI2LjU1NiAyNi41NnMtMjYuNTU2LTExLjkxNS0yNi41NTYtMjYuNTZjMC00LjE0Mi0zLjM1Ny03LjUtNy41LTcuNXMtNy41IDMuMzU4LTcuNSA3LjV2OTcuNDM5YzAgMTQuNjQ1LTExLjkxMyAyNi41NTktMjYuNTU2IDI2LjU1OXMtMjYuNTU2LTExLjkxNS0yNi41NTYtMjYuNTU5di01MS42MzVjMC0yMi45MTYtMTguNjQyLTQxLjU2LTQxLjU1NS00MS41Ni0yMi45MTQgMC00MS41NTYgMTguNjQ0LTQxLjU1NiA0MS41NnY3LjAwNWMwIDE0LjY0NS0xMS45MTMgMjYuNTYtMjYuNTU2IDI2LjU2cy0yNi41NTUtMTEuOTE1LTI2LjU1NS0yNi41NlY0MC4wMDJoMjU3LjQ0NHY1MC43NWguMDAyek0zOS41OTUgNDguMzE1YzAtNC41ODQgMy43MjktOC4zMTMgOC4zMTMtOC4zMTNoMzguMTQ0djQzLjI1SDQ3LjkwOGMtNC41ODQgMC04LjMxMy0zLjcyOS04LjMxMy04LjMxM1Y0OC4zMTV6TTE1IDE3MS44MTJWODYuODFjMC02Ljc5IDMuOTExLTEyLjY3NyA5LjU5NS0xNS41NDZ2My42NzVjMCAxMi44NTUgMTAuNDU4IDIzLjMxMyAyMy4zMTMgMjMuMzEzaDMuNjA1djE3OS44OTVDMjguNDkyIDI0OC44MTYgMTUgMjExLjgyOSAxNSAxNzEuODEyem0zMjUuNTUxIDE5Ny4xMjJIMTcxLjQ0OWE1LjcyIDUuNzIgMCAwMS01LjcxMi01LjcxMnYtMTMuMDM1YTcuNTEgNy41MSAwIDAwLjEzNy0xLjM3N3YtOS43ODNjMC0xLjc1MS43OTUtMy4zMTggMi4wNDItNC4zNjRhNS42OCA1LjY4IDAgMDEzLjUzMy0xLjIzMmgxNjkuMTAyYTUuNjggNS42OCAwIDAxMy41MzQgMS4yMzMgNS42ODUgNS42ODUgMCAwMTIuMDQyIDQuMzYzdjkuNzgzYzAgLjQ2Ni4wNTIuOTI2LjEzNyAxLjM3N3YxMy4wMzVhNS43MiA1LjcyIDAgMDEtNS43MTMgNS43MTJ6TTQ5NyAxNzEuODEyYzAgNDAuMDE3LTEzLjQ5MiA3Ny4wMDQtMzYuNTEzIDEwNi4zMzN2LTExOC4yN2MwLTQuMTQyLTMuMzU3LTcuNS03LjUtNy41cy03LjUgMy4zNTgtNy41IDcuNXYxMzQuOThjLTIyLjYwNyAyMi4wNzQtNTEuNDc5IDM3Ljk4OC04NC4yMjUgNDQuOTE1di0uNjI3YzAtNi40NjctMi45ODMtMTIuMjQ3LTcuNjQxLTE2LjA0OWEyMC41OTIgMjAuNTkyIDAgMDAtMTMuMTg4LTQuNzYxSDE3MS41NjdhMjAuNiAyMC42IDAgMDAtMTMuMTg4IDQuNzYxYy00LjY1OSAzLjgwMS03LjY0MiA5LjU4Mi03LjY0MiAxNi4wNDl2LjYyN2MtMzIuNzQ2LTYuOTI3LTYxLjYxNi0yMi44NDEtODQuMjI0LTQ0LjkxNVY5OC4yNTJoMTkuNTM4djc4LjU0NmMwIDIyLjkxNiAxOC42NDIgNDEuNTYgNDEuNTU1IDQxLjU2IDIyLjkxNCAwIDQxLjU1Ni0xOC42NDQgNDEuNTU2LTQxLjU2di03LjAwNWMwLTE0LjY0NSAxMS45MTMtMjYuNTYgMjYuNTU2LTI2LjU2czI2LjU1NSAxMS45MTUgMjYuNTU1IDI2LjU2djUxLjYzNWMwIDIyLjkxNiAxOC42NDIgNDEuNTU5IDQxLjU1NiA0MS41NTlzNDEuNTU2LTE4LjY0MyA0MS41NTYtNDEuNTU5di02NS40OTZjNy4yMDYgNi4wMDIgMTYuNDY3IDkuNjE2IDI2LjU1NiA5LjYxNiAyMi45MTQgMCA0MS41NTYtMTguNjQ0IDQxLjU1Ni00MS41NlY5OC4yNTJoNzEuOTkxdjMxLjQ5OWMwIDQuMTQyIDMuMzU3IDcuNSA3LjUgNy41czcuNS0zLjM1OCA3LjUtNy41Vjk4LjI1MmgzLjYwNWMxMi44NTQgMCAyMy4zMTMtMTAuNDU4IDIzLjMxMy0yMy4zMTN2LTMuNjc1YzUuNjg0IDIuODY5IDkuNTk1IDguNzU2IDkuNTk1IDE1LjU0NnY4NS4wMDJINDk3eiIgZmlsbD0iIzA1MWMxYiIvPjwvc3ZnPg==");
// CONCATENATED MODULE: ./containers/ThemeSwitcher/ThemeSwitcher.styles.js




const ThemeSwitcherStyle = external_styled_components_default.a.div.withConfig({
  displayName: "ThemeSwitcherstyles__ThemeSwitcherStyle",
  componentId: "sc-1k3k0gi-0"
})(["background-color:#ffffff;width:340px;height:calc(100% - 70px);padding:0 0 50px;flex-shrink:0;position:fixed;top:70px;right:", ";left:", ";z-index:1001;", ";", ";@media only screen and (max-width:767px){width:270px;right:", ";left:", ";}&.active{right:", ";left:", ";}.switcher{right:", ";left:", ";}.componentTitleWrapper{padding:25px 15px;height:70px;background-color:", ";.componentTitle{font-size:21px;font-weight:700;color:#fff;line-height:1;width:100%;text-align:center;display:flex;justify-content:center;}}.SwitcherBlockWrapper{width:100%;height:100%;padding-bottom:105px;overflow:hidden;overflow-y:auto;display:flex;flex-direction:column;.themeSwitchBlock{width:100%;display:-webkit-flex;display:-ms-flex;display:flex;flex-shrink:0;flex-direction:column;margin-top:30px;h4{font-size:14px;font-weight:700;color:", ";line-height:1.3;margin-bottom:0;padding:0 15px;text-transform:uppercase;}.themeSwitchBtnWrapper{width:100%;display:flex;align-items:center;padding:15px 20px;button{width:20px;height:20px;display:flex;margin:", ";border:1px solid #e4e4e4;outline:0;padding:0;background:none;justify-content:center;position:relative;cursor:pointer;", ";&.languageSwitch{border:0;width:30px;height:auto;&.selectedTheme{&:before,&:after{top:2px;left:", ";right:", ";}}}img{width:100%;}&.selectedTheme{&:before{content:'';width:6px;height:6px;display:-webkit-inline-flex;display:-ms-inline-flex;display:inline-flex;background-color:", ";position:absolute;top:-2px;left:", ";right:", ";", ";}&:after{content:'';width:6px;height:6px;display:-webkit-inline-flex;display:-ms-inline-flex;display:inline-flex;border:1px solid ", ";background-color:", ";position:absolute;top:-2px;left:", ";right:", ";-webkit-animation:selectedAnimation 1.2s infinite ease-in-out;animation:selectedAnimation 1.2s infinite ease-in-out;", ";}}}}}}.switcherToggleBtn{width:50px;height:50px;display:flex;align-items:center;justify-content:center;text-align:center;background-color:#ffffff;outline:0;border:0;position:absolute;text-align:center;top:200px;left:", ";right:", ";cursor:pointer;border-radius:", ";", ";img{width:23px;}}.purchaseBtnWrapper{width:100%;padding:25px 0;display:flex;align-items:center;justify-content:center;bottom:0px;position:absolute;background-color:#ffffff;.purchaseBtn{width:calc(100% - 50px);height:42px;font-size:14px;font-weight:700;color:#fff;text-decoration:none;background-color:", ";text-transform:uppercase;line-height:1;text-align:center;display:flex;align-items:center;justify-content:center;cursor:pointer;", ";", ";&:hover{background-color:", ";}}}@-webkit-keyframes selectedAnimation{0%{-webkit-transform:scale(0.8);transform:scale(0.8);opacity:0.5;}100%{-webkit-transform:scale(2.4);transform:scale(2.4);opacity:0;}}@keyframes selectedAnimation{0%{-webkit-transform:scale(0.8);transform:scale(0.8);opacity:0.5;}100%{-webkit-transform:scale(2.4);transform:scale(2.4);opacity:0;}}"], props => props['data-rtl'] === 'rtl' ? 'inherit' : '-340px', props => props['data-rtl'] === 'rtl' ? '-340px' : 'inherit', Object(style_utils["c" /* transition */])(), Object(style_utils["b" /* boxShadow */])('-1px 0 5px rgba(0,0,0,0.25)'), props => props['data-rtl'] === 'rtl' ? 'inherit' : '-270px', props => props['data-rtl'] === 'rtl' ? '-270px' : 'inherit', props => props['data-rtl'] === 'rtl' ? 'inherit' : '0', props => props['data-rtl'] === 'rtl' ? '0' : 'inherit', props => props['data-rtl'] === 'rtl' ? '-98px' : 'inherit', props => props['data-rtl'] === 'rtl' ? 'inherit' : '-98px', Object(external_styled_theme_["palette"])('text', 0), Object(external_styled_theme_["palette"])('text', 0), props => props['data-rtl'] === 'rtl' ? '0 0 0 10px' : '0 10px 0 0', Object(style_utils["a" /* borderRadius */])('3px'), props => props['data-rtl'] === 'rtl' ? 'inherit' : '-3px', props => props['data-rtl'] === 'rtl' ? '-3px' : 'inherit', Object(external_styled_theme_["palette"])('color', 13), props => props['data-rtl'] === 'rtl' ? 'inherit' : '-2px', props => props['data-rtl'] === 'rtl' ? '-2px' : 'inherit', Object(style_utils["a" /* borderRadius */])('50%'), Object(external_styled_theme_["palette"])('color', 13), Object(external_styled_theme_["palette"])('color', 13), props => props['data-rtl'] === 'rtl' ? 'inherit' : '-2px', props => props['data-rtl'] === 'rtl' ? '-2px' : 'inherit', Object(style_utils["a" /* borderRadius */])('50%'), props => props['data-rtl'] === 'rtl' ? 'inherit' : '-50px', props => props['data-rtl'] === 'rtl' ? '-50px' : 'inherit', props => props['data-rtl'] === 'rtl' ? '0 3px 3px 0' : '3px 0 0 3px', Object(style_utils["b" /* boxShadow */])('-2px 0 5px rgba(0,0,0,0.2)'), Object(external_styled_theme_["palette"])('primary', 0), Object(style_utils["a" /* borderRadius */])('5px'), Object(style_utils["c" /* transition */])(), Object(external_styled_theme_["palette"])('primary', 13));
/* harmony default export */ var ThemeSwitcher_styles = (Object(rtl["a" /* default */])(ThemeSwitcherStyle));
// CONCATENATED MODULE: ./containers/ThemeSwitcher/ThemeSwitcher.js











const {
  switchActivation,
  changeTheme: ThemeSwitcher_changeTheme
} = themeSwitcher_actions["a" /* default */];
function ThemeSwitcher_ThemeSwitcher_ThemeSwitcher() {
  const {
    isActivated,
    topbarTheme,
    sidebarTheme,
    layoutTheme
  } = Object(external_react_redux_["useSelector"])(state => state.ThemeSwitcher);
  const dispatch = Object(external_react_redux_["useDispatch"])();
  const styleButton = {
    background: sidebarTheme.buttonColor
  };
  return /*#__PURE__*/Object(jsx_runtime_["jsx"])(jsx_runtime_["Fragment"], {}) // <ThemeSwitcherStyle
  //   className={isActivated ? 'isoThemeSwitcher active' : 'isoThemeSwitcher'}
  // >
  //   <div className="componentTitleWrapper" style={styleButton}>
  //     <h3 className="componentTitle">
  //       <IntlMessages id="themeSwitcher.settings" />
  //     </h3>
  //   </div>
  //   <div className="SwitcherBlockWrapper">
  //     <Switcher
  //       config={Themes.sidebarTheme}
  //       changeTheme={(attr, theme) => dispatch(changeTheme(attr, theme))}
  //       selectedId={sidebarTheme.themeName}
  //     />
  //     <Switcher
  //       config={Themes.topbarTheme}
  //       changeTheme={(attr, theme) => dispatch(changeTheme(attr, theme))}
  //       selectedId={topbarTheme.themeName}
  //     />
  //     <Switcher
  //       config={Themes.layoutTheme}
  //       changeTheme={(attr, theme) => dispatch(changeTheme(attr, theme))}
  //       selectedId={layoutTheme.themeName}
  //     />
  //     <LanguageSwitcher />
  //   </div>
  //   <div className="purchaseBtnWrapper">
  //     <a
  //       href="https://themeforest.net/item/isomorphic-react-redux-admin-dashboard/20262330?ref=redqteam"
  //       className="purchaseBtn"
  //       target="_blank"
  //       rel="noopener noreferrer"
  //       style={styleButton}
  //     >
  //       <IntlMessages id="themeSwitcher.purchase" />
  //     </a>
  //   </div>
  //   <button
  //     type="primary"
  //     className="switcherToggleBtn"
  //     style={styleButton}
  //     onClick={() => {
  //       dispatch(switchActivation());
  //     }}
  //   >
  //     <img src={bucketSVG} alt="bucket" />
  //   </button>
  // </ThemeSwitcherStyle>
  ;
}
// EXTERNAL MODULE: external "antd/lib/popover"
var popover_ = __webpack_require__("27qp");
var popover_default = /*#__PURE__*/__webpack_require__.n(popover_);

// CONCATENATED MODULE: ./containers/Topbar/TopbarDropdown.styles.js




const TopbarDropdownWrapper = external_styled_components_default.a.div.withConfig({
  displayName: "TopbarDropdownstyles__TopbarDropdownWrapper",
  componentId: "sc-mo3q2b-0"
})(["display:flex;flex-direction:column;background-color:#ffffff;margin:-12px -16px;width:360px;min-width:160px;flex-shrink:0;", ";", ";", ";cursor:pointer;@media only screen and (max-width:767px){width:310px;}.isoDropdownHeader{border-bottom:1px solid #f1f1f1;margin-bottom:0px;padding:15px 30px;width:100%;display:flex;align-items:center;justify-content:center;h3{font-size:14px;font-weight:500;color:", ";text-align:center;text-transform:uppercase;margin:0;}}.isoDropdownBody{width:100%;height:300px;overflow-y:auto;display:flex;flex-direction:column;margin-bottom:10px;background-color:", ";a{text-decoration:none;}.isoDropdownListItem{padding:15px 30px;flex-shrink:0;text-decoration:none;display:flex;flex-direction:column;text-decoration:none;text-align:", ";width:100%;border-bottom:1px solid ", ";", ";&:hover{background-color:", ";}.isoListHead{display:flex;justify-content:space-between;align-items:center;margin-bottom:5px;}h5{font-size:13px;font-weight:500;color:", ";margin-top:0;}p{font-size:12px;font-weight:400;color:", ";white-space:nowrap;text-overflow:ellipsis;overflow:hidden;}.isoDate{font-size:11px;color:", ";flex-shrink:0;}}}.isoViewAllBtn{font-size:13px;font-weight:500;color:", ";padding:10px 15px 20px;display:flex;text-decoration:none;align-items:center;justify-content:center;text-align:center;", ";&:hover{color:", ";}}.isoDropdownFooterLinks{display:flex;align-items:center;justify-content:space-between;padding:10px 30px 20px;a{font-size:13px;font-weight:500;color:", ";text-decoration:none;padding:10px 20px;line-height:1;border:1px solid ", ";display:flex;align-items:center;justify-content:center;", ";&:hover{background-color:", ";border-color:", ";color:#ffffff;}}h3{font-size:14px;font-weight:500;color:", ";line-height:1.3;}}&.withImg{.isoDropdownListItem{display:flex;flex-direction:row;.isoImgWrapper{width:35px;height:35px;overflow:hidden;margin:", ";display:-webkit-inline-flex;display:-ms-inline-flex;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;background-color:", ";", ";img{width:100%;height:100%;object-fit:cover;}}.isoListContent{width:100%;display:flex;flex-direction:column;.isoListHead{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;}h5{margin-bottom:0;padding:", ";}.isoDate{font-size:11px;color:", ";flex-shrink:0;}p{white-space:normal;line-height:1.5;}}}}&.topbarMail{@media only screen and (max-width:519px){right:-170px;}}&.topbarMessage{@media only screen and (max-width:500px){right:-69px;}}&.topbarNotification{@media only screen and (max-width:500px){right:-120px;}}&.topbarAddtoCart{@media only screen and (max-width:465px){right:-55px;}.isoDropdownHeader{margin-bottom:0;}.isoDropdownBody{background-color:", ";display:flex;flex-direction:column;.isoNoItemMsg{height:100%;display:flex;align-items:center;justify-content:center;span{font-size:30px;font-weight:300;color:", ";line-height:1.2;}}}}&.isoUserDropdown{padding:7px 0;display:flex;flex-direction:column;background-color:#ffffff;width:220px;min-width:160px;flex-shrink:0;", ";", ";", ";.isoDropdownLink{font-size:13px;color:", ";line-height:1.1;padding:7px 15px;background-color:transparent;text-decoration:none;display:flex;justify-content:flex-start;", ";&:hover{background-color:", ";}}}"], Object(style_utils["a" /* borderRadius */])('5px'), Object(style_utils["b" /* boxShadow */])('0 2px 10px rgba(0,0,0,0.2)'), Object(style_utils["c" /* transition */])(), Object(external_styled_theme_["palette"])('text', 0), Object(external_styled_theme_["palette"])('grayscale', 6), props => props['data-rtl'] === 'rtl' ? 'right' : 'left', Object(external_styled_theme_["palette"])('border', 2), Object(style_utils["c" /* transition */])(), Object(external_styled_theme_["palette"])('grayscale', 3), Object(external_styled_theme_["palette"])('text', 0), Object(external_styled_theme_["palette"])('text', 2), Object(external_styled_theme_["palette"])('grayscale', 1), Object(external_styled_theme_["palette"])('text', 2), Object(style_utils["c" /* transition */])(), Object(external_styled_theme_["palette"])('primary', 0), Object(external_styled_theme_["palette"])('text', 0), Object(external_styled_theme_["palette"])('border', 1), Object(style_utils["c" /* transition */])(), Object(external_styled_theme_["palette"])('primary', 0), Object(external_styled_theme_["palette"])('primary', 0), Object(external_styled_theme_["palette"])('text', 0), props => props['data-rtl'] === 'rtl' ? '0 0 0 15px' : '0 15px 0 0', Object(external_styled_theme_["palette"])('grayscale', 9), Object(style_utils["a" /* borderRadius */])('50%'), props => props['data-rtl'] === 'rtl' ? '0 0 0 15px' : '0 15px 0 0', Object(external_styled_theme_["palette"])('grayscale', 1), Object(external_styled_theme_["palette"])('grayscale', 6), Object(external_styled_theme_["palette"])('grayscale', 1), Object(style_utils["a" /* borderRadius */])('5px'), Object(style_utils["b" /* boxShadow */])('0 2px 10px rgba(0,0,0,0.2)'), Object(style_utils["c" /* transition */])(), Object(external_styled_theme_["palette"])('text', 1), Object(style_utils["c" /* transition */])(), Object(external_styled_theme_["palette"])('secondary', 6));
/* harmony default export */ var TopbarDropdown_styles = (Object(rtl["a" /* default */])(TopbarDropdownWrapper));
// CONCATENATED MODULE: ./containers/Topbar/TopbarNotification.js







const demoNotifications = [{
  id: 1,
  name: 'David Doe',
  notification: 'A National Book Award Finalist An Edgar Award Finalist A California Book Award Gold Medal Winner'
}, {
  id: 2,
  name: 'Navis Doe',
  notification: 'A National Book Award Finalist An Edgar Award Finalist A California Book Award Gold Medal Winner'
}, {
  id: 3,
  name: 'Emanual Doe',
  notification: 'A National Book Award Finalist An Edgar Award Finalist A California Book Award Gold Medal Winner'
}, {
  id: 4,
  name: 'Dowain Doe',
  notification: 'A National Book Award Finalist An Edgar Award Finalist A California Book Award Gold Medal Winner'
}];
function TopbarNotification() {
  const customizedTheme = Object(external_react_redux_["useSelector"])(state => state.ThemeSwitcher.topbarTheme);
  const [visible, setVisibility] = external_react_default.a.useState(false);

  function handleVisibleChange() {
    setVisibility(visible => !visible);
  }

  const content = /*#__PURE__*/Object(jsx_runtime_["jsxs"])(TopbarDropdown_styles, {
    className: "topbarNotification",
    children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
      className: "isoDropdownHeader",
      children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("h3", {
        children: "Notifications"
      })
    }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
      className: "isoDropdownBody",
      children: demoNotifications.map(notification => /*#__PURE__*/Object(jsx_runtime_["jsxs"])("a", {
        className: "isoDropdownListItem",
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("h5", {
          children: notification.name
        }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
          children: notification.notification
        })]
      }, notification.id))
    }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("a", {
      className: "isoViewAllBtn",
      children: "View All"
    })]
  });

  return /*#__PURE__*/Object(jsx_runtime_["jsx"])(popover_default.a, {
    content: content,
    trigger: "click",
    visible: visible,
    onVisibleChange: handleVisibleChange,
    placement: "bottomLeft",
    children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
      className: "isoIconWrapper",
      children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(TopbarNotifyIcon, {
        size: 24,
        color: customizedTheme.textColor
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("span", {
        children: demoNotifications.length
      })]
    })
  });
}
// CONCATENATED MODULE: ./assets/images/user3.png
/* harmony default export */ var user3 = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABYCAMAAABGS8AGAAAC/VBMVEUAAAD39PLp7O3g5Obz8vHi5+nFyczz8vHm6+zo7O3c5OdmZm708/Lw8fHZ4+bz8vL29fPW4eX29PPr7u7y8vLY4eXw8fC6wMT49/To7O3S3uLm6uxkanT29PJmbHXa4+bX4eT39fPW4uTh6OpydXxwdn/29fPP2d3w8fHY4eXk6ux9gIVkanXU3+RjZ3Hx8fHj6OpiaHLs7u5wdX7X4OX49vNGNzk+MjVXWWFFPEEuJCthaHQ7Mjh8en/X4OPh6Ord5efi6OhdYWqosrgzJSguHiI+OUO4wMRbWFk0Jivz8vL09PL29fPu7+/v8PDx8fErIyrt7u7r7O749fPc5ujz8vEsJCzY4ub49vTb5eff5+ns7e/V3+Pu7+4uJCvp7e7X4eUvJi7W4OX29fLd5+jT3uMtJS3a5OYwJi3m6+wxJy/////o6+3i6Os4LTMzJy3k6ew1KS9la3QxKTFeYWtvdX1obHX8+/nh5+liZW7r7u5qb3diZ3EpIipZYWxqcXtdZG5UWWRlaXFGMTE/LjD7/f3a4+fO2+BfZnDQ3eJjaXLl6eptcnpZXmhrQjo5MThRVmBMNTNxeIE7Ky7m6+5YWmQ/NDh+hY1nbnhcX2dLSlNySEBBMTQ0LDOKkZhFNzp7gYhNUl75+PZ0gIo3Jyx1e4RNPj6DjJRsdoAXDhXy8vOtp6aPmaFVXGhTNjP09fV1eH5DKCgzIyjx8PDg3tzGvblrXVtRUFhCR1ReTk4/OkJ4RjouHSHm5eSPb2FWRkZYOzheOTUiGCD3+/z09/js9PWbpq6kmZaOgHp4V099TkQ7JScvISbt6unX1tXQzc24srBaVVtRSk9FQklhRD9LKypNQ0cmHibFtqptYmOFXFFrUk1lODRSLi3v8fLSxruGeXlFT11/ZFtsR0GKRD4TBg3z7uvs5d7c08vBxcjazcOUioinjH1hbntxOjTT3ODMxcOzub2qtr2Xoae+qJecgXFrZ2yYUUfDzNGZnaCym42AdnN1bm53jJqisboWC6+VAAAASnRSTlMA/iAWZRAHgxsNYxjNSUL0wr+c8rWEdP70yvPquj899OLd0cCi8Oq8qZ6Tfn10YTX0893UlI5sH+/u0s/Ew6ihNdzcyaCYjWlMQcnsYkwAABBESURBVFjDpJO/a9tAHMVD3Li2IAZTPNQebOwh2GAIJXOS/gFJsSs4dDZICBnh1ioCL0cgY2SMVq2lULqYDB3StRTiCDo0bejQkKV075D+CX3fu4rgNj+c9N0Pzsvnnt89LdyobGZTK9TzDx+XVsuVSjVfL2ibmezC/ymdyTXXq2XhOYbBRdjXLbvX6/aK1fVmLpO+MzaVK+SLlsuYYTg6sy2b6YZhdbu9EVTMF3KpO2EXtXzZtSzGbBZYFlkdj7uu4+iu1e2NgR4XV7TF22ObeRtEZtkWwQyGKyiGLmPkGWhij/LN26GXtKrFLCanFTBX1wMb6gLZwxxDciO0tjQ/dzlfDhgLsBj4tmTaMGrbvQR9DrCyXVzJzftmjRJaELgEduWkQEjgSxEeOgeXVCnM9Yq5Gvd83/M8JBsEwEopMATTMhK55DOCPofptFZxdF13HNA94bhM2lbsBK5848wC16UrRqOqdkOrs4VVrpMMg+DolhEYBuCgq9ZdREJx4Aeih+9iIXttGxqce5yIVDHi4wbDxbpIhcBQAgce5pH32jXtSG14HuecvEIOEkHSgCZwek/XnYH3pLp0qKeu9LvBuQAZpnUC0wX0hhgSr9hMCWQ5wSTb5L5+hedsw/Q9yW0PuDSt4oBzHgoc5UTm0jaUJC79UuRrl+acvt9qmTudQbvvdVq+4EJeQmnDMRfYlcg2xFji3baY/ICwFS7rxr0HHbP1ZPvgoNVuHQz8Adjosy/hqiS6YsO4SkWJYQXqKlbWLvkuHpmm2elsbWO0t3baW6YnMGDb4VF8FMeR7GFinLiYJByT/xFUcv8Uoub7fWgQ9fum2W5R3JgebMfT759/fXkXT6exo6Mzkm+Q7UTqKi7w32p/V6PhR1HkR30/EcUQCt+M9473z158evPq7OfJ+2lkcEiXXVRSYC6UdL42y10u9SM5/kiiRXS0Nz3e/zqZHJ6eHmL/sP86RgGFwFIvm+C5g8EJX1qeaXBNpiDlK3JfeEfPj09+fDuc7A6HL4fD4bPdyeTj07dCZRaGfhjiBQSHZC3pEApRW5ppxG+2yua1iSAM4/EDqiIqtggiHryIN8U/o3U/stBBDLthLsN2N+667KGwkJPZk2CRQi+mBkQCUbCorVDRVG2kRkVFi631EzUibREPFsGTzztjTAM+Ozs7h+Q3T555381QoYBBgmsaJ/P+wJWZWqu2EHMuhHDj8WB8obXiP4AFqbx6YI9TJ7ALhtSRzR3uxr35bhXyZx74U9P3awssjrnDGDOZw6Ng5H5p2beUchjZXM7CkMJvKBQsbLS382+1p9Bh0ldyuaHG8ZUnMDsee1ww5jhACxYG0blF/z1wNCArmwWZ1sADSsM6s+d/hi0Us5Yk6debtfssiJ2Iw6xpmkIwkztj058WZ99nbTATSdawBBR42sZKLAuPf5Y33zBu6LpGO1u5JJuAu+F1a4ELB8SiaTL4LQLtmJW11cXZy2DotqRqEFbSO0RY27azf1Pe1NdPGuw3BnEZhq75k9M14Ql4FcIsAk2mQRejb5Z+2w1N13VAwSC0rpGUdwvCo2+TquFeHR8FcXBQ7mAMH7vZigIXMJc7sAw2uRbc855cq39oTNAvVNL+UuGUnkpWr6rlHh0yOrrsz7VYKZQWHTh1XZfR7DhuwKLza5OpccMwOmDw6JaRIAdSD3G37JIxdJRORrUgQg6Mwa4buQ6BwTW9IBiZf7R6Z1b757jN1qgyNCvBjKPauwXg/TuN/vWaGP5YC1xBx+Y44lLomiThouoADiqfH/1MG7ayDCTdNtJOkIdVsCBMvTuoiLuwSHjyVSXgDFhmuuGoK8+OccfxHFeIOKg264uNiS7DmGS2pHwB6CGU8tZD/d3yp0oVJwyRKAKGaYDlKbrU2TwOKtPNpQ8+aJCCdw4RXaK6/NDWzMbt3dyJdO56ADDQqAaiknnB0CFAe3H5dLX5qP5t1lZW2wIeBYdOyQM7VEDIhyliAxcNmtK526EQODFKWQgEQh0NNBLn4XipPPOp+W7OR66JbGQrDyWJlc+hMMBOLKj3cGbzADTYcTx85+bpkdBjjJyiGmQeCJli5jzC6TWb89VnqWUnOUAx1r9l4BnCftsyPaot2mjDf16dro7K7sBUZFjQoKJGEsFYeWapeXUl1akjEsDAVpLmMaPcsOzJ7O6OmMAl5CtcHpJZMk6e4R3cqFQpzzTPv3nqv5cAWQngEAsnlyRkWbrenemD2cvrwOnTl7dGitxzHVGkLJQYQgY3Gi2Xq2/Orj5dBhkNgSurQYmG1wbVBmqEVrbel0FRANzRRONCZczhMZActxLlQFwvqlQq82d/Ty7htUz9S7UhbxJmIFX1bc8cGBjo8mz4d17cjtEhrEjgoiKjqsPIu/R2vlwu3/1c//Dx7XKqZSWVeGDjTiCbXhp4Hs0cHIDWh3xx+OHtYhAIpnKgCdXmwe/171/O341Gz32ur135NOXrbbUNJxS1VN7al9lJXEluR4IO8dyxcVUPKl/uhVEQPv519t5SKSzdrdcXp36keHEpriJTIrmE4FQsvX/YLv/XJMI4js8oiiiKigqivyHoz8gDizD8peCQjuMOTvQkGYxL8wZSeE4ky502NHMxN4ekbsu2acVmRl8YM6gmZa3Wt42+0vfofXd6U+p9z91tbLz23vv5PJ/nEWBUsbGd3HtvOsmFOUCbg6IVv6Fk7euiXC3Zk9FnU/l7d9khvXNqD+2lBIQy2Y4omlCzPn3s7DVugEM7axYwTWOBh8RsbXExI8liMvR46lX62atek265fWmrsRzag8kzm81wjUT0ijtauJ6yH2NUw9SxYyTNAOyt11YWxVrVaxNTt56kX0hLIAO9Kq1A8MTY37XJrEehp8zei4ocxVNI4RgCJmkS3GC5Xl+UxQUvGQpNvLsVLbzpHQJYYTfxWvfXvt7UtcMIgQzpphNsWkRPJymahl2KsiXBzSzUswtfq+UkvguWbqfum0aHWiGalQ0TnUzTFdw7urYZV4VQ1FxMLlclGOYYisR+x9B0UhRhWFqoZVe+yjYa82izZz+zQx1bjxmjJZNpW9d6Y4eaP2QnCyDzKAdl4uyi1+stS1I5my0+4g7a7Xaeuz21dKPZcHX0qkzrtbbZaRr/GmKeFsNRnqQVrBgFOLMgy1KpHMTSphk+Fi3/cN0ETQ0AtwrWbZs2otHr0Ha+lU3fFjlUr6jEgDsDx8WqnLFTjI1m4Nn77nCvWfeiRa2mraC37MPWZPwvOZF4moVRCPOGUZJkSa7KXpqEGBvDc9Jn16gCw40Lastk0xpspsb/i809DkLeYDCTyZRKJUkC+LlIgUsz2PwCofk3LOpiNeMhky5spl07CchKKDJi6CLYJ8/mM8DWa7VavSwVZZBlL0Xb4JhhYuFw9Mud3vb21aadyoFlN2EhMKygKi8rXlYj/kKCfVJ5ODbWP4fO7y0Xiyo5eIRkSIXMgxxEGKY2sLnF3bJXPWJZVLIVUAueIGsyukY//r54eXnZPRL39E9LK8Xic3neTpFAgxuLcQNTasPQ0XpFb92gHgotigj1JuBY9a7IdWbm4uXzpwWP4BNG4uNz8yvF6vOokgMPcCDGhSfysKyCO7VeO8butjQFpOpXA1sSu4YHT57ucfRE3P6+uDDeGJsvFoOAkiRP8gEoNfty9MC/2rK5efBucVUhYE0u458P35cd5309Qjzu6fOc7Ws0potSgI/hQhCBwNVUZclKNBdW63CC1dI8eGPxEf8Ihl2TH2bOORxujyDERxCFU+hvNCYePY7xAS4WCENzhdklTHOHsGaurNW4WCNtRGtr5ly5meGZiz6/03c20i10n+0bH++LN0bSFZyG+MBA6sHcg+nK+0kz0UmFtq7RP44Z/jGccOV2DZ77OOx0ursFp9Pj8UQ8cZDHZ/Kp8EA4NTFR+FlJ53PK71pxGQyEgTh8GOOwAUXcZrmTa2E/XHg9fHL4gvuEw+lw+yMev9/vFNzLwnLu/q9CofDz7Wz+7kuDARMDHC5dBJazrrUoDL3moAQ7GRn8Nuj7NOhzdHefGvH3+NzOvrH+scil38fZM/n3+fu5Oy9dloTFAFQbFNqNhHWt+1uauYRGDUVh2IIPpAvFTV1UQai6UAQR37rxLboQBmFWBRFcmIV4vfeO4cbcJCCEkNCQEvNAYqZpnAFnJA7o1KGiuKhCx8c4+MKNKx8rUUEUXXiqVBxRW/RP1l8u//nPCZw7Pz8paJC8IJyMw7EenI6VuWYpuoZwqzFwrFkbHnz04cILQRAKhwuFoXwO0tmBnbB0/qyOtcKySWx+6LRw5+5YsTgWqZHnOYpklI36QP/o6LFGWHfteuv5rXtABiaoC4qd+0mH9y+DDP+stZNcobDvbiUqqUGFe14SIb+caA3ADoSByRVqKNAs4oU7wun8vsOQIXg6rVjbyYWJAdhcriC8ujxWKkXETL049j2HJwk+fqA52LaUqoWxpomayHSl9PoO2AE56NT+LpgSv2jREiCfLjy5XUq8Uul9lLA69VLyPnL7+4fPBJRibNkQOgDrGlX07P5BYejHcSejsWRRJ/V7MoaEl7efeVrmOdFbRlpqWoorlbB5rNbgvoghHUGg4sDVqhINdFmNrhUK+X0TbkDNvvMhEb9b6J0++Hn8ihekSblSkoKQpF5UedCsjT8oEwNqaKHAFankqgFXMORb9e7uE4aADOCub7HrmjP7tyvIBffPDj6NxadXs/cmb9imE0Wt2vB4vUw0SeKGSrErYmy6oSFaooVE7dOne4UhqOGEcmD4grl/WJr2DQ5+qVyvjV48F4YDzEyiD83apVbZkETMmBjoyMVKQFBYrFoupppeTsweIQ+RgwTngPvHRW/3jtH4wujNU+eap061GSmx48OXWolpiBKlTCsaTBU1V0LuiA1fwlXux2l0R4A45+DNLfjLpr57Z/T8Zv8J8fzNgbZYds41J7iMUqQZyHKRj6kUilwOXWZQJDHHiirfzYD/w9+4QF6xsVY7+uHq40bbTB+NQt1MjVI4sM9CDF4zXDeRSYsiRYTqsey8e32tkAPuvDmzplj+r9vUfyR7emggTFq18UfAQkiTNOaILvMzomGsGrGBNMpMHztl+93r1wUYL0tmTn2ltXdL+wOMHBEfu3SWO2CuYRiYp0Wb+cigkqoin0FMKEIiT9TKx56uQtd86IuptX7Xhi/ttnTm0rCcmplJCTElSXJdRGydM10U/bgqy7ZtYSVW4jc91xauhT6elvZsDUcePayNJGlGSEZ8h3CtrqR8RIotwpU4lSi0ty3Lju987FkO82y66l635cb4ETiq6cTQdQTp1HY9LyyaMiIZ000qKbLs+w6Xt+/uqNrUfqzbpBJKTHCYMcQyxTW4Y48QX06zqqwruqRLxOdbV3aEbHroVb1LGdIl6ngEOaiocd0KTcSJzmm1Kvscre5d1T3jX9S9eGXv0jjmDlFUItpOKjUga8TyTFlnq3tXLgbsP2p29+IVfZs3ICSTDHPPasgO4062ek0fUCeT+x/wVSv6ejevWbrU3rhtTW/filXTgX4FuH02E47jzHIAAAAASUVORK5CYII=");
// CONCATENATED MODULE: ./containers/Topbar/TopbarMessage.js








const demoMassage = [{
  id: 1,
  name: 'David Doe',
  time: '3 minutes ago',
  massage: 'A National Book Award Finalist An Edgar Award Finalist A California Book Award Gold Medal Winner'
}, {
  id: 2,
  name: 'Navis Doe',
  time: '4 minutes ago',
  massage: 'A National Book Award Finalist An Edgar Award Finalist A California Book Award Gold Medal Winner'
}, {
  id: 3,
  name: 'Emanual Doe',
  time: '5 minutes ago',
  massage: 'A National Book Award Finalist An Edgar Award Finalist A California Book Award Gold Medal Winner'
}, {
  id: 4,
  name: 'Dowain Doe',
  time: '6 minutes ago',
  massage: 'A National Book Award Finalist An Edgar Award Finalist A California Book Award Gold Medal Winner'
}];
function TopbarMessage() {
  const [visible, setVisibility] = external_react_default.a.useState(false);
  const customizedTheme = Object(external_react_redux_["useSelector"])(state => state.ThemeSwitcher.topbarTheme);

  function handleVisibleChange() {
    setVisibility(visible => !visible);
  }

  const content = /*#__PURE__*/Object(jsx_runtime_["jsxs"])(TopbarDropdown_styles, {
    className: "topbarMessage withImg",
    children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
      className: "isoDropdownHeader",
      children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("h3", {
        children: "Messages"
      })
    }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
      className: "isoDropdownBody",
      children: demoMassage.map(massage => /*#__PURE__*/Object(jsx_runtime_["jsxs"])("a", {
        className: "isoDropdownListItem",
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
          className: "isoImgWrapper",
          children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("img", {
            alt: "#",
            src: user3
          })
        }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
          className: "isoListContent",
          children: [/*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
            className: "isoListHead",
            children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("h5", {
              children: massage.name
            }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("span", {
              className: "isoDate",
              children: massage.time
            })]
          }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
            children: massage.massage
          })]
        })]
      }, massage.id))
    }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("a", {
      className: "isoViewAllBtn",
      children: "View All"
    })]
  });

  return /*#__PURE__*/Object(jsx_runtime_["jsx"])(popover_default.a, {
    content: content,
    trigger: "click",
    visible: visible,
    onVisibleChange: handleVisibleChange,
    placement: "bottomLeft",
    children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
      className: "isoIconWrapper",
      children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(TopbarMessageIcon, {
        size: 24,
        color: customizedTheme.textColor
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("span", {
        children: demoMassage.length
      })]
    })
  });
}
// EXTERNAL MODULE: ./components/uielements/input.js + 1 modules
var input = __webpack_require__("7I1n");

// EXTERNAL MODULE: ./components/Feedback/Modal.js
var Modal = __webpack_require__("rQ/L");

// CONCATENATED MODULE: ./containers/Topbar/TopbarSearchModal.styles.js




const TopbarSearchModal = external_styled_components_default()(Modal["a" /* default */]).withConfig({
  displayName: "TopbarSearchModalstyles__TopbarSearchModal",
  componentId: "sc-noc4sy-0"
})(["&.ant-modal{top:150px;padding-bottom:0;}.ant-modal-close-x{width:28px;height:28px;line-height:28px;display:none;}.ant-modal-content{overflow:hidden;border-radius:5px;.ant-modal-header{display:none;}.ant-modal-body{padding:0px;.isoSearchContainer{.ant-input-search{position:relative;border:0;border-radius:0;padding-left:", ";padding-right:", ";height:60px;max-height:none;.ant-input-wrapper.ant-input-group{height:100%;.ant-input-search-button{border:0;}.ant-input-affix-wrapper{height:100%;&.ant-input-affix-wrapper:focus,&.ant-input-affix-wrapper-focused{box-shadow:none !important;border:0 !important;}.ant-input{font-size:14px;border:0;height:100%;&:focus{box-shadow:none;outline:none;}&::-webkit-input-placeholder{color:", ";}&:-moz-placeholder{color:", ";}&::-moz-placeholder{color:", ";}&:-ms-input-placeholder{color:", ";}&:focus{outline:0;box-shadow:none;}}}}.ant-input-prefix{right:", ";left:", ";height:0;position:absolute;top:50%;svg{color:", ";}}}.ant-input-suffix{.ant-input-search-icon{display:none;}}}}}"], props => props['data-rtl'] === 'rtl' ? '15px' : '55px', props => props['data-rtl'] === 'rtl' ? '55px' : '15px', Object(external_styled_theme_["palette"])('grayscale', 0), Object(external_styled_theme_["palette"])('grayscale', 0), Object(external_styled_theme_["palette"])('grayscale', 0), Object(external_styled_theme_["palette"])('grayscale', 0), props => props['data-rtl'] === 'rtl' ? '20px' : 'auto', props => props['data-rtl'] === 'rtl' ? 'auto' : '20px', Object(external_styled_theme_["palette"])('text', 2));
/* harmony default export */ var TopbarSearchModal_styles = (Object(rtl["a" /* default */])(TopbarSearchModal));
// CONCATENATED MODULE: ./containers/Topbar/TopbarSearch.js








function Searchbar(props) {
  external_react_default.a.useEffect(() => {
    const timer = setTimeout(() => {
      try {
        document.getElementById('InputTopbarSearch').focus();
      } catch (e) {}
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  });
  return /*#__PURE__*/Object(jsx_runtime_["jsx"])(input["a" /* InputSearch */], {
    id: "InputTopbarSearch",
    size: "large",
    placeholder: "Enter search text",
    onBlur: props.onBlur,
    prefix: /*#__PURE__*/Object(jsx_runtime_["jsx"])(TopbarSearchIcon, {
      size: 24
    })
  });
}

function TopbarSearch() {
  const [visible, setVisibility] = external_react_default.a.useState(false);
  const customizedTheme = Object(external_react_redux_["useSelector"])(state => state.ThemeSwitcher.topbarTheme);

  const handleCancel = () => {
    setVisibility(false);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setVisibility(false);
    }, 200);
  };

  const showModal = () => {
    setVisibility(true);
  };

  return /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
    onClick: showModal,
    children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(TopbarSearchIcon, {
      size: 24,
      color: customizedTheme.textColor
    }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(TopbarSearchModal_styles, {
      visible: visible,
      onOk: handleCancel,
      onCancel: handleCancel,
      wrapClassName: "isoSearchModal",
      width: "60%",
      footer: null,
      children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
        className: "isoSearchContainer",
        children: visible ? /*#__PURE__*/Object(jsx_runtime_["jsx"])(Searchbar, {
          onBlur: handleBlur
        }) : ''
      })
    })]
  });
}
// EXTERNAL MODULE: ./components/uielements/popover.js
var popover = __webpack_require__("Q94N");

// EXTERNAL MODULE: ./authentication/actions.js
var authentication_actions = __webpack_require__("w+U0");

// EXTERNAL MODULE: ./assets/images/user1.png
var user1 = __webpack_require__("LPF2");
var user1_default = /*#__PURE__*/__webpack_require__.n(user1);

// CONCATENATED MODULE: ./containers/Topbar/TopbarUser.js






const {
  logout
} = authentication_actions["a" /* default */];



function TopbarUser() {
  const [visible, setVisibility] = external_react_default.a.useState(false);
  const dispatch = Object(external_react_redux_["useDispatch"])();

  function handleVisibleChange() {
    setVisibility(visible => !visible);
  }

  const content = /*#__PURE__*/Object(jsx_runtime_["jsx"])(TopbarDropdown_styles, {
    className: "isoUserDropdown",
    children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("a", {
      className: "isoDropdownLink",
      onClick: () => dispatch(logout()),
      children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(io_["IoIosLogOut"], {
        className: "mr-2"
      }), "Logout"]
    })
  });

  return /*#__PURE__*/Object(jsx_runtime_["jsx"])(popover["a" /* default */], {
    content: content,
    trigger: "click",
    visible: visible,
    onVisibleChange: handleVisibleChange,
    arrowPointAtCenter: true,
    placement: "bottomLeft",
    children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
      className: "isoImgWrapper",
      children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("img", {
        alt: "user",
        src: user1_default.a
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("span", {
        className: "userActivity online"
      })]
    })
  });
}
// EXTERNAL MODULE: ./redux/ecommerce/actions.js
var ecommerce_actions = __webpack_require__("5ZGk");

// CONCATENATED MODULE: ./containers/Topbar/TopbarAddToCart.js
function TopbarAddToCart_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function TopbarAddToCart_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { TopbarAddToCart_ownKeys(Object(source), true).forEach(function (key) { TopbarAddToCart_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { TopbarAddToCart_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function TopbarAddToCart_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











const {
  changeViewTopbarCart,
  changeProductQuantity
} = ecommerce_actions["a" /* default */];
let totalPrice;

class TopbarAddToCart_TopbarAddtoCart extends external_react_["Component"] {
  constructor(props) {
    super(props);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    this.hide = this.hide.bind(this);
    this.renderProducts = this.renderProducts.bind(this);
    this.changeQuantity = this.changeQuantity.bind(this);
    this.cancelQuantity = this.cancelQuantity.bind(this);
  }

  hide() {
    this.props.changeViewTopbarCart(false);
  }

  handleVisibleChange() {
    this.props.changeViewTopbarCart(!this.props.viewTopbarCart);
  }

  renderProducts() {
    const {
      productQuantity,
      products
    } = this.props;
    totalPrice = 0;

    if (!productQuantity || productQuantity.length === 0) {
      return /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
        className: "isoNoItemMsg",
        children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("span", {
          children: "No item found"
        })
      });
    }

    return productQuantity.map(product => {
      totalPrice += product.quantity * products[product.objectID].price;
      return /*#__PURE__*/Object(jsx_runtime_["jsx"])(jsx_runtime_["Fragment"], {});
    });
  }

  changeQuantity(objectID, quantity) {
    const {
      productQuantity
    } = this.props;
    const newProductQuantity = [];
    productQuantity.forEach(product => {
      if (product.objectID !== objectID) {
        newProductQuantity.push(product);
      } else {
        newProductQuantity.push({
          objectID,
          quantity
        });
      }
    });
    this.props.changeProductQuantity(newProductQuantity);
  }

  cancelQuantity(objectID) {
    const {
      productQuantity
    } = this.props;
    const newProductQuantity = [];
    productQuantity.forEach(product => {
      if (product.objectID !== objectID) {
        newProductQuantity.push(product);
      }
    });
    this.props.changeProductQuantity(newProductQuantity);
  }

  render() {
    const {
      url,
      productQuantity,
      viewTopbarCart,
      customizedTheme
    } = this.props;

    const content = /*#__PURE__*/Object(jsx_runtime_["jsxs"])(TopbarDropdown_styles, {
      className: "topbarAddtoCart",
      children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
        className: "isoDropdownHeader",
        children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("h3", {
          children: "Cart"
        })
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
        className: "isoDropdownBody isoCartItemsWrapper",
        children: this.renderProducts()
      }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
        className: "isoDropdownFooterLinks",
        onClick: this.hide,
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
          href: "/dashboard/cart",
          children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("a", {
            children: "View Cart"
          })
        }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("h3", {
          children: ["Total Price: ", /*#__PURE__*/Object(jsx_runtime_["jsxs"])("span", {
            children: ["$", totalPrice.toFixed(2)]
          })]
        })]
      })]
    });

    return /*#__PURE__*/Object(jsx_runtime_["jsx"])(popover["a" /* default */], {
      content: content,
      trigger: "click",
      visible: viewTopbarCart,
      onVisibleChange: this.handleVisibleChange,
      placement: "bottomLeft",
      children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
        className: "isoIconWrapper",
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(TopbarCartIcon, {
          size: 24,
          color: customizedTheme.textColor
        }), productQuantity.length === 0 ? /*#__PURE__*/Object(jsx_runtime_["jsx"])("span", {
          children: "0"
        }) : /*#__PURE__*/Object(jsx_runtime_["jsx"])("span", {
          children: productQuantity.length
        })]
      })
    });
  }

}

function mapStateToProps(state) {
  return TopbarAddToCart_objectSpread(TopbarAddToCart_objectSpread({}, state.Ecommerce), {}, {
    customizedTheme: state.ThemeSwitcher.topbarTheme
  });
}

/* harmony default export */ var TopbarAddToCart = (Object(external_react_redux_["connect"])(mapStateToProps, {
  changeViewTopbarCart,
  changeProductQuantity
})(TopbarAddToCart_TopbarAddtoCart));
// CONCATENATED MODULE: ./containers/Topbar/Topbar.styles.js




const TopbarWrapper = external_styled_components_default.a.div.withConfig({
  displayName: "Topbarstyles__TopbarWrapper",
  componentId: "sc-u06vju-0"
})([".isomorphicTopbar{display:flex;justify-content:space-between;background-color:#ffffff;border-bottom:1px solid rgba(0,0,0,0.1);padding:", ";z-index:1000;", ";@media only screen and (max-width:767px){padding:", ";}&.collapsed{padding:", ";@media only screen and (max-width:767px){padding:", ";}}.isoLeft{display:flex;align-items:center;@media only screen and (max-width:767px){margin:", ";}.triggerBtn{width:auto;height:100%;display:-webkit-inline-flex;display:-ms-inline-flex;display:inline-flex;align-items:center;justify-content:center;background-color:transparent;border:0;outline:0;position:relative;cursor:pointer;padding-left:0;}}.isoRight{display:flex;align-items:center;justify-content:center;margin:0;li{margin-left:", ";margin-right:", ";cursor:pointer;line-height:normal;position:relative;display:inline-block;@media only screen and (max-width:360px){margin-left:", ";margin-right:", ";}&:last-child{margin:0;}svg{color:", ";}.isoIconWrapper{position:relative;line-height:normal;span{font-size:12px;color:#fff;background-color:", ";width:20px;height:20px;display:-webkit-inline-flex;display:-ms-inline-flex;display:inline-flex;align-items:center;justify-content:center;text-align:center;line-height:20px;position:absolute;top:-8px;left:", ";right:", ";", ";}}&.isoMail{.isoIconWrapper{span{background-color:", ";}}}&.isoNotify{.isoIconWrapper{span{background-color:", ";}}}&.isoMsg{.isoIconWrapper{span{background-color:", ";}}}&.isoCart{.isoIconWrapper{span{background-color:", ";}}}&.isoUser{.isoImgWrapper{width:40px;height:40px;display:flex;align-items:center;justify-content:center;position:relative;background-color:", ";", ";img{height:100%;object-fit:cover;}.userActivity{width:10px;height:10px;display:block;background-color:", ";position:absolute;bottom:0;right:3px;border:1px solid #ffffff;", ";}}}}}}.isoUserDropdown{.ant-popover-inner{.ant-popover-inner-content{.isoUserDropdownContent{padding:7px 0;display:flex;flex-direction:column;position:absolute;top:0;right:0;background-color:#ffffff;width:220px;min-width:160px;flex-shrink:0;.isoBorderRadius(5px);", ";", ";.isoDropdownLink{font-size:13px;color:", ";line-height:1.1;padding:7px 15px;background-color:transparent;text-decoration:none;display:flex;justify-content:flex-start;", ";&:hover{background-color:", ";}}}}}}.ant-popover{.ant-popover-inner{.ant-popover-inner-content{.isoDropdownContent{display:flex;flex-direction:column;position:absolute;top:0;right:0;background-color:#ffffff;width:360px;min-width:160px;flex-shrink:0;", ";", ";@media only screen and (max-width:767px){width:310px;}.isoDropdownHeader{border-bottom:1px solid #f1f1f1;margin-bottom:0px;padding:15px 30px;width:100%;display:flex;align-items:center;justify-content:center;h3{font-size:14px;font-weight:500;color:", ";text-align:center;text-transform:uppercase;margin:0;}}.isoDropdownBody{width:100%;height:300px;overflow-y:auto;display:flex;flex-direction:column;margin-bottom:10px;background-color:", ";.isoDropdownListItem{padding:15px 30px;flex-shrink:0;text-decoration:none;display:flex;flex-direction:column;text-decoration:none;width:100%;", ";&:hover{background-color:", ";}.isoListHead{display:flex;justify-content:space-between;align-items:center;margin-bottom:5px;}h5{font-size:13px;font-weight:500;color:", ";margin-top:0;}p{font-size:12px;font-weight:400;color:", ";white-space:nowrap;text-overflow:ellipsis;overflow:hidden;}.isoDate{font-size:11px;color:", ";flex-shrink:0;}}}.isoViewAllBtn{font-size:13px;font-weight:500;color:", ";padding:10px 15px 20px;display:flex;text-decoration:none;align-items:center;justify-content:center;text-align:center;", ";&:hover{color:", ";}}.isoDropdownFooterLinks{display:flex;align-items:center;justify-content:space-between;padding:10px 30px 20px;a{font-size:13px;font-weight:500;color:", ";text-decoration:none;padding:10px 20px;line-height:1;border:1px solid ", ";display:flex;align-items:center;justify-content:center;", ";&:hover{background-color:", ";border-color:", ";color:#ffffff;}}h3{font-size:14px;font-weight:500;color:", ";line-height:1.3;}}&.withImg{.isoDropdownListItem{display:flex;flex-direction:row;.isoImgWrapper{width:35px;height:35px;overflow:hidden;margin-right:15px;display:-webkit-inline-flex;display:-ms-inline-flex;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;background-color:", ";", ";img{width:100%;height:100%;object-fit:cover;}}.isoListContent{width:100%;display:flex;flex-direction:column;.isoListHead{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;}h5{margin-bottom:0;padding-right:15px;}.isoDate{font-size:11px;color:", ";flex-shrink:0;}p{white-space:normal;line-height:1.5;}}}}}}}&.topbarMail{.ant-popover-inner{.ant-popover-inner-content{.isoDropdownContent{@media only screen and (max-width:519px){right:-170px;}}}}}&.topbarMessage{.ant-popover-inner{.ant-popover-inner-content{.isoDropdownContent{@media only screen and (max-width:500px){right:-69px;}}}}}&.topbarNotification{.ant-popover-inner{.ant-popover-inner-content{.isoDropdownContent{@media only screen and (max-width:500px){right:-120px;}}}}}&.topbarAddtoCart{.ant-popover-inner{.ant-popover-inner-content{.isoDropdownContent{@media only screen and (max-width:465px){right:-55px;}.isoDropdownHeader{margin-bottom:0;}.isoDropdownBody{background-color:", ";}}}}}}"], props => props['data-rtl'] === 'rtl' ? '0 265px 0 31px' : '0 31px 0 265px', Object(style_utils["c" /* transition */])(), props => props['data-rtl'] === 'rtl' ? '0px 260px 0px 15px !important' : '0px 15px 0px 260px !important', props => props['data-rtl'] === 'rtl' ? '0 109px 0 31px' : '0 31px 0 109px', props => props['data-rtl'] === 'rtl' ? '0px 15px !important' : '0px 15px !important', props => props['data-rtl'] === 'rtl' ? '0 0 0 20px' : '0 20px 0 0', props => props['data-rtl'] === 'rtl' ? '30px' : '0', props => props['data-rtl'] === 'rtl' ? '0' : '30px', props => props['data-rtl'] === 'rtl' ? '25px' : '0', props => props['data-rtl'] === 'rtl' ? '0' : '25px', Object(external_styled_theme_["palette"])('text', 0), Object(external_styled_theme_["palette"])('secondary', 1), props => props['data-rtl'] === 'rtl' ? 'inherit' : '10px', props => props['data-rtl'] === 'rtl' ? '10px' : 'inherit', Object(style_utils["a" /* borderRadius */])('50%'), Object(external_styled_theme_["palette"])('color', 0), Object(external_styled_theme_["palette"])('primary', 2), Object(external_styled_theme_["palette"])('color', 1), Object(external_styled_theme_["palette"])('color', 2), Object(external_styled_theme_["palette"])('grayscale', 9), Object(style_utils["a" /* borderRadius */])('50%'), Object(external_styled_theme_["palette"])('color', 3), Object(style_utils["a" /* borderRadius */])('50%'), Object(style_utils["a" /* borderRadius */])('5px'), Object(style_utils["c" /* transition */])(), Object(external_styled_theme_["palette"])('text', 1), Object(style_utils["c" /* transition */])(), Object(external_styled_theme_["palette"])('secondary', 6), Object(style_utils["a" /* borderRadius */])('5px'), Object(style_utils["c" /* transition */])(), Object(external_styled_theme_["palette"])('text', 0), Object(external_styled_theme_["palette"])('grayscale', 6), Object(style_utils["c" /* transition */])(), Object(external_styled_theme_["palette"])('grayscale', 3), Object(external_styled_theme_["palette"])('text', 0), Object(external_styled_theme_["palette"])('text', 2), Object(external_styled_theme_["palette"])('grayscale', 1), Object(external_styled_theme_["palette"])('text', 2), Object(style_utils["c" /* transition */])(), Object(external_styled_theme_["palette"])('primary', 0), Object(external_styled_theme_["palette"])('text', 0), Object(external_styled_theme_["palette"])('border', 1), Object(style_utils["c" /* transition */])(), Object(external_styled_theme_["palette"])('primary', 0), Object(external_styled_theme_["palette"])('primary', 0), Object(external_styled_theme_["palette"])('text', 0), Object(external_styled_theme_["palette"])('grayscale', 9), Object(style_utils["a" /* borderRadius */])('50%'), Object(external_styled_theme_["palette"])('grayscale', 1), Object(external_styled_theme_["palette"])('grayscale', 6));
/* harmony default export */ var Topbar_styles = (Object(rtl["a" /* default */])(TopbarWrapper));
// CONCATENATED MODULE: ./containers/UIElements/Tag/Tag.styles.js




const TagStyleWrapper = external_styled_components_default.a.div.withConfig({
  displayName: "Tagstyles__TagStyleWrapper",
  componentId: "sc-ot8p0d-0"
})(["display:inline-block;.ant-tag{display:inline-block;line-height:24px;height:26px;padding:0 10px;border-radius:4px;border:1px solid ", ";background:", ";font-size:12px;color:", ";opacity:1;margin-top:4px;margin-bottom:4px;margin-right:", ";margin-left:", ";cursor:pointer;white-space:nowrap;", ";a{color:", ";&:hover{color:", ";}}.anticon-cross{margin:", ";}&.ant-tag-has-color{line-height:24px;color:#ffffff;border:0;}&.ant-tag-checkable{background-color:transparent;border-color:transparent;&:not(.ant-tag-checkable-checked){&:hover{background-color:", ";color:#ffffff;}}&:active{background-color:", ";color:#ffffff;}&.ant-tag-checkable-checked{background-color:", ";color:#ffffff;}}}"], Object(external_styled_theme_["palette"])('border', 0), Object(external_styled_theme_["palette"])('grayscale', 6), Object(external_styled_theme_["palette"])('text', 3), props => props['data-rtl'] === 'rtl' ? 'inherit' : '8px', props => props['data-rtl'] === 'rtl' ? '8px' : 'inherit', Object(style_utils["c" /* transition */])(), Object(external_styled_theme_["palette"])('text', 3), Object(external_styled_theme_["palette"])('text', 3), props => props['data-rtl'] === 'rtl' ? '0 3px 0 0' : '0 0 0 3px', Object(external_styled_theme_["palette"])('primary', 0), Object(external_styled_theme_["palette"])('primary', 0), Object(external_styled_theme_["palette"])('primary', 0));
/* harmony default export */ var Tag_styles = (Object(rtl["a" /* default */])(TagStyleWrapper));
// EXTERNAL MODULE: external "antd/lib/tag"
var tag_ = __webpack_require__("P7Vo");
var tag_default = /*#__PURE__*/__webpack_require__.n(tag_);

// CONCATENATED MODULE: ./components/uielements/tag.js

/* harmony default export */ var tag = (tag_default.a);
// CONCATENATED MODULE: ./containers/Topbar/Topbar.js


function Topbar_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function Topbar_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { Topbar_ownKeys(Object(source), true).forEach(function (key) { Topbar_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { Topbar_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function Topbar_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }















const {
  Header
} = layout_default.a;
const {
  toggleCollapsed: Topbar_toggleCollapsed
} = actions["a" /* default */];

const Tag = props => /*#__PURE__*/Object(jsx_runtime_["jsx"])(Tag_styles, {
  children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(tag, Topbar_objectSpread(Topbar_objectSpread({}, props), {}, {
    children: props.children
  }))
});

class Topbar_Topbar extends external_react_["Component"] {
  render() {
    const {
      toggleCollapsed,
      url,
      customizedTheme,
      locale
    } = this.props;
    const collapsed = this.props.collapsed && !this.props.openDrawer;
    const styling = {
      background: customizedTheme.backgroundColor,
      position: "fixed",
      width: "100%",
      height: 70
    };
    return /*#__PURE__*/Object(jsx_runtime_["jsx"])(Topbar_styles, {
      children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])(Header, {
        style: styling,
        className: collapsed ? "isomorphicTopbar collapsed" : "isomorphicTopbar",
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
          className: "isoLeft",
          children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("button", {
            className: collapsed ? "triggerBtn menuCollapsed" : "triggerBtn menuOpen",
            style: {
              color: customizedTheme.textColor
            },
            onClick: toggleCollapsed,
            children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(TopbarMenuIcon, {
              size: 24,
              color: customizedTheme.textColor
            })
          })
        }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("ul", {
          className: "isoRight",
          children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("li", {
            children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(Tag, {
              color: "#056A81",
              children: "DEV 0.1"
            })
          }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("li", {
            onClick: () => this.setState({
              selectedItem: "user"
            }),
            className: "isoUser",
            children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(TopbarUser, {
              locale: locale
            })
          })]
        })]
      })
    });
  }

}

/* harmony default export */ var containers_Topbar_Topbar = (Object(external_react_redux_["connect"])(state => Topbar_objectSpread(Topbar_objectSpread({}, state.App), {}, {
  locale: state.LanguageSwitcher.language.locale,
  customizedTheme: state.ThemeSwitcher.topbarTheme
}), {
  toggleCollapsed: Topbar_toggleCollapsed
})(Topbar_Topbar));
// CONCATENATED MODULE: ./containers/DashboardLayout/DashboardLayout.styles.js


const AppHolder = external_styled_components_default.a.div.withConfig({
  displayName: "DashboardLayoutstyles__AppHolder",
  componentId: "sc-705goz-0"
})([".trigger{font-size:18px;line-height:64px;padding:0 16px;cursor:pointer;transition:color 0.3s;}.trigger:hover{color:", ";}.ant-layout-sider-collapsed .anticon{font-size:16px;}.ant-layout-sider-collapsed .nav-text{display:none;}.ant-layout{background:", ";&.isoContentMainLayout{overflow:auto;overflow-x:hidden;@media only screen and (min-width:768px) and (max-width:1220px){width:calc(100% - 64px);flex-shrink:0;}@media only screen and (max-width:767px){width:100%;flex-shrink:0;}}}.isoLayoutContent{width:100%;padding:35px;background-color:#ffffff;border:1px solid ", ";height:100%;}.isomorphicLayout{width:calc(100% - 240px);flex-shrink:0;overflow-x:hidden !important;@media only screen and (max-width:767px){width:100%;}@media only screen and (min-width:768px) and (max-width:1220px){width:calc(100% - 64px);}}.ant-layout-footer{font-size:13px;@media (max-width:767px){padding:10px 20px;}}"], Object(external_styled_theme_["palette"])('primary', 0), Object(external_styled_theme_["palette"])('secondary', 1), Object(external_styled_theme_["palette"])('border', 0));
/* harmony default export */ var DashboardLayout_styles = (AppHolder);
// EXTERNAL MODULE: ./library/hooks/useWindowSize.js
var useWindowSize = __webpack_require__("lwum");

// CONCATENATED MODULE: ./containers/DashboardLayout/DashboardLayout.js












const {
  Content,
  Footer
} = layout_default.a;
const {
  toggleAll
} = actions["a" /* default */];
function DashboardLayout({
  children
}) {
  const dispatch = Object(external_react_redux_["useDispatch"])();
  const appHeight = Object(external_react_redux_["useSelector"])(state => state.App.height);
  const {
    width,
    height
  } = Object(useWindowSize["a" /* default */])();
  external_react_default.a.useEffect(() => {
    dispatch(toggleAll(width, height));
  }, [width, height, dispatch]);
  return /*#__PURE__*/Object(jsx_runtime_["jsx"])(DashboardLayout_styles, {
    children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])(layout_default.a, {
      style: {
        height: '100vh'
      },
      children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(containers_Topbar_Topbar, {}), /*#__PURE__*/Object(jsx_runtime_["jsxs"])(layout_default.a, {
        style: {
          flexDirection: 'row',
          overflowX: 'hidden'
        },
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(Sidebar, {}), /*#__PURE__*/Object(jsx_runtime_["jsxs"])(layout_default.a, {
          className: "isoContentMainLayout",
          style: {
            height: appHeight
          },
          children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(Content, {
            className: "isomorphicContent",
            style: {
              padding: '70px 0 0',
              flexShrink: '0',
              background: '#f1f3f6',
              width: '100%'
            },
            children: children
          }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(Footer, {
            style: {
              background: '#ffffff',
              textAlign: 'center',
              borderTop: '1px solid #ededed'
            },
            children: site_config.footerText
          })]
        })]
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(ThemeSwitcher_ThemeSwitcher_ThemeSwitcher, {})]
    })
  });
}

/***/ }),

/***/ "0bIN":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iODAwIj48cGF0aCBmaWxsPSIjRkZFMDAwIiBkPSJNNjQ0LjE2MSA1MzAuMDMydi0xYzAtNi41NjMtNS4zNC0xMS45MDMtMTEuOTAzLTExLjkwM0gyNC44MDdWMjgyLjg3MWg3NTAuMzg3djIzNC4yNThoLTkxLjMyMmMtNi41NjMgMC0xMS45MDMgNS4zNC0xMS45MDMgMTEuOTAzdjFoLTI3LjgwOHoiLz48cGF0aCBmaWxsPSIjRkZFMDAwIiBkPSJNNjgzLjg3MSA1MTYuMTI5aDkwLjMyMlYyODMuODcxSDI1LjgwN3YyMzIuMjU4aDYwNi40NTFjNy4xMjYgMCAxMi45MDMgNS43NzcgMTIuOTAzIDEyLjkwM2gyNS44MDdjMC03LjEyNiA1Ljc3Ny0xMi45MDMgMTIuOTAzLTEyLjkwM3oiLz48cGF0aCBmaWxsPSIjRUQxRjM0IiBkPSJNMjQuODA3IDE1My44MzloNzUwLjM4N3YxMDUuMjI2SDI0LjgwN3oiLz48cGF0aCBmaWxsPSIjRUQxRjM0IiBkPSJNMjUuODA3IDE1NC44MzloNzQ4LjM4N3YxMDMuMjI2SDI1LjgwN3ptLTEgNDkxLjMyMlY1NDAuOTM2aDYwNy40NTFjNi41NjMgMCAxMS45MDMtNS4zNCAxMS45MDMtMTEuOTAzdi0xaDI3LjgwN3YxYzAgNi41NjMgNS4zNCAxMS45MDMgMTEuOTAzIDExLjkwM2g5MS4zMjJ2MTA1LjIyNkgyNC44MDd6Ii8+PHBhdGggZmlsbD0iI0VEMUYzNCIgZD0iTTY4My44NzEgNTQxLjkzNmMtNy4xMjYgMC0xMi45MDMtNS43NzctMTIuOTAzLTEyLjkwM2gtMjUuODA3YzAgNy4xMjYtNS43NzcgMTIuOTAzLTEyLjkwMyAxMi45MDNIMjUuODA3djEwMy4yMjZoNzQ4LjM4N1Y1NDEuOTM2aC05MC4zMjN6Ii8+PHBhdGggZD0iTTc4Ny4wOTcgMTI5LjAzMkgxMi45MDNDNS43NzcgMTI5LjAzMiAwIDEzNC44MSAwIDE0MS45MzZ2NTE2LjEyOWMwIDcuMTI2IDUuNzc3IDEyLjkwMyAxMi45MDMgMTIuOTAzaDc3NC4xOTNjNy4xMjYgMCAxMi45MDMtNS43NzcgMTIuOTAzLTEyLjkwM1YxNDEuOTM2Yy4wMDEtNy4xMjYtNS43NzYtMTIuOTA0LTEyLjkwMi0xMi45MDR6bS0xMi45MDQgMjUuODA3djEwMy4yMjZIMjUuODA3VjE1NC44MzloNzQ4LjM4NnpNMjUuODA3IDY0NS4xNjFWNTQxLjkzNmg2MDYuNDUxYzcuMTI2IDAgMTIuOTAzLTUuNzc3IDEyLjkwMy0xMi45MDNzLTUuNzc3LTEyLjkwMy0xMi45MDMtMTIuOTAzSDI1LjgwN1YyODMuODcxaDc0OC4zODd2MjMyLjI1OGgtOTAuMzIyYy03LjEyNiAwLTEyLjkwMyA1Ljc3Ny0xMi45MDMgMTIuOTAzczUuNzc3IDEyLjkwMyAxMi45MDMgMTIuOTAzaDkwLjMyMnYxMDMuMjI2SDI1LjgwN3oiLz48L3N2Zz4=");

/***/ }),

/***/ "1IPs":
/***/ (function(module, exports) {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ "27qp":
/***/ (function(module, exports) {

module.exports = require("antd/lib/popover");

/***/ }),

/***/ "2tlT":
/***/ (function(module, exports) {

module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ "2yjL":
/***/ (function(module, exports) {

module.exports = require("react-icons/io");

/***/ }),

/***/ "4Q3z":
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),

/***/ "5SYD":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getCurrentLanguage; });
/* harmony import */ var _iso_config_language_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9tsR");
/* harmony import */ var _iso_assets_images_flag_uk_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("KV8h");
/* harmony import */ var _iso_assets_images_flag_china_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("UP2L");
/* harmony import */ var _iso_assets_images_flag_spain_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("0bIN");
/* harmony import */ var _iso_assets_images_flag_france_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("xfH5");
/* harmony import */ var _iso_assets_images_flag_italy_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("ICFD");






const config = {
  defaultLanguage: _iso_config_language_config__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"],
  options: [{
    languageId: 'english',
    locale: 'en',
    text: 'English',
    icon: _iso_assets_images_flag_uk_svg__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]
  }, {
    languageId: 'chinese',
    locale: 'zh',
    text: 'Chinese',
    icon: _iso_assets_images_flag_china_svg__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"]
  }, {
    languageId: 'spanish',
    locale: 'es',
    text: 'Spanish',
    icon: _iso_assets_images_flag_spain_svg__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"]
  }, {
    languageId: 'french',
    locale: 'fr',
    text: 'French',
    icon: _iso_assets_images_flag_france_svg__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]
  }, {
    languageId: 'italian',
    locale: 'it',
    text: 'Italian',
    icon: _iso_assets_images_flag_italy_svg__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"]
  }]
};
function getCurrentLanguage(lang) {
  let selecetedLanguage = config.options[0];
  config.options.forEach(language => {
    if (language.languageId === lang) {
      selecetedLanguage = language;
    }
  });
  return selecetedLanguage;
}
/* harmony default export */ __webpack_exports__["a"] = (config);

/***/ }),

/***/ "5ZGk":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const actions = {
  INIT_DATA: 'ECOMMERCE_INIT_DATA',
  INIT_DATA_SAGA: 'ECOMMERCE_INIT_DATA_SAGA',
  UPDATE_DATA: 'ECOMMERCE_UPDATE_DATA',
  UPDATE_DATA_SAGA: 'ECOMMERCE_UPDATE_DATA_SAGA',
  CHANGE_VIEW: 'ECOMMERCE_CHANGE_VIEW',
  VIEW_TOPBAR_CART: 'ECOMMERCE_VIEW_TOPBAR_CART',
  initData: () => ({
    type: actions.INIT_DATA_SAGA
  }),
  changeView: view => ({
    type: actions.CHANGE_VIEW,
    view
  }),
  changeViewTopbarCart: viewTopbarCart => {
    return {
      type: actions.VIEW_TOPBAR_CART,
      viewTopbarCart
    };
  },
  changeProductQuantity: productQuantity => {
    return (dispatch, getState) => {
      const {
        products
      } = getState().Ecommerce;
      dispatch({
        type: actions.UPDATE_DATA_SAGA,
        products,
        productQuantity
      });
    };
  },
  addToCart: product => {
    return (dispatch, getState) => {
      const {
        products,
        productQuantity
      } = getState().Ecommerce;
      const objectID = product.objectID;
      productQuantity.push({
        objectID,
        quantity: 1
      });
      products[objectID] = product;
      dispatch({
        type: actions.UPDATE_DATA_SAGA,
        products,
        productQuantity
      });
    };
  }
};
/* harmony default export */ __webpack_exports__["a"] = (actions);

/***/ }),

/***/ "7I1n":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ InputSearch; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* binding */ Textarea; });

// UNUSED EXPORTS: InputGroup

// EXTERNAL MODULE: external "antd/lib/input"
var input_ = __webpack_require__("Uqqx");
var input_default = /*#__PURE__*/__webpack_require__.n(input_);

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__("Dtiu");
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// EXTERNAL MODULE: external "styled-theme"
var external_styled_theme_ = __webpack_require__("BnVt");

// EXTERNAL MODULE: ./library/helpers/style_utils.js
var style_utils = __webpack_require__("9OqM");

// CONCATENATED MODULE: ./components/uielements/styles/input.style.js




const InputWrapper = ComponentName => external_styled_components_default()(ComponentName).withConfig({
  displayName: "inputstyle__InputWrapper",
  componentId: "sc-lmpumv-0"
})(["&.ant-input{padding:4px 10px;width:100%;height:35px;cursor:text;text-align:", ";font-size:13px;line-height:1.5;color:", ";background-color:#fff;background-image:none;border:1px solid ", ";", ";", ";&:focus{border-color:", ";}&.ant-input-lg{height:42px;padding:6px 10px;}&.ant-input-sm{padding:1px 10px;height:30px;}&::-webkit-input-placeholder{text-align:", ";color:", ";}&:-moz-placeholder{text-align:", ";color:", ";}&::-moz-placeholder{text-align:", ";color:", ";}&:-ms-input-placeholder{text-align:", ";color:", ";}}"], props => props['data-rtl'] === 'rtl' ? 'right' : 'left', Object(external_styled_theme_["palette"])('text', 1), Object(external_styled_theme_["palette"])('border', 0), Object(style_utils["a" /* borderRadius */])('4px'), Object(style_utils["c" /* transition */])(), Object(external_styled_theme_["palette"])('primary', 0), props => props['data-rtl'] === 'rtl' ? 'right' : 'left', Object(external_styled_theme_["palette"])('grayscale', 0), props => props['data-rtl'] === 'rtl' ? 'right' : 'left', Object(external_styled_theme_["palette"])('grayscale', 0), props => props['data-rtl'] === 'rtl' ? 'right' : 'left', Object(external_styled_theme_["palette"])('grayscale', 0), props => props['data-rtl'] === 'rtl' ? 'right' : 'left', Object(external_styled_theme_["palette"])('grayscale', 0));

const InputGroupWrapper = ComponentName => external_styled_components_default()(ComponentName).withConfig({
  displayName: "inputstyle__InputGroupWrapper",
  componentId: "sc-lmpumv-1"
})(["&.ant-input-group{margin-bottom:10px;.ant-select{.ant-select-selector{height:35px;}}.ant-input{height:35px;}.ant-select-auto-complete{margin-right:", ";}.ant-input{border:1px solid ", ";&:first-child{border-radius:", ";}}.ant-input-group-addon:not(:first-child):not(:last-child),.ant-input-group-wrap:not(:first-child):not(:last-child),> .ant-input:not(:first-child):not(:last-child){padding:0 7px;border-left-width:", ";margin-right:", ";}.ant-input-group-addon{padding:4px 7px;font-size:12px;color:", ";text-align:center;background-color:", ";border:1px solid ", ";", ";&:first-child{border-right-width:", ";border-left-width:", ";border-radius:", ";}&:last-child{border-right-width:", ";border-left-width:", ";border-radius:", ";}.ant-select{.ant-select-selector{height:35px;background-color:inherit;margin:-1px;border:1px solid transparent;", ";}}}.ant-input-group-addon:not(:first-child):not(:last-child),.ant-input-group-wrap:not(:first-child):not(:last-child){border-left:0;border-right:0;}& > .ant-input:not(:first-child):not(:last-child){", ";}.ant-input:first-child:last-child{border-radius:4px;}&.ant-input-group-compact > *{border-right-width:", ";}&.ant-input-group-compact > .ant-select > .ant-select-selection,&.ant-input-group-compact > .ant-calendar-picker .ant-input,&.ant-input-group-compact > .ant-select-auto-complete .ant-input,&.ant-input-group-compact > .ant-cascader-picker .ant-input,&.ant-input-group-compact > .ant-mention-wrapper .ant-mention-editor,&.ant-input-group-compact > .ant-time-picker .ant-time-picker-input{border-right-width:", ";}&.ant-input-group-compact > *:first-child,&.ant-input-group-compact > .ant-select:first-child > .ant-select-selection,&.ant-input-group-compact > .ant-calendar-picker:first-child .ant-input,&.ant-input-group-compact > .ant-select-auto-complete:first-child .ant-input,&.ant-input-group-compact > .ant-cascader-picker:first-child .ant-input,&.ant-input-group-compact > .ant-mention-wrapper:first-child .ant-mention-editor,&.ant-input-group-compact > .ant-time-picker:first-child .ant-time-picker-input{border-radius:", ";border-left-width:1px ", ";}&.ant-input-group-compact > *:last-child,&.ant-input-group-compact > .ant-select:last-child > .ant-select-selection,&.ant-input-group-compact > .ant-calendar-picker:last-child .ant-input,&.ant-input-group-compact > .ant-select-auto-complete:last-child .ant-input,&.ant-input-group-compact > .ant-cascader-picker:last-child .ant-input,&.ant-input-group-compact > .ant-mention-wrapper:last-child .ant-mention-editor,&.ant-input-group-compact > .ant-time-picker:last-child .ant-time-picker-input{border-radius:", ";border-right-width:", ";}.ant-calendar-picker-clear,.ant-calendar-picker-icon{right:", ";left:", ";}}&.ant-input-group-lg{.ant-input,> .ant-input-group-addon{padding:6px 10px;height:35px;}}"], props => props['data-rtl'] === 'rtl' ? '-1px' : '0', Object(external_styled_theme_["palette"])('border', 0), props => props['data-rtl'] === 'rtl' ? '0 4px 4px 0' : '4px 0 0 4px', props => props['data-rtl'] === 'rtl' ? '0' : '1px', props => props['data-rtl'] === 'rtl' ? '-1px' : '0', Object(external_styled_theme_["palette"])('text', 1), Object(external_styled_theme_["palette"])('grayscale', 4), Object(external_styled_theme_["palette"])('border', 0), Object(style_utils["c" /* transition */])(), props => props['data-rtl'] === 'rtl' ? '1px' : '0', props => props['data-rtl'] === 'rtl' ? '0' : '1px', props => props['data-rtl'] === 'rtl' ? '0 4px 4px 0' : '4px 0 0 4px', props => props['data-rtl'] === 'rtl' ? '0' : '1px', props => props['data-rtl'] === 'rtl' ? '1px' : '0', props => props['data-rtl'] === 'rtl' ? '4px 0 0 4px' : '0 4px 4px 0', Object(style_utils["b" /* boxShadow */])(), ''
/* border-left: 0; */
, props => props['data-rtl'] === 'rtl' ? '1px ' : '0', props => props['data-rtl'] === 'rtl' ? '1px ' : '0', props => props['data-rtl'] === 'rtl' ? '0 4px 4px 0' : '4px 0 0 4px', ''
/* border-right-width: ${props =>
props['data-rtl'] === 'rtl' ? '1px' : '0'}; */
, props => props['data-rtl'] === 'rtl' ? '4px 0 0 4px' : '0 4px 4px 0', props => props['data-rtl'] === 'rtl' ? '0 ' : '1px', props => props['data-rtl'] === 'rtl' ? 'inherit' : '8px', props => props['data-rtl'] === 'rtl' ? '8px' : 'inherit');

const TextAreaWrapper = ComponentName => external_styled_components_default()(ComponentName).withConfig({
  displayName: "inputstyle__TextAreaWrapper",
  componentId: "sc-lmpumv-2"
})(["&.ant-input{padding:4px 10px;width:100%;height:auto;cursor:text;font-size:13px;line-height:1.5;color:", ";background-color:#fff;background-image:none;border:1px solid ", ";", ";", ";&:focus{border-color:", ";}&::-webkit-input-placeholder{color:", ";}&:-moz-placeholder{color:", ";}&::-moz-placeholder{color:", ";}&:-ms-input-placeholder{color:", ";}}"], Object(external_styled_theme_["palette"])('text', 1), Object(external_styled_theme_["palette"])('border', 0), Object(style_utils["a" /* borderRadius */])('4px'), Object(style_utils["c" /* transition */])(), Object(external_styled_theme_["palette"])('primary', 0), Object(external_styled_theme_["palette"])('grayscale', 0), Object(external_styled_theme_["palette"])('grayscale', 0), Object(external_styled_theme_["palette"])('grayscale', 0), Object(external_styled_theme_["palette"])('grayscale', 0));

const InputSearchWrapper = ComponentName => external_styled_components_default()(ComponentName).withConfig({
  displayName: "inputstyle__InputSearchWrapper",
  componentId: "sc-lmpumv-3"
})(["&.ant-input-affix-wrapper{background-color:#fff;background-image:none;border:1px solid ", ";padding:4px 10px;width:100%;height:35px;max-height:35px;", ";", ";.ant-input{height:auto}&:focus,&.ant-input-affix-wrapper-focused{border-color:", ";}&.ant-input-affix-wrapper-lg{height:42px;padding:6px 10px;}&.ant-input-affix-wrapper-sm{padding:1px 10px;height:30px;}&.ant-input-search:not(.ant-input-search-enter-button){padding-right:0;}.ant-input{cursor:text;font-size:13px;line-height:1.5;color:", ";&::-webkit-input-placeholder{color:", ";}&:-moz-placeholder{color:", ";}&::-moz-placeholder{color:", ";}&:-ms-input-placeholder{color:", ";}}.ant-input-search-icon{color:", ";&:hover{color:", ";}}}"], Object(external_styled_theme_["palette"])('border', 0), Object(style_utils["a" /* borderRadius */])('4px'), Object(style_utils["c" /* transition */])(), Object(external_styled_theme_["palette"])('primary', 0), Object(external_styled_theme_["palette"])('text', 1), Object(external_styled_theme_["palette"])('grayscale', 0), Object(external_styled_theme_["palette"])('grayscale', 0), Object(external_styled_theme_["palette"])('grayscale', 0), Object(external_styled_theme_["palette"])('grayscale', 0), Object(external_styled_theme_["palette"])('grayscale', 0), Object(external_styled_theme_["palette"])('primary', 0));


// EXTERNAL MODULE: ./library/helpers/rtl.js
var rtl = __webpack_require__("evxR");

// CONCATENATED MODULE: ./components/uielements/input.js



const {
  Search,
  TextArea,
  Group
} = input_default.a;
const WDStyledInput = InputWrapper(input_default.a);
const StyledInput = Object(rtl["a" /* default */])(WDStyledInput);
const WDInputGroup = InputGroupWrapper(Group);
const InputGroup = Object(rtl["a" /* default */])(WDInputGroup);
const WDInputSearch = InputSearchWrapper(Search);
const InputSearch = Object(rtl["a" /* default */])(WDInputSearch);
const WDTextarea = TextAreaWrapper(TextArea);
const Textarea = Object(rtl["a" /* default */])(WDTextarea);
/* harmony default export */ var input = __webpack_exports__["c"] = (StyledInput);


/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("VZf9");


/***/ }),

/***/ "9OqM":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return transition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return borderRadius; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return boxShadow; });
// Transition
function transition(timing = 0.3) {
  return `
      -webkit-transition: all ${timing}s cubic-bezier(0.215, 0.61, 0.355, 1);
      -moz-transition: all ${timing}s cubic-bezier(0.215, 0.61, 0.355, 1);
      -ms-transition: all ${timing}s cubic-bezier(0.215, 0.61, 0.355, 1);
      -o-transition: all ${timing}s cubic-bezier(0.215, 0.61, 0.355, 1);
      transition: all ${timing}s cubic-bezier(0.215, 0.61, 0.355, 1);
  `;
} // Border Radius

function borderRadius(radius = 0) {
  return `
      -webkit-border-radius: ${radius};
      -moz-border-radius: ${radius};
      -ms-transition: ${radius};
      -o-border-radius: ${radius};
      border-radius: ${radius};
  `;
} // Box Shadow

function boxShadow(shadow = 'none') {
  return `
      -webkit-box-shadow: ${shadow};
      -moz-box-shadow: ${shadow};
      box-shadow: ${shadow};
  `;
}

/***/ }),

/***/ "9tsR":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export langDir */
const language = 'english';
const langDir = 'ltr';
/* harmony default export */ __webpack_exports__["a"] = (language);

/***/ }),

/***/ "BnVt":
/***/ (function(module, exports) {

module.exports = require("styled-theme");

/***/ }),

/***/ "Dtiu":
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),

/***/ "F5FC":
/***/ (function(module, exports) {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "ICFD":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iODAwIj48cGF0aCBmaWxsPSIjRkZGIiBkPSJNNTE2LjEyOSAyNDUuMTYxdi05MC4zMjJIMjgzLjg3MXY0OTAuMzIyaDIzMi4yNThWMjk2Ljc3NGMwLTcuMTI2IDUuNzc3LTEyLjkwMyAxMi45MDMtMTIuOTAzdi0yNS44MDdjLTcuMTI2IDAtMTIuOTAzLTUuNzc3LTEyLjkwMy0xMi45MDN6Ii8+PHBhdGggZmlsbD0iIzI1OTI0NSIgZD0iTTI0LjgwNyAxNTMuODM5aDIzNC4yNTh2NDkyLjMyMkgyNC44MDd6Ii8+PHBhdGggZmlsbD0iIzI1OTI0NSIgZD0iTTI1LjgwNyAxNTQuODM5aDIzMi4yNTh2NDkwLjMyMkgyNS44MDd6Ii8+PHBhdGggZmlsbD0iI0VEMUYzNCIgZD0iTTU0MC45MzYgNjQ2LjE2MVYyOTYuNzc0YzAtNi41NjMtNS4zNC0xMS45MDMtMTEuOTAzLTExLjkwM2gtMXYtMjcuODA3aDFjNi41NjMgMCAxMS45MDMtNS4zNCAxMS45MDMtMTEuOTAzdi05MS4zMjJoMjM0LjI1OHY0OTIuMzIySDU0MC45MzZ6Ii8+PHBhdGggZmlsbD0iI0VEMUYzNCIgZD0iTTU0MS45MzYgMjQ1LjE2MWMwIDcuMTI2LTUuNzc3IDEyLjkwMy0xMi45MDMgMTIuOTAzdjI1LjgwN2M3LjEyNiAwIDEyLjkwMyA1Ljc3NyAxMi45MDMgMTIuOTAzdjM0OC4zODdoMjMyLjI1OFYxNTQuODM5SDU0MS45MzZ2OTAuMzIyeiIvPjxwYXRoIGQ9Ik03ODcuMDk3IDEyOS4wMzJIMTIuOTAzQzUuNzc3IDEyOS4wMzIgMCAxMzQuODEgMCAxNDEuOTM2djUxNi4xMjljMCA3LjEyNiA1Ljc3NyAxMi45MDMgMTIuOTAzIDEyLjkwM2g3NzQuMTkzYzcuMTI2IDAgMTIuOTAzLTUuNzc3IDEyLjkwMy0xMi45MDNWMTQxLjkzNmMuMDAxLTcuMTI2LTUuNzc2LTEyLjkwNC0xMi45MDItMTIuOTA0em0tMTIuOTA0IDUxNi4xMjlINTQxLjkzNlYyOTYuNzc0YzAtNy4xMjYtNS43NzctMTIuOTAzLTEyLjkwMy0xMi45MDNzLTEyLjkwMyA1Ljc3Ny0xMi45MDMgMTIuOTAzdjM0OC4zODdIMjgzLjg3MVYxNTQuODM5aDIzMi4yNTh2OTAuMzIyYzAgNy4xMjYgNS43NzcgMTIuOTAzIDEyLjkwMyAxMi45MDNzMTIuOTAzLTUuNzc3IDEyLjkwMy0xMi45MDN2LTkwLjMyMmgyMzIuMjU4djQ5MC4zMjJ6TTI1LjgwNyAxNTQuODM5aDIzMi4yNTh2NDkwLjMyMkgyNS44MDdWMTU0LjgzOXoiLz48L3N2Zz4=");

/***/ }),

/***/ "KV8h":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iODAwIj48cGF0aCBmaWxsPSIjMTAzQjlCIiBkPSJNMjQuODA3IDMzMS4zMjN2LTk4LjkxMmwxNDguMzY4IDk4LjkxMnoiLz48cGF0aCBmaWxsPSIjMTAzQjlCIiBkPSJNMjUuODA3IDIzNC4yNzl2OTYuMDQ0aDE0NC4wNjV6bTEyOC43Ni04MC40NGgxNzYuNzU1djExNy44MzZ6Ii8+PHBhdGggZmlsbD0iIzEwM0I5QiIgZD0iTTMzMC4zMjIgMTU0LjgzOUgxNTcuODdsMTcyLjQ1MiAxMTQuOTY4ek0yNC44MDcgNDY4LjY3OGgxNDguMzY4TDI0LjgwNyA1NjcuNTg5eiIvPjxwYXRoIGZpbGw9IiMxMDNCOUIiIGQ9Ik0yNS44MDcgNDY5LjY3OHY5Ni4wNDNsMTQ0LjA2NS05Ni4wNDN6bTQ0Mi44NzEtMzE1LjgzOWgxNzYuNzU1TDQ2OC42NzggMjcxLjY3NXoiLz48cGF0aCBmaWxsPSIjMTAzQjlCIiBkPSJNNjQyLjEzIDE1NC44MzlINDY5LjY3OHYxMTQuOTY4em0tMTUuMzA1IDE3Ni40ODRsMTQ4LjM2OC05OC45MTJ2OTguOTEyeiIvPjxwYXRoIGZpbGw9IiMxMDNCOUIiIGQ9Ik03NzQuMTkzIDMzMC4zMjN2LTk2LjA0NGwtMTQ0LjA2NSA5Ni4wNDR6TTE1NC41NjcgNjQ2LjE2MWwxNzYuNzU1LTExNy44Mzh2MTE3LjgzOHoiLz48cGF0aCBmaWxsPSIjMTAzQjlCIiBkPSJNMTU3Ljg3IDY0NS4xNjFoMTcyLjQ1MnYtMTE0Ljk3em00NjguOTU1LTE3Ni40ODNoMTQ4LjM2OHY5OC45MTF6Ii8+PHBhdGggZmlsbD0iIzEwM0I5QiIgZD0iTTc3NC4xOTMgNTY1LjcyMXYtOTYuMDQzSDYzMC4xMjh6bS0zMDUuNTE1IDgwLjQ0VjUyOC4zMjNsMTc2Ljc1NSAxMTcuODM4eiIvPjxwYXRoIGZpbGw9IiMxMDNCOUIiIGQ9Ik00NjkuNjc4IDY0NS4xNjFINjQyLjEzbC0xNzIuNDUyLTExNC45N3oiLz48cGF0aCBmaWxsPSIjRkZGIiBkPSJNNjQyLjEzIDE1NC44MzlMNDY5LjY3OCAyNjkuODA3VjE1NC44MzloLTE5LjM1NnYxOTQuODM4aDMyMy44NzF2LTE5LjM1NEg2MzAuMTI4bDE0NC4wNjUtOTYuMDQ0di02OC4yMzRMNTI3Ljc3OCAzMzAuMzIzaC01OC4xdi00OC4wOTVsMTkxLjA2NS0xMjcuMzg5ek0xNTcuODcgNjQ1LjE2MWwxNzIuNDUyLTExNC45N3YxMTQuOTdoMTkuMzU2VjQ1MC4zMjJIMjUuODA3djE5LjM1NmgxNDQuMDY1TDI1LjgwNyA1NjUuNzIxdjY4LjIzM2wyNDYuNDE1LTE2NC4yNzZoNTguMXY0OC4xMDhsLTE5MS4wNiAxMjcuMzc1eiIvPjxwYXRoIGZpbGw9IiNFRDFGMzQiIGQ9Ik01Mi4yMTcgNjQ2LjE2MWwyNjYuMjI2LTE3Ny40ODNoMTIuODc5djE4LjYyN0w5My4wNDEgNjQ2LjE2MXoiLz48cGF0aCBmaWxsPSIjRUQxRjM0IiBkPSJNMzE4Ljc0NiA0NjkuNjc4TDU1LjUyIDY0NS4xNjFoMzcuMjE4TDMzMC4zMjIgNDg2Ljc3di0xNy4wOTJ6bS04NC42Mi0xMzguMzU1TDI0LjgwNyAxOTEuNDR2LTI3LjI2M2wyNTAuNzE4IDE2Ny4xNDZ6Ii8+PHBhdGggZmlsbD0iI0VEMUYzNCIgZD0iTTI1LjgwNyAxNjYuMDQ1djI0Ljg2MWwyMDguNjIyIDEzOS40MTdoMzcuNzkzem00OTguNjY5IDMwMi42MzNoMzkuNTVsMjExLjE2NyAxNDEuMTF2MjYuMDM0eiIvPjxwYXRoIGZpbGw9IiNFRDFGMzQiIGQ9Ik03NzQuMTkzIDYzMy45NTR2LTIzLjYzMmwtMjEwLjQ3LTE0MC42NDRoLTM1Ljk0NXpNNDY4LjY3OCAzMzEuMzIzdi0xOC42MTVsMjM4LjI4MS0xNTguODY5aDQwLjgyNEw0ODEuNTU3IDMzMS4zMjN6Ii8+PHBhdGggZmlsbD0iI0VEMUYzNCIgZD0iTTQ4MS4yNTQgMzMwLjMyM0w3NDQuNDggMTU0LjgzOWgtMzcuMjE4TDQ2OS42NzggMzEzLjI0NHYxNy4wNzl6Ii8+PHBhdGggZD0iTTgwMCA2NTcuOTc5VjE0MS45MzZjMC0uMDc2LS4wMTEtLjE1LS4wMTItLjIyNi0uMDA2LS4zNDgtLjAyLS42OTMtLjA1NC0xLjA0MS0uMDE0LS4xNDgtLjA0MS0uMjkxLS4wNjEtLjQzNi0uMDM2LS4yNzItLjA3LS41NDUtLjEyNS0uODE1LS4wMzgtLjE4OS0uMDktLjM3NC0uMTM2LS41NjEtLjA1NC0uMjItLjEwNC0uNDQtLjE2OS0uNjU5LS4wNjktLjIyNy0uMTUzLS40NDYtLjIzMi0uNjY2LS4wNjMtLjE3Mi0uMTE4LS4zNDYtLjE4OS0uNTE2YTEyLjMzIDEyLjMzIDAgMDAtLjM2OC0uNzljLS4wNTktLjExOS0uMTA4LS4yMzctLjE3LS4zNTQtLjE3OC0uMzMtLjM3LS42NS0uNTczLS45NjMtLjAyNy0uMDQzLS4wNS0uMDg4LS4wNzctLjEzMWExMy4yOTEgMTMuMjkxIDAgMDAtLjc4MS0xLjA1MmMtLjEyNS0uMTUzLS4yNjUtLjI4OS0uMzk2LS40MzUtLjE0Ni0uMTYyLS4yODctLjMzMS0uNDQyLS40ODVhMTIuMzA2IDEyLjMwNiAwIDAwLS42NzgtLjYxNmMtLjA4NC0uMDcyLS4xNjItLjE1My0uMjQ5LS4yMjQtLjIyMS0uMTgxLS40NTEtLjM0NC0uNjgyLS41MDktLjExLS4wOC0uMjE3LS4xNjctLjMzLS4yNDMtLjItLjEzNC0uNDA4LS4yNTEtLjYxNC0uMzc0LS4xNTgtLjA5NC0uMzEzLS4xOTQtLjQ3NS0uMjgtLjE2NC0uMDg4LS4zMzQtLjE2Mi0uNTAzLS4yNDMtLjIxNS0uMTAzLS40MjctLjIxLS42NDYtLjMwMy0uMTI2LS4wNTItLjI1NS0uMDkzLS4zODItLjE0LS4yNjctLjEtLjUzMi0uMjAxLS44MDYtLjI4NS0uMS0uMDMxLS4yMDEtLjA1LS4zMDMtLjA3OC0uMzAxLS4wODMtLjYwMi0uMTY3LS45MS0uMjI3LS4xMzgtLjAyNy0uMjc2LS4wNC0uNDE0LS4wNjMtLjI5OC0uMDUtLjU5Ni0uMS0uOS0uMTI3LS4zOTgtLjAzOC0uOC0uMDYtMS4yMDItLjA2LS4wMDktLjAwMi0uMDE4LS4wMDItLjAyNC0uMDAySDEyLjg4MmMtLjQwMy4wMDItLjgwNS4wMjItMS4yMDYuMDYtLjM1MS4wMzMtLjY5NS4wODgtMS4wMzguMTQ4LS4wOTEuMDE2LS4xODMuMDI0LS4yNzIuMDQyLS4zMzcuMDY3LS42NjYuMTU1LS45OTMuMjQ4LS4wNzIuMDIxLS4xNDYuMDM1LS4yMTguMDU3LS4yOTYuMDg5LS41ODMuMTk4LS44NzEuMzA4LS4xMDUuMDQtLjIxMy4wNzItLjMxNi4xMTctLjI0MS4xLS40NzMuMjE1LS43MDYuMzMtLjE0Ni4wNzItLjI5OC4xMzYtLjQ0Mi4yMTMtLjE4NC4wOTgtLjM1OS4yMS0uNTM4LjMxOC0uMTg0LjExLS4zNzIuMjE1LS41NTIuMzM1LS4xMzYuMDkxLS4yNjIuMTkzLS4zOTQuMjg4LS4yMDguMTUxLS40Mi4yOTktLjYyMS40NjQtLjEwOC4wODgtLjIwNy4xODgtLjMxMi4yNzktLjIwOC4xODItLjQyLjM2My0uNjE4LjU2MS0uMTg5LjE4OC0uMzYxLjM5MS0uNTM5LjU5LS4xLjExNC0uMjA3LjIxNy0uMzAzLjMzMy0uMjc1LjMzNC0uNTMyLjY4Mi0uNzcyIDEuMDQxbC0uMDEuMDE0Yy0uMDMzLjA1LS4wNTkuMTA0LS4wOTEuMTUzLS4xOTguMzA2LS4zODkuNjE4LS41NjEuOTM5LS4wNjUuMTItLjExNy4yNDYtLjE3Ny4zNjgtLjEyNi4yNTYtLjI1My41MTEtLjM2MS43NzYtLjA3Mi4xNzQtLjEyOS4zNTEtLjE5My41MjYtLjA3OS4yMTgtLjE2Mi40MzQtLjIzLjY1Ny0uMDY3LjIyLS4xMTUuNDQtLjE3LjY2My0uMDQ2LjE4Ni0uMDk4LjM2OC0uMTM0LjU1Ny0uMDUzLjI3Mi0uMDg5LjU0NS0uMTI1LjgxOS0uMDE5LjE0NS0uMDQ2LjI4OC0uMDYuNDM0LS4wMzUuMzQ4LS4wNDYuNjk1LS4wNTMgMS4wNDEuMDA0LjA3NS0uMDA2LjE0OS0uMDA2LjIyNXY1MTYuMTI3YzAgLjA3Ni4wMS4xNS4wMTIuMjI2LjAwNS4zNDguMDE5LjY5My4wNTMgMS4wNDEuMDE0LjE0Ni4wNDEuMjg5LjA2LjQzNi4wMzYuMjczLjA3MS41NDUuMTI1LjgxNy4wMzguMTg4LjA5LjM3My4xMzYuNTYxLjA1My4yMi4xMDMuNDQuMTY4LjY1OS4wNjkuMjI1LjE1MS40NDEuMjMyLjY2Mi4wNjMuMTc0LjExOS4zNS4xOTEuNTIxLjExLjI2OC4yMzkuNTI2LjM2Ni43ODQuMDU5LjExOS4xMDguMjM5LjE3Mi4zNTcuMTc3LjMzMS4zNy42NS41NzMuOTY0LjAyNy4wNDMuMDUuMDg4LjA3OC4xMzFsLjAwNy4wMWMuMjc4LjQxNy41ODUuODExLjkwOCAxLjE5MS4xLjExOC4yMDcuMjI3LjMxLjM0MmExMy4zNTkgMTMuMzU5IDAgMDAxLjEwNSAxLjA3N2MuMjU2LjIyLjUyMy40MjcuNzk3LjYyOC4xMTUuMDg0LjIyNC4xNzYuMzQuMjU1LjM4OS4yNjUuNzkyLjUwNyAxLjIwOS43My4xLjA1NC4yMDMuMDk3LjMwNS4xNDYuMzM1LjE2Ny42NzYuMzIyIDEuMDI3LjQ2MWExMy43MTkgMTMuNzE5IDAgMDAxLjQwOS40NTljLjEzNi4wMzYuMjcyLjA3My40MS4xMDQuMzU0LjA4MS43MTQuMTQ1IDEuMDc5LjE5Ni4xMjUuMDE4LjI1LjA0My4zNzUuMDU3LjQ1OS4wNTIuOTI2LjA4MyAxLjM5OS4wODQuMDIyIDAgLjA0NC4wMDQuMDY4LjAwNGg3NzQuMTUybC4wMTguMDAyYy4wMjIgMCAuMDQ1LS4wMDQuMDY3LS4wMDQuNDczLS4wMDIuOTM4LS4wMzIgMS4zOTgtLjA4NC4xMjQtLjAxNC4yNDYtLjA0LjM2OS0uMDU3LjM2Ny0uMDUyLjczLS4xMTUgMS4wODYtLjE5OGE5LjExIDkuMTEgMCAwMC40MDItLjEwNCAxMy4xNyAxMy4xNyAwIDAwMS4wMjItLjMxNmMuMTMxLS4wNDYuMjYtLjA5MS4zODktLjE0My4zNTYtLjE0LjcwMi0uMjk4IDEuMDQxLS40NjYuMDk3LS4wNDkuMTk2LS4wOS4yOTItLjE0Mi40Mi0uMjI0LjgyNC0uNDY4IDEuMjE1LS43MzIuMTEzLS4wNzguMjIxLS4xNjcuMzMtLjI0OGExMS43NzMgMTEuNzczIDAgMDAxLjIwOC0xYy4yNDQtLjIyOS40NzctLjQ2Ni43MDQtLjcxMi4xMDMtLjExMy4yMDgtLjIyMi4zMDgtLjMzOS4zMjMtLjM4LjYzLS43NzUuOTA4LTEuMTlsLjAwNy0uMDExYy4wMjktLjA0My4wNS0uMDg3LjA3OC0uMTMuMjAzLS4zMTMuMzk2LS42MzIuNTcyLS45NjQuMDYzLS4xMTcuMTEyLS4yMzcuMTcxLS4zNTQuMTI5LS4yNi4yNTYtLjUyLjM2OC0uNzkuMDctLjE3LjEyNS0uMzQ0LjE4OC0uNTE2LjA4MS0uMjIxLjE2NC0uNDQuMjMyLS42NjYuMDY1LS4yMTkuMTE1LS40MzguMTY5LS42NTcuMDQ3LS4xODguMDk4LS4zNzEuMTM2LS41NjMuMDU0LS4yNy4wOS0uNTQ0LjEyNC0uODE1LjAxOS0uMTQ2LjA0Ny0uMjg5LjA2Mi0uNDM3LjAzNS0uMzQ2LjA0Ny0uNjkzLjA1NC0xLjAzOS4wMDItLjA3Ni4wMTItLjE1LjAxMi0uMjI2di0uMDQ1YS4xNDYuMTQ2IDAgMDAuMDA0LS4wNDF6TTQ2OS42NzggMzEzLjI0NGwyMzcuNTg0LTE1OC40MDVoMzcuMjE5TDQ4MS4yNTQgMzMwLjMyM2g0Ni41MjRsMjQ2LjQxNS0xNjQuMjc3djE4My42MzFINDUwLjMyMlYxNTQuODM5aDIxMC40MjFMNDY5LjY3OCAyODIuMjI4djMxLjAxNnptLTEyMCAzNi40MzNIMjUuODA3VjIyMS45NDVsMTYyLjE3NiAxMDguMzc4aDQ2LjQ0NkwyNS44MDcgMTkwLjkwNnYtMjQuODZsMjQ2LjQxNiAxNjQuMjc3aDQ2LjUyNEw1NS41MiAxNTQuODM5aDI5NC4xNTd2MTk0LjgzOHpNMzMwLjMyMiA0ODYuNzdMOTIuNzM4IDY0NS4xNjFINTUuNTJsMjYzLjIyNi0xNzUuNDgzaC00Ni41MjRMMjUuODA3IDYzMy45NTRWNDUwLjMyM2gzMjMuODcxdjE5NC44MzlIMTM5LjI2MmwxOTEuMDYxLTEyNy4zNzVWNDg2Ljc3em0xMjAtMzYuNDQ4aDIzMy41NDljNy4xMjggMCAxMi45MDMtNS43NzcgMTIuOTAzLTEyLjkwM3MtNS43NzUtMTIuOTAyLTEyLjkwMy0xMi45MDJINDM3LjQxOWMtNy4xMjcgMC0xMi45MDMgNS43NzYtMTIuOTAzIDEyLjkwMnYyMDcuNzQyaC00OS4wMzFWNDM3LjQxOWMwLTcuMTI2LTUuNzc2LTEyLjkwMi0xMi45MDMtMTIuOTAySDI1LjgwN3YtNDkuMDMzaDMzNi43NzRjNy4xMjcgMCAxMi45MDMtNS43NzcgMTIuOTAzLTEyLjkwM1YxNTQuODM5aDQ5LjAzMXYyMDcuNzQyYzAgNy4xMjYgNS43NzYgMTIuOTAzIDEyLjkwMyAxMi45MDNoMzM2Ljc3NHY0OS4wMzNoLTM4LjcwOWMtNy4xMjggMC0xMi45MDMgNS43NzYtMTIuOTAzIDEyLjkwMiAwIDcuMTI2IDUuNzc1IDEyLjkwMyAxMi45MDMgMTIuOTAzaDM4LjcwOXYxMjguOTYzTDYxMC4xNzEgNDY5LjY3OGgtNDYuNDQ4bDIxMC40NzEgMTQwLjY0NXYyMy42MzFMNTI3Ljc3OCA0NjkuNjc4aC00Ni41MjRMNzQ0LjQ4IDY0NS4xNjFINDUwLjMyM1Y0NTAuMzIyeiIvPjxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik0zMzAuMzIyIDI2OS44MDdMMTU3Ljg3IDE1NC44MzlINTUuNTJsMjYzLjIyNiAxNzUuNDg0SDE4Ny45ODNMMjUuODA3IDIyMS45NDR2MTIuMzM1bDE0NC4wNjUgOTYuMDQ0SDI1LjgwN3YxOS4zNTRoMzIzLjg3MVYxNTQuODM5aC0xOS4zNTZ6bTEzOS4zNTYgMjYwLjM4NGwxNzIuNDUyIDExNC45N2gxMDIuMzVMNDgxLjI1NCA0NjkuNjc4aDEyOC45MThsMTY0LjAyMSAxMDkuNjA4di0xMy41NjVsLTE0NC4wNjUtOTYuMDQzaDE0NC4wNjV2LTE5LjM1NWgtMzguNzA5Yy03LjEyOCAwLTEyLjkwMy01Ljc3Ny0xMi45MDMtMTIuOTAzaC0yNS44MDdjMCA3LjEyNi01Ljc3NSAxMi45MDMtMTIuOTAzIDEyLjkwM0g0NTAuMzIydjE5NC44MzloMTkuMzU1VjUzMC4xOTF6Ii8+PHBhdGggZmlsbD0iI0VEMUYzNCIgZD0iTTM3NC40ODQgNjQ2LjE2MVY0MzcuNDE5YzAtNi41NjMtNS4zNC0xMS45MDItMTEuOTAzLTExLjkwMkgyNC44MDd2LTUxLjAzM2gzMzcuNzc0YzYuNTYzIDAgMTEuOTAzLTUuMzQgMTEuOTAzLTExLjkwM1YxNTMuODM5aDUxLjAzMXYyMDguNzQyYzAgNi41NjMgNS4zNCAxMS45MDMgMTEuOTAzIDExLjkwM2gzMzcuNzc0djUxLjAzM2gtMzkuNzA5Yy02LjU2MyAwLTExLjkwMyA1LjMzOS0xMS45MDMgMTEuOTAydjFoLTI3LjgwN3YtMWMwLTYuNTYzLTUuMzQtMTEuOTAyLTExLjkwMy0xMS45MDJINDM3LjQxOWMtNi41NjMgMC0xMS45MDMgNS4zMzktMTEuOTAzIDExLjkwMnYyMDguNzQyaC01MS4wMzJ6Ii8+PHBhdGggZmlsbD0iI0VEMUYzNCIgZD0iTTcyMi41ODEgNDM3LjQxOWMwLTcuMTI2IDUuNzc1LTEyLjkwMiAxMi45MDMtMTIuOTAyaDM4LjcwOXYtNDkuMDMzSDQzNy40MTljLTcuMTI3IDAtMTIuOTAzLTUuNzc3LTEyLjkwMy0xMi45MDNWMTU0LjgzOWgtNDkuMDMxdjIwNy43NDJjMCA3LjEyNi01Ljc3NiAxMi45MDMtMTIuOTAzIDEyLjkwM0gyNS44MDd2NDkuMDMzaDMzNi43NzRjNy4xMjcgMCAxMi45MDMgNS43NzYgMTIuOTAzIDEyLjkwMnYyMDcuNzQyaDQ5LjAzMVY0MzcuNDE5YzAtNy4xMjYgNS43NzYtMTIuOTAyIDEyLjkwMy0xMi45MDJINjgzLjg3YzcuMTI4IDAgMTIuOTAzIDUuNzc2IDEyLjkwMyAxMi45MDJoMjUuODA4eiIvPjwvc3ZnPg==");

/***/ }),

/***/ "LPF2":
/***/ (function(module, exports) {

module.exports = "/_next/static/images/user1-7815e9dffe9535f28e31594ca859a4fd.png";

/***/ }),

/***/ "Nh2W":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.markAssetError = markAssetError;
exports.isAssetError = isAssetError;
exports.getClientBuildManifest = getClientBuildManifest;
exports.createRouteLoader = createRouteLoader;

var _getAssetPathFromRoute = _interopRequireDefault(__webpack_require__("SpTj"));

var _requestIdleCallback = __webpack_require__("0G5g");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
} // 3.8s was arbitrarily chosen as it's what https://web.dev/interactive
// considers as "Good" time-to-interactive. We must assume something went
// wrong beyond this point, and then fall-back to a full page transition to
// show the user something of value.


const MS_MAX_IDLE_DELAY = 3800;

function withFuture(key, map, generator) {
  let entry = map.get(key);

  if (entry) {
    if ('future' in entry) {
      return entry.future;
    }

    return Promise.resolve(entry);
  }

  let resolver;
  const prom = new Promise(resolve => {
    resolver = resolve;
  });
  map.set(key, entry = {
    resolve: resolver,
    future: prom
  });
  return generator ? generator().then(value => (resolver(value), value)) : prom;
}

function hasPrefetch(link) {
  try {
    link = document.createElement('link');
    return (// detect IE11 since it supports prefetch but isn't detected
      // with relList.support
      !!window.MSInputMethodContext && !!document.documentMode || link.relList.supports('prefetch')
    );
  } catch (e) {
    return false;
  }
}

const canPrefetch = hasPrefetch();

function prefetchViaDom(href, as, link) {
  return new Promise((res, rej) => {
    if (document.querySelector(`link[rel="prefetch"][href^="${href}"]`)) {
      return res();
    }

    link = document.createElement('link'); // The order of property assignment here is intentional:

    if (as) link.as = as;
    link.rel = `prefetch`;
    link.crossOrigin = undefined;
    link.onload = res;
    link.onerror = rej; // `href` should always be last:

    link.href = href;
    document.head.appendChild(link);
  });
}

const ASSET_LOAD_ERROR = Symbol('ASSET_LOAD_ERROR');

function markAssetError(err) {
  return Object.defineProperty(err, ASSET_LOAD_ERROR, {});
}

function isAssetError(err) {
  return err && ASSET_LOAD_ERROR in err;
}

function appendScript(src, script) {
  return new Promise((resolve, reject) => {
    script = document.createElement('script'); // The order of property assignment here is intentional.
    // 1. Setup success/failure hooks in case the browser synchronously
    //    executes when `src` is set.

    script.onload = resolve;

    script.onerror = () => reject(markAssetError(new Error(`Failed to load script: ${src}`))); // 2. Configure the cross-origin attribute before setting `src` in case the
    //    browser begins to fetch.


    script.crossOrigin = undefined; // 3. Finally, set the source and inject into the DOM in case the child
    //    must be appended for fetching to start.

    script.src = src;
    document.body.appendChild(script);
  });
} // We wait for pages to be built in dev before we start the route transition
// timeout to prevent an un-necessary hard navigation in development.


let devBuildPromise; // Resolve a promise that times out after given amount of milliseconds.

function resolvePromiseWithTimeout(p, ms, err) {
  return new Promise((resolve, reject) => {
    let cancelled = false;
    p.then(r => {
      // Resolved, cancel the timeout
      cancelled = true;
      resolve(r);
    }).catch(reject); // We wrap these checks separately for better dead-code elimination in
    // production bundles.

    if (false) {}

    if (true) {
      (0, _requestIdleCallback).requestIdleCallback(() => setTimeout(() => {
        if (!cancelled) {
          reject(err);
        }
      }, ms));
    }
  });
}

function getClientBuildManifest() {
  if (self.__BUILD_MANIFEST) {
    return Promise.resolve(self.__BUILD_MANIFEST);
  }

  const onBuildManifest = new Promise(resolve => {
    // Mandatory because this is not concurrent safe:
    const cb = self.__BUILD_MANIFEST_CB;

    self.__BUILD_MANIFEST_CB = () => {
      resolve(self.__BUILD_MANIFEST);
      cb && cb();
    };
  });
  return resolvePromiseWithTimeout(onBuildManifest, MS_MAX_IDLE_DELAY, markAssetError(new Error('Failed to load client build manifest')));
}

function getFilesForRoute(assetPrefix, route) {
  if (false) {}

  return getClientBuildManifest().then(manifest => {
    if (!(route in manifest)) {
      throw markAssetError(new Error(`Failed to lookup route: ${route}`));
    }

    const allFiles = manifest[route].map(entry => assetPrefix + '/_next/' + encodeURI(entry));
    return {
      scripts: allFiles.filter(v => v.endsWith('.js')),
      css: allFiles.filter(v => v.endsWith('.css'))
    };
  });
}

function createRouteLoader(assetPrefix) {
  const entrypoints = new Map();
  const loadedScripts = new Map();
  const styleSheets = new Map();
  const routes = new Map();

  function maybeExecuteScript(src) {
    let prom = loadedScripts.get(src);

    if (prom) {
      return prom;
    } // Skip executing script if it's already in the DOM:


    if (document.querySelector(`script[src^="${src}"]`)) {
      return Promise.resolve();
    }

    loadedScripts.set(src, prom = appendScript(src));
    return prom;
  }

  function fetchStyleSheet(href) {
    let prom = styleSheets.get(href);

    if (prom) {
      return prom;
    }

    styleSheets.set(href, prom = fetch(href).then(res => {
      if (!res.ok) {
        throw new Error(`Failed to load stylesheet: ${href}`);
      }

      return res.text().then(text => ({
        href: href,
        content: text
      }));
    }).catch(err => {
      throw markAssetError(err);
    }));
    return prom;
  }

  return {
    whenEntrypoint(route) {
      return withFuture(route, entrypoints);
    },

    onEntrypoint(route, execute) {
      Promise.resolve(execute).then(fn => fn()).then(exports => ({
        component: exports && exports.default || exports,
        exports: exports
      }), err => ({
        error: err
      })).then(input => {
        const old = entrypoints.get(route);
        entrypoints.set(route, input);
        if (old && 'resolve' in old) old.resolve(input);
      });
    },

    loadRoute(route, prefetch) {
      return withFuture(route, routes, () => {
        const routeFilesPromise = getFilesForRoute(assetPrefix, route).then(({
          scripts,
          css
        }) => {
          return Promise.all([entrypoints.has(route) ? [] : Promise.all(scripts.map(maybeExecuteScript)), Promise.all(css.map(fetchStyleSheet))]);
        }).then(res => {
          return this.whenEntrypoint(route).then(entrypoint => ({
            entrypoint,
            styles: res[1]
          }));
        });

        if (false) {}

        return resolvePromiseWithTimeout(routeFilesPromise, MS_MAX_IDLE_DELAY, markAssetError(new Error(`Route did not complete loading: ${route}`))).then(({
          entrypoint,
          styles
        }) => {
          const res = Object.assign({
            styles: styles
          }, entrypoint);
          return 'error' in entrypoint ? entrypoint : res;
        }).catch(err => {
          if (prefetch) {
            // we don't want to cache errors during prefetch
            throw err;
          }

          return {
            error: err
          };
        });
      });
    },

    prefetch(route) {
      // https://github.com/GoogleChromeLabs/quicklink/blob/453a661fa1fa940e2d2e044452398e38c67a98fb/src/index.mjs#L115-L118
      // License: Apache 2.0
      let cn;

      if (cn = navigator.connection) {
        // Don't prefetch if using 2G or if Save-Data is enabled.
        if (cn.saveData || /2g/.test(cn.effectiveType)) return Promise.resolve();
      }

      return getFilesForRoute(assetPrefix, route).then(output => Promise.all(canPrefetch ? output.scripts.map(script => prefetchViaDom(script, 'script')) : [])).then(() => {
        (0, _requestIdleCallback).requestIdleCallback(() => this.loadRoute(route, true).catch(() => {}));
      }).catch( // swallow prefetch errors
      () => {});
    }

  };
}

/***/ }),

/***/ "OfkW":
/***/ (function(module, exports) {

module.exports = require("next/dist/server/denormalize-page-path.js");

/***/ }),

/***/ "P7Vo":
/***/ (function(module, exports) {

module.exports = require("antd/lib/tag");

/***/ }),

/***/ "PKTO":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__("Dtiu");
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// CONCATENATED MODULE: ./components/utility/layoutWrapper.style.js

const LayoutContentWrapper = external_styled_components_default.a.div.withConfig({
  displayName: "layoutWrapperstyle__LayoutContentWrapper",
  componentId: "sc-qhwnm2-0"
})(["padding:40px 20px;display:flex;flex-flow:row wrap;overflow:hidden;@media only screen and (max-width:767px){padding:50px 20px;}@media (max-width:580px){padding:15px;}"]);

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__("F5FC");

// CONCATENATED MODULE: ./components/utility/layoutWrapper.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





const LayoutWrapper = props => /*#__PURE__*/Object(jsx_runtime_["jsx"])(LayoutContentWrapper, _objectSpread(_objectSpread({
  className: props.className != null ? `${props.className} isoLayoutContentWrapper` : 'isoLayoutContentWrapper'
}, props), {}, {
  children: props.children
}));

/* harmony default export */ var layoutWrapper = __webpack_exports__["a"] = (LayoutWrapper);

/***/ }),

/***/ "Q94N":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var antd_lib_popover__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("27qp");
/* harmony import */ var antd_lib_popover__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_lib_popover__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["a"] = (antd_lib_popover__WEBPACK_IMPORTED_MODULE_0___default.a);

/***/ }),

/***/ "Qx0H":
/***/ (function(module, exports) {

module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ "Rv81":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getView; });
function getView(width) {
  let newView = 'MobileView';

  if (width > 1220) {
    newView = 'DesktopView';
  } else if (width > 767) {
    newView = 'TabView';
  }

  return newView;
}
const actions = {
  COLLPSE_CHANGE: 'COLLPSE_CHANGE',
  COLLPSE_OPEN_DRAWER: 'COLLPSE_OPEN_DRAWER',
  CHANGE_OPEN_KEYS: 'CHANGE_OPEN_KEYS',
  TOGGLE_ALL: 'TOGGLE_ALL',
  CHANGE_CURRENT: 'CHANGE_CURRENT',
  CLEAR_MENU: 'CLEAR_MENU',
  toggleCollapsed: () => ({
    type: actions.COLLPSE_CHANGE
  }),
  toggleAll: (width, height) => {
    const view = getView(width);
    const collapsed = view !== 'DesktopView';
    return {
      type: actions.TOGGLE_ALL,
      collapsed,
      view,
      height
    };
  },
  toggleOpenDrawer: () => ({
    type: actions.COLLPSE_OPEN_DRAWER
  }),
  changeOpenKeys: openKeys => ({
    type: actions.CHANGE_OPEN_KEYS,
    openKeys
  }),
  changeCurrent: current => ({
    type: actions.CHANGE_CURRENT,
    current
  }),
  clearMenu: () => ({
    type: actions.CLEAR_MENU
  })
};
/* harmony default export */ __webpack_exports__["a"] = (actions);

/***/ }),

/***/ "Sgtc":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDomainLocale = getDomainLocale;
exports.addLocale = addLocale;
exports.delLocale = delLocale;
exports.hasBasePath = hasBasePath;
exports.addBasePath = addBasePath;
exports.delBasePath = delBasePath;
exports.isLocalURL = isLocalURL;
exports.interpolateAs = interpolateAs;
exports.resolveHref = resolveHref;
exports.default = void 0;

var _normalizeTrailingSlash = __webpack_require__("X24+");

var _routeLoader = __webpack_require__("Nh2W");

var _denormalizePagePath = __webpack_require__("OfkW");

var _normalizeLocalePath = __webpack_require__("TJ0d");

var _mitt = _interopRequireDefault(__webpack_require__("jcgO"));

var _utils = __webpack_require__("1IPs");

var _isDynamic = __webpack_require__("WSU2");

var _parseRelativeUrl = __webpack_require__("pfUk");

var _querystring = __webpack_require__("2tlT");

var _resolveRewrites = _interopRequireDefault(__webpack_require__("XgOf"));

var _routeMatcher = __webpack_require__("Qx0H");

var _routeRegex = __webpack_require__("q5Ud");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

let detectDomainLocale;

if (false) {}

const basePath =  false || '';

function buildCancellationError() {
  return Object.assign(new Error('Route Cancelled'), {
    cancelled: true
  });
}

function addPathPrefix(path, prefix) {
  return prefix && path.startsWith('/') ? path === '/' ? (0, _normalizeTrailingSlash).normalizePathTrailingSlash(prefix) : `${prefix}${pathNoQueryHash(path) === '/' ? path.substring(1) : path}` : path;
}

function getDomainLocale(path, locale, locales, domainLocales) {
  if (false) {} else {
    return false;
  }
}

function addLocale(path, locale, defaultLocale) {
  if (false) {}

  return path;
}

function delLocale(path, locale) {
  if (false) {}

  return path;
}

function pathNoQueryHash(path) {
  const queryIndex = path.indexOf('?');
  const hashIndex = path.indexOf('#');

  if (queryIndex > -1 || hashIndex > -1) {
    path = path.substring(0, queryIndex > -1 ? queryIndex : hashIndex);
  }

  return path;
}

function hasBasePath(path) {
  path = pathNoQueryHash(path);
  return path === basePath || path.startsWith(basePath + '/');
}

function addBasePath(path) {
  // we only add the basepath on relative urls
  return addPathPrefix(path, basePath);
}

function delBasePath(path) {
  path = path.slice(basePath.length);
  if (!path.startsWith('/')) path = `/${path}`;
  return path;
}

function isLocalURL(url) {
  // prevent a hydration mismatch on href for url with anchor refs
  if (url.startsWith('/') || url.startsWith('#') || url.startsWith('?')) return true;

  try {
    // absolute urls can be local if they are on the same origin
    const locationOrigin = (0, _utils).getLocationOrigin();
    const resolved = new URL(url, locationOrigin);
    return resolved.origin === locationOrigin && hasBasePath(resolved.pathname);
  } catch (_) {
    return false;
  }
}

function interpolateAs(route, asPathname, query) {
  let interpolatedRoute = '';
  const dynamicRegex = (0, _routeRegex).getRouteRegex(route);
  const dynamicGroups = dynamicRegex.groups;
  const dynamicMatches = // Try to match the dynamic route against the asPath
  (asPathname !== route ? (0, _routeMatcher).getRouteMatcher(dynamicRegex)(asPathname) : '') || // Fall back to reading the values from the href
  // TODO: should this take priority; also need to change in the router.
  query;
  interpolatedRoute = route;
  const params = Object.keys(dynamicGroups);

  if (!params.every(param => {
    let value = dynamicMatches[param] || '';
    const {
      repeat,
      optional
    } = dynamicGroups[param]; // support single-level catch-all
    // TODO: more robust handling for user-error (passing `/`)

    let replaced = `[${repeat ? '...' : ''}${param}]`;

    if (optional) {
      replaced = `${!value ? '/' : ''}[${replaced}]`;
    }

    if (repeat && !Array.isArray(value)) value = [value];
    return (optional || param in dynamicMatches) && (interpolatedRoute = interpolatedRoute.replace(replaced, repeat ? value.map( // these values should be fully encoded instead of just
    // path delimiter escaped since they are being inserted
    // into the URL and we expect URL encoded segments
    // when parsing dynamic route params
    segment => encodeURIComponent(segment)).join('/') : encodeURIComponent(value)) || '/');
  })) {
    interpolatedRoute = '' // did not satisfy all requirements
    ; // n.b. We ignore this error because we handle warning for this case in
    // development in the `<Link>` component directly.
  }

  return {
    params,
    result: interpolatedRoute
  };
}

function omitParmsFromQuery(query, params) {
  const filteredQuery = {};
  Object.keys(query).forEach(key => {
    if (!params.includes(key)) {
      filteredQuery[key] = query[key];
    }
  });
  return filteredQuery;
}

function resolveHref(router, href, resolveAs) {
  // we use a dummy base url for relative urls
  let base;
  let urlAsString = typeof href === 'string' ? href : (0, _utils).formatWithValidation(href); // repeated slashes and backslashes in the URL are considered
  // invalid and will never match a Next.js page/file

  const urlProtoMatch = urlAsString.match(/^[a-zA-Z]{1,}:\/\//);
  const urlAsStringNoProto = urlProtoMatch ? urlAsString.substr(urlProtoMatch[0].length) : urlAsString;
  const urlParts = urlAsStringNoProto.split('?');

  if ((urlParts[0] || '').match(/(\/\/|\\)/)) {
    console.error(`Invalid href passed to next/router: ${urlAsString}, repeated forward-slashes (//) or backslashes \\ are not valid in the href`);
    const normalizedUrl = (0, _utils).normalizeRepeatedSlashes(urlAsStringNoProto);
    urlAsString = (urlProtoMatch ? urlProtoMatch[0] : '') + normalizedUrl;
  } // Return because it cannot be routed by the Next.js router


  if (!isLocalURL(urlAsString)) {
    return resolveAs ? [urlAsString] : urlAsString;
  }

  try {
    base = new URL(urlAsString.startsWith('#') ? router.asPath : router.pathname, 'http://n');
  } catch (_) {
    // fallback to / for invalid asPath values e.g. //
    base = new URL('/', 'http://n');
  }

  try {
    const finalUrl = new URL(urlAsString, base);
    finalUrl.pathname = (0, _normalizeTrailingSlash).normalizePathTrailingSlash(finalUrl.pathname);
    let interpolatedAs = '';

    if ((0, _isDynamic).isDynamicRoute(finalUrl.pathname) && finalUrl.searchParams && resolveAs) {
      const query = (0, _querystring).searchParamsToUrlQuery(finalUrl.searchParams);
      const {
        result,
        params
      } = interpolateAs(finalUrl.pathname, finalUrl.pathname, query);

      if (result) {
        interpolatedAs = (0, _utils).formatWithValidation({
          pathname: result,
          hash: finalUrl.hash,
          query: omitParmsFromQuery(query, params)
        });
      }
    } // if the origin didn't change, it means we received a relative href


    const resolvedHref = finalUrl.origin === base.origin ? finalUrl.href.slice(finalUrl.origin.length) : finalUrl.href;
    return resolveAs ? [resolvedHref, interpolatedAs || resolvedHref] : resolvedHref;
  } catch (_) {
    return resolveAs ? [urlAsString] : urlAsString;
  }
}

function stripOrigin(url) {
  const origin = (0, _utils).getLocationOrigin();
  return url.startsWith(origin) ? url.substring(origin.length) : url;
}

function prepareUrlAs(router, url, as) {
  // If url and as provided as an object representation,
  // we'll format them into the string version here.
  let [resolvedHref, resolvedAs] = resolveHref(router, url, true);
  const origin = (0, _utils).getLocationOrigin();
  const hrefHadOrigin = resolvedHref.startsWith(origin);
  const asHadOrigin = resolvedAs && resolvedAs.startsWith(origin);
  resolvedHref = stripOrigin(resolvedHref);
  resolvedAs = resolvedAs ? stripOrigin(resolvedAs) : resolvedAs;
  const preparedUrl = hrefHadOrigin ? resolvedHref : addBasePath(resolvedHref);
  const preparedAs = as ? stripOrigin(resolveHref(router, as)) : resolvedAs || resolvedHref;
  return {
    url: preparedUrl,
    as: asHadOrigin ? preparedAs : addBasePath(preparedAs)
  };
}

function resolveDynamicRoute(pathname, pages) {
  const cleanPathname = (0, _normalizeTrailingSlash).removePathTrailingSlash((0, _denormalizePagePath).denormalizePagePath(pathname));

  if (cleanPathname === '/404' || cleanPathname === '/_error') {
    return pathname;
  } // handle resolving href for dynamic routes


  if (!pages.includes(cleanPathname)) {
    // eslint-disable-next-line array-callback-return
    pages.some(page => {
      if ((0, _isDynamic).isDynamicRoute(page) && (0, _routeRegex).getRouteRegex(page).re.test(cleanPathname)) {
        pathname = page;
        return true;
      }
    });
  }

  return (0, _normalizeTrailingSlash).removePathTrailingSlash(pathname);
}

const manualScrollRestoration =  false && false;
const SSG_DATA_NOT_FOUND = Symbol('SSG_DATA_NOT_FOUND');

function fetchRetry(url, attempts) {
  return fetch(url, {
    // Cookies are required to be present for Next.js' SSG "Preview Mode".
    // Cookies may also be required for `getServerSideProps`.
    //
    // > `fetch` won’t send cookies, unless you set the credentials init
    // > option.
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    //
    // > For maximum browser compatibility when it comes to sending &
    // > receiving cookies, always supply the `credentials: 'same-origin'`
    // > option instead of relying on the default.
    // https://github.com/github/fetch#caveats
    credentials: 'same-origin'
  }).then(res => {
    if (!res.ok) {
      if (attempts > 1 && res.status >= 500) {
        return fetchRetry(url, attempts - 1);
      }

      if (res.status === 404) {
        return res.json().then(data => {
          if (data.notFound) {
            return {
              notFound: SSG_DATA_NOT_FOUND
            };
          }

          throw new Error(`Failed to load static props`);
        });
      }

      throw new Error(`Failed to load static props`);
    }

    return res.json();
  });
}

function fetchNextData(dataHref, isServerRender) {
  return fetchRetry(dataHref, isServerRender ? 3 : 1).catch(err => {
    // We should only trigger a server-side transition if this was caused
    // on a client-side transition. Otherwise, we'd get into an infinite
    // loop.
    if (!isServerRender) {
      (0, _routeLoader).markAssetError(err);
    }

    throw err;
  });
}

class Router {
  constructor(pathname1, query1, as1, {
    initialProps,
    pageLoader,
    App,
    wrapApp,
    Component: Component1,
    err: err1,
    subscription,
    isFallback,
    locale,
    locales,
    defaultLocale,
    domainLocales,
    isPreview
  }) {
    // Static Data Cache
    this.sdc = {}; // In-flight Server Data Requests, for deduping

    this.sdr = {};
    this._idx = 0;

    this.onPopState = e => {
      const state = e.state;

      if (!state) {
        // We get state as undefined for two reasons.
        //  1. With older safari (< 8) and older chrome (< 34)
        //  2. When the URL changed with #
        //
        // In the both cases, we don't need to proceed and change the route.
        // (as it's already changed)
        // But we can simply replace the state with the new changes.
        // Actually, for (1) we don't need to nothing. But it's hard to detect that event.
        // So, doing the following for (1) does no harm.
        const {
          pathname: pathname1,
          query: query1
        } = this;
        this.changeState('replaceState', (0, _utils).formatWithValidation({
          pathname: addBasePath(pathname1),
          query: query1
        }), (0, _utils).getURL());
        return;
      }

      if (!state.__N) {
        return;
      }

      let forcedScroll;
      const {
        url,
        as: as1,
        options,
        idx
      } = state;

      if (false) {}

      this._idx = idx;
      const {
        pathname: pathname1
      } = (0, _parseRelativeUrl).parseRelativeUrl(url); // Make sure we don't re-render on initial load,
      // can be caused by navigating back from an external site

      if (this.isSsr && as1 === this.asPath && pathname1 === this.pathname) {
        return;
      } // If the downstream application returns falsy, return.
      // They will then be responsible for handling the event.


      if (this._bps && !this._bps(state)) {
        return;
      }

      this.change('replaceState', url, as1, Object.assign({}, options, {
        shallow: options.shallow && this._shallow,
        locale: options.locale || this.defaultLocale
      }), forcedScroll);
    }; // represents the current component key


    this.route = (0, _normalizeTrailingSlash).removePathTrailingSlash(pathname1); // set up the component cache (by route keys)

    this.components = {}; // We should not keep the cache, if there's an error
    // Otherwise, this cause issues when when going back and
    // come again to the errored page.

    if (pathname1 !== '/_error') {
      this.components[this.route] = {
        Component: Component1,
        initial: true,
        props: initialProps,
        err: err1,
        __N_SSG: initialProps && initialProps.__N_SSG,
        __N_SSP: initialProps && initialProps.__N_SSP
      };
    }

    this.components['/_app'] = {
      Component: App,
      styleSheets: []
    }; // Backwards compat for Router.router.events
    // TODO: Should be remove the following major version as it was never documented

    this.events = Router.events;
    this.pageLoader = pageLoader;
    this.pathname = pathname1;
    this.query = query1; // if auto prerendered and dynamic route wait to update asPath
    // until after mount to prevent hydration mismatch

    const autoExportDynamic = (0, _isDynamic).isDynamicRoute(pathname1) && self.__NEXT_DATA__.autoExport;

    this.asPath = autoExportDynamic ? pathname1 : as1;
    this.basePath = basePath;
    this.sub = subscription;
    this.clc = null;
    this._wrapApp = wrapApp; // make sure to ignore extra popState in safari on navigating
    // back from external site

    this.isSsr = true;
    this.isFallback = isFallback;
    this.isReady = !!(self.__NEXT_DATA__.gssp || self.__NEXT_DATA__.gip || self.__NEXT_DATA__.appGip && !self.__NEXT_DATA__.gsp || !autoExportDynamic && !self.location.search && !false);
    this.isPreview = !!isPreview;
    this.isLocaleDomain = false;

    if (false) {}

    if (false) {}
  }

  reload() {
    window.location.reload();
  }
  /**
  * Go back in history
  */


  back() {
    window.history.back();
  }
  /**
  * Performs a `pushState` with arguments
  * @param url of the route
  * @param as masks `url` for the browser
  * @param options object you can define `shallow` and other options
  */


  push(url, as, options = {}) {
    if (false) {}

    ({
      url,
      as
    } = prepareUrlAs(this, url, as));
    return this.change('pushState', url, as, options);
  }
  /**
  * Performs a `replaceState` with arguments
  * @param url of the route
  * @param as masks `url` for the browser
  * @param options object you can define `shallow` and other options
  */


  replace(url, as, options = {}) {
    ({
      url,
      as
    } = prepareUrlAs(this, url, as));
    return this.change('replaceState', url, as, options);
  }

  async change(method, url, as, options, forcedScroll) {
    if (!isLocalURL(url)) {
      window.location.href = url;
      return false;
    }

    const shouldResolveHref = url === as || options._h || options._shouldResolveHref; // for static pages with query params in the URL we delay
    // marking the router ready until after the query is updated

    if (options._h) {
      this.isReady = true;
    }

    const prevLocale = this.locale;

    if (false) { var ref; }

    if (!options._h) {
      this.isSsr = false;
    } // marking route changes as a navigation start entry


    if (_utils.ST) {
      performance.mark('routeChange');
    }

    const {
      shallow = false
    } = options;
    const routeProps = {
      shallow
    };

    if (this._inFlightRoute) {
      this.abortComponentLoad(this._inFlightRoute, routeProps);
    }

    as = addBasePath(addLocale(hasBasePath(as) ? delBasePath(as) : as, options.locale, this.defaultLocale));
    const cleanedAs = delLocale(hasBasePath(as) ? delBasePath(as) : as, this.locale);
    this._inFlightRoute = as;
    let localeChange = prevLocale !== this.locale; // If the url change is only related to a hash change
    // We should not proceed. We should only change the state.
    // WARNING: `_h` is an internal option for handing Next.js client-side
    // hydration. Your app should _never_ use this property. It may change at
    // any time without notice.

    if (!options._h && this.onlyAHashChange(cleanedAs) && !localeChange) {
      this.asPath = cleanedAs;
      Router.events.emit('hashChangeStart', as, routeProps); // TODO: do we need the resolved href when only a hash change?

      this.changeState(method, url, as, options);
      this.scrollToHash(cleanedAs);
      this.notify(this.components[this.route], null);
      Router.events.emit('hashChangeComplete', as, routeProps);
      return true;
    }

    let parsed = (0, _parseRelativeUrl).parseRelativeUrl(url);
    let {
      pathname: pathname1,
      query: query1
    } = parsed; // The build manifest needs to be loaded before auto-static dynamic pages
    // get their query parameters to allow ensuring they can be parsed properly
    // when rewritten to

    let pages, rewrites;

    try {
      pages = await this.pageLoader.getPageList();
      ({
        __rewrites: rewrites
      } = await (0, _routeLoader).getClientBuildManifest());
    } catch (err1) {
      // If we fail to resolve the page list or client-build manifest, we must
      // do a server-side transition:
      window.location.href = as;
      return false;
    } // If asked to change the current URL we should reload the current page
    // (not location.reload() but reload getInitialProps and other Next.js stuffs)
    // We also need to set the method = replaceState always
    // as this should not go into the history (That's how browsers work)
    // We should compare the new asPath to the current asPath, not the url


    if (!this.urlIsNew(cleanedAs) && !localeChange) {
      method = 'replaceState';
    } // we need to resolve the as value using rewrites for dynamic SSG
    // pages to allow building the data URL correctly


    let resolvedAs = as; // url and as should always be prefixed with basePath by this
    // point by either next/link or router.push/replace so strip the
    // basePath from the pathname to match the pages dir 1-to-1

    pathname1 = pathname1 ? (0, _normalizeTrailingSlash).removePathTrailingSlash(delBasePath(pathname1)) : pathname1;

    if (shouldResolveHref && pathname1 !== '/_error') {
      options._shouldResolveHref = true;

      if (false) {} else {
        parsed.pathname = resolveDynamicRoute(pathname1, pages);

        if (parsed.pathname !== pathname1) {
          pathname1 = parsed.pathname;
          parsed.pathname = addBasePath(pathname1);
          url = (0, _utils).formatWithValidation(parsed);
        }
      }
    }

    const route = (0, _normalizeTrailingSlash).removePathTrailingSlash(pathname1);

    if (!isLocalURL(as)) {
      if (false) {}

      window.location.href = as;
      return false;
    }

    resolvedAs = delLocale(delBasePath(resolvedAs), this.locale);

    if ((0, _isDynamic).isDynamicRoute(route)) {
      const parsedAs = (0, _parseRelativeUrl).parseRelativeUrl(resolvedAs);
      const asPathname = parsedAs.pathname;
      const routeRegex = (0, _routeRegex).getRouteRegex(route);
      const routeMatch = (0, _routeMatcher).getRouteMatcher(routeRegex)(asPathname);
      const shouldInterpolate = route === asPathname;
      const interpolatedAs = shouldInterpolate ? interpolateAs(route, asPathname, query1) : {};

      if (!routeMatch || shouldInterpolate && !interpolatedAs.result) {
        const missingParams = Object.keys(routeRegex.groups).filter(param => !query1[param]);

        if (missingParams.length > 0) {
          if (false) {}

          throw new Error((shouldInterpolate ? `The provided \`href\` (${url}) value is missing query values (${missingParams.join(', ')}) to be interpolated properly. ` : `The provided \`as\` value (${asPathname}) is incompatible with the \`href\` value (${route}). `) + `Read more: https://nextjs.org/docs/messages/${shouldInterpolate ? 'href-interpolation-failed' : 'incompatible-href-as'}`);
        }
      } else if (shouldInterpolate) {
        as = (0, _utils).formatWithValidation(Object.assign({}, parsedAs, {
          pathname: interpolatedAs.result,
          query: omitParmsFromQuery(query1, interpolatedAs.params)
        }));
      } else {
        // Merge params into `query`, overwriting any specified in search
        Object.assign(query1, routeMatch);
      }
    }

    Router.events.emit('routeChangeStart', as, routeProps);

    try {
      var ref, ref1;
      let routeInfo = await this.getRouteInfo(route, pathname1, query1, as, resolvedAs, routeProps);
      let {
        error,
        props,
        __N_SSG,
        __N_SSP
      } = routeInfo; // handle redirect on client-transition

      if ((__N_SSG || __N_SSP) && props) {
        if (props.pageProps && props.pageProps.__N_REDIRECT) {
          const destination = props.pageProps.__N_REDIRECT; // check if destination is internal (resolves to a page) and attempt
          // client-navigation if it is falling back to hard navigation if
          // it's not

          if (destination.startsWith('/')) {
            const parsedHref = (0, _parseRelativeUrl).parseRelativeUrl(destination);
            parsedHref.pathname = resolveDynamicRoute(parsedHref.pathname, pages);
            const {
              url: newUrl,
              as: newAs
            } = prepareUrlAs(this, destination, destination);
            return this.change(method, newUrl, newAs, options);
          }

          window.location.href = destination;
          return new Promise(() => {});
        }

        this.isPreview = !!props.__N_PREVIEW; // handle SSG data 404

        if (props.notFound === SSG_DATA_NOT_FOUND) {
          let notFoundRoute;

          try {
            await this.fetchComponent('/404');
            notFoundRoute = '/404';
          } catch (_) {
            notFoundRoute = '/_error';
          }

          routeInfo = await this.getRouteInfo(notFoundRoute, notFoundRoute, query1, as, resolvedAs, {
            shallow: false
          });
        }
      }

      Router.events.emit('beforeHistoryChange', as, routeProps);
      this.changeState(method, url, as, options);

      if (false) {}

      if (options._h && pathname1 === '/_error' && ((ref = self.__NEXT_DATA__.props) === null || ref === void 0 ? void 0 : (ref1 = ref.pageProps) === null || ref1 === void 0 ? void 0 : ref1.statusCode) === 500 && (props === null || props === void 0 ? void 0 : props.pageProps)) {
        // ensure statusCode is still correct for static 500 page
        // when updating query information
        props.pageProps.statusCode = 500;
      } // shallow routing is only allowed for same page URL changes.


      const isValidShallowRoute = options.shallow && this.route === route;

      var _scroll;

      const shouldScroll = (_scroll = options.scroll) !== null && _scroll !== void 0 ? _scroll : !isValidShallowRoute;
      const resetScroll = shouldScroll ? {
        x: 0,
        y: 0
      } : null;
      await this.set(route, pathname1, query1, cleanedAs, routeInfo, forcedScroll !== null && forcedScroll !== void 0 ? forcedScroll : resetScroll).catch(e => {
        if (e.cancelled) error = error || e;else throw e;
      });

      if (error) {
        Router.events.emit('routeChangeError', error, cleanedAs, routeProps);
        throw error;
      }

      if (false) {}

      Router.events.emit('routeChangeComplete', as, routeProps);
      return true;
    } catch (err1) {
      if (err1.cancelled) {
        return false;
      }

      throw err1;
    }
  }

  changeState(method, url, as, options = {}) {
    if (false) {}

    if (method !== 'pushState' || (0, _utils).getURL() !== as) {
      this._shallow = options.shallow;
      window.history[method]({
        url,
        as,
        options,
        __N: true,
        idx: this._idx = method !== 'pushState' ? this._idx : this._idx + 1
      }, // Most browsers currently ignores this parameter, although they may use it in the future.
      // Passing the empty string here should be safe against future changes to the method.
      // https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState
      '', as);
    }
  }

  async handleRouteInfoError(err, pathname, query, as, routeProps, loadErrorFail) {
    if (err.cancelled) {
      // bubble up cancellation errors
      throw err;
    }

    if ((0, _routeLoader).isAssetError(err) || loadErrorFail) {
      Router.events.emit('routeChangeError', err, as, routeProps); // If we can't load the page it could be one of following reasons
      //  1. Page doesn't exists
      //  2. Page does exist in a different zone
      //  3. Internal error while loading the page
      // So, doing a hard reload is the proper way to deal with this.

      window.location.href = as; // Changing the URL doesn't block executing the current code path.
      // So let's throw a cancellation error stop the routing logic.

      throw buildCancellationError();
    }

    try {
      let Component1;
      let styleSheets;
      let props;

      if (typeof Component1 === 'undefined' || typeof styleSheets === 'undefined') {
        ({
          page: Component1,
          styleSheets
        } = await this.fetchComponent('/_error'));
      }

      const routeInfo = {
        props,
        Component: Component1,
        styleSheets,
        err,
        error: err
      };

      if (!routeInfo.props) {
        try {
          routeInfo.props = await this.getInitialProps(Component1, {
            err,
            pathname,
            query
          });
        } catch (gipErr) {
          console.error('Error in error page `getInitialProps`: ', gipErr);
          routeInfo.props = {};
        }
      }

      return routeInfo;
    } catch (routeInfoErr) {
      return this.handleRouteInfoError(routeInfoErr, pathname, query, as, routeProps, true);
    }
  }

  async getRouteInfo(route, pathname, query, as, resolvedAs, routeProps) {
    try {
      const existingRouteInfo = this.components[route];

      if (routeProps.shallow && existingRouteInfo && this.route === route) {
        return existingRouteInfo;
      }

      const cachedRouteInfo = existingRouteInfo && 'initial' in existingRouteInfo ? undefined : existingRouteInfo;
      const routeInfo = cachedRouteInfo ? cachedRouteInfo : await this.fetchComponent(route).then(res => ({
        Component: res.page,
        styleSheets: res.styleSheets,
        __N_SSG: res.mod.__N_SSG,
        __N_SSP: res.mod.__N_SSP
      }));
      const {
        Component: Component1,
        __N_SSG,
        __N_SSP
      } = routeInfo;

      if (false) {}

      let dataHref;

      if (__N_SSG || __N_SSP) {
        dataHref = this.pageLoader.getDataHref((0, _utils).formatWithValidation({
          pathname,
          query
        }), resolvedAs, __N_SSG, this.locale);
      }

      const props = await this._getData(() => __N_SSG ? this._getStaticData(dataHref) : __N_SSP ? this._getServerData(dataHref) : this.getInitialProps(Component1, // we provide AppTree later so this needs to be `any`
      {
        pathname,
        query,
        asPath: as,
        locale: this.locale,
        locales: this.locales,
        defaultLocale: this.defaultLocale
      }));
      routeInfo.props = props;
      this.components[route] = routeInfo;
      return routeInfo;
    } catch (err2) {
      return this.handleRouteInfoError(err2, pathname, query, as, routeProps);
    }
  }

  set(route, pathname, query, as, data, resetScroll) {
    this.isFallback = false;
    this.route = route;
    this.pathname = pathname;
    this.query = query;
    this.asPath = as;
    return this.notify(data, resetScroll);
  }
  /**
  * Callback to execute before replacing router state
  * @param cb callback to be executed
  */


  beforePopState(cb) {
    this._bps = cb;
  }

  onlyAHashChange(as) {
    if (!this.asPath) return false;
    const [oldUrlNoHash, oldHash] = this.asPath.split('#');
    const [newUrlNoHash, newHash] = as.split('#'); // Makes sure we scroll to the provided hash if the url/hash are the same

    if (newHash && oldUrlNoHash === newUrlNoHash && oldHash === newHash) {
      return true;
    } // If the urls are change, there's more than a hash change


    if (oldUrlNoHash !== newUrlNoHash) {
      return false;
    } // If the hash has changed, then it's a hash only change.
    // This check is necessary to handle both the enter and
    // leave hash === '' cases. The identity case falls through
    // and is treated as a next reload.


    return oldHash !== newHash;
  }

  scrollToHash(as) {
    const [, hash] = as.split('#'); // Scroll to top if the hash is just `#` with no value or `#top`
    // To mirror browsers

    if (hash === '' || hash === 'top') {
      window.scrollTo(0, 0);
      return;
    } // First we check if the element by id is found


    const idEl = document.getElementById(hash);

    if (idEl) {
      idEl.scrollIntoView();
      return;
    } // If there's no element with the id, we check the `name` property
    // To mirror browsers


    const nameEl = document.getElementsByName(hash)[0];

    if (nameEl) {
      nameEl.scrollIntoView();
    }
  }

  urlIsNew(asPath) {
    return this.asPath !== asPath;
  }
  /**
  * Prefetch page code, you may wait for the data during page rendering.
  * This feature only works in production!
  * @param url the href of prefetched page
  * @param asPath the as path of the prefetched page
  */


  async prefetch(url, asPath = url, options = {}) {
    let parsed = (0, _parseRelativeUrl).parseRelativeUrl(url);
    let {
      pathname: pathname2
    } = parsed;

    if (false) {}

    const pages = await this.pageLoader.getPageList();
    let resolvedAs = asPath;

    if (false) {} else {
      parsed.pathname = resolveDynamicRoute(parsed.pathname, pages);

      if (parsed.pathname !== pathname2) {
        pathname2 = parsed.pathname;
        parsed.pathname = pathname2;
        url = (0, _utils).formatWithValidation(parsed);
      }
    }

    const route = (0, _normalizeTrailingSlash).removePathTrailingSlash(pathname2); // Prefetch is not supported in development mode because it would trigger on-demand-entries

    if (false) {}

    await Promise.all([this.pageLoader._isSsg(route).then(isSsg => {
      return isSsg ? this._getStaticData(this.pageLoader.getDataHref(url, resolvedAs, true, typeof options.locale !== 'undefined' ? options.locale : this.locale)) : false;
    }), this.pageLoader[options.priority ? 'loadPage' : 'prefetch'](route)]);
  }

  async fetchComponent(route) {
    let cancelled = false;

    const cancel = this.clc = () => {
      cancelled = true;
    };

    const componentResult = await this.pageLoader.loadPage(route);

    if (cancelled) {
      const error = new Error(`Abort fetching component for route: "${route}"`);
      error.cancelled = true;
      throw error;
    }

    if (cancel === this.clc) {
      this.clc = null;
    }

    return componentResult;
  }

  _getData(fn) {
    let cancelled = false;

    const cancel = () => {
      cancelled = true;
    };

    this.clc = cancel;
    return fn().then(data => {
      if (cancel === this.clc) {
        this.clc = null;
      }

      if (cancelled) {
        const err2 = new Error('Loading initial props cancelled');
        err2.cancelled = true;
        throw err2;
      }

      return data;
    });
  }

  _getStaticData(dataHref) {
    const {
      href: cacheKey
    } = new URL(dataHref, window.location.href);

    if ( true && !this.isPreview && this.sdc[cacheKey]) {
      return Promise.resolve(this.sdc[cacheKey]);
    }

    return fetchNextData(dataHref, this.isSsr).then(data => {
      this.sdc[cacheKey] = data;
      return data;
    });
  }

  _getServerData(dataHref) {
    const {
      href: resourceKey
    } = new URL(dataHref, window.location.href);

    if (this.sdr[resourceKey]) {
      return this.sdr[resourceKey];
    }

    return this.sdr[resourceKey] = fetchNextData(dataHref, this.isSsr).then(data => {
      delete this.sdr[resourceKey];
      return data;
    }).catch(err2 => {
      delete this.sdr[resourceKey];
      throw err2;
    });
  }

  getInitialProps(Component, ctx) {
    const {
      Component: App1
    } = this.components['/_app'];

    const AppTree = this._wrapApp(App1);

    ctx.AppTree = AppTree;
    return (0, _utils).loadGetInitialProps(App1, {
      AppTree,
      Component,
      router: this,
      ctx
    });
  }

  abortComponentLoad(as, routeProps) {
    if (this.clc) {
      Router.events.emit('routeChangeError', buildCancellationError(), as, routeProps);
      this.clc();
      this.clc = null;
    }
  }

  notify(data, resetScroll) {
    return this.sub(data, this.components['/_app'].Component, resetScroll);
  }

}

Router.events = (0, _mitt).default();
exports.default = Router;

/***/ }),

/***/ "SpTj":
/***/ (function(module, exports) {

module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ "TJ0d":
/***/ (function(module, exports) {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ "UP2L":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MDAgODAwIj48cGF0aCBkPSJNMjQuODA3IDY0Ni4xNlYxNTMuODM4aDc1MC4zODd2NDAxYzAgNi41NjMgNS4zNCAxMS45MDMgMTEuOTAzIDExLjkwM2gxdjI3LjgwN2gtMWMtNi41NjMgMC0xMS45MDMgNS4zNC0xMS45MDMgMTEuOTAydjM5LjcxSDI0LjgwN3ptMjQ4LjYyOC0yMTAuOThjLTQuNDkzIDAtOC43MTcgMS43NS0xMS44OTQgNC45MjhhMTYuNzA0IDE2LjcwNCAwIDAwLTQuOTI2IDExLjg5MyAxNi43MiAxNi43MiAwIDAwNC45MjYgMTEuODk1IDE2LjcxIDE2LjcxIDAgMDAxMS44OTQgNC45MjcgMTYuNzEgMTYuNzEgMCAwMDExLjg5My00LjkyNyAxNi43MTUgMTYuNzE1IDAgMDA0LjkyNy0xMS44OTVjMC00LjQ5My0xLjc1LTguNzE3LTQuOTI3LTExLjg5M2ExNi43MDcgMTYuNzA3IDAgMDAtMTEuODkzLTQuOTI4em0tNzMuMDE1LTIzLjU0NmExMS44NjYgMTEuODY2IDAgMDA2LjQ4OSAxLjkyNmMyLjUyOSAwIDQuOTQ5LS43ODcgNi45OTgtMi4yNzUgMy45NjItMi44NzcgNS43NzEtNy45ODggNC41LTEyLjcxOWwtMTEuOTgxLTQ0LjU4NSAzNS44OTgtMjkuMDI3YzMuODA4LTMuMDc4IDUuMzQ5LTguMjc2IDMuODM2LTEyLjkzNXMtNS44MTYtNy45NTgtMTAuNzA3LTguMjFsLTQ2LjEwNS0yLjM4MS0xNi41MTEtNDMuMTExYy0xLjc1MS00LjU3My02LjIxOS03LjY0NS0xMS4xMTYtNy42NDVzLTkuMzY0IDMuMDcyLTExLjExNiA3LjY0NWwtMTYuNTExIDQzLjExMS00Ni4xMDQgMi4zODFjLTQuODkxLjI1Mi05LjE5MyAzLjU1Mi0xMC43MDcgOC4yMS0xLjUxMyA0LjY1OC4wMjkgOS44NTUgMy44MzYgMTIuOTMzbDM1Ljg5OSAyOS4wMjctMTEuOTgxIDQ0LjU4NWMtMS4yNzEgNC43My41MzggOS44NDEgNC41IDEyLjcxOWExMS44MzMgMTEuODMzIDAgMDA2Ljk5OCAyLjI3M2MyLjMxIDAgNC41NTQtLjY2NSA2LjQ4OS0xLjkyNWwzOC42OTktMjUuMTczIDM4LjY5NyAyNS4xNzZ6bTExMy44OTMtNDcuMjhjLTcuNTg5IDAtMTQuMjYzIDUuMTI3LTE2LjIzIDEyLjQ2OGExNi43MDYgMTYuNzA2IDAgMDAxLjY3OCAxMi43NiAxNi43MTMgMTYuNzEzIDAgMDAxMC4yMTIgNy44MzVjMS40My4zODMgMi44OTkuNTc4IDQuMzY1LjU3OCA3LjU4OSAwIDE0LjI2NC01LjEyNyAxNi4yMzEtMTIuNDY4IDIuMzk5LTguOTU2LTIuOTM1LTE4LjE5NS0xMS44OTEtMjAuNTk2YTE2LjkzNyAxNi45MzcgMCAwMC00LjM2NS0uNTc3em0uMDIxLTgxLjc4Yy0xLjQ2NiAwLTIuOTM0LjE5NC00LjM2NC41NzgtOC45NTYgMi40MDEtMTQuMjkgMTEuNjQtMTEuODkgMjAuNTk2IDEuOTY3IDcuMzQgOC42NDIgMTIuNDY3IDE2LjIzMyAxMi40NjcgMS40NjUgMCAyLjkzMy0uMTk0IDQuMzYzLS41NzcgNC4zMzktMS4xNjIgNy45NjUtMy45NDQgMTAuMjExLTcuODM0czIuODQyLTguNDIyIDEuNjc5LTEyLjc2MmMtMS45NjctNy4zNDEtOC42NDItMTIuNDY4LTE2LjIzMi0xMi40Njh6bS00MC44OTktNzAuODIyYy00LjQ5MyAwLTguNzE3IDEuNzUtMTEuODk0IDQuOTI4LTMuMTc3IDMuMTc2LTQuOTI2IDcuMzk5LTQuOTI2IDExLjg5MnMxLjc1IDguNzE3IDQuOTI2IDExLjg5NSA3LjQwMSA0LjkyNyAxMS44OTQgNC45MjdhMTYuNzEgMTYuNzEgMCAwMDExLjg5My00LjkyN2MzLjE3Ny0zLjE3OCA0LjkyNy03LjQwMiA0LjkyNy0xMS44OTVzLTEuNzUtOC43MTYtNC45MjctMTEuODkyYTE2LjcwNyAxNi43MDcgMCAwMC0xMS44OTMtNC45Mjh6IiBmaWxsPSIjZWQxZjM0Ii8+PHBhdGggZD0iTTc3NC4xOTMgNTU0LjgzOHYtNDAwSDI1LjgwN1Y2NDUuMTZoNzQ4LjM4N3YtMzguNzFjMC03LjEyNyA1Ljc3NS0xMi45MDIgMTIuOTAzLTEyLjkwMnYtMjUuODA3Yy03LjEyOCAwLTEyLjkwNC01Ljc3NS0xMi45MDQtMTIuOTAzek0yNDIuOTUyIDMyNS43MzFsLTM1LjM5MiAyOC42MTggMTEuODEzIDQzLjk1N2ExMi45MDQgMTIuOTA0IDAgMDEtMTkuNDk3IDE0LjE2NmwtMzguMTU0LTI0LjgyLTM4LjE1NCAyNC44MThhMTIuOTA0IDEyLjkwNCAwIDAxLTE5LjQ5Ny0xNC4xNjZsMTEuODEzLTQzLjk1Ny0zNS4zOTUtMjguNjE4YTEyLjkwMiAxMi45MDIgMCAwMTcuNDQ3LTIyLjkybDQ1LjQ1NS0yLjM0OCAxNi4yNzktNDIuNTAzYTEyLjkwNSAxMi45MDUgMCAwMTI0LjEgMGwxNi4yNzggNDIuNTAzIDQ1LjQ1NiAyLjM0OGExMi45MDMgMTIuOTAzIDAgMDExMS42MDYgOC45IDEyLjkwMiAxMi45MDIgMCAwMS00LjE1OCAxNC4wMjJ6bTQzLjA4MyAxMzguODcxYy02Ljk1OSA2Ljk1OS0xOC4yNDIgNi45NTktMjUuMjAxIDAtNi45NTktNi45NjEtNi45NTktMTguMjQ0IDAtMjUuMjAxIDYuOTU5LTYuOTYxIDE4LjI0Mi02Ljk2MSAyNS4yMDEgMCA2Ljk2IDYuOTU2IDYuOTYgMTguMjQgMCAyNS4yMDF6bTAtMjIzLjQyOGMtNi45NTkgNi45NTktMTguMjQyIDYuOTU5LTI1LjIwMSAwLTYuOTU5LTYuOTYtNi45NTktMTguMjQzIDAtMjUuMjAxIDYuOTU5LTYuOTYxIDE4LjI0Mi02Ljk2MSAyNS4yMDEgMCA2Ljk2IDYuOTU4IDYuOTYgMTguMjQgMCAyNS4yMDF6bTQ1LjQ5OSAxNDQuNjEzYy0yLjU0NyA5LjUwMy0xMi4zMTUgMTUuMTQ1LTIxLjgyIDEyLjU5Ny05LjUwNi0yLjU0OC0xNS4xNDYtMTIuMzE1LTEyLjU5Ny0yMS44MiAyLjU0Ny05LjUwNSAxMi4zMTUtMTUuMTQ1IDIxLjgyLTEyLjU5NyA5LjUwNSAyLjU0NyAxNS4xNDMgMTIuMzE2IDEyLjU5NyAyMS44MnptLTEyLjU5OC02OS4xODRjLTkuNTA0IDIuNTQ2LTE5LjI3NC0zLjA5My0yMS44MjEtMTIuNTk3czMuMDkzLTE5LjI3MiAxMi41OTctMjEuODIgMTkuMjczIDMuMDk1IDIxLjgyIDEyLjU5N2MyLjU0OCA5LjUwNS0zLjA5MiAxOS4yNzYtMTIuNTk2IDIxLjgyeiIgZmlsbD0iI2VkMWYzNCIvPjxwYXRoIGQ9Ik03NzQuMTkzIDYwNi40NXYzOC43MUgyNS44MDdWMTU0LjgzOGg3NDguMzg3djQwMGMwIDcuMTI4IDUuNzc1IDEyLjkwMyAxMi45MDMgMTIuOTAzUzgwMCA1NjEuOTY2IDgwMCA1NTQuODM4VjE0MS45MzVjMC03LjEyOC01Ljc3NS0xMi45MDMtMTIuOTAzLTEyLjkwM0gxMi45MDNDNS43NzcgMTI5LjAzMSAwIDEzNC44MDcgMCAxNDEuOTM1djUxNi4xMjljMCA3LjEyOCA1Ljc3NyAxMi45MDMgMTIuOTAzIDEyLjkwM2g3NzQuMTkzYzcuMTI4IDAgMTIuOTAzLTUuNzc1IDEyLjkwMy0xMi45MDN2LTUxLjYxM2MwLTcuMTI3LTUuNzc1LTEyLjkwMi0xMi45MDMtMTIuOTAycy0xMi45MDMgNS43NzQtMTIuOTAzIDEyLjkwMXoiLz48cGF0aCBkPSJNMTY4LjIwOCAzNjIuMjgzYy0xLjkzNS0xLjI2LTQuMTc4LTEuOTI1LTYuNDg5LTEuOTI1cy00LjU1NS42NjYtNi40ODkgMS45MjVsLTE5LjEzOCAxMi40NDggNS45MjQtMjIuMDQ4YTExLjkxMiAxMS45MTIgMCAwMC00LjAxMS0xMi4zNDVsLTE3Ljc1NS0xNC4zNTYgMjIuODAyLTEuMTc3YTExLjkxNSAxMS45MTUgMCAwMDEwLjUwMi03LjYzMWw4LjE2Ny0yMS4zMTkgOC4xNjcgMjEuMzE3YTExLjkxNiAxMS45MTYgMCAwMDEwLjQ5OSA3LjYzM2wyMi44MDIgMS4xNzctMTcuNzU1IDE0LjM1NmExMS45MSAxMS45MSAwIDAwLTQuMDEgMTIuMzQ0bDUuOTI0IDIyLjA0OC0xOS4xNC0xMi40NDd6IiBmaWxsPSIjZmZlMDAwIi8+PHBhdGggZD0iTTE2OC45NTMgMzE3LjUzbC03LjIzMy0xOC44OC03LjIzMiAxOC44ODFhMTIuOTA2IDEyLjkwNiAwIDAxLTExLjM4NCA4LjI3MmwtMjAuMTk0IDEuMDQyIDE1LjcyNSAxMi43MTRhMTIuOTA0IDEyLjkwNCAwIDAxNC4zNDggMTMuMzgxbC01LjI0NyAxOS41MjcgMTYuOTUtMTEuMDI0YzIuMTM4LTEuMzkyIDQuNTg2LTIuMDg3IDcuMDM1LTIuMDg3czQuODk2LjY5NSA3LjAzNSAyLjA4N2wxNi45NSAxMS4wMjQtNS4yNDctMTkuNTI3YTEyLjkwMiAxMi45MDIgMCAwMTQuMzQ3LTEzLjM4MWwxNS43MjUtMTIuNzE0LTIwLjE5NC0xLjA0MmExMi45MDUgMTIuOTA1IDAgMDEtMTEuMzg0LTguMjczeiIgZmlsbD0iI2ZmZTAwMCIvPjxwYXRoIGQ9Ik0yMzUuNTA0IDMwMi44MTJsLTQ1LjQ1Ni0yLjM0OS0xNi4yNzgtNDIuNTAzYTEyLjkwNiAxMi45MDYgMCAwMC0yNC4xIDBsLTE2LjI3OSA0Mi41MDMtNDUuNDU1IDIuMzQ5YTEyLjkwMiAxMi45MDIgMCAwMC0xMS42MDYgOC45IDEyLjkgMTIuOSAwIDAwNC4xNTggMTQuMDJsMzUuMzkzIDI4LjYxOC0xMS44MTMgNDMuOTU3YTEyLjkwNCAxMi45MDQgMCAwMDE5LjQ5NyAxNC4xNjZsMzguMTU0LTI0LjgyIDM4LjE1NCAyNC44MThhMTIuODcyIDEyLjg3MiAwIDAwNy4wMzUgMi4wODggMTIuOTA0IDEyLjkwNCAwIDAwMTIuNDYyLTE2LjI1NGwtMTEuODEzLTQzLjk1NyAzNS4zOTMtMjguNjE4YTEyLjkgMTIuOSAwIDAwNC4xNTgtMTQuMDIgMTIuODk4IDEyLjg5OCAwIDAwLTExLjYwNC04Ljg5OHptLTUwLjY5OSAzNi43NDdhMTIuOTA0IDEyLjkwNCAwIDAwLTQuMzQ4IDEzLjM4MWw1LjI0OCAxOS41MjctMTYuOTUtMTEuMDI0Yy0yLjEzOS0xLjM5Mi00LjU4Ny0yLjA4Ny03LjAzNS0yLjA4N3MtNC44OTYuNjk1LTcuMDM1IDIuMDg3bC0xNi45NSAxMS4wMjQgNS4yNDgtMTkuNTI3YTEyLjkgMTIuOSAwIDAwLTQuMzQ4LTEzLjM4MWwtMTUuNzI1LTEyLjcxNCAyMC4xOTQtMS4wNDJhMTIuOTAzIDEyLjkwMyAwIDAwMTEuMzg0LTguMjcybDcuMjMxLTE4Ljg4IDcuMjMzIDE4Ljg4MWExMi45MDYgMTIuOTA2IDAgMDAxMS4zODQgOC4yNzJsMjAuMTk0IDEuMDQyLTE1LjcyNSAxMi43MTN6Ii8+PGNpcmNsZSBjeD0iMzE0LjMyNCIgY3k9IjI5OS4zOTUiIHI9IjE3LjgxNSIgZmlsbD0iI2ZmZTAwMCIvPjxjaXJjbGUgY3g9IjI3My40MzUiIGN5PSIyMjguNTcyIiByPSIxNy44MiIgZmlsbD0iI2ZmZTAwMCIvPjxjaXJjbGUgY3g9IjMxNC4zMjQiIGN5PSIzODEuMTc2IiByPSIxNy44MTUiIGZpbGw9IiNmZmUwMDAiLz48Y2lyY2xlIGN4PSIyNzMuNDM1IiBjeT0iNDUyLjAwMSIgcj0iMTcuODIiIGZpbGw9IiNmZmUwMDAiLz48L3N2Zz4=");

/***/ }),

/***/ "Uqqx":
/***/ (function(module, exports) {

module.exports = require("antd/lib/input");

/***/ }),

/***/ "V2m7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("5SYD");

const actions = {
  CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',
  ACTIVATE_LANG_MODAL: 'ACTIVATE_LANG_MODAL',
  switchActivation: () => ({
    type: actions.ACTIVATE_LANG_MODAL
  }),
  changeLanguage: language => {
    return {
      type: actions.CHANGE_LANGUAGE,
      language: Object(_config__WEBPACK_IMPORTED_MODULE_0__[/* getCurrentLanguage */ "b"])(language)
    };
  }
};
/* harmony default export */ __webpack_exports__["a"] = (actions);

/***/ }),

/***/ "VZf9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var antd_lib_button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("eGmO");
/* harmony import */ var antd_lib_button__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_lib_button__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd_lib_spin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("vEvA");
/* harmony import */ var antd_lib_spin__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd_lib_spin__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd_lib_input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("Uqqx");
/* harmony import */ var antd_lib_input__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd_lib_input__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var antd_lib_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("foLw");
/* harmony import */ var antd_lib_form__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd_lib_form__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("xnum");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _iso_components_utility_layoutContent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("kM/w");
/* harmony import */ var _containers_DashboardLayout_DashboardLayout__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("0Jbt");
/* harmony import */ var _iso_components_utility_layoutWrapper_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("PKTO");
/* harmony import */ var _components_TitlePage_TitlePage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("xBBV");
/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("kG9d");
/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(nookies__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("oAEb");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("F5FC");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__);
















const Tambah = () => {
  const [form] = antd_lib_form__WEBPACK_IMPORTED_MODULE_3___default.a.useForm();

  const {
    0: loading,
    1: setLoading
  } = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(false);
  const cookies = nookies__WEBPACK_IMPORTED_MODULE_10___default.a.get(null, "token");

  const onFinish = async values => {
    setLoading(true);
    const data = {
      data: values
    };
    const endpoint = "https://js-strapi.keelola.net/api" + "/locations";
    const JSONdata = JSON.stringify(data);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token
      },
      body: JSONdata
    };
    const req = await fetch(endpoint, options);
    const res = await req.json();

    if (req.status === 200) {
      form.resetFields();
      react_toastify__WEBPACK_IMPORTED_MODULE_11__["toast"].success("Data Lokasi berhasil ditambahkan!", {
        position: react_toastify__WEBPACK_IMPORTED_MODULE_11__["toast"].POSITION.TOP_RIGHT
      });
    } else {
      var _res$error;

      (_res$error = res.error) === null || _res$error === void 0 ? void 0 : _res$error.details.errors.map(error => {
        const ErrorMsg = error.path[0];
        console.log(ErrorMsg);
        react_toastify__WEBPACK_IMPORTED_MODULE_11__["toast"].error(ErrorMsg === 'location_id' ? "Lokasi yang dimasukkan sudah ada. Silahkan coba yang lain" : "Tidak dapat menambahkan Lokasi", {
          position: react_toastify__WEBPACK_IMPORTED_MODULE_11__["toast"].POSITION.TOP_RIGHT
        });
      });
    }

    setLoading(false);
  };

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__["jsxs"])(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__["Fragment"], {
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__["jsx"])(next_head__WEBPACK_IMPORTED_MODULE_5___default.a, {
      children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__["jsx"])("title", {
        children: "Tambahkan Lokasi"
      })
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__["jsx"])(_containers_DashboardLayout_DashboardLayout__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
      children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__["jsxs"])(_iso_components_utility_layoutWrapper_js__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
        style: {},
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__["jsx"])(_components_TitlePage_TitlePage__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], {
          titleText: "Tambahkan Lokasi"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__["jsx"])(_iso_components_utility_layoutContent__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
          children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__["jsxs"])(antd_lib_form__WEBPACK_IMPORTED_MODULE_3___default.a, {
            form: form,
            name: "add_lokasi",
            initialValues: {
              remember: true
            },
            onFinish: onFinish,
            children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__["jsxs"])("div", {
              className: "flex flex-wrap -mx-3 mb-6",
              children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__["jsx"])("div", {
                className: "w-full md:w-1/3 px-3 mb-2 md:mb-0",
                children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__["jsx"])(antd_lib_form__WEBPACK_IMPORTED_MODULE_3___default.a.Item, {
                  name: "location_id",
                  rules: [{
                    required: true,
                    message: "Lokasi ID tidak boleh kosong!"
                  }],
                  children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__["jsx"])(antd_lib_input__WEBPACK_IMPORTED_MODULE_2___default.a, {
                    style: {
                      height: "50px"
                    },
                    placeholder: "Lokasi ID"
                  })
                })
              }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__["jsx"])("div", {
                className: "w-full md:w-1/3 px-3 mb-2 md:mb-0",
                children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__["jsx"])(antd_lib_form__WEBPACK_IMPORTED_MODULE_3___default.a.Item, {
                  name: "name",
                  rules: [{
                    required: true,
                    message: "Nama Lokasi tidak boleh kosong!"
                  }],
                  children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__["jsx"])(antd_lib_input__WEBPACK_IMPORTED_MODULE_2___default.a, {
                    style: {
                      height: "50px"
                    },
                    placeholder: "Nama Lokasi"
                  })
                })
              }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__["jsx"])("div", {
                className: "w-full md:w-1/3 px-3 mb-2 md:mb-0",
                children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__["jsx"])(antd_lib_form__WEBPACK_IMPORTED_MODULE_3___default.a.Item, {
                  name: "street",
                  children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__["jsx"])(antd_lib_input__WEBPACK_IMPORTED_MODULE_2___default.a, {
                    style: {
                      height: "50px"
                    },
                    placeholder: "Alamat"
                  })
                })
              }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__["jsx"])("div", {
                className: "w-full md:w-1/3 px-3 mb-2 md:mb-0",
                children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__["jsx"])(antd_lib_form__WEBPACK_IMPORTED_MODULE_3___default.a.Item, {
                  name: "city",
                  children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__["jsx"])(antd_lib_input__WEBPACK_IMPORTED_MODULE_2___default.a, {
                    style: {
                      height: "50px"
                    },
                    placeholder: "Kota"
                  })
                })
              }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__["jsx"])("div", {
                className: "w-full md:w-1/3 px-3 mb-2 md:mb-0",
                children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__["jsx"])(antd_lib_form__WEBPACK_IMPORTED_MODULE_3___default.a.Item, {
                  name: "province",
                  children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__["jsx"])(antd_lib_input__WEBPACK_IMPORTED_MODULE_2___default.a, {
                    style: {
                      height: "50px"
                    },
                    placeholder: "Provinsi"
                  })
                })
              }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__["jsx"])("div", {
                className: "w-full md:w-1/3 px-3 mb-2 md:mb-0",
                children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__["jsx"])(antd_lib_form__WEBPACK_IMPORTED_MODULE_3___default.a.Item, {
                  name: "country",
                  children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__["jsx"])(antd_lib_input__WEBPACK_IMPORTED_MODULE_2___default.a, {
                    style: {
                      height: "50px"
                    },
                    placeholder: "Negara"
                  })
                })
              }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__["jsx"])("div", {
                className: "w-full md:w-1/3 px-3 mb-2 md:mb-0",
                children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__["jsx"])(antd_lib_form__WEBPACK_IMPORTED_MODULE_3___default.a.Item, {
                  name: "postal_code",
                  children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__["jsx"])(antd_lib_input__WEBPACK_IMPORTED_MODULE_2___default.a, {
                    style: {
                      height: "50px"
                    },
                    placeholder: "Kode Pos"
                  })
                })
              }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__["jsx"])("div", {
                className: "w-full md:w-1/3 px-3 mb-2 md:mb-0",
                children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__["jsx"])(antd_lib_form__WEBPACK_IMPORTED_MODULE_3___default.a.Item, {
                  name: "phone",
                  children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__["jsx"])(antd_lib_input__WEBPACK_IMPORTED_MODULE_2___default.a, {
                    style: {
                      height: "50px"
                    },
                    placeholder: "No.Telp"
                  })
                })
              })]
            }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__["jsx"])(antd_lib_form__WEBPACK_IMPORTED_MODULE_3___default.a.Item, {
              children: loading ? /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__["jsx"])("div", {
                className: " flex float-left ml-3",
                children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__["jsx"])(antd_lib_spin__WEBPACK_IMPORTED_MODULE_1___default.a, {})
              }) : /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__["jsx"])(antd_lib_button__WEBPACK_IMPORTED_MODULE_0___default.a, {
                htmlType: "submit",
                className: " hover:text-white hover:bg-cyan-700 border border-cyan-700 ml-1",
                children: "Submit"
              })
            })]
          })
        })]
      })
    })]
  });
};

/* harmony default export */ __webpack_exports__["default"] = (Tambah);

/***/ }),

/***/ "VzA1":
/***/ (function(module, exports) {

module.exports = require("antd/lib/layout");

/***/ }),

/***/ "WSU2":
/***/ (function(module, exports) {

module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ "X24+":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removePathTrailingSlash = removePathTrailingSlash;
exports.normalizePathTrailingSlash = void 0;

function removePathTrailingSlash(path) {
  return path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;
}

const normalizePathTrailingSlash =  false ? undefined : removePathTrailingSlash;
exports.normalizePathTrailingSlash = normalizePathTrailingSlash;

/***/ }),

/***/ "XgOf":
/***/ (function(module, exports) {

module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ "YFqc":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("cTJO")


/***/ }),

/***/ "a5Fm":
/***/ (function(module, exports) {

module.exports = require("antd/lib/menu");

/***/ }),

/***/ "cDcd":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "cTJO":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__("cDcd"));

var _router = __webpack_require__("Sgtc");

var _router1 = __webpack_require__("nOHt");

var _useIntersection = __webpack_require__("vNVm");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

const prefetched = {};

function prefetch(router, href, as, options) {
  if (true) return;
  if (!(0, _router).isLocalURL(href)) return; // Prefetch the JSON page if asked (only in the client)
  // We need to handle a prefetch error here since we may be
  // loading with priority which can reject but we don't
  // want to force navigation since this is only a prefetch

  router.prefetch(href, as, options).catch(err => {
    if (false) {}
  });
  const curLocale = options && typeof options.locale !== 'undefined' ? options.locale : router && router.locale; // Join on an invalid URI character

  prefetched[href + '%' + as + (curLocale ? '%' + curLocale : '')] = true;
}

function isModifiedEvent(event) {
  const {
    target
  } = event.currentTarget;
  return target && target !== '_self' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.nativeEvent && event.nativeEvent.which === 2;
}

function linkClicked(e, router, href, as, replace, shallow, scroll, locale) {
  const {
    nodeName
  } = e.currentTarget;

  if (nodeName === 'A' && (isModifiedEvent(e) || !(0, _router).isLocalURL(href))) {
    // ignore click for browser’s default behavior
    return;
  }

  e.preventDefault(); //  avoid scroll for urls with anchor refs

  if (scroll == null && as.indexOf('#') >= 0) {
    scroll = false;
  } // replace state instead of push if prop is present


  router[replace ? 'replace' : 'push'](href, as, {
    shallow,
    locale,
    scroll
  });
}

function Link(props) {
  if (false) {}

  const p = props.prefetch !== false;
  const router = (0, _router1).useRouter();

  const {
    href,
    as
  } = _react.default.useMemo(() => {
    const [resolvedHref, resolvedAs] = (0, _router).resolveHref(router, props.href, true);
    return {
      href: resolvedHref,
      as: props.as ? (0, _router).resolveHref(router, props.as) : resolvedAs || resolvedHref
    };
  }, [router, props.href, props.as]);

  let {
    children,
    replace,
    shallow,
    scroll,
    locale
  } = props; // Deprecated. Warning shown by propType check. If the children provided is a string (<Link>example</Link>) we wrap it in an <a> tag

  if (typeof children === 'string') {
    children = /*#__PURE__*/_react.default.createElement("a", null, children);
  } // This will return the first child, if multiple are provided it will throw an error


  let child;

  if (false) {} else {
    child = _react.default.Children.only(children);
  }

  const childRef = child && typeof child === 'object' && child.ref;
  const [setIntersectionRef, isVisible] = (0, _useIntersection).useIntersection({
    rootMargin: '200px'
  });

  const setRef = _react.default.useCallback(el => {
    setIntersectionRef(el);

    if (childRef) {
      if (typeof childRef === 'function') childRef(el);else if (typeof childRef === 'object') {
        childRef.current = el;
      }
    }
  }, [childRef, setIntersectionRef]);

  _react.default.useEffect(() => {
    const shouldPrefetch = isVisible && p && (0, _router).isLocalURL(href);
    const curLocale = typeof locale !== 'undefined' ? locale : router && router.locale;
    const isPrefetched = prefetched[href + '%' + as + (curLocale ? '%' + curLocale : '')];

    if (shouldPrefetch && !isPrefetched) {
      prefetch(router, href, as, {
        locale: curLocale
      });
    }
  }, [as, href, isVisible, locale, p, router]);

  const childProps = {
    ref: setRef,
    onClick: e => {
      if (child.props && typeof child.props.onClick === 'function') {
        child.props.onClick(e);
      }

      if (!e.defaultPrevented) {
        linkClicked(e, router, href, as, replace, shallow, scroll, locale);
      }
    }
  };

  childProps.onMouseEnter = e => {
    if (!(0, _router).isLocalURL(href)) return;

    if (child.props && typeof child.props.onMouseEnter === 'function') {
      child.props.onMouseEnter(e);
    }

    prefetch(router, href, as, {
      priority: true
    });
  }; // If child is an <a> tag and doesn't have a href attribute, or if the 'passHref' property is
  // defined, we specify the current 'href', so that repetition is not needed by the user


  if (props.passHref || child.type === 'a' && !('href' in child.props)) {
    const curLocale = typeof locale !== 'undefined' ? locale : router && router.locale; // we only render domain locales if we are currently on a domain locale
    // so that locale links are still visitable in development/preview envs

    const localeDomain = router && router.isLocaleDomain && (0, _router).getDomainLocale(as, curLocale, router && router.locales, router && router.domainLocales);
    childProps.href = localeDomain || (0, _router).addBasePath((0, _router).addLocale(as, curLocale, router && router.defaultLocale));
  }

  return /*#__PURE__*/_react.default.cloneElement(child, childProps);
}

var _default = Link;
exports.default = _default;

/***/ }),

/***/ "eGmO":
/***/ (function(module, exports) {

module.exports = require("antd/lib/button");

/***/ }),

/***/ "evxR":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export direction */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("F5FC");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



let direction = 'ltr';

if (false) {}

const withDirection = Component => props => {
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__["jsx"])(Component, _objectSpread(_objectSpread({}, props), {}, {
    "data-rtl": direction
  }));
};

/* harmony default export */ __webpack_exports__["a"] = (withDirection);


/***/ }),

/***/ "foLw":
/***/ (function(module, exports) {

module.exports = require("antd/lib/form");

/***/ }),

/***/ "h74D":
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ "jcgO":
/***/ (function(module, exports) {

module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ "k004":
/***/ (function(module, exports) {

module.exports = require("react-intl");

/***/ }),

/***/ "kG9d":
/***/ (function(module, exports) {

module.exports = require("nookies");

/***/ }),

/***/ "kM/w":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__("Dtiu");
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// EXTERNAL MODULE: external "styled-theme"
var external_styled_theme_ = __webpack_require__("BnVt");

// CONCATENATED MODULE: ./components/utility/layoutContent.style.js


const LayoutContentStyle = external_styled_components_default.a.div.withConfig({
  displayName: "layoutContentstyle__LayoutContentStyle",
  componentId: "sc-1v6s0p-0"
})(["width:100%;padding:35px;background-color:#ffffff;border:1px solid ", ";height:100%;"], Object(external_styled_theme_["palette"])('border', 0));
/* harmony default export */ var layoutContent_style = (LayoutContentStyle);
// CONCATENATED MODULE: ./components/utility/layoutContent.js

/* harmony default export */ var layoutContent = __webpack_exports__["a"] = (layoutContent_style);

/***/ }),

/***/ "lwum":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const useWindowSize = () => {
  const isClient = false;
  const getSize = react__WEBPACK_IMPORTED_MODULE_0___default.a.useCallback(() => ({
    width: isClient ? window.innerWidth : undefined,
    height: isClient ? window.innerHeight : undefined
  }), [isClient]);
  const [size, setSize] = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(getSize);
  react__WEBPACK_IMPORTED_MODULE_0___default.a.useEffect(() => {
    if (!isClient) {
      return false;
    }

    const onHandleResize = () => {
      setSize(getSize);
    };

    window.addEventListener('resize', onHandleResize);
    return () => window.removeEventListener('resize', onHandleResize);
  }, [getSize, isClient]);
  return size;
};

/* harmony default export */ __webpack_exports__["a"] = (useWindowSize);

/***/ }),

/***/ "mEA0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "b", function() { return /* binding */ themeConfig; });

// CONCATENATED MODULE: ./config/theme/default.js
const theme = {};
theme.palette = {
  primary: ['#4482FF', // 0: Default
  '#3A78F5', // 1: Darken 4%
  '#3775F2', // 2: Darken 5%
  'rgba(68, 130, 255, 0.2)', // 3: Fade 20%
  '#4C8AFF', // 4: Lighten 3%
  'rgba(68, 130, 255, 0.75)', // 5: Fade 75%
  '#6AA8FF', // 6: Lighten 15%
  '#63A1FF', // 7: Lighten 12%
  '#3F7DFA', // 8: Darken 2%
  '#3369e7', // 9: Algolia color
  '#5896FF', // 10: Lighten 8%
  '#2b69e6', // 11:
  '#236cfe', // 12: darken 10%
  '#4d88ff' // 13: Lighten 5%
  ],
  secondary: ['#2d3446', // 0: DarkBlue
  '#f1f3f6', // 1: LightBluish
  '#788195', // 2: LightBlue
  '#E4E6E9', // 3: LightBluish Darken 5%
  '#364d79', // 4:
  '#202739', // 5: DarkBlue Darken 5%
  '#f5f6f8', // 6: LighterBluish
  '#e9ebf1', // 7: DarkBluish
  '#F6F8FB', // 8: LighterBluish Lighten 2%
  '#E9EBEE', // 9: LighterBluish Darken 3%
  '#1a1a1a' // 10: Sidebar submenu select
  ],
  color: ['#FEAC01', // 0: Orange
  '#42299a', // 1: Purple
  '#F75D81', // 2: Pink
  '#7ED321', // 3: LimeGreen
  '#39435f', // 4: BlueShade
  '#FFCA28', // 5: Yellow
  '#F2BD1B', // 6: Yellow Darken 5%
  '#3b5998', // 7: Facebook
  '#344e86', // 8: Facebook Darken 5%
  '#dd4b39', // 9: Google Plus
  '#d73925', // 10: Google Plus Darken 5%
  '#e14615', // 11: Auth0
  '#ca3f13', // 12: Auth0
  '#e0364c' // 13: themeColor--AlizarinCrimson
  ],
  warning: ['#ffbf00' // 0: Warning
  ],
  success: ['#00b16a' // 0: Success
  ],
  error: ['#f64744', // 0: Error
  '#EC3D3A', // 1: Darken 4%
  '#FF5B58' // 2: Lighten 8%
  ],
  grayscale: ['#bababa', // 0: GreyShade
  '#c1c1c1', // 1: GreyDark
  '#D8D8D8', // 2: Grey
  '#f1f1f1', // 3: GreyAlt
  '#F3F3F3', // 4: GreyLight
  '#fafafa', // 5: DarkWhite
  '#F9F9F9', // 6: DarkerWhite
  '#fcfcfc', // 7: #fff Darken 1%
  '#eeeeee', // 8:
  '#fbfbfb', // 9:
  '#f5f5f5', // 10:
  '#f7f8f9' // 11: today-highlight-bg
  ],
  text: ['#323332', // 0: Heading
  '#595959', // 1: HeadingLight
  '#979797', // 2: Text
  '#797979', // 3: TextDark
  '#6a6c6a' // 4: Heading Lighten 22%
  ],
  border: ['#e9e9e9', // 0: Border
  '#d8d8d8', // 1: BorderDark
  '#ebebeb', // 2: BorderLight
  '#d3d3d3', // 3:
  'rgba(228, 228, 228, 0.65)' // 4:
  ],
  calendar: ['#905', // 0:
  '#690', // 1:
  '#a67f59', // 2:
  '#07a', // 3:
  '#dd4a68', // 4:
  '#e90' // 5:
  ]
};
theme.fonts = {
  primary: 'Roboto, sans-serif',
  pre: 'Consolas, Liberation Mono, Menlo, Courier, monospace'
};
/* harmony default export */ var theme_default = (theme);
// CONCATENATED MODULE: ./config/theme/custom.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


/* harmony default export */ var custom = (_objectSpread(_objectSpread({}, theme_default), {}, {
  palette: {
    primary: ['#f00'],
    secondary: ['#0f0']
  }
}));
// CONCATENATED MODULE: ./config/theme/theme.config.js


const themes = {
  defaultTheme: theme_default,
  customTheme: custom
};
const themeConfig = {
  topbar: 'defaultTheme',
  sidebar: 'defaultTheme',
  layout: 'defaultTheme',
  theme: 'defaultTheme'
};
/* harmony default export */ var theme_config = __webpack_exports__["a"] = (themes);

/***/ }),

/***/ "mriD":
/***/ (function(module, exports) {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ "n+6I":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("x441");

const actions = {
  CHANGE_THEME: 'CHANGE_THEME',
  SWITCH_ACTIVATION: 'SWITCH_ACTIVATION',
  switchActivation: () => ({
    type: actions.SWITCH_ACTIVATION
  }),
  changeTheme: (attribute, themeName) => {
    const theme = Object(_config__WEBPACK_IMPORTED_MODULE_0__[/* getCurrentTheme */ "b"])(attribute, themeName);

    if (attribute === 'layoutTheme') {
      document.getElementsByClassName('isomorphicContent')[0].style.backgroundColor = theme.backgroundColor;
    }

    return {
      type: actions.CHANGE_THEME,
      attribute,
      theme
    };
  }
};
/* harmony default export */ __webpack_exports__["a"] = (actions);

/***/ }),

/***/ "nOHt":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Router", {
  enumerable: true,
  get: function () {
    return _router.default;
  }
});
Object.defineProperty(exports, "withRouter", {
  enumerable: true,
  get: function () {
    return _withRouter.default;
  }
});
exports.useRouter = useRouter;
exports.createRouter = createRouter;
exports.makePublicRouterInstance = makePublicRouterInstance;
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__("cDcd"));

var _router = _interopRequireDefault(__webpack_require__("Sgtc"));

var _routerContext = __webpack_require__("mriD");

var _withRouter = _interopRequireDefault(__webpack_require__("0Bsm"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

const singletonRouter = {
  router: null,
  readyCallbacks: [],

  ready(cb) {
    if (this.router) return cb();

    if (false) {}
  }

}; // Create public properties and methods of the router in the singletonRouter

const urlPropertyFields = ['pathname', 'route', 'query', 'asPath', 'components', 'isFallback', 'basePath', 'locale', 'locales', 'defaultLocale', 'isReady', 'isPreview', 'isLocaleDomain', 'domainLocales'];
const routerEvents = ['routeChangeStart', 'beforeHistoryChange', 'routeChangeComplete', 'routeChangeError', 'hashChangeStart', 'hashChangeComplete'];
const coreMethodFields = ['push', 'replace', 'reload', 'back', 'prefetch', 'beforePopState']; // Events is a static property on the router, the router doesn't have to be initialized to use it

Object.defineProperty(singletonRouter, 'events', {
  get() {
    return _router.default.events;
  }

});
urlPropertyFields.forEach(field => {
  // Here we need to use Object.defineProperty because we need to return
  // the property assigned to the actual router
  // The value might get changed as we change routes and this is the
  // proper way to access it
  Object.defineProperty(singletonRouter, field, {
    get() {
      const router = getRouter();
      return router[field];
    }

  });
});
coreMethodFields.forEach(field => {
  singletonRouter[field] = (...args) => {
    const router = getRouter();
    return router[field](...args);
  };
});
routerEvents.forEach(event => {
  singletonRouter.ready(() => {
    _router.default.events.on(event, (...args) => {
      const eventField = `on${event.charAt(0).toUpperCase()}${event.substring(1)}`;
      const _singletonRouter = singletonRouter;

      if (_singletonRouter[eventField]) {
        try {
          _singletonRouter[eventField](...args);
        } catch (err) {
          console.error(`Error when running the Router event: ${eventField}`);
          console.error(`${err.message}\n${err.stack}`);
        }
      }
    });
  });
});

function getRouter() {
  if (!singletonRouter.router) {
    const message = 'No router instance found.\n' + 'You should only use "next/router" on the client side of your app.\n';
    throw new Error(message);
  }

  return singletonRouter.router;
}

var _default = singletonRouter;
exports.default = _default;

function useRouter() {
  return _react.default.useContext(_routerContext.RouterContext);
}

function createRouter(...args) {
  singletonRouter.router = new _router.default(...args);
  singletonRouter.readyCallbacks.forEach(cb => cb());
  singletonRouter.readyCallbacks = [];
  return singletonRouter.router;
}

function makePublicRouterInstance(router) {
  const _router1 = router;
  const instance = {};

  for (const property of urlPropertyFields) {
    if (typeof _router1[property] === 'object') {
      instance[property] = Object.assign(Array.isArray(_router1[property]) ? [] : {}, _router1[property]) // makes sure query is not stateful
      ;
      continue;
    }

    instance[property] = _router1[property];
  } // Events is a static property on the router, the router doesn't have to be initialized to use it


  instance.events = _router.default.events;
  coreMethodFields.forEach(field => {
    instance[field] = (...args) => {
      return _router1[field](...args);
    };
  });
  return instance;
}

/***/ }),

/***/ "oAEb":
/***/ (function(module, exports) {

module.exports = require("react-toastify");

/***/ }),

/***/ "pfUk":
/***/ (function(module, exports) {

module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ "q5Ud":
/***/ (function(module, exports) {

module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ "qC9r":
/***/ (function(module, exports) {

module.exports = require("react-custom-scrollbars");

/***/ }),

/***/ "rQ/L":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var antd_lib_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("xKsY");
/* harmony import */ var antd_lib_modal__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_lib_modal__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["a"] = (antd_lib_modal__WEBPACK_IMPORTED_MODULE_0___default.a);

/***/ }),

/***/ "vEvA":
/***/ (function(module, exports) {

module.exports = require("antd/lib/spin");

/***/ }),

/***/ "vNVm":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useIntersection = useIntersection;

var _react = __webpack_require__("cDcd");

var _requestIdleCallback = __webpack_require__("0G5g");

const hasIntersectionObserver = typeof IntersectionObserver !== 'undefined';

function useIntersection({
  rootMargin,
  disabled
}) {
  const isDisabled = disabled || !hasIntersectionObserver;
  const unobserve = (0, _react).useRef();
  const [visible, setVisible] = (0, _react).useState(false);
  const setRef = (0, _react).useCallback(el => {
    if (unobserve.current) {
      unobserve.current();
      unobserve.current = undefined;
    }

    if (isDisabled || visible) return;

    if (el && el.tagName) {
      unobserve.current = observe(el, isVisible => isVisible && setVisible(isVisible), {
        rootMargin
      });
    }
  }, [isDisabled, rootMargin, visible]);
  (0, _react).useEffect(() => {
    if (!hasIntersectionObserver) {
      if (!visible) {
        const idleCallback = (0, _requestIdleCallback).requestIdleCallback(() => setVisible(true));
        return () => (0, _requestIdleCallback).cancelIdleCallback(idleCallback);
      }
    }
  }, [visible]);
  return [setRef, visible];
}

function observe(element, callback, options) {
  const {
    id,
    observer,
    elements
  } = createObserver(options);
  elements.set(element, callback);
  observer.observe(element);
  return function unobserve() {
    elements.delete(element);
    observer.unobserve(element); // Destroy observer when there's nothing left to watch:

    if (elements.size === 0) {
      observer.disconnect();
      observers.delete(id);
    }
  };
}

const observers = new Map();

function createObserver(options) {
  const id = options.rootMargin || '';
  let instance = observers.get(id);

  if (instance) {
    return instance;
  }

  const elements = new Map();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const callback = elements.get(entry.target);
      const isVisible = entry.isIntersecting || entry.intersectionRatio > 0;

      if (callback && isVisible) {
        callback(isVisible);
      }
    });
  }, options);
  observers.set(id, instance = {
    id,
    observer,
    elements
  });
  return instance;
}

/***/ }),

/***/ "w+U0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const actions = {
  LOGIN_REQUEST_START: 'LOGIN_REQUEST_START',
  JWT_LOGIN_REQUEST_START: 'JWT_LOGIN_REQUEST_START',
  LOGIN_REQUEST_SUCCESS: 'LOGIN_REQUEST_SUCCESS',
  LOGIN_REQUEST_FAILURE: 'LOGIN_REQUEST_FAILURE',
  LOGOUT_REQUEST_START: 'LOGOUT_REQUEST_START',
  LOGOUT_REQUEST_SUCCESS: 'LOGOUT_REQUEST_SUCCESS',
  LOGOUT_REQUEST_FAILURE: 'LOGOUT_REQUEST_FAILURE',
  login: credentials => ({
    type: actions.LOGIN_REQUEST_START,
    payload: credentials
  }),
  jwtLogin: (history, userInfo) => ({
    type: actions.JWT_LOGIN_REQUEST_START,
    payload: {
      history,
      userInfo
    }
  }),
  loginRequestSuccess: credentials => ({
    type: actions.LOGIN_REQUEST_SUCCESS,
    payload: credentials
  }),
  loginRequestFailure: error => ({
    type: actions.LOGIN_REQUEST_SUCCESS,
    payload: error
  }),
  logout: () => ({
    type: actions.LOGOUT_REQUEST_START
  }),
  logoutRequestSuccess: () => ({
    type: actions.LOGOUT_REQUEST_SUCCESS
  }),
  logoutRequestFailure: error => ({
    type: actions.LOGOUT_REQUEST_FAILURE,
    payload: error
  })
};
/* harmony default export */ __webpack_exports__["a"] = (actions);

/***/ }),

/***/ "x441":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getCurrentTheme; });
/* harmony import */ var _iso_config_theme_theme_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("mEA0");

const changeThemes = {
  id: 'changeThemes',
  label: 'themeSwitcher',
  defaultTheme: _iso_config_theme_theme_config__WEBPACK_IMPORTED_MODULE_0__[/* themeConfig */ "b"].theme,
  options: [{
    themeName: 'defaultTheme',
    buttonColor: '#ffffff',
    textColor: '#323332'
  }, {
    themeName: 'customTheme',
    buttonColor: '#ffffff',
    textColor: '#323332'
  }]
};
const topbarTheme = {
  id: 'topbarTheme',
  label: 'themeSwitcher.Topbar',
  defaultTheme: _iso_config_theme_theme_config__WEBPACK_IMPORTED_MODULE_0__[/* themeConfig */ "b"].topbar,
  options: [{
    themeName: 'defaultTheme',
    buttonColor: '#ffffff',
    textColor: '#323332'
  }, {
    themeName: 'theme1',
    buttonColor: '#e0364c',
    backgroundColor: '#e0364c',
    textColor: '#ffffff'
  }, {
    themeName: 'theme2',
    buttonColor: '#6534ff',
    backgroundColor: '#6534ff',
    textColor: '#ffffff'
  }, {
    themeName: 'theme3',
    buttonColor: '#4482FF',
    backgroundColor: '#4482FF',
    textColor: '#ffffff'
  }, {
    themeName: 'theme4',
    buttonColor: '#422e62',
    backgroundColor: '#422e62',
    textColor: '#ffffff'
  }, {
    themeName: 'theme5',
    buttonColor: '#22144c',
    backgroundColor: '#22144c',
    textColor: '#ffffff'
  }, {
    themeName: 'theme6',
    buttonColor: '#4670a2',
    backgroundColor: '#4670a2',
    textColor: '#ffffff'
  }, {
    themeName: 'theme7',
    buttonColor: '#494982',
    backgroundColor: '#494982',
    textColor: '#ffffff'
  }]
};
const sidebarTheme = {
  id: 'sidebarTheme',
  label: 'themeSwitcher.Sidebar',
  defaultTheme: _iso_config_theme_theme_config__WEBPACK_IMPORTED_MODULE_0__[/* themeConfig */ "b"].sidebar,
  options: [{
    themeName: 'defaultTheme',
    buttonColor: '#323332',
    backgroundColor: undefined,
    textColor: '#788195'
  }, {
    themeName: 'theme1',
    buttonColor: '#e0364c',
    backgroundColor: '#e0364c',
    textColor: '#ffffff'
  }, {
    themeName: 'theme2',
    buttonColor: '#6534ff',
    backgroundColor: '#6534ff',
    textColor: '#ffffff'
  }, {
    themeName: 'theme3',
    buttonColor: '#4482FF',
    backgroundColor: '#4482FF',
    textColor: '#ffffff'
  }, {
    themeName: 'theme4',
    buttonColor: '#422e62',
    backgroundColor: '#422e62',
    textColor: '#ffffff'
  }, {
    themeName: 'theme5',
    buttonColor: '#22144c',
    backgroundColor: '#22144c',
    textColor: '#ffffff'
  }, {
    themeName: 'theme6',
    buttonColor: '#4670a2',
    backgroundColor: '#4670a2',
    textColor: '#ffffff'
  }, {
    themeName: 'theme7',
    buttonColor: '#494982',
    backgroundColor: '#494982',
    textColor: '#ffffff'
  }]
};
const layoutTheme = {
  id: 'layoutTheme',
  label: 'themeSwitcher.Background',
  defaultTheme: _iso_config_theme_theme_config__WEBPACK_IMPORTED_MODULE_0__[/* themeConfig */ "b"].layout,
  options: [{
    themeName: 'defaultTheme',
    buttonColor: '#ffffff',
    backgroundColor: '#F1F3F6',
    textColor: undefined
  }, {
    themeName: 'theme1',
    buttonColor: '#ffffff',
    backgroundColor: '#ffffff',
    textColor: '#323232'
  }, {
    themeName: 'theme2',
    buttonColor: '#F9F9F9',
    backgroundColor: '#F9F9F9',
    textColor: '#ffffff'
  }, {
    themeName: 'theme3',
    buttonColor: '#ebebeb',
    backgroundColor: '#ebebeb',
    textColor: '#ffffff'
  }]
};
const customizedThemes = {
  changeThemes,
  topbarTheme,
  sidebarTheme,
  layoutTheme
};
function getCurrentTheme(attribute, selectedThemename) {
  let selecetedTheme = {};
  customizedThemes[attribute].options.forEach(theme => {
    if (theme.themeName === selectedThemename) {
      selecetedTheme = theme;
    }
  });
  return selecetedTheme;
}
/* harmony default export */ __webpack_exports__["a"] = (customizedThemes);

/***/ }),

/***/ "xBBV":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TitlePage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("F5FC");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);



function TitlePage({
  titleText
}) {
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__["jsx"])("div", {
    className: "mb-3",
    children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__["jsxs"])("h5", {
      className: " border-l-4 border-blue-900",
      children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__["jsx"])("span", {
        className: "ml-4",
        children: titleText
      }), " "]
    })
  });
}

/***/ }),

/***/ "xKsY":
/***/ (function(module, exports) {

module.exports = require("antd/lib/modal");

/***/ }),

/***/ "xfH5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iODAwIj48cGF0aCBmaWxsPSIjRkZGIiBkPSJNNTE2LjEyOSAyNDUuMTYxdi05MC4zMjJIMjgzLjg3MXY0OTAuMzIyaDIzMi4yNThWMjk2Ljc3NGMwLTcuMTI2IDUuNzc1LTEyLjkwMyAxMi45MDMtMTIuOTAzdi0yNS44MDdjLTcuMTI4IDAtMTIuOTAzLTUuNzc3LTEyLjkwMy0xMi45MDN6Ii8+PHBhdGggZmlsbD0iIzE2NEZDRSIgZD0iTTI0LjgwNyAxNTMuODM5aDIzNC4yNTh2NDkyLjMyMkgyNC44MDd6Ii8+PHBhdGggZmlsbD0iIzE2NEZDRSIgZD0iTTI1LjgwNyAxNTQuODM5aDIzMi4yNTh2NDkwLjMyMkgyNS44MDd6Ii8+PHBhdGggZmlsbD0iI0VEMUYzNCIgZD0iTTU0MC45MzYgNjQ2LjE2MVYyOTYuNzc0YzAtNi41NjMtNS4zNC0xMS45MDMtMTEuOTAzLTExLjkwM2gtMXYtMjcuODA3aDFjNi41NjMgMCAxMS45MDMtNS4zNCAxMS45MDMtMTEuOTAzdi05MS4zMjJoMjM0LjI1OHY0OTIuMzIySDU0MC45MzZ6Ii8+PHBhdGggZmlsbD0iI0VEMUYzNCIgZD0iTTU0MS45MzYgMjQ1LjE2MWMwIDcuMTI2LTUuNzc1IDEyLjkwMy0xMi45MDMgMTIuOTAzdjI1LjgwN2M3LjEyOCAwIDEyLjkwMyA1Ljc3NyAxMi45MDMgMTIuOTAzdjM0OC4zODdoMjMyLjI1OFYxNTQuODM5SDU0MS45MzZ2OTAuMzIyeiIvPjxwYXRoIGQ9Ik03ODcuMDk3IDEyOS4wMzJIMTIuOTAzQzUuNzc3IDEyOS4wMzIgMCAxMzQuODEgMCAxNDEuOTM2djUxNi4xMjljMCA3LjEyNiA1Ljc3NyAxMi45MDMgMTIuOTAzIDEyLjkwM2g3NzQuMTkzYzcuMTI4IDAgMTIuOTAzLTUuNzc3IDEyLjkwMy0xMi45MDNWMTQxLjkzNmMuMDAxLTcuMTI2LTUuNzc0LTEyLjkwNC0xMi45MDItMTIuOTA0em0tMTIuOTA0IDUxNi4xMjlINTQxLjkzNlYyOTYuNzc0YzAtNy4xMjYtNS43NzUtMTIuOTAzLTEyLjkwMy0xMi45MDNzLTEyLjkwMyA1Ljc3Ny0xMi45MDMgMTIuOTAzdjM0OC4zODdIMjgzLjg3MVYxNTQuODM5aDIzMi4yNTh2OTAuMzIyYzAgNy4xMjYgNS43NzUgMTIuOTAzIDEyLjkwMyAxMi45MDNzMTIuOTAzLTUuNzc3IDEyLjkwMy0xMi45MDN2LTkwLjMyMmgyMzIuMjU4djQ5MC4zMjJ6TTI1LjgwNyAxNTQuODM5aDIzMi4yNTh2NDkwLjMyMkgyNS44MDdWMTU0LjgzOXoiLz48L3N2Zz4=");

/***/ }),

/***/ "xnum":
/***/ (function(module, exports) {

module.exports = require("next/head");

/***/ })

/******/ });