import { Button, Divider, Switch, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { WorshipPlace } from "../../../../entities";
import { CustomCountdown } from "../../../components/CustomCountdown";
import DesktopDisplayDetail from "../../../components/Display/DesktopDisplayDetail";
import DesktopDisplayEdit from "../../../components/Display/DesktopDisplayEdit";
import { DisplayButton } from "../../../components/DisplayButton/DisplayButton";
import { getWorshipPlaceData } from "../../../utils";

interface DisplayPlaceProps {
  worshipPlace: WorshipPlace;
  isFullScreen: boolean;
  requestFullScreen: () => void;
  exitFullScreen: () => void;
  callback: () => void;
}

export default function DisplayPlace({
  worshipPlace,
  isFullScreen,
  requestFullScreen,
  exitFullScreen,
  callback,
}: DisplayPlaceProps) {
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

  const onRequestFullScreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
      requestFullScreen();
    }
  };

  const onExitFullScreen = () => {
    if (!document.fullscreenElement) {
      exitFullScreen();
    }
  };

  useEffect(() => {
    if (isFullScreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isFullScreen]);

  document.addEventListener("fullscreenchange", onExitFullScreen, false);

  return (
    <div className="desktop-detail">
      <div className="desktop-detail___header">
        <div className="desktop-detail___header___content">
          <div className="desktop-detail___header___content___left">
            <div className="desktop-detail___header___content___left___top">
              <div className="page-title">관리</div>
              <Tooltip title={title}>
                <div className="title overflow">{title}</div>
              </Tooltip>
              <Tooltip title={description}>
                <div className="description">
                  {description ? description : null}
                </div>
              </Tooltip>
            </div>
            <div className="desktop-detail___header___content___left___bottom">
              <div className="controll">
                <div className="controll___action">
                  <div className="controll___action___text description">
                    편집 모드
                  </div>
                  {status === "예배 종료" ? (
                    <Tooltip title="종료된 예배는 편집하실 수 없습니다.">
                      <Switch
                        className="controll___action___switch"
                        checked={editMode}
                        onChange={onChange}
                        disabled
                      />
                    </Tooltip>
                  ) : (
                    <Switch
                      className="controll___action___switch"
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
          <div className="desktop-detail___header___content___right">
            <div className="desktop-detail___header___content___right___top">
              <div className="card date">
                <div className="key dateText">예배일</div>
                <div className="value">{date}</div>
              </div>
              <div className="card countdown">
                <div className="key countdownText">카운트다운</div>
                <div className="value">{CustomCountdown(date)}</div>
              </div>
              <div className="card entire">
                <div className="key entireText">전체 좌석</div>
                <div className="value">{entireCount}</div>
              </div>
              <div className="card reserved">
                <div className="key reservedText">예약 좌석</div>
                <div className="value">{reservedCount}</div>
              </div>
              <div className="card empty">
                <div className="key emptyText">빈 좌석</div>
                <div className="value">{emptyCount}</div>
              </div>
            </div>
            <div className="desktop-detail___header___content___right___bottom">
              {!isFullScreen && (
                <Button onClick={() => onRequestFullScreen()}>전체 화면</Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Divider />
      <div className="desktop-detail___body">
        {editMode ? (
          <DesktopDisplayEdit
            worshipPlaceData={worshipPlace}
            places={places}
            setEditMode={onChange}
            callback={callback}
          />
        ) : (
          <DesktopDisplayDetail
            worshipPlaceData={worshipPlace}
            places={places}
            isFullScreen={isFullScreen}
          />
        )}
      </div>
    </div>
  );
}
