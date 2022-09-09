import { Layout } from "antd";
import "./MobileFooter.scss";
import facebook from "../../../../../src/assets/icons/facebook-icon.png";
import instagram from "../../../../../src/assets/icons/instagram-icon.png";
import youtube from "../../../../../src/assets/icons/youtube-icon.png";
import kakaotalk from "../../../../../src/assets/icons/kakaotalk-icon.png";
import gmail from "../../../../../src/assets/icons/gmail-icon.png";

export default function MobileFooter() {
  const { Footer } = Layout;
  const date = new Date();
  const year = date.getFullYear();
  const version = process.env.REACT_APP_VERSION
    ? `WORSHIP PLACING v${process.env.REACT_APP_VERSION}`
    : "WORSHIP PLACING";

  return (
    <Footer className="mobile-footer">
      <div className="mobile-footer___info">
        <div className="mobile-footer___info___title">
          {process.env.REACT_APP_TITLE
            ? process.env.REACT_APP_TITLE
            : "연수제일교회"}
        </div>
        <div className="mobile-footer___info___text">
          {process.env.REACT_APP_SLOGAN
            ? process.env.REACT_APP_SLOGAN
            : "하나님이 기뻐하시는 교회"}
        </div>
        <div className="mobile-footer___info___text">
          {process.env.REACT_APP_INFO
            ? process.env.REACT_APP_INFO
            : "기독교 대한성결교회 연수제일교회 G12KOREA"}
        </div>
        <div className="mobile-footer___info___text">
          {process.env.REACT_APP_ADDRESS
            ? process.env.REACT_APP_ADDRESS
            : "인천 연수구 청량로185번길 21"}
        </div>
      </div>
      <div className="mobile-footer___contact">
        <div className="mobile-footer___contact___title">Contact</div>
        <div className="mobile-footer___contact___icon">
          <a
            href={
              process.env.REACT_APP_CONTACT_FACEBOOK
                ? process.env.REACT_APP_CONTACT_FACEBOOK
                : "https://www.facebook.com/YeonsuYouth1.28"
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="mobile-footer___contact___icon___facebook"
              src={facebook}
              alt={facebook}
            />
          </a>
          <a
            href={
              process.env.REACT_APP_CONTACT_INSTAGRAM
                ? process.env.REACT_APP_CONTACT_INSTAGRAM
                : "https://www.instagram.com/yeonsu_youth"
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="mobile-footer___contact___icon___instagram"
              src={instagram}
              alt={instagram}
            />
          </a>
          <a
            href={
              process.env.REACT_APP_CONTACT_YOUTUBE
                ? process.env.REACT_APP_CONTACT_YOUTUBE
                : "https://www.youtube.com/channel/UCJt_K-IAM3T0EpLa52kmGdQ"
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="mobile-footer___contact___icon___youtube"
              src={youtube}
              alt={youtube}
            />
          </a>
          <a
            href={
              process.env.REACT_APP_CONTACT_KAKAOTALK
                ? process.env.REACT_APP_CONTACT_KAKAOTALK
                : "http://pf.kakao.com/_PxiKxfK"
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="mobile-footer___contact___icon___kakaotalk"
              src={kakaotalk}
              alt={kakaotalk}
            />
          </a>
          <a
            href={`mailto:${
              process.env.REACT_APP_CONTACT_GMAIL
                ? process.env.REACT_APP_CONTACT_GMAIL
                : "yeonsuyouth@gmail.com"
            }`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="mobile-footer___contact___icon___gmail"
              src={gmail}
              alt={gmail}
            />
          </a>
        </div>
      </div>
      <div className="mobile-footer___copyright">{`Copyright © ${year} ${
        process.env.REACT_APP_COPYRIGHT
          ? process.env.REACT_APP_COPYRIGHT
          : "Youth Forever"
      }.`}</div>
      <div className="mobile-footer___copyright">All Rights Reserved.</div>
      <div className="mobile-footer___version">{version}</div>
    </Footer>
  );
}
