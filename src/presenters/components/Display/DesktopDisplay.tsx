import { Place } from "../../../entities";
import "./Display.scss";

interface DesktopDisplayProps {
  places: Place[];
  isFullScreen?: boolean;
}

export default function DesktopDisplay({
  places,
  isFullScreen,
}: DesktopDisplayProps) {
  const standard = places[places.length - 1].col / 2;
  const text = (status: string, row: string, col: number) => {
    switch (status) {
      case "deleted":
        return "X";
      default:
        return `${row}${col}`;
    }
  };
  const left = places
    .filter((item) => item.col <= standard)
    .map((item, index) => {
      const status = item.status === "deleted" ? "deleted" : "display";
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
      const status = item.status === "deleted" ? "deleted" : "display";
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
    </div>
  );
}
