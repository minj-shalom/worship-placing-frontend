import { LoginModal } from "../../components/LoginModal";
import "./DesktopForbidden.scss";

interface DesktopForbiddenProps {
  isAdmin: boolean;
  login: () => void;
  logout: () => void;
  setUserPassword: (newPassword: string) => void;
}

const DesktopForbidden = ({
  isAdmin,
  login,
  logout,
  setUserPassword,
}: DesktopForbiddenProps) => {
  return (
    <div className="desktop-forbidden">
      <div className="desktop-forbidden___title">
        해당 페이지에
        <br />
        접근할 권한이 없습니다.
      </div>
      <LoginModal
        isAdmin={isAdmin}
        isHeader={false}
        login={login}
        logout={logout}
        setUserPassword={setUserPassword}
      />
    </div>
  );
};

export default DesktopForbidden;
