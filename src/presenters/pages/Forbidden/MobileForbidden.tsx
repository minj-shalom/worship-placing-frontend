import { LoginModal } from "../../components/LoginModal";
import "./MobileForbidden.scss";

interface MobileForbiddenProps {
  isAdmin: boolean;
  login: () => void;
  logout: () => void;
  setUserPassword: (newPassword: string) => void;
}

const MobileForbidden = ({
  isAdmin,
  login,
  logout,
  setUserPassword,
}: MobileForbiddenProps) => {
  return (
    <div className="mobile-forbidden">
      <div className="mobile-forbidden___title">
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

export default MobileForbidden;
