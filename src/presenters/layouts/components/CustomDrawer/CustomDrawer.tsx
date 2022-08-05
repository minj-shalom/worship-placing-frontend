import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import "./CustomDrawer.scss";

interface CustomDrawerProps {
  drawerVisible: boolean;
  onDrawerOpen: () => void;
  onDrawerClose: () => void;
}

export default function CustomDrawer({
  drawerVisible,
  onDrawerOpen,
  onDrawerClose,
}: CustomDrawerProps) {
  return (
    <>
      {!drawerVisible && (
        <Button
          className="tablet-header___left___button off"
          onClick={() => onDrawerOpen()}
        >
          <MenuOutlined className="tablet-header___left___button___icon" />
        </Button>
      )}
      {drawerVisible && (
        <Button
          className="tablet-header___left___button on"
          onClick={() => onDrawerClose()}
        >
          <CloseOutlined className="tablet-header___left___button___icon" />
        </Button>
      )}
      <Drawer
        className="mobile-drawer"
        placement={"top"}
        closable={false}
        onClose={onDrawerClose}
        visible={drawerVisible}
        key={"top"}
        zIndex={drawerVisible ? 1000 : -10}
      >
        <a href="/admin">
          <p className="mobile-drawer___content">관리</p>
        </a>
        <a href="/display">
          <p className="mobile-drawer___content last">디스플레이</p>
        </a>
      </Drawer>
    </>
  );
}
