import { useEffect, useState } from "react";
import { WorshipPlace } from "../../../entities";
import { useGetDisplay } from "../../../interactors/places.service";
import DesktopDisplayPlaces from "./components/DesktopDisplayPlaces";
import DesktopNoPlace from "./components/DesktopNoPlace";
import "./DesktopDisplay.scss";

interface DesktopDisplayProps {
  isAdmin: boolean;
  isFullScreen: boolean;
  requestFullScreen: () => void;
  exitFullScreen: () => void;
}

export default function DesktopDisplay({
  isAdmin,
  isFullScreen,
  requestFullScreen,
  exitFullScreen,
}: DesktopDisplayProps) {
  const [worshipPlace, setWorshipPlace] = useState<WorshipPlace | undefined>(
    undefined
  );
  const { data: result } = useGetDisplay();

  useEffect(() => {
    if (result && result.worshipPlace) {
      setWorshipPlace(result.worshipPlace);
    } else {
      setWorshipPlace(undefined);
    }
  }, [result]);

  if (worshipPlace) {
    return (
      <DesktopDisplayPlaces
        worshipPlace={worshipPlace}
        isFullScreen={isFullScreen}
        requestFullScreen={requestFullScreen}
        exitFullScreen={exitFullScreen}
      />
    );
  } else {
    return <DesktopNoPlace isAdmin={isAdmin} />;
  }
}
