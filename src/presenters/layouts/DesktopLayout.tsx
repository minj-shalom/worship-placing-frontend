import { Layout } from "antd";
import React from "react";
import { DesktopFooter } from "./components/Footer";
import { DesktopHeader } from "./components/Header";
import "./DesktopLayout.scss";

interface DesktopLayoutProps {
  children: React.ReactNode;
  isAdmin: boolean;
  isFullScreen: boolean;
  login: () => void;
  logout: () => void;
  setUserPassword: (newPassword: string) => void;
}

const DesktopLayout = ({
  children,
  isAdmin,
  isFullScreen,
  login,
  logout,
  setUserPassword,
}: DesktopLayoutProps) => {
  const { Content } = Layout;

  return (
    <Layout>
      <DesktopHeader
        isAdmin={isAdmin}
        isFullScreen={isFullScreen}
        login={login}
        logout={logout}
        setUserPassword={setUserPassword}
      />
      <Content
        className={`desktop-content ${
          isFullScreen ? "full-screen-content" : ""
        }`}
      >
        {children}
      </Content>
      <DesktopFooter />
    </Layout>
  );
};

export default DesktopLayout;
