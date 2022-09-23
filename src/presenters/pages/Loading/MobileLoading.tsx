import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import "./MobileLoading.scss";

const MobileLoading = () => {
  return (
    <div className="mobile-loading">
      <Spin indicator={<LoadingOutlined />} size="large" />
    </div>
  );
};

export default MobileLoading;
