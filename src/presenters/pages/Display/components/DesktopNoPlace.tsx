import { Divider, Empty } from "antd";

interface DesktopNoPlaceProps {
  isAdmin: boolean;
}

export default function DesktopNoPlace({ isAdmin }: DesktopNoPlaceProps) {
  const getSubtitle = () => {
    if (isAdmin) {
      return <a href="/admin">디스플레이를 지정해보세요.</a>;
    } else {
      return (
        <a
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
      );
    }
  };

  return (
    <div className="desktop-display">
      <div className="desktop-display___header">
        <div className="desktop-display___header___content">
          <div>
            <div className="page-title">디스플레이</div>
            <div className="title">유스예배</div>
          </div>
        </div>
      </div>
      <Divider />
      <div>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <div>
              <div>세팅된 유스예배 자리가 없습니다.</div>
              {getSubtitle()}
            </div>
          }
        />
      </div>
    </div>
  );
}
