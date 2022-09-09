import {
  SendOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, message, Modal } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";
import "./LoginModal.scss";

interface LoginModalProps {
  isAdmin: boolean;
  isHeader: boolean;
  login: () => void;
  logout: () => void;
  setUserPassword: (newPassword: string) => void;
}

export default function LoginModal({
  isAdmin,
  isHeader,
  login,
  logout,
  setUserPassword,
}: LoginModalProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const navigate = useNavigate();

  const onLoginButtonClick = (value: string) => {
    if (value === process.env.REACT_APP_ADMIN_PASSWORD) {
      setUserPassword(value);
      setModalVisible(false);
      login();
      navigate("/admin", {
        state: { messageContent: "로그인 되었습니다." },
      });
    } else {
      setUserPassword(value);
      message.error(
        <>
          <span>잘못된 비밀번호입니다. 관리자에게 문의해주세요.</span>
          <div>
            <span>(문의: </span>
            <a
              href={`mailto:${
                process.env.REACT_APP_CONTACT_GMAIL
                  ? process.env.REACT_APP_CONTACT_GMAIL
                  : "yeonsuyouth@gmail.com"
              }`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>
                {process.env.REACT_APP_CONTACT_GMAIL
                  ? process.env.REACT_APP_CONTACT_GMAIL
                  : "yeonsuyouth@gmail.com"}
              </span>
            </a>
            <span>)</span>
          </div>
        </>
      );
    }
  };

  const onLogoutButtonClick = () => {
    setUserPassword("");
    setModalVisible(false);
    logout();
    navigate("/", { state: { messageContent: "로그아웃 되었습니다." } });
  };

  function loginButton() {
    if (isHeader) {
      return (
        <button
          className="login-modal-button"
          onClick={() => setModalVisible(true)}
        >
          <UserOutlined />
        </button>
      );
    } else {
      return (
        <button
          className="forbidden-button"
          onClick={() => setModalVisible(true)}
        >
          관리자이시면 로그인 해주세요.
        </button>
      );
    }
  }

  return (
    <>
      {loginButton()}
      <Modal
        className="login-modal"
        title="Admin Login"
        visible={modalVisible}
        footer={null}
        onCancel={() => setModalVisible(false)}
      >
        {!isAdmin ? (
          <Form
            className="login-modal___login"
            name="login"
            onFinish={(value) => onLoginButtonClick(value.password)}
          >
            <div className="login-modal___login___notice">
              관리자이시면 로그인 하세요.
            </div>
            <div className="login-modal___login___password">
              <Form.Item
                className="login-modal___login___password___input"
                name="password"
                rules={[
                  { required: true, message: "비밀번호를 입력해주세요." },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item className="login-modal___login___password___button">
                <Button
                  className="login-modal___login___password___button"
                  htmlType="submit"
                >
                  <SendOutlined />
                </Button>
              </Form.Item>
            </div>
          </Form>
        ) : (
          <div className="login-modal___logout">
            <div className="login-modal___logout___notice">
              로그아웃 하시겠습니까?
            </div>
            <Button
              className="login-modal___logout___button"
              onClick={() => onLogoutButtonClick()}
            >
              <UserSwitchOutlined />
              <span>관리자 로그아웃</span>
            </Button>
          </div>
        )}
      </Modal>
    </>
  );
}
