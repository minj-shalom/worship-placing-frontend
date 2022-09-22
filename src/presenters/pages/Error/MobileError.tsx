import "./MobileError.scss";

const MobileError = () => {
  return (
    <div className="mobile-error">
      <div className="mobile-error___title">
        알 수 없는 에러가
        <br />
        발생하였습니다.
      </div>
      <a
        className="mobile-error___action"
        href={`mailto:${
          process.env.REACT_APP_CONTACT_GMAIL
            ? process.env.REACT_APP_CONTACT_GMAIL
            : "yeonsuyouth@gmail.com"
        }`}
        target="_blank"
        rel="noopener noreferrer"
      >
        관리자에게 문의해주세요.
      </a>
    </div>
  );
};

export default MobileError;
