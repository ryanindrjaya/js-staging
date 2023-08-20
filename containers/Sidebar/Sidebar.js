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
} from "../../config/icon.config";
import { IoIosArrowRoundUp } from "react-icons/io";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { loadState } from "../../library/helpers/localStorage";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Sider } = Layout;
const { toggleOpenDrawer, changeOpenKeys, changeCurrent, toggleCollapsed } =
  appActions;

export default function Sidebar(props) {
  const { view, openKeys, collapsed, openDrawer, height, current } =
    useSelector((state) => state.App);
  const moduls = loadState("_mod") || [];

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

  const menuNavigation = {
    Dashboard: (
      <SidebarMenu
        key={"dashboard"}
        item={SIDEBAR_MENU_OPTIONS[0]}
        submenuColor={submenuColor}
        submenuStyle={submenuStyle}
      />
    ),
    Lokasi: (
      <SidebarMenu
        key={"location"}
        item={SIDEBAR_MENU_OPTIONS[1]}
        submenuColor={submenuColor}
        submenuStyle={submenuStyle}
      />
    ),
    "Kelola Pengguna": (
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
          <Link href="/dashboard/pengguna/role">
            <a>Role</a>
          </Link>
        </Menu.Item>
        <Menu.Item style={submenuStyle} key="agen">
          Agen Komisi Penjualan
        </Menu.Item>
      </SubMenu>
    ),
    "Kelola Customer": (
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
    ),
    Kontak: (
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
    ),
    Produk: (
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
    ),
    Inventory: (
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
    ),
    Pembelian: (
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
    ),
    Penjualan: (
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
        <Menu.Item style={submenuStyle} key="order_penjualan">
          <Link href="/dashboard/penjualan/order-penjualan">
            <a>Order Penjualan</a>
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
    ),
    Keuangan: (
      <SubMenu
        key="keuangan"
        title={
          <span className="isoMenuHolder" style={submenuColor}>
            <SidebarInvoiceIcon size={18} />
            <span className="nav-text">Keuangan</span>
          </span>
        }
      >
        <Menu.Item style={submenuStyle} key="coa">
          <Link href="/dashboard/keuangan/coa">
            <a>Chart Of Account (COA)</a>
          </Link>
        </Menu.Item>
        <Menu.Item style={submenuStyle} key="jurnal">
          <Link href="/dashboard/keuangan/jurnal">
            <a>Jurnal</a>
          </Link>
        </Menu.Item>
        <Menu.Item style={submenuStyle} key="hutang">
          <Link href="/dashboard/keuangan/hutang">
            <a>Hutang</a>
          </Link>
        </Menu.Item>
        <Menu.Item style={submenuStyle} key="piutang">
          <Link href="/dashboard/keuangan/piutang">
            <a>Piutang</a>
          </Link>
        </Menu.Item>
      </SubMenu>
    ),
    Laporan: (
      <SubMenu
        key="laporan"
        title={
          <span className="isoMenuHolder" style={submenuColor}>
            <SidebarBlankIcon size={18} />
            <span className="nav-text">Laporan</span>
          </span>
        }
      >
        <Menu.Item style={submenuStyle} key="pembeliandanretur">
          <Link href="/dashboard/laporan/pembeliandanretur">
            <a>Pembelian dan Retur</a>
          </Link>
        </Menu.Item>
        <Menu.Item style={submenuStyle} key="pembayaranhutang">
          <Link href="/dashboard/laporan/pembayaranhutang">
            <a>Pembayaran Hutang</a>
          </Link>
        </Menu.Item>
        <Menu.Item style={submenuStyle} key="pembayarantoko">
          <Link href="/dashboard/laporan/pembayarantoko">
            <a>Pembayaran Toko</a>
          </Link>
        </Menu.Item>
        <Menu.Item style={submenuStyle} key="laporanpiutang">
          <Link href="/dashboard/laporan/piutang">
            <a>Piutang Penjualan</a>
          </Link>
        </Menu.Item>
        <Menu.Item style={submenuStyle} key="rugilaba">
          <Link href="/dashboard/laporan/rugilaba">
            <a>Rugi Laba</a>
          </Link>
        </Menu.Item>
        <Menu.Item style={submenuStyle} key="bukubesar">
          <Link href="/dashboard/laporan/bukubesar">
            <a>Buku Besar</a>
          </Link>
        </Menu.Item>
        <Menu.Item style={submenuStyle} key="neraca-detail">
          <Link href="/dashboard/laporan/neraca-detail">
            <a>Neraca Detail</a>
          </Link>
        </Menu.Item>
      </SubMenu>
    ),
    Pajak: (
      <SubMenu
        key="pajak"
        title={
          <span className="isoMenuHolder" style={submenuColor}>
            <FaFileInvoiceDollar size={18} />
            <span className="nav-text">Pajak</span>
          </span>
        }
      >
        <Menu.Item style={submenuStyle} key="daftarnofaktur">
          <Link href="/dashboard/pajak/no_faktur_list">
            <a>Daftar Nomor Faktur</a>
          </Link>
        </Menu.Item>
        <Menu.Item style={submenuStyle} key="generatefaktur">
          <Link href="/dashboard/pajak/generate">
            <a>Generate Faktur</a>
          </Link>
        </Menu.Item>
        <Menu.Item style={submenuStyle} key="exportfaktur">
          <Link href="/dashboard/pajak/export">
            <a>Export Data</a>
          </Link>
        </Menu.Item>
      </SubMenu>
    ),
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
            {Object.keys(menuNavigation).map((key) => {
              return moduls.map((modul) => {
                if (modul.uid === key) {
                  return menuNavigation[key];
                }
              });
            })}
          </Menu>
        </Scrollbars>
      </Sider>
    </SidebarWrapper>
  );
}
