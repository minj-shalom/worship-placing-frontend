import { Button, message, Modal } from "antd";
import { useState } from "react";
import { RefetchOptions } from "react-query";
import { PlacesAPI } from "../../../adaptors/places.api";
import { WorshipPlaceTableColumns } from "../../../entities";
import { PlacesService } from "../../../interactors/places.service";
import "./PlacesDeleteModal.scss";

interface PlacesDeleteModalProps {
  selectedRowKeys: React.Key[];
  hasSelected: boolean;
  data: WorshipPlaceTableColumns[];
  isMobile: boolean;
  refetch: (options?: RefetchOptions | undefined) => void;
}

const placesService = new PlacesService(new PlacesAPI());

const deleteWorshipPlaceList = async (
  idList: string[],
  callback: () => void
) => {
  await placesService.deleteWorshipPlaceList(idList, callback);
};

export default function PlacesDeleteModal({
  selectedRowKeys,
  hasSelected,
  data,
  isMobile,
  refetch,
}: PlacesDeleteModalProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const onClick = () => {
    if (hasSelected) {
      setModalVisible(true);
    } else {
      message.error("삭제할 자리 목록을 선택해주세요.");
    }
  };

  const onDelete = () => {
    const keyData = data.map((item) => {
      const object = { key: item.key, id: item.id };
      return object;
    });
    const deleteList = keyData
      .filter((item) => {
        if (selectedRowKeys.includes(item.key)) {
          return true;
        } else {
          return false;
        }
      })
      .map((item) => item.id);
    deleteWorshipPlaceList(deleteList, refetch);
    setModalVisible(false);
  };

  function getFooter() {
    return (
      <>
        <Button onClick={() => setModalVisible(false)}>취소</Button>
        <Button type="primary" danger onClick={() => onDelete()}>
          확인
        </Button>
      </>
    );
  }

  return (
    <>
      <Button
        className={isMobile ? "mobile-delete-button" : "delete-button"}
        onClick={() => onClick()}
        danger
      >
        유스예배 자리 삭제
      </Button>
      <Modal
        className="delete-modal"
        title="예배 자리 삭제"
        visible={modalVisible}
        footer={getFooter()}
        onCancel={() => setModalVisible(false)}
      >
        정말로 삭제하시겠습니까?
      </Modal>
    </>
  );
}
