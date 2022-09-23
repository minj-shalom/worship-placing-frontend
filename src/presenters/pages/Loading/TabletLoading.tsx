import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import "./TabletLoading.scss";

const TabletLoading = () => {
  return (
    <div className="tablet-loading">
      <Spin indicator={<LoadingOutlined />} size="large" />
    </div>
  );
};

export default TabletLoading;
