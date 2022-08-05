import { Button, Divider, Switch, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { WorshipPlace } from "../../../../entities";
import { CustomCountdown } from "../../../components/CustomCountdown";
import DesktopDisplay from "../../../components/Display/DesktopDisplay";
import DesktopDisplayData from "../../../components/Display/DesktopDisplayData";
import { getWorshipPlaceData } from "../../../utils";

interface DesktopDisplayPlacesProps {
  worshipPlace: WorshipPlace;
  isFullScreen: boolean;
  requestFullScreen: () => void;
  exitFullScreen: () => void;
}

export default function DesktopDisplayPlaces({
  worshipPlace,
  isFullScreen,
  requestFullScreen,
  exitFullScreen,
}: DesktopDisplayPlacesProps) {
  const [displayMode, setDisplayMode] = useState(true);
  const {
    places,
    title,
    description,
    entireCount,
    reservedCount,
    emptyCount,
    date,
  } = getWorshipPlaceData(worshipPlace);

  const onChange = (checked: boolean) => {
    setDisplayMode(checked);
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
    <div className="desktop-display">
      <div className="desktop-display___header">
        <div className="desktop-display___header___content">
          <div>
            <div className="page-title">디스플레이</div>
            <Tooltip title={title}>
              <div className="title overflow">{title}</div>
            </Tooltip>
            <Tooltip title={description}>
              <div className="description">
                {description ? description : null}
              </div>
            </Tooltip>
          </div>
          <div className="desktop-display___header___content___right">
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
        </div>
      </div>
      <Divider />
      <div className="desktop-display___controll">
        <div className="title">{displayMode ? "좌석 현황" : "좌석표"}</div>
        <div className="desktop-display___controll___action">
          <div className="desktop-display___controll___action___text description">
            디스플레이 모드
          </div>
          <Switch
            className="desktop-display___controll___action___switch"
            onChange={onChange}
            defaultChecked={true}
          />
          {!isFullScreen && (
            <Button
              className="full-screen-button"
              onClick={() => onRequestFullScreen()}
            >
              전체 화면
            </Button>
          )}
        </div>
      </div>
      {displayMode ? (
        <DesktopDisplayData
          worshipPlaceData={worshipPlace}
          places={places}
          isFullScreen={isFullScreen}
        />
      ) : (
        <DesktopDisplay places={places} isFullScreen={isFullScreen} />
      )}
    </div>
  );
}
