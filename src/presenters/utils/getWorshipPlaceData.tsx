import { WorshipPlace } from "../../entities";

export default function getWorshipPlaceData(worshipPlaceData: WorshipPlace) {
  const places = worshipPlaceData.places;
  const title = worshipPlaceData.title;
  const description = worshipPlaceData?.description;
  const entireCount =
    worshipPlaceData.count -
    worshipPlaceData.places.filter((value) => value.status === "deleted")
      .length;
  const reservedCount = worshipPlaceData.places.filter(
    (value) => value.status === "reserved"
  ).length;
  const emptyCount = worshipPlaceData.places.filter(
    (value) => value.status === "empty"
  ).length;
  const date = worshipPlaceData.date;

  const oneHour = 1000 * 60 * 60;
  const deadline =
    new Date(`${date}T05:00:00.000Z`).getTime() - new Date().getTime();
  var status;

  if (deadline >= 0) {
    status = "예배 전";
  } else if (deadline > -1 * oneHour) {
    status = "예배 중";
  } else {
    status = "예배 종료";
  }

  return {
    places,
    title,
    description,
    entireCount,
    reservedCount,
    emptyCount,
    date,
    status,
  };
}
