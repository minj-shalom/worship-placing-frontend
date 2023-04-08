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

  return (
    <PlaceDetail
      isAdmin={isAdmin}
      id={id}
      isFullScreen={isFullScreen}
      userAgent="mobile"
      requestFullScreen={requestFullScreen}
      exitFullScreen={exitFullScreen}
    />
  );
}
