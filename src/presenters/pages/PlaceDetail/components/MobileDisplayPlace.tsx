import { Divider, Switch, Tooltip } from "antd";
import { useState } from "react";
import { WorshipPlace } from "../../../../entities";
import { CustomCountdown } from "../../../components/CustomCountdown";
import MobileDisplayDetail from "../../../components/Display/MobileDisplayDetail";
import MobileDisplayEdit from "../../../components/Display/MobileDisplayEdit";
import { DisplayButton } from "../../../components/DisplayButton/DisplayButton";
import { getWorshipPlaceData } from "../../../utils";

interface MobileDisplayPlaceProps {
  worshipPlace: WorshipPlace;
  callback: () => void;
}

export default function MobileDisplayPlace({
  worshipPlace,
  callback,
}: MobileDisplayPlaceProps) {
  const [editMode, setEditMode] = useState(false);
  const {
    status,
    places,
    title,
    description,
    entireCount,
    reservedCount,
    emptyCount,
    date,
  } = getWorshipPlaceData(worshipPlace);

  const onChange = (checked: boolean) => {
    setEditMode(checked);
  };

  return (
    <div className="mobile-detail">
      <div className="mobile-detail___header">
        <div className="mobile-detail___header">
          <div className="mobile-detail___header___top">
            <div className="page-title">관리</div>
            <div className="title">{title}</div>
            <div className="description">
              {description ? description : null}
            </div>
          </div>
          <div className="mobile-detail___header___bottom">
            <div className="mobile-detail___header___bottom___card">
              <div className="mobile-card date">
                <div className="key dateText">예배일</div>
                <div className="value">{date}</div>
              </div>
              <div className="mobile-card countdown">
                <div className="key countdownText">카운트다운</div>
                <div className="value">{CustomCountdown(date)}</div>
              </div>
              <div className="mobile-card entire">
                <div className="key entireText">전체 좌석</div>
                <div className="value">{entireCount}</div>
              </div>
              <div className="mobile-card reserved">
                <div className="key reservedText">예약 좌석</div>
                <div className="value">{reservedCount}</div>
              </div>
              <div className="mobile-card empty">
                <div className="key emptyText">빈 좌석</div>
                <div className="value">{emptyCount}</div>
              </div>
            </div>
            <div className="mobile-controll">
              <div className="mobile-controll___action">
                <div className="mobile-controll___action___text mobile-description">
                  편집 모드
                </div>
                {status === "예배 종료" ? (
                  <Tooltip title="종료된 예배는 편집하실 수 없습니다.">
                    <Switch
                      className="mobile-controll___action___switch"
                      checked={editMode}
                      onChange={onChange}
                      disabled
                    />
                  </Tooltip>
                ) : (
                  <Switch
                    className="mobile-controll___action___switch"
                    checked={editMode}
                    onChange={onChange}
                  />
                )}
              </div>
              {DisplayButton(
                worshipPlace.isDisplay,
                worshipPlace.id,
                status,
                callback
              )}
            </div>
          </div>
        </div>
      </div>
      <Divider />
      <div className="mobile-detail___body">
        {editMode ? (
          <MobileDisplayEdit
            worshipPlaceData={worshipPlace}
            places={places}
            setEditMode={onChange}
            callback={callback}
          />
        ) : (
          <MobileDisplayDetail
            worshipPlaceData={worshipPlace}
            places={places}
          />
        )}
      </div>
    </div>
  );
}
