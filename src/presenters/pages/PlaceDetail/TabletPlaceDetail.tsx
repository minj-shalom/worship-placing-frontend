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

  return (
    <PlaceDetail
      isAdmin={isAdmin}
      id={id}
      isFullScreen={isFullScreen}
      userAgent="tablet"
      requestFullScreen={requestFullScreen}
      exitFullScreen={exitFullScreen}
    />
  );
}
