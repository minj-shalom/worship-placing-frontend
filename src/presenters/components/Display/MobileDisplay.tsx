import { useEffect } from "react";
import { Place } from "../../../entities";
import "./MobileDisplay.scss";

interface MobileDisplayProps {
  places: Place[];
}

export default function MobileDisplay({ places }: MobileDisplayProps) {
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
          className={`mobile-display-places___seats___left seat ${status}`}
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
          className={`mobile-display-places___seats___right seat ${status}`}
          style={{ width: `calc(100% / ${standard} - 20px)` }}
        >
          {text(item.status, item.row, item.col)}
        </div>
      );
    });

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
      </div>
    </div>
  );
}
