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

  return (
    <Footer className="mobile-footer">
      <div className="mobile-footer___info">
        <div className="mobile-footer___info___title">
          {process.env.REACT_APP_TITLE}
        </div>
        <div className="mobile-footer___info___text">
          {process.env.REACT_APP_SLOGAN}
        </div>
        <div className="mobile-footer___info___text">
          {process.env.REACT_APP_INFO}
        </div>
        <div className="mobile-footer___info___text">
          {process.env.REACT_APP_ADDRESS}
        </div>
      </div>
      <div className="mobile-footer___contact">
        <div className="mobile-footer___contact___title">Contact</div>
        <div className="mobile-footer___contact___icon">
          {process.env.REACT_APP_CONTACT_FACEBOOK && (
            <a
              href={process.env.REACT_APP_CONTACT_FACEBOOK}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="mobile-footer___contact___icon___facebook"
                src={facebook}
                alt={facebook}
              />
            </a>
          )}
          {process.env.REACT_APP_CONTACT_INSTAGRAM && (
            <a
              href={process.env.REACT_APP_CONTACT_INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="mobile-footer___contact___icon___instagram"
                src={instagram}
                alt={instagram}
              />
            </a>
          )}
          {process.env.REACT_APP_CONTACT_YOUTUBE && (
            <a
              href={process.env.REACT_APP_CONTACT_YOUTUBE}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="mobile-footer___contact___icon___youtube"
                src={youtube}
                alt={youtube}
              />
            </a>
          )}
          {process.env.REACT_APP_CONTACT_KAKAOTALK && (
            <a
              href={process.env.REACT_APP_CONTACT_KAKAOTALK}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="mobile-footer___contact___icon___kakaotalk"
                src={kakaotalk}
                alt={kakaotalk}
              />
            </a>
          )}
          {process.env.REACT_APP_CONTACT_GMAIL && (
            <a
              href={`mailto:${process.env.REACT_APP_CONTACT_GMAIL}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="mobile-footer___contact___icon___gmail"
                src={gmail}
                alt={gmail}
              />
            </a>
          )}
        </div>
      </div>
      <div className="mobile-footer___copyright">{`Copyright © ${year} ${process.env.REACT_APP_COPYRIGHT}.`}</div>
      <div className="mobile-footer___copyright">All rights reserved.</div>
      <div className="mobile-footer___version">{`WORSHIP PLACING v${process.env.REACT_APP_VERSION}`}</div>
    </Footer>
  );
}
