import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import "./DesktopLoading.scss";

const DesktopLoading = () => {
  return (
    <div className="desktop-loading">
      <Spin indicator={<LoadingOutlined />} size="large" />
    </div>
  );
};

export default DesktopLoading;
