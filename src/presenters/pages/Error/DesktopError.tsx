import "./DesktopError.scss";

const DesktopError = () => {
  return (
    <div className="desktop-error">
      <div className="desktop-error___title">
        알 수 없는 에러가
        <br />
        발생하였습니다.
      </div>
      <a
        className="desktop-error___action"
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

export default DesktopError;
