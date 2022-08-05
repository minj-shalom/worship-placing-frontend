import { Layout } from "antd";
import React from "react";
import { MobileFooter } from "./components/Footer";
import { MobileHeader } from "./components/Header";
import "./MobileLayout.scss";

interface MobileLayoutProps {
  children: React.ReactNode;
  isAdmin: boolean;
  login: () => void;
  logout: () => void;
  setUserPassword: (newPassword: string) => void;
}

const MobileLayout = ({
  children,
  isAdmin,
  login,
  logout,
  setUserPassword,
}: MobileLayoutProps) => {
  const { Content } = Layout;

  return (
    <Layout>
      <MobileHeader
        isAdmin={isAdmin}
        login={login}
        logout={logout}
        setUserPassword={setUserPassword}
      />
      <Content className="mobile-content">{children}</Content>
      <MobileFooter />
    </Layout>
  );
};

export default MobileLayout;
