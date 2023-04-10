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
  SidebarContactIcon,
  SidebarEcommerceIcon,
  SidebarPurchasesIcon,
  SidebarNotesIcon,
  SidebarStockIcon,
} from "../../config/icon.config";
import { IoIosArrowRoundUp } from "react-icons/io";

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

            {/* KELOLA PENGGUNA */}
            <SubMenu
              key="kelola_customer"
              title={
                <span className="isoMenuHolder" style={submenuColor}>
                  <SidebarPersonIcon size={18} />
                  <span className="nav-text">Kelola Customer</span>
                </span>
              }
            >
              <Menu.Item style={submenuStyle} key="customer">
                <Link href="/dashboard/customer">
                  <a>Customer</a>
                </Link>
              </Menu.Item>
              <Menu.Item style={submenuStyle} key="area">
                <Link href="/dashboard/customer/area">
                  <a>Area</a>
                </Link>
              </Menu.Item>
              <Menu.Item style={submenuStyle} key="wilayah">
                <Link href="/dashboard/customer/wilayah">
                  <a>Wilayah</a>
                </Link>
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
              <Menu.Item style={submenuStyle} key="golongan">
                <Link href="/dashboard/produk/golongan">
                  <a>Golongan</a>
                </Link>
              </Menu.Item>
              <Menu.Item style={submenuStyle} key="pabrikasi">
                <Link href="/dashboard/produk/pabrikasi">
                  <a>Pabrikasi</a>
                </Link>
              </Menu.Item>
            </SubMenu>

            {/* STOK */}
            <SubMenu
              key="stock"
              title={
                <span className="isoMenuHolder" style={submenuColor}>
                  <SidebarStockIcon size={18} />
                  <span className="nav-text">Inventory</span>
                </span>
              }
            >
              <Menu.Item style={submenuStyle} key="stok">
                <Link href="/dashboard/stok">
                  <a>Riwayat Inventory</a>
                </Link>
              </Menu.Item>
              <Menu.Item style={submenuStyle} key="permintaan_barang">
                <Link href="/dashboard/stok/permintaan-barang">
                  <a>Permintaan Barang</a>
                </Link>
              </Menu.Item>
              <Menu.Item style={submenuStyle} key="daftar_keluar_barang">
                <Link href="/dashboard/stok/daftar-keluar-barang">
                  <a>Mutasi Barang Keluar</a>
                </Link>
              </Menu.Item>
              <Menu.Item style={submenuStyle} key="daftar_masuk_barang">
                <Link href="/dashboard/stok/daftar-masuk-barang">
                  <a>Mutasi Barang Masuk</a>
                </Link>
              </Menu.Item>
              <Menu.Item style={submenuStyle} key="penyesuaian_stok">
                <Link href="/dashboard/stok/penyesuaian">
                  <a>Penyesuaian Stok</a>
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
              <Menu.Item style={submenuStyle} key="retur_pembelian">
                <Link href="/dashboard/pembelian/retur">
                  <a>Retur Pembelian</a>
                </Link>
              </Menu.Item>
            </SubMenu>

            {/* PENJUALAN  */}
            <SubMenu
              key="penjualan"
              title={
                <span className="isoMenuHolder" style={submenuColor}>
                  <IoIosArrowRoundUp size={18} />
                  <span className="nav-text">Penjualan</span>
                </span>
              }
            >
              <Menu.Item style={submenuStyle} key="penjualan_toko">
                <Link href="/dashboard/penjualan/toko">
                  <a>Penjualan Toko</a>
                </Link>
              </Menu.Item>
              <Menu.Item style={submenuStyle} key="penjualan_pesanan_sales">
                <Link href="/dashboard/penjualan/pesanansales">
                  <a>Penjualan Pesanan Sales</a>
                </Link>
              </Menu.Item>
              <Menu.Item style={submenuStyle} key="penjualan_sales">
                <Link href="/dashboard/penjualan/sales">
                  <a>Penjualan Sales</a>
                </Link>
              </Menu.Item>
              <Menu.Item style={submenuStyle} key="penjualan_non_panel">
                <Link href="/dashboard/penjualan/non_panel">
                  <a>Penjualan Non Panel</a>
                </Link>
              </Menu.Item>
              <Menu.Item style={submenuStyle} key="penjualan_panel">
                <Link href="/dashboard/penjualan/panel">
                  <a>Penjualan Panel</a>
                </Link>
              </Menu.Item>
            </SubMenu>

            {/* Biaya  */}
            <SubMenu
              key="biaya"
              title={
                <span className="isoMenuHolder" style={submenuColor}>
                  <SidebarNotesIcon size={18} />
                  <span className="nav-text">Biaya</span>
                </span>
              }
            >
              <Menu.Item style={submenuStyle} key="hutang">
                <Link href="/dashboard/biaya/hutang">
                  <a>Hutang</a>
                </Link>
              </Menu.Item>
              <Menu.Item style={submenuStyle} key="piutang">
                <Link href="/dashboard/biaya/piutang">
                  <a>Piutang</a>
                </Link>
              </Menu.Item>
              <Menu.Item style={submenuStyle} key="jurnal">
                <Link href="/dashboard/biaya/jurnal">
                  <a>Jurnal</a>
                </Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Scrollbars>
      </Sider>
    </SidebarWrapper>
  );
}
