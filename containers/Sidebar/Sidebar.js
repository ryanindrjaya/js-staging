import React from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "antd";
import Scrollbars from "@iso/components/utility/customScrollBar";
import Menu from "@iso/components/uielements/menu";
import appActions from "@iso/redux/app/actions";
import Logo from "@iso/components/utility/Logo.next";
import SidebarWrapper from "./Sidebar.styles";
import SidebarMenu from "./SidebarMenu";
import SIDEBAR_MENU_OPTIONS from "./sidebar.navigations";
import { SidebarPersonIcon } from "@iso/config/icon.config";
import {
  SidebarBlankIcon,
  SidebarInvoiceIcon,
  SidebarContactIcon,
  SidebarEcommerceIcon,
  SidebarPurchasesIcon,
  SidebarNotesIcon,
  SidebarStockIcon,
  SidebarBussinesIcon,
} from "@iso/config/icon.config";
import { IoIosArrowRoundUp } from "react-icons/io";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { loadState } from "../../library/helpers/localStorage";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Sider } = Layout;
const { toggleOpenDrawer, changeOpenKeys, changeCurrent, toggleCollapsed } = appActions;

export default function Sidebar(props) {
  const { view, openKeys, collapsed, openDrawer, height, current } = useSelector((state) => state.App);
  const moduls = loadState("_mod") || {};

  const { sidebarTheme } = useSelector((state) => state.ThemeSwitcher);
  const dispatch = useDispatch();
  function handleClick(e) {
    dispatch(changeCurrent([e.key]));
    if (view === "MobileView") {
      setTimeout(() => {
        dispatch(toggleCollapsed());
        // dispatch(toggleOpenDrawer());
      }, 100);
    }
  }
  function onOpenChange(newOpenKeys) {
    const latestOpenKey = newOpenKeys.find((key) => !(openKeys.indexOf(key) > -1));
    const latestCloseKey = openKeys.find((key) => !(newOpenKeys.indexOf(key) > -1));
    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = getAncestorKeys(latestCloseKey);
    }
    dispatch(changeOpenKeys(nextOpenKeys));
  }
  const getAncestorKeys = (key) => {
    const map = {
      sub3: ["sub2"],
    };
    return map[key] || [];
  };

  const isCollapsed = collapsed && !openDrawer;
  const mode = isCollapsed === true ? "vertical" : "inline";
  // const scrollheight = height;

  const styling = {
    // backgroundColor: process.env.MAIN_COLOR,
    backgroundColor: "#1a6677",
  };

  const submenuStyle = {
    backgroundColor: "rgba(0,0,0,0)",
    color: sidebarTheme.textColor,
  };

  const submenuColor = {
    color: "white",
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

  const icons = {
    Lokasi: <SidebarBussinesIcon size={19} />,
    "Kelola Pengguna": <SidebarPersonIcon size={18} />,
    "Kelola Customer": <SidebarPersonIcon size={18} />,
    Kontak: <SidebarContactIcon size={18} />,
    Produk: <SidebarEcommerceIcon size={18} />,
    Inventory: <SidebarStockIcon size={18} />,
    Pembelian: <SidebarPurchasesIcon size={18} />,
    Penjualan: <IoIosArrowRoundUp size={18} />,
    Keuangan: <SidebarInvoiceIcon size={18} />,
    Laporan: <SidebarBlankIcon size={18} />,
    Pajak: <FaFileInvoiceDollar size={18} />,
  };

  return (
    <SidebarWrapper>
      <Sider
        trigger={null}
        collapsible={true}
        collapsed={isCollapsed}
        width={240}
        className="isomorphicSidebar"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={styling}
      >
        <Logo collapsed={isCollapsed} />
        <Scrollbars style={{ height: height - 70 }}>
          <Menu
            onClick={handleClick}
            theme="dark"
            mode={mode}
            openKeys={isCollapsed ? [] : openKeys}
            selectedKeys={current}
            onOpenChange={onOpenChange}
            className="isoDashboardMenu"
            // inlineCollapsed={isCollapsed}
          >
            <SidebarMenu
              key={"dashboard"}
              item={SIDEBAR_MENU_OPTIONS[0]}
              submenuColor={submenuColor}
              submenuStyle={submenuStyle}
            />
            {Object.entries(moduls).map(([key, value], idx) => {
              if (value?.length > 0) {
                // has submenu
                return (
                  <SubMenu
                    key={`${key}|${idx}`}
                    title={
                      <span className="isoMenuHolder" style={submenuColor}>
                        {icons[key]}
                        <span className="nav-text">{key}</span>
                      </span>
                    }
                  >
                    {value.map((item) => {
                      return (
                        <Menu.Item key={item.uid} style={submenuStyle}>
                          <Link href={`/dashboard/${item?.uri}`}>
                            <a>{item?.name}</a>
                          </Link>
                        </Menu.Item>
                      );
                    })}
                  </SubMenu>
                );
              } else {
                return (
                  <Menu.Item key={key}>
                    <Link href={`/dashboard/${value?.uri}`}>
                      <a className="isoMenuHolder" style={submenuColor}>
                        {icons[key]}
                        {value?.name}
                      </a>
                    </Link>
                  </Menu.Item>
                );
              }
            })}
          </Menu>
        </Scrollbars>
      </Sider>
    </SidebarWrapper>
  );
}
