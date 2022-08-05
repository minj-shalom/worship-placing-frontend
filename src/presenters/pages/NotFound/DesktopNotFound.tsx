import { redirect } from "../../utils";
import "./DesktopNotFound.scss";

interface DesktopNotFoundProps {
  isAdmin: boolean;
}

const DesktopNotFound = ({ isAdmin }: DesktopNotFoundProps) => {
  return (
    <div className="desktop-not-found">
      <div className="desktop-not-found___title">
        찾으시는 페이지가
        <br />
        없는 듯하네요.
      </div>
      <button
        className="desktop-not-found___action"
        onClick={() => redirect(isAdmin)}
      >
        메인 페이지로 돌아가시는건 어떨까요?
      </button>
    </div>
  );
};

export default DesktopNotFound;
