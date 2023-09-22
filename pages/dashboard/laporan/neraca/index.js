import { LoadingOutlined } from "@ant-design/icons";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import LayoutContent from "@iso/components/utility/layoutContent";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import { DatePicker } from "antd";
import moment from "moment";
import nookies from "nookies";
import { useState } from "react";
import DownloadButton from "./component/downloadButton";
import NeracaDetailTableView from "./component/tableView";

NeracaDetail.getInitialProps = async (context) => {
  const cookies = nookies.get(context);

  const req = await fetchNeracaDetail(cookies);
  const response = await req.json();

  return {
    props: {
      response,
    },
  };
};

const fetchNeracaDetail = async (cookies, periode = moment()) => {
  const endpoint = new URL(process.env.NEXT_PUBLIC_URL + "/neraca-detail");
  endpoint.searchParams.append("periode", periode);

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token,
    },
  };

  const req = await fetch(endpoint, options);
  return req;
};

function NeracaDetail({ props }) {
  const [data, setData] = useState(props.response); console.log(data, "data nih");
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(moment());

  const handleDateChange = async (date, dateString) => {
    setIsLoading(true);
    setCurrentTime(date);

    const cookies = nookies.get();
    const req = await fetchNeracaDetail(cookies, date.toISOString());
    const response = await req.json();

    setData(response);
    setIsLoading(false);
  };

  return (
    <DashboardLayout>
      <LayoutWrapper style={{}}>
        <TitlePage titleText={"LAPORAN NERACA"} />
        <LayoutContent>
          <div className="w-1/3">
            <p>Pilih Periode : </p>
            <DatePicker
              onChange={handleDateChange}
              value={currentTime}
              format={"MM-YYYY"}
              picker="month"
              className="w-full"
            />
          </div>

          {isLoading ? (
            <div className="flex w-full justify-center mt-20">
              <LoadingOutlined style={{ fontSize: "50px" }} />
            </div>
          ) : (
            <div>
              <DownloadButton data={data} currentTime={currentTime} />
              <NeracaDetailTableView data={data} time={currentTime} />
            </div>
          )}
        </LayoutContent>
      </LayoutWrapper>
    </DashboardLayout>
  );
}

export default NeracaDetail;
