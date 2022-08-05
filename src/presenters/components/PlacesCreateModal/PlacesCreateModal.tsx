import { Button, DatePicker, Form, Input, Modal } from "antd";
import moment from "moment";
import { useState } from "react";
import { useNavigate } from "react-router";
import { PlacesAPI } from "../../../adaptors/places.api";
import { Place } from "../../../entities";
import { PlacesService } from "../../../interactors/places.service";
import "./PlacesCreateModal.scss";

interface PlacesCreateModalProps {
  date: string;
  title: string;
  description?: string;
  places: Place[];
  row: string;
  col: number;
  showCount: string;
}

const placesService = new PlacesService(new PlacesAPI());

const setWorshipPlace = async (
  places: Place[],
  row: string,
  col: number,
  date: string,
  title: string,
  description?: string
) => {
  await placesService.setWorshipPlace(
    places,
    row,
    col,
    date,
    title,
    description
  );
};

export default function PlacesCreateModal({
  date,
  title,
  description,
  places,
  row,
  col,
  showCount,
}: PlacesCreateModalProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  const { TextArea } = Input;
  const dateFormat = "YYYY-MM-DD";

  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 21 },
  };

  const create = () => {
    setWorshipPlace(places, row, col, date, title, description);
    setModalVisible(false);
    navigate("/admin");
  };

  function getFooter() {
    return (
      <>
        <Button onClick={() => setModalVisible(false)}>취소</Button>
        <Button type="primary" onClick={() => create()}>
          확인
        </Button>
      </>
    );
  }

  return (
    <>
      <Button
        className="primary-button"
        type="primary"
        onClick={() => setModalVisible(true)}
      >
        완료
      </Button>
      <Modal
        className="create-modal"
        title="예배 자리 생성"
        visible={modalVisible}
        footer={getFooter()}
        onCancel={() => setModalVisible(false)}
      >
        <div className="modal-notice">다음과 같이 생성하시겠습니까?</div>
        <Form {...layout}>
          <Form.Item
            name="date"
            label="날짜"
            initialValue={moment(date, dateFormat)}
            rules={[
              {
                type: "object" as const,
                required: true,
                message: "날짜를 지정해주세요.",
              },
            ]}
          >
            <DatePicker disabled />
          </Form.Item>
          <Form.Item
            name="title"
            label="제목"
            initialValue={title}
            rules={[{ required: true, message: "제목을 입력해주세요." }]}
          >
            <Input maxLength={32} disabled />
          </Form.Item>
          <Form.Item name="description" label="설명" initialValue={description}>
            <TextArea
              autoSize={{ minRows: 3, maxRows: 3 }}
              maxLength={100}
              disabled
            />
          </Form.Item>
          <Form.Item
            name="showCount"
            label="자리수"
            initialValue={showCount}
            rules={[{ required: true, message: "자리수를 입력해주세요." }]}
          >
            <Input disabled />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
