import { useEffect, useState } from "react";
import { WorshipPlace } from "../../../../entities";
import {
  useCheckId,
  useGetWorshipPlace,
} from "../../../../interactors/places.service";
import { DesktopError, MobileError, TabletError } from "../../Error";
import { DesktopLoading, MobileLoading, TabletLoading } from "../../Loading";
import {
  DesktopNotFound,
  MobileNotFound,
  TabletNotFound,
} from "../../NotFound";
import DisplayPlace from "./DisplayPlace";
import MobileDisplayPlace from "./MobileDisplayPlace";

interface PlaceDetailProps {
  isAdmin: boolean;
  id: string;
  isFullScreen: boolean;
  userAgent: "desktop" | "tablet" | "mobile";
  requestFullScreen: () => void;
  exitFullScreen: () => void;
}

export default function PlaceDetail({
  isAdmin,
  id,
  isFullScreen,
  userAgent,
  requestFullScreen,
  exitFullScreen,
}: PlaceDetailProps) {
  const [worshipPlace, setWorshipPlace] = useState<WorshipPlace | undefined>(
    undefined
  );
  const { data: result, isLoading, refetch } = useGetWorshipPlace(id);
  const { data: existence } = useCheckId(id);

  useEffect(() => {
    setWorshipPlace(result);
  }, [result]);

  const returnResult = (
    mobile: JSX.Element,
    tablet: JSX.Element,
    desktop: JSX.Element
  ) => {
    if (userAgent === "mobile") {
      return mobile;
    } else if (userAgent === "tablet") {
      return tablet;
    } else {
      return desktop;
    }
  };

  if (isLoading) {
    return returnResult(
      <MobileLoading />,
      <TabletLoading />,
      <DesktopLoading />
    );
  } else {
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
      if (existence === undefined) {
        return returnResult(<MobileError />, <TabletError />, <DesktopError />);
      }
      return returnResult(
        <MobileNotFound isAdmin={isAdmin} />,
        <TabletNotFound isAdmin={isAdmin} />,
        <DesktopNotFound isAdmin={isAdmin} />
      );
    }
  }
}
