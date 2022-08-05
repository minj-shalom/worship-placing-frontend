import { redirect } from "../../utils";
import "./MobileNotFound.scss";

interface MobileNotFoundProps {
  isAdmin: boolean;
}

const MobileNotFound = ({ isAdmin }: MobileNotFoundProps) => {
  return (
    <div className="mobile-not-found">
      <div className="mobile-not-found___title">
        찾으시는 페이지가
        <br />
        없는 듯하네요.
      </div>
      <button
        className="mobile-not-found___action"
        onClick={() => redirect(isAdmin)}
      >
        메인 페이지로 돌아가시는건 어떨까요?
      </button>
    </div>
  );
};

export default MobileNotFound;
