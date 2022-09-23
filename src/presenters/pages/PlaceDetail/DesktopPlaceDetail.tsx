import { useCheckId } from "../../../interactors/places.service";
import { DesktopError } from "../Error";
import { DesktopLoading } from "../Loading";
import { DesktopNotFound } from "../NotFound";
import PlaceDetail from "./components/PlaceDetail";
import "./DesktopPlaceDetail.scss";

interface DesktopPlaceDetailProps {
  isAdmin: boolean;
  isFullScreen: boolean;
  requestFullScreen: () => void;
  exitFullScreen: () => void;
}

export default function DesktopPlaceDetail({
  isAdmin,
  isFullScreen,
  requestFullScreen,
  exitFullScreen,
}: DesktopPlaceDetailProps) {
  const id = window.location.pathname.substring(7);

  return (
    <PlaceDetail
      isAdmin={isAdmin}
      id={id}
      isFullScreen={isFullScreen}
      userAgent="desktop"
      requestFullScreen={requestFullScreen}
      exitFullScreen={exitFullScreen}
    />
  );
}
