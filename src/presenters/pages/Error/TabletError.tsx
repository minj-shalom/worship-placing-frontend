import "./TabletError.scss";

const TabletError = () => {
  return (
    <div className="tablet-error">
      <div className="tablet-error___title">
        알 수 없는 에러가
        <br />
        발생하였습니다.
      </div>
      <a
        className="tablet-error___action"
        href={`mailto:${process.env.REACT_APP_CONTACT_GMAIL}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        관리자에게 문의해주세요.
      </a>
    </div>
  );
};

export default TabletError;
