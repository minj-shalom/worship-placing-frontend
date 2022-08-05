import { Layout } from "antd";
import React from "react";
import { TabletFooter } from "./components/Footer";
import { TabletHeader } from "./components/Header";
import "./TabletLayout.scss";

interface TabletLayoutProps {
  children: React.ReactNode;
  isAdmin: boolean;
  login: () => void;
  logout: () => void;
  setUserPassword: (newPassword: string) => void;
}

const TabletLayout = ({
  children,
  isAdmin,
  login,
  logout,
  setUserPassword,
}: TabletLayoutProps) => {
  const { Content } = Layout;

  return (
    <Layout>
      <TabletHeader
        isAdmin={isAdmin}
        login={login}
        logout={logout}
        setUserPassword={setUserPassword}
      />
      <Content className="tablet-content">{children}</Content>
      <TabletFooter />
    </Layout>
  );
};

export default TabletLayout;
