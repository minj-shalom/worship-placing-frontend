import { redirect } from "../../utils";
import "./TabletNotFound.scss";

interface TabletNotFoundProps {
  isAdmin: boolean;
}

const TabletNotFound = ({ isAdmin }: TabletNotFoundProps) => {
  return (
    <div className="tablet-not-found">
      <div className="tablet-not-found___title">
        찾으시는 페이지가
        <br />
        없는 듯하네요.
      </div>
      <button
        className="tablet-not-found___action"
        onClick={() => redirect(isAdmin)}
      >
        메인 페이지로 돌아가시는건 어떨까요?
      </button>
    </div>
  );
};

export default TabletNotFound;
