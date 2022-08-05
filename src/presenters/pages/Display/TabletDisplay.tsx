import { useEffect, useState } from "react";
import { WorshipPlace } from "../../../entities";
import { useGetDisplay } from "../../../interactors/places.service";
import TabletDisplayPlaces from "./components/TabletDisplayPlaces";
import TabletNoPlace from "./components/TabletNoPlace";
import "./TabletDisplay.scss";

interface TabletDisplayProps {
  isAdmin: boolean;
}

export default function TabletDisplay({ isAdmin }: TabletDisplayProps) {
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
    return <TabletDisplayPlaces worshipPlace={worshipPlace} />;
  } else {
    return <TabletNoPlace isAdmin={isAdmin} />;
  }
}
