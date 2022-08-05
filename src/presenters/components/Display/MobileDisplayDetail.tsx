import { Button, Divider, Form, Popover, Select } from "antd";
import { useEffect, useState } from "react";
import { Place, WorshipPlace } from "../../../entities";
import "./MobileDisplay.scss";

interface MobileDisplayDetailProps {
  worshipPlaceData: WorshipPlace;
  places: Place[];
}

export default function MobileDisplayDetail({
  worshipPlaceData,
  places,
}: MobileDisplayDetailProps) {
  const [searchWord, setSearchWord] = useState<string | undefined>(undefined);
  const { Option } = Select;
  const standard = worshipPlaceData.col / 2;

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

  const content = (cell: string, row: string, col: number) => {
    return (
      <div>
        <div>{`셀: ${cell}`}</div>
        <div>{`좌석: ${row}${col}`}</div>
      </div>
    );
  };

  const left = places
    .filter((item) => item.col <= standard)
    .map((item, index) => {
      const status = item.status;
      if (status === "reserved") {
        return (
          <Popover
            key={index}
            title={item.name}
            content={content(String(item.cell), item.row, item.col)}
          >
            <div
              key={index}
              className={`mobile-display-places___seats___left seat ${status}`}
              style={{ width: `calc(100% / ${standard} - 20px)` }}
            >
              {text(item.status, item.row, item.col, item.name)}
            </div>
          </Popover>
        );
      } else {
        return (
          <div
            key={index}
            className={`mobile-display-places___seats___left seat ${status}`}
            style={{ width: `calc(100% / ${standard} - 20px)` }}
          >
            {text(item.status, item.row, item.col, item.name)}
          </div>
        );
      }
    });

  const right = places
    .filter((item) => item.col > standard)
    .map((item, index) => {
      const status = item.status;
      if (status === "reserved") {
        return (
          <Popover
            key={index}
            title={item.name}
            content={content(String(item.cell), item.row, item.col)}
          >
            <div
              key={index}
              className={`mobile-display-places___seats___right seat ${status}`}
              style={{ width: `calc(100% / ${standard} - 20px)` }}
            >
              {text(item.status, item.row, item.col, item.name)}
            </div>
          </Popover>
        );
      } else {
        return (
          <div
            key={index}
            className={`mobile-display-places___seats___right seat ${status}`}
            style={{ width: `calc(100% / ${standard} - 20px)` }}
          >
            {text(item.status, item.row, item.col, item.name)}
          </div>
        );
      }
    });

  const getOption = places
    .filter((item) => item.status === "reserved")
    .map((item, index) => {
      return (
        <Option key={index} value={item.name}>
          {item.name}
        </Option>
      );
    });

  const onSearch = (value: string) => {
    setSearchWord(value);
  };

  const getDescription = () => {
    const reserved = places.filter((item) => {
      if (item.status === "reserved") {
        return true;
      } else {
        return false;
      }
    });

    if (reserved.length !== 0) {
      return "이름을 입력하시면, 좌석을 찾아드립니다.";
    } else {
      return "예약된 좌석이 없어서 검색 기능 사용이 불가능합니다.";
    }
  };

  const getResult = () => {
    if (searchWord === undefined) {
      return;
    } else {
      const seat = places.filter((item) => item.name === searchWord)[0];
      const cell = seat.cell;
      const row = seat.row;
      const col = seat.col;
      return (
        <div className="mobile-result">
          <div className="mobile-detail___body___top___title">검색 결과</div>
          <div className="mobile-detail___body___top___description">
            {`${searchWord}님(${cell})의 자리는 ${row}${col}입니다.`}
          </div>
        </div>
      );
    }
  };

  useEffect(() => {
    document
      .getElementById("mobile-display-places-wrapper")!
      .scrollTo(
        (document.getElementById("mobile-display-places-wrapper")!.scrollWidth -
          document.getElementById("mobile-display-places-wrapper")!
            .clientWidth) /
          2,
        0
      );
  }, []);

  return (
    <>
      <div className="mobile-detail___body___top">
        <div className="mobile-detail___body___top___title">좌석 검색</div>
        <div className="mobile-detail___body___top___description">
          {getDescription()}
        </div>
        <Form
          className="mobile-search-form"
          onFinish={(value) => onSearch(value.search)}
        >
          <Form.Item name="search">
            <Select
              className="mobile-search-form___input"
              showSearch
              filterOption={(input, option) =>
                (option!.children as unknown as string).includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA!.children as unknown as string)
                  .toLowerCase()
                  .localeCompare(
                    (optionB!.children as unknown as string).toLowerCase()
                  )
              }
              onChange={(value) => onSearch(value)}
              placeholder="이름 입력"
            >
              {getOption}
            </Select>
          </Form.Item>
          <Button
            className="mobile-search-form___button"
            type="primary"
            htmlType="submit"
          >
            검색
          </Button>
        </Form>
        {getResult()}
      </div>
      <Divider />
      <div
        id="mobile-display-places-wrapper"
        className="mobile-display-places-wrapper"
      >
        <div className="mobile-display-places">
          <div className="mobile-display-places___stage">STAGE</div>
          <div className="mobile-display-places___seats">
            <div className="mobile-display-places___seats___left">{left}</div>
            <div className="mobile-display-places___seats___right">{right}</div>
          </div>
          <div className="mobile-display-places___notice">
            <div className="notice reserved">예약 좌석</div>
            <div className="notice empty">빈 좌석</div>
          </div>
        </div>
      </div>
    </>
  );
}
