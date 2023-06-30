import React from "react";

export default function PrintRetur({ id }) {
  return <div>retur penjualan: {id}</div>;
}

PrintRetur.getInitialProps = async (ctx) => {
  const { id } = ctx.query;
  return { id };
};
