import { useEffect, useState } from "react";
import { WorshipPlace } from "../../../../entities";
import { useGetWorshipPlace } from "../../../../interactors/places.service";
import { DesktopError, MobileError, TabletError } from "../../Error";
import DisplayPlace from "./DisplayPlace";
import MobileDisplayPlace from "./MobileDisplayPlace";

interface PlaceDetailProps {
  id: string;
  isFullScreen: boolean;
  userAgent: "desktop" | "tablet" | "mobile";
  requestFullScreen: () => void;
  exitFullScreen: () => void;
}

export default function PlaceDetail({
  id,
  isFullScreen,
  userAgent,
  requestFullScreen,
  exitFullScreen,
}: PlaceDetailProps) {
  const [worshipPlace, setWorshipPlace] = useState<WorshipPlace | undefined>(
    undefined
  );
  const { data: result, refetch } = useGetWorshipPlace(id);

  useEffect(() => {
    if (result && result.worshipPlace) {
      setWorshipPlace(result.worshipPlace);
    } else {
      setWorshipPlace(undefined);
    }
  }, [result]);

  if (worshipPlace) {
    if (userAgent === "mobile" || userAgent === "tablet") {
      return (
        <MobileDisplayPlace worshipPlace={worshipPlace} callback={refetch} />
      );
    } else {
      return (
        <DisplayPlace
          worshipPlace={worshipPlace}
          isFullScreen={isFullScreen}
          requestFullScreen={requestFullScreen}
          exitFullScreen={exitFullScreen}
          callback={refetch}
        />
      );
    }
  } else {
    if (userAgent === "mobile") {
      return <MobileError />;
    } else if (userAgent === "tablet") {
      return <TabletError />;
    } else {
      return <DesktopError />;
    }
  }
}
