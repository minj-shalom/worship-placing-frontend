import React from "react";
import { useLocation } from "react-router-dom";
import { Device, LocationState } from "../../entities";
import { DesktopError, MobileError, TabletError } from "../pages/Error";
import {
  DesktopForbidden,
  MobileForbidden,
  TabletForbidden,
} from "../pages/Forbidden";
import {
  DesktopNotFound,
  MobileNotFound,
  TabletNotFound,
} from "../pages/NotFound";

interface HTTPErrorHandlerProps {
  children: React.ReactNode;
  deviceType: string;
  isAdmin: boolean;
  login: () => void;
  logout: () => void;
  setUserPassword: (newPassword: string) => void;
}
export default function HTTPErrorHandler({
  children,
  deviceType,
  isAdmin,
  login,
  logout,
  setUserPassword,
}: HTTPErrorHandlerProps) {
  const location = useLocation();

  const Page403 = () => {
    if (deviceType === Device.Mobile) {
      return (
        <MobileForbidden
          isAdmin={isAdmin}
          login={login}
          logout={logout}
          setUserPassword={setUserPassword}
        />
      );
    } else if (deviceType === Device.Tablet) {
      return (
        <TabletForbidden
          isAdmin={isAdmin}
          login={login}
          logout={logout}
          setUserPassword={setUserPassword}
        />
      );
    } else {
      return (
        <DesktopForbidden
          isAdmin={isAdmin}
          login={login}
          logout={logout}
          setUserPassword={setUserPassword}
        />
      );
    }
  };

  const Page404 = () => {
    if (deviceType === Device.Mobile) {
      return <MobileNotFound isAdmin={isAdmin} />;
    } else if (deviceType === Device.Tablet) {
      return <TabletNotFound isAdmin={isAdmin} />;
    } else {
      return <DesktopNotFound isAdmin={isAdmin} />;
    }
  };

  const Page500 = () => {
    if (deviceType === Device.Mobile) {
      return <MobileError />;
    } else if (deviceType === Device.Tablet) {
      return <TabletError />;
    } else {
      return <DesktopError />;
    }
  };

  if (location.state && typeof location.state === "object") {
    const { statusCode } = location.state as LocationState;
    switch (statusCode) {
      case 403:
        return <Page403 />;
      case 404:
        return <Page404 />;
      case 500:
        return <Page500 />;
      default:
        return <>{children}</>;
    }
  } else {
    return <>{children}</>;
  }
}
