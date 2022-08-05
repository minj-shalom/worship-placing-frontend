import { Place, WorshipPlace } from "../../../entities";
import "./Display.scss";

interface DesktopDisplayDataProps {
  worshipPlaceData: WorshipPlace;
  places: Place[];
  isFullScreen: boolean;
}

export default function DesktopDisplayData({
  worshipPlaceData,
  places,
  isFullScreen,
}: DesktopDisplayDataProps) {
  const standard = worshipPlaceData.col / 2;
  const text = (status: string, row: string, col: number) => {
    switch (status) {
      case "reserved":
        return "예약 좌석";
      case "deleted":
        return "X";
      default:
        return `${row}${col}`;
    }
  };
  const left = places
    .filter((item) => item.col <= standard)
    .map((item, index) => {
      const status = item.status;
      return (
        <div
          key={index}
          className={`places___seats___left seat ${status}`}
          style={{ width: `calc(100% / ${standard} - 20px)` }}
        >
          {text(item.status, item.row, item.col)}
        </div>
      );
    });
  const right = places
    .filter((item) => item.col > standard)
    .map((item, index) => {
      const status = item.status;
      return (
        <div
          key={index}
          className={`places___seats___right seat ${status}`}
          style={{ width: `calc(100% / ${standard} - 20px)` }}
        >
          {text(item.status, item.row, item.col)}
        </div>
      );
    });

  return (
    <div className={`places ${isFullScreen ? "full-screen" : ""}`}>
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
  );
}
