import { useEffect, useState } from "react";
import { WorshipPlace } from "../../../entities";
import { useGetDisplay } from "../../../interactors/places.service";
import MobileDisplayPlaces from "./components/MobileDisplayPlaces";
import MobileNoPlace from "./components/MobileNoPlace";
import "./MobileDisplay.scss";

interface MobileDisplayProps {
  isAdmin: boolean;
}

export default function MobileDisplay({ isAdmin }: MobileDisplayProps) {
  const [worshipPlace, setWorshipPlace] = useState<WorshipPlace | undefined>(
    undefined
  );
  const { data: result } = useGetDisplay();

  useEffect(() => {
    setWorshipPlace(result);
  }, [result]);

  if (worshipPlace) {
    return <MobileDisplayPlaces worshipPlace={worshipPlace} />;
  } else {
    return <MobileNoPlace isAdmin={isAdmin} />;
  }
}
