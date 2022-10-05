import React from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import clone from "clone";
import { Layout } from "antd";
import Scrollbars from "@iso/components/utility/customScrollBar";
import Menu from "@iso/components/uielements/menu";
import IntlMessages from "@iso/components/utility/intlMessages";

import appActions from "@iso/redux/app/actions";
import Logo from "@iso/components/utility/Logo.next";
import SidebarWrapper from "./Sidebar.styles";
import SidebarMenu from "./SidebarMenu";
import SIDEBAR_MENU_OPTIONS from "./sidebar.navigations";
import {
  SidebarMenuLevelIcon,
  SidebarPersonIcon,
} from "@iso/config/icon.config";
import {
  SidebarContactIcon,
  SidebarEcommerceIcon,
  SidebarPurchasesIcon,
  SidebarReceiptIcon,
} from "../../config/icon.config";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Sider } = Layout;
const { toggleOpenDrawer, changeOpenKeys, changeCurrent, toggleCollapsed } =
  appActions;
export default function Sidebar(props) {
  const { view, openKeys, collapsed, openDrawer, height, current } =
    useSelector((state) => state.App);
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
    const latestOpenKey = newOpenKeys.find(
      (key) => !(openKeys.indexOf(key) > -1)
    );
    const latestCloseKey = openKeys.find(
      (key) => !(newOpenKeys.indexOf(key) > -1)
    );
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
    backgroundColor: sidebarTheme.backgroundColor,
  };
  const submenuStyle = {
    backgroundColor: "rgba(0,0,0,0.3)",
    color: sidebarTheme.textColor,
  };
  const submenuColor = {
    color: sidebarTheme.textColor,
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
            {SIDEBAR_MENU_OPTIONS.map((option) => (
              <SidebarMenu
                key={option.key}
                item={option}
                submenuColor={submenuColor}
                submenuStyle={submenuStyle}
              />
            ))}

            {/* KELOLA PENGGUNA */}
            <SubMenu
              key="kelola_pengguna"
              title={
                <span className="isoMenuHolder" style={submenuColor}>
                  <SidebarPersonIcon size={18} />
                  <span className="nav-text">Kelola Pengguna</span>
                </span>
              }
            >
              <Menu.Item style={submenuStyle} key="pengguna">
                <Link href="/dashboard/pengguna">
                  <a>Pengguna</a>
                </Link>
              </Menu.Item>
              <Menu.Item style={submenuStyle} key="wewenang">
                <Link href="/dashboard/role">
                  <a>Role</a>
                </Link>
              </Menu.Item>
              <Menu.Item style={submenuStyle} key="agen">
                Agen Komisi Penjualan
              </Menu.Item>
            </SubMenu>

            {/* SUPPLIER */}
            <SubMenu
              key="kontak"
              title={
                <span className="isoMenuHolder" style={submenuColor}>
                  <SidebarContactIcon size={18} />
                  <span className="nav-text">Kontak</span>
                </span>
              }
            >
              <Menu.Item style={submenuStyle} key="supplier">
                <Link href="/dashboard/supplier">
                  <a>Supplier</a>
                </Link>
              </Menu.Item>
              {/* <Menu.Item style={submenuStyle} key="pelanggan">
                <Link href="/dashboard/pelanggan">
                  <a>Pelanggan</a>
                </Link>
              </Menu.Item> */}
            </SubMenu>

            {/* PRODUK */}
            <SubMenu
              key="product"
              title={
                <span className="isoMenuHolder" style={submenuColor}>
                  <SidebarEcommerceIcon size={18} />
                  <span className="nav-text">Produk</span>
                </span>
              }
            >
              <Menu.Item style={submenuStyle} key="produk">
                <Link href="/dashboard/produk/">
                  <a>Daftar Produk</a>
                </Link>
              </Menu.Item>
              <Menu.Item style={submenuStyle} key="kategori">
                <Link href="/dashboard/produk/kategori">
                  <a>Kategori</a>
                </Link>
              </Menu.Item>
              <Menu.Item style={submenuStyle} key="subkategori">
                <Link href="/dashboard/produk/subkategori">
                  <a>Sub Kategori</a>
                </Link>
              </Menu.Item>
              <Menu.Item style={submenuStyle} key="pabrikasi">
                <Link href="/dashboard/produk/pabrikasi">
                  <a>Pabrikasi</a>
                </Link>
              </Menu.Item>
              <Menu.Item style={submenuStyle} key="golongan">
                <Link href="/dashboard/produk/golongan">
                  <a>Golongan</a>
                </Link>
              </Menu.Item>
            </SubMenu>

            {/* PEMBELIAN  */}
            <SubMenu
              key="pembelian"
              title={
                <span className="isoMenuHolder" style={submenuColor}>
                  <SidebarPurchasesIcon size={18} />
                  <span className="nav-text">Pembelian</span>
                </span>
              }
            >
              <Menu.Item style={submenuStyle} key="order_pembelian">
                <Link href="/dashboard/pembelian/order_pembelian">
                  <a>Order Pembelian</a>
                </Link>
              </Menu.Item>
              <Menu.Item style={submenuStyle} key="pembelian_barang">
                <Link href="/dashboard/pembelian/pembelian_barang">
                  <a>Pembelian Barang</a>
                </Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Scrollbars>
      </Sider>
    </SidebarWrapper>
  );
}
