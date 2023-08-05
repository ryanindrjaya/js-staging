import React from "react";
import { useDispatch } from "react-redux";
import Popover from "@iso/components/uielements/popover";
import authAction from "../../authentication/actions";
import TopbarDropdownWrapper from "./TopbarDropdown.styles";
import { IoIosLogOut } from "react-icons/io";
import { destroyCookie } from "nookies";

const { logout } = authAction;
import userpic from "@iso/assets/images/user1.png";

export default function TopbarUser() {
  const [visible, setVisibility] = React.useState(false);
  const dispatch = useDispatch();
  function handleVisibleChange() {
    setVisibility((visible) => !visible);
  }

  const logoutUser = () => {
    destroyCookie(null, "token", { path: "/" });
    destroyCookie(null, "role", { path: "/" });
    localStorage.removeItem("_mod");

    dispatch(logout());
  };

  const content = (
    <TopbarDropdownWrapper className="isoUserDropdown">
      <a className="isoDropdownLink" onClick={logoutUser}>
        <IoIosLogOut className="mr-2" />
        Logout
      </a>
    </TopbarDropdownWrapper>
  );

  return (
    <Popover
      content={content}
      trigger="click"
      visible={visible}
      onVisibleChange={handleVisibleChange}
      arrowPointAtCenter={true}
      placement="bottomLeft"
    >
      <div className="isoImgWrapper">
        <img alt="user" src={userpic} />
        <span className="userActivity online" />
      </div>
    </Popover>
  );
}
