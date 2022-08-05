import { Layout } from "antd";
import { LoginModal } from "../../../components/LoginModal";
import { redirect } from "../../../utils";
import "./DesktopHeader.scss";

interface DesktopHeaderProps {
  isAdmin: boolean;
  isFullScreen: boolean;
  login: () => void;
  logout: () => void;
  setUserPassword: (newPassword: string) => void;
}

export default function DesktopHeader({
  isAdmin,
  isFullScreen,
  login,
  logout,
  setUserPassword,
}: DesktopHeaderProps) {
  const { Header } = Layout;

  return (
    <Header
      className={`desktop-header ${isFullScreen ? "full-screen-header" : ""}`}
    >
      <div className="desktop-header___left">
        <button
          className="desktop-header___left___title"
          onClick={() => redirect(isAdmin)}
        >
          WORSHIP PLACING
        </button>
        {isAdmin && (
          <a href="/admin">
            <p className="desktop-header___left___menu">관리</p>
          </a>
        )}
        {isAdmin && (
          <a href="/display">
            <p className="desktop-header___left___menu">디스플레이</p>
          </a>
        )}
      </div>
      <div className="desktop-header___right">
        <LoginModal
          isAdmin={isAdmin}
          isHeader={true}
          login={login}
          logout={logout}
          setUserPassword={setUserPassword}
        />
      </div>
    </Header>
  );
}
