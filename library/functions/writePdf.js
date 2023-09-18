import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const stakeholderName = "APOTEK SEJATI";
const stakeholderAddress = "Jl. Merdeka Timur No.2-10, Sukoharjo, Kec. Klojen, Kota Malang, Jawa Timur 65119";
const stakeholderPhone = "(0341) 325837/369339/322208";
const stakeholderWA = "089523886198";
const stakeholderNPWP = "75.777.135.7.623.000";

const ComponentToPrint = React.forwardRef((props, ref) => (
  <div hidden>
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: "28px",
      }}
      ref={ref}
    >
      <div className="text-center border-b mb-2 pb-2 flex flex-col items-center border-black">
        <div className="flex items-center gap-x-3 mb-2">
          <img src="/images/logo.jpeg" className="" alt="logo js" width={48} />
          <p className="font-bold m-0">{stakeholderName}</p>
        </div>
        <p className="m-0">{stakeholderAddress}</p>
        <p className="m-0">TLP {stakeholderPhone}</p>
        <p className="m-0">WA : {stakeholderWA}</p>
        <p className="m-0">NPWP : {stakeholderNPWP}</p>
      </div>
    </div>
  </div>
));

const PrintPDF = (props) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="w-full md:w-1/4">
      <ComponentToPrint {...props} ref={componentRef} />
      <button
        onClick={handlePrint}
        type="button"
        className="w-full bg-cyan-700 rounded px-20 py-2 hover:bg-cyan-800  shadow-sm float-right mb-5"
      >
        <div className="text-white text-center text-sm font-bold">
          <a className="text-white no-underline text-xs sm:text-xs">Print PDF</a>
        </div>
      </button>
    </div>
  );
};

export default PrintPDF;
