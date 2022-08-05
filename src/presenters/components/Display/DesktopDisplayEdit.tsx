import { Button, Divider, Form, Input, Select, Tabs } from "antd";
import { useEffect, useState } from "react";
import { PlacesAPI } from "../../../adaptors/places.api";
import { Place, WorshipPlace } from "../../../entities";
import { PlacesService } from "../../../interactors/places.service";
import "./Display.scss";

interface DesktopDisplayEditProps {
  worshipPlaceData: WorshipPlace;
  places: Place[];
  setEditMode: (checked: boolean) => void;
  callback: () => void;
}

const placesService = new PlacesService(new PlacesAPI());

const setPlace = async (
  id: string,
  row: string,
  col: number,
  name: string,
  cell: string,
  callback?: () => void
) => {
  await placesService.setPlace(id, row, col, name, cell, callback);
};

const deletePlace = async (
  id: string,
  row: string,
  col: number,
  callback?: () => void
) => {
  await placesService.deletePlace(id, row, col, callback);
};

export default function DesktopDisplayEdit({
  worshipPlaceData,
  places,
  setEditMode,
  callback,
}: DesktopDisplayEditProps) {
  const [activeKey, setActiveKey] = useState("좌석 편집");
  const [tabDisabled, setTabDisabled] = useState(true);
  const [inputDisabled, setInputDisabled] = useState(true);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [row, setRow] = useState<string | undefined>(undefined);
  const [col, setCol] = useState<number | undefined>(undefined);
  const [editForm] = Form.useForm();
  const [deleteForm] = Form.useForm();
  const { TabPane } = Tabs;
  const { Option } = Select;
  const standard = worshipPlaceData.col / 2;
  const cell = ["MIH셀", "비전셀", "일꾼셀", "존중셀"];

  const setDeleteTab = (row: string, col: number) => {
    const seat = places.filter((item) => {
      if (item.row === row && item.col === col) {
        return true;
      } else {
        return false;
      }
    })[0];

    if (seat.name && seat.cell) {
      return false;
    } else {
      return true;
    }
  };

  const getName = (row: string, col: number) => {
    const name = places.filter((item) => {
      if (item.row === row && item.col === col) {
        return true;
      } else {
        return false;
      }
    })[0].name;

    return name;
  };

  const getCell = (row: string, col: number) => {
    const cell = places.filter((item) => {
      if (item.row === row && item.col === col) {
        return true;
      } else {
        return false;
      }
    })[0].cell;

    return cell;
  };

  const onClick = (row: string, col: number) => {
    setRow(row);
    setCol(col);
    setActiveKey("좌석 편집");
    setTabDisabled(setDeleteTab(row, col));
    editForm.setFieldsValue({ seatNum: `${row}${col}` });
    editForm.setFieldsValue({ name: getName(row, col) });
    editForm.setFieldsValue({ cell: getCell(row, col) });
    deleteForm.setFieldsValue({ seatNum: `${row}${col}` });
    deleteForm.setFieldsValue({ name: getName(row, col) });
    deleteForm.setFieldsValue({ cell: getCell(row, col) });
  };

  const onChange = () => {
    const name = editForm.getFieldValue("name");
    const cell = editForm.getFieldValue("cell");
    if (name && cell && row !== undefined && col !== undefined) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  };

  const onEdit = (value: any) => {
    setPlace(
      worshipPlaceData.id,
      String(row),
      Number(col),
      value.name,
      value.cell,
      callback
    );
    setRow(undefined);
    setCol(undefined);
    setTabDisabled(true);
    setInputDisabled(true);
    setBtnDisabled(true);
    editForm.setFieldsValue({ seatNum: "좌석을 선택해주세요." });
    editForm.setFieldsValue({ name: "" });
    editForm.setFieldsValue({ cell: "" });
    deleteForm.setFieldsValue({ seatNum: "좌석을 선택해주세요." });
    deleteForm.setFieldsValue({ name: "" });
    deleteForm.setFieldsValue({ cell: "" });
  };

  const onDelete = () => {
    deletePlace(worshipPlaceData.id, String(row), Number(col), callback);
    setRow(undefined);
    setCol(undefined);
    setActiveKey("좌석 편집");
    setTabDisabled(true);
    editForm.setFieldsValue({ seatNum: "좌석을 선택해주세요." });
    editForm.setFieldsValue({ name: "" });
    editForm.setFieldsValue({ cell: "" });
  };

  useEffect(() => {
    if (row === undefined && col === undefined) {
      editForm.setFieldsValue({ seatNum: "좌석을 선택해주세요." });
    } else {
      setInputDisabled(false);
    }
  }, [row, col, editForm]);

  const text = (status: string, row: string, col: number, name?: string) => {
    switch (status) {
      case "empty":
        return `${row}${col}`;
      case "deleted":
        return "X";
      default:
        return `${name}`;
    }
  };

  const left = places
    .filter((item) => item.col <= standard)
    .map((item, index) => {
      const status = item.status;
      if (status === "deleted") {
        return (
          <div
            key={index}
            className={`places___seats___left seat ${status}`}
            style={{ width: `calc(100% / ${standard} - 20px)` }}
          >
            {text(item.status, item.row, item.col)}
          </div>
        );
      } else {
        return (
          <Button
            key={index}
            className={`places___seats___left seat ${status}`}
            style={{ width: `calc(100% / ${standard} - 20px)` }}
            onClick={() => onClick(item.row, item.col)}
          >
            {text(item.status, item.row, item.col, item.name)}
          </Button>
        );
      }
    });

  const right = places
    .filter((item) => item.col > standard)
    .map((item, index) => {
      const status = item.status;
      if (status === "deleted") {
        return (
          <div
            key={index}
            className={`places___seats___left seat ${status}`}
            style={{ width: `calc(100% / ${standard} - 20px)` }}
          >
            {text(item.status, item.row, item.col)}
          </div>
        );
      } else {
        return (
          <Button
            key={index}
            className={`places___seats___left seat ${status}`}
            style={{ width: `calc(100% / ${standard} - 20px)` }}
            onClick={() => onClick(item.row, item.col)}
          >
            {text(item.status, item.row, item.col, item.name)}
          </Button>
        );
      }
    });

  const getOption = cell.map((item, index) => {
    return (
      <Option key={index} value={item}>
        {item}
      </Option>
    );
  });

  return (
    <>
      <div className="desktop-detail___body___left">
        <div className="title">{activeKey}</div>
        <Tabs activeKey={activeKey} onChange={(key) => setActiveKey(key)}>
          <TabPane tab="좌석 편집" key="좌석 편집">
            <Form
              form={editForm}
              layout="vertical"
              onFinish={(value) => onEdit(value)}
            >
              <Form.Item name="seatNum" label="좌석 번호">
                <Input disabled />
              </Form.Item>
              <Form.Item
                name="name"
                label="이름"
                rules={[{ required: true, message: "이름을 입력해주세요." }]}
              >
                <Input disabled={inputDisabled} onChange={onChange} />
              </Form.Item>
              <Form.Item
                name="cell"
                label="셀"
                rules={[{ required: true, message: "셀을 입력해주세요." }]}
              >
                <Select disabled={inputDisabled} onChange={onChange} allowClear>
                  {getOption}
                </Select>
              </Form.Item>
              <div className="edit-button-group">
                <Button onClick={() => setEditMode(false)}>취소</Button>
                <Button
                  className="primary-button"
                  type="primary"
                  htmlType="submit"
                  disabled={btnDisabled}
                >
                  완료
                </Button>
              </div>
            </Form>
          </TabPane>
          <TabPane tab="좌석 삭제" key="좌석 삭제" disabled={tabDisabled}>
            <Form form={deleteForm} layout="vertical">
              <Form.Item name="seatNum" label="좌석 번호">
                <Input disabled />
              </Form.Item>
              <Form.Item name="name" label="이름">
                <Input disabled />
              </Form.Item>
              <Form.Item name="cell" label="셀">
                <Select disabled allowClear>
                  {getOption}
                </Select>
              </Form.Item>
              <div className="edit-button-group">
                <Button onClick={() => setEditMode(false)}>취소</Button>
                <Button
                  className="primary-button"
                  type="primary"
                  danger
                  onClick={() => onDelete()}
                >
                  삭제
                </Button>
              </div>
            </Form>
          </TabPane>
        </Tabs>
      </div>
      <Divider className="desktop-detail___body___divider" type="vertical" />
      <div className="desktop-detail___body___right">
        <div className="places">
          <div className="places___stage">STAGE</div>
          <div className="places___seats">
            <div className="places___seats___left">{left}</div>
            <div className="places___seats___right">{right}</div>
          </div>
          <div className="places___notice">
            <div className="notice reserved">예약 좌석</div>
            <div className="notice empty">빈 좌석</div>
          </div>
        </div>
      </div>
    </>
  );
}
