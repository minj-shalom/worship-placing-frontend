import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import MobileDetect from "mobile-detect";

import { DesktopLayout, TabletLayout, MobileLayout } from "./layouts";
import { DesktopDisplay, TabletDisplay, MobileDisplay } from "./pages/Display";
import {
  DesktopNotFound,
  MobileNotFound,
  TabletNotFound,
} from "./pages/NotFound";
import {
  DesktopForbidden,
  MobileForbidden,
  TabletForbidden,
} from "./pages/Forbidden";
import { DesktopError, MobileError, TabletError } from "./pages/Error";
import { Device, LocationState } from "../entities";
import { HTTPErrorHandler } from "./utils";
import { DesktopPlaces, MobilePlaces, TabletPlaces } from "./pages/Places";
import { message } from "antd";
import "./routes.scss";
import {
  DesktopNewPlace,
  MobileNewPlace,
  TabletNewPlace,
} from "./pages/NewPlace";
import {
  DesktopPlaceDetail,
  MobilePlaceDetail,
  TabletPlaceDetail,
} from "./pages/PlaceDetail";
// import { PlacesService, useGetPlaceList } from "../interactors/places.service";
// import { PlacesAPI } from "../adaptors/places.api";
// import { data1, data2, data3, data4, data5 } from "./mock-data";

export default function AppRoutes() {
  // device
  var deviceType = Device.Desktop;
  const md = new MobileDetect(window.navigator.userAgent);

  if (md.phone() !== null) {
    deviceType = Device.Mobile;
  }
  if (md.tablet() !== null) {
    deviceType = Device.Tablet;
  }

  // react-router-dom
  const location = useLocation();
  const navigate = useNavigate();

  // login
  const [isAdmin, setAdmin] = useState(false);
  const [isFullScreen, setFullScreen] = useState(false);
  const userPassword = window.localStorage.getItem("userPassword");
  const setUserPassword = (newPassword: string) =>
    window.localStorage.setItem("userPassword", newPassword);

  const login = () => {
    setAdmin(true);
  };
  const logout = () => {
    setAdmin(false);
  };

  const requestFullScreen = () => {
    setFullScreen(true);
  };

  const exitFullScreen = () => {
    setFullScreen(false);
  };

  useEffect(() => {
    if (userPassword === null) {
      setUserPassword("");
    }
    if (userPassword === process.env.REACT_APP_ADMIN_PASSWORD) {
      login();
    } else {
      logout();
    }
    if (location.state && typeof location.state === "object") {
      const { messageContent } = location.state as LocationState;

      if (messageContent) {
        navigate(location.pathname, {});
        message.success(String(messageContent));
      }
    }
    if (isAdmin && location.pathname === "/") {
      window.location.href = "/admin";
    }
  }, [userPassword, isAdmin, location, navigate]);

  const DesktopRoutes = () => (
    <DesktopLayout
      isAdmin={isAdmin}
      isFullScreen={isFullScreen}
      login={login}
      logout={logout}
      setUserPassword={setUserPassword}
    >
      <HTTPErrorHandler
        deviceType={deviceType}
        isAdmin={isAdmin}
        login={login}
        logout={logout}
        setUserPassword={setUserPassword}
      >
        <Routes>
          <Route path="/*" element={<DesktopNotFound isAdmin={isAdmin} />} />
          <Route path="/error" element={<DesktopError />} />
          <Route
            path="/"
            element={
              <DesktopDisplay
                isAdmin={isAdmin}
                isFullScreen={isFullScreen}
                requestFullScreen={requestFullScreen}
                exitFullScreen={exitFullScreen}
              />
            }
          />
          {isAdmin && <Route path="/admin" element={<DesktopPlaces />} />}
          {isAdmin && (
            <Route
              path="/display"
              element={
                <DesktopDisplay
                  isAdmin={isAdmin}
                  isFullScreen={isFullScreen}
                  requestFullScreen={requestFullScreen}
                  exitFullScreen={exitFullScreen}
                />
              }
            />
          )}
          {isAdmin && <Route path="/admin/new" element={<DesktopNewPlace />} />}
          {isAdmin && (
            <Route
              path="/admin/:id"
              element={
                <DesktopPlaceDetail
                  isAdmin={isAdmin}
                  isFullScreen={isFullScreen}
                  requestFullScreen={requestFullScreen}
                  exitFullScreen={exitFullScreen}
                />
              }
            />
          )}
          {!isAdmin && (
            <Route
              path="/admin/*"
              element={
                <DesktopForbidden
                  isAdmin={isAdmin}
                  login={login}
                  logout={logout}
                  setUserPassword={setUserPassword}
                />
              }
            />
          )}
        </Routes>
      </HTTPErrorHandler>
    </DesktopLayout>
  );

  const TabletRoutes = () => (
    <TabletLayout
      isAdmin={isAdmin}
      login={login}
      logout={logout}
      setUserPassword={setUserPassword}
    >
      <HTTPErrorHandler
        deviceType={deviceType}
        isAdmin={isAdmin}
        login={login}
        logout={logout}
        setUserPassword={setUserPassword}
      >
        <Routes>
          <Route path="/*" element={<TabletNotFound isAdmin={isAdmin} />} />
          <Route path="/error" element={<TabletError />} />
          <Route path="/" element={<TabletDisplay isAdmin={isAdmin} />} />
          {isAdmin && <Route path="/admin" element={<TabletPlaces />} />}
          {isAdmin && (
            <Route
              path="/display"
              element={<TabletDisplay isAdmin={isAdmin} />}
            />
          )}
          {isAdmin && <Route path="/admin/new" element={<TabletNewPlace />} />}
          {isAdmin && (
            <Route
              path="/admin/:id"
              element={
                <TabletPlaceDetail
                  isAdmin={isAdmin}
                  isFullScreen={isFullScreen}
                  requestFullScreen={requestFullScreen}
                  exitFullScreen={exitFullScreen}
                />
              }
            />
          )}
          {!isAdmin && (
            <Route
              path="/admin/*"
              element={
                <TabletForbidden
                  isAdmin={isAdmin}
                  login={login}
                  logout={logout}
                  setUserPassword={setUserPassword}
                />
              }
            />
          )}
        </Routes>
      </HTTPErrorHandler>
    </TabletLayout>
  );

  const MobileRoutes = () => (
    <MobileLayout
      isAdmin={isAdmin}
      login={login}
      logout={logout}
      setUserPassword={setUserPassword}
    >
      <HTTPErrorHandler
        deviceType={deviceType}
        isAdmin={isAdmin}
        login={login}
        logout={logout}
        setUserPassword={setUserPassword}
      >
        <Routes>
          <Route path="/*" element={<MobileNotFound isAdmin={isAdmin} />} />
          <Route path="/error" element={<MobileError />} />
          <Route path="/" element={<MobileDisplay isAdmin={isAdmin} />} />
          {isAdmin && <Route path="/admin" element={<MobilePlaces />} />}
          {isAdmin && (
            <Route
              path="/display"
              element={<MobileDisplay isAdmin={isAdmin} />}
            />
          )}
          {isAdmin && <Route path="/admin/new" element={<MobileNewPlace />} />}
          {isAdmin && (
            <Route
              path="/admin/:id"
              element={
                <MobilePlaceDetail
                  isAdmin={isAdmin}
                  isFullScreen={isFullScreen}
                  requestFullScreen={requestFullScreen}
                  exitFullScreen={exitFullScreen}
                />
              }
            />
          )}
          {!isAdmin && (
            <Route
              path="/admin/*"
              element={
                <MobileForbidden
                  isAdmin={isAdmin}
                  login={login}
                  logout={logout}
                  setUserPassword={setUserPassword}
                />
              }
            />
          )}
        </Routes>
      </HTTPErrorHandler>
    </MobileLayout>
  );

  if (deviceType === Device.Mobile) {
    return <MobileRoutes />;
  } else if (deviceType === Device.Tablet) {
    return <TabletRoutes />;
  } else {
    return <DesktopRoutes />;
  }
}
