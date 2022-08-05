import { LoginModal } from "../../components/LoginModal";
import "./TabletForbidden.scss";

interface TabletForbiddenProps {
  isAdmin: boolean;
  login: () => void;
  logout: () => void;
  setUserPassword: (newPassword: string) => void;
}

const TabletForbidden = ({
  isAdmin,
  login,
  logout,
  setUserPassword,
}: TabletForbiddenProps) => {
  return (
    <div className="tablet-forbidden">
      <div className="tablet-forbidden___title">
        해당 페이지에
        <br />
        접근할 권한이
        <br />
        없습니다.
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

export default TabletForbidden;
