import { Divider, Switch } from "antd";
import { useState } from "react";
import { WorshipPlace } from "../../../../entities";
import { CustomCountdown } from "../../../components/CustomCountdown";
import MobileDisplay from "../../../components/Display/MobileDisplay";
import MobileDisplayData from "../../../components/Display/MobileDisplayData";
import { getWorshipPlaceData } from "../../../utils";

interface TabletDisplayPlacesProps {
  worshipPlace: WorshipPlace;
}

export default function TabletDisplayPlaces({
  worshipPlace,
}: TabletDisplayPlacesProps) {
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

  return (
    <div className="tablet-display">
      <div className="tablet-display___header">
        <div className="tablet-display___header___content">
          <div className="tablet-display___header___content___top">
            <div className="page-title">디스플레이</div>
            <div className="title mobile-overflow">{title}</div>
            <div className="description">
              {description ? description : null}
            </div>
          </div>
          <div className="tablet-display___header___content___bottom">
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
        </div>
      </div>
      <Divider />
      <div className="tablet-display___controll">
        <div className="title">{displayMode ? "좌석 현황" : "좌석표"}</div>
        <div className="tablet-display___controll___action">
          <div className="tablet-display___controll___action___text mobile-description">
            디스플레이 모드
          </div>
          <Switch
            className="tablet-display___controll___action___switch"
            onChange={onChange}
            defaultChecked={true}
          />
        </div>
      </div>
      {displayMode ? (
        <MobileDisplayData worshipPlaceData={worshipPlace} places={places} />
      ) : (
        <MobileDisplay places={places} />
      )}
    </div>
  );
}
