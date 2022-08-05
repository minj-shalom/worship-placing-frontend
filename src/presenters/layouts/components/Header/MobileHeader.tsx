import { Layout } from "antd";
import { useState } from "react";
import { LoginModal } from "../../../components/LoginModal";
import { redirect } from "../../../utils";
import { CustomDrawer } from "../CustomDrawer";
import "./MobileHeader.scss";

interface MobileHeaderProps {
  isAdmin: boolean;
  login: () => void;
  logout: () => void;
  setUserPassword: (newPassword: string) => void;
}

export default function MobileHeader({
  isAdmin,
  login,
  logout,
  setUserPassword,
}: MobileHeaderProps) {
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
      <Header id="header" className="mobile-header off">
        <div className="mobile-header___left">
          {isAdmin && (
            <CustomDrawer
              drawerVisible={drawerVisible}
              onDrawerOpen={onDrawerOpen}
              onDrawerClose={onDrawerClose}
            />
          )}
        </div>
        <div className="mobile-header___center">
          <button
            id="title"
            className="mobile-header___center___title off"
            onClick={() => redirect(isAdmin)}
          >
            WORSHIP PLACING
          </button>
        </div>
        <div className="mobile-header___right">
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
