import { Place } from "../../entities";

export default function createPlaces(lineCount: number, peopleCount: number) {
  const places: Place[] = [];
  let row, col, status;
  const koreaTimezone = 1000 * 60 * 60 * 9;
  const createdAt = new Date(Date.now() + koreaTimezone).toISOString();
  const updatedAt = new Date(Date.now() + koreaTimezone).toISOString();

  for (let i = 0; i < Number(lineCount); i += 1) {
    row = String.fromCharCode(65 + i);
    for (let j = 1; j <= Number(peopleCount) * 2; j += 1) {
      col = j;
      if (row === "A" && col > peopleCount) {
        status = "deleted";
      } else {
        status = "empty";
      }
      places.push({ row, col, status, createdAt, updatedAt });
    }
  }

  return places;
}
