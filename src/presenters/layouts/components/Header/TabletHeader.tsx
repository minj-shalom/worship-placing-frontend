import { Layout } from "antd";
import { useState } from "react";
import { LoginModal } from "../../../components/LoginModal";
import { redirect } from "../../../utils";
import { CustomDrawer } from "../CustomDrawer";
import "./TabletHeader.scss";

interface TabletHeaderProps {
  isAdmin: boolean;
  login: () => void;
  logout: () => void;
  setUserPassword: (newPassword: string) => void;
}

export default function TabletHeader({
  isAdmin,
  login,
  logout,
  setUserPassword,
}: TabletHeaderProps) {
  const { Header } = Layout;
  const [drawerVisible, setDrawerVisible] = useState(false);

  const onDrawerOpen = () => {
    setDrawerVisible(true);
    document.getElementById("header")?.classList.replace("off", "on");
    document.getElementById("title")?.classList.replace("off", "on");
  };

  const onDrawerClose = () => {
    setDrawerVisible(false);
    document.getElementById("header")?.classList.replace("on", "off");
    document.getElementById("title")?.classList.replace("on", "off");
  };

  return (
    <>
      <Header id="header" className="tablet-header off">
        <div className="tablet-header___left">
          {isAdmin && (
            <CustomDrawer
              drawerVisible={drawerVisible}
              onDrawerOpen={onDrawerOpen}
              onDrawerClose={onDrawerClose}
            />
          )}
        </div>
        <div className="tablet-header___center">
          <button
            id="title"
            className="tablet-header___center___title off"
            onClick={() => redirect(isAdmin)}
          >
            WORSHIP PLACING
          </button>
        </div>
        <div className="tablet-header___right">
          {!drawerVisible && (
            <LoginModal
              isAdmin={isAdmin}
              isHeader={true}
              login={login}
              logout={logout}
              setUserPassword={setUserPassword}
            />
          )}
        </div>
      </Header>
    </>
  );
}
