import { useCheckId } from "../../../interactors/places.service";
import { MobileError } from "../Error";
import { MobileNotFound } from "../NotFound";
import PlaceDetail from "./components/PlaceDetail";
import "./MobilePlaceDetail.scss";

interface MobilePlaceDetailProps {
  isAdmin: boolean;
  isFullScreen: boolean;
  requestFullScreen: () => void;
  exitFullScreen: () => void;
}

export default function MobilePlaceDetail({
  isAdmin,
  isFullScreen,
  requestFullScreen,
  exitFullScreen,
}: MobilePlaceDetailProps) {
  const id = window.location.pathname.substring(7);
  const existence = useCheckId(id);

  if (existence) {
    return (
      <PlaceDetail
        id={id}
        isFullScreen={isFullScreen}
        userAgent="mobile"
        requestFullScreen={requestFullScreen}
        exitFullScreen={exitFullScreen}
      />
    );
  } else {
    if (existence === undefined) {
      return <MobileError />;
    } else {
      return <MobileNotFound isAdmin={isAdmin} />;
    }
  }
}
