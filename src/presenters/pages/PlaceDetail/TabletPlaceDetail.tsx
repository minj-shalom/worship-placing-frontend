import { useCheckId } from "../../../interactors/places.service";
import { TabletError } from "../Error";
import { TabletNotFound } from "../NotFound";
import PlaceDetail from "./components/PlaceDetail";
import "./TabletPlaceDetail.scss";

interface TabletPlaceDetailProps {
  isAdmin: boolean;
  isFullScreen: boolean;
  requestFullScreen: () => void;
  exitFullScreen: () => void;
}

export default function TabletPlaceDetail({
  isAdmin,
  isFullScreen,
  requestFullScreen,
  exitFullScreen,
}: TabletPlaceDetailProps) {
  const id = window.location.pathname.substring(7);
  const existence = useCheckId(id);

  if (existence) {
    return (
      <PlaceDetail
        id={id}
        isFullScreen={isFullScreen}
        userAgent="tablet"
        requestFullScreen={requestFullScreen}
        exitFullScreen={exitFullScreen}
      />
    );
  } else {
    if (existence === undefined) {
      return <TabletError />;
    } else {
      return <TabletNotFound isAdmin={isAdmin} />;
    }
  }
}
