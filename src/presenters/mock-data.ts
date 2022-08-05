import moment from "moment";
import createPlaces from "./utils/createPlaces";

function getDay(week: number) {
  let dayValue = moment();
  const today = moment().day();

  if (today !== 0) {
    dayValue = moment().add(7 - today, "days");
  }

  return dayValue.add(7 * (week - 3), "days").format("YYYY-MM-DD");
}

export const data1 = {
  places: createPlaces(4, 2),
  row: "D",
  col: 4,
  date: getDay(1),
  title: "1st Worship",
  description: undefined,
};

export const data2 = {
  places: createPlaces(5, 3),
  row: "E",
  col: 6,
  date: getDay(2),
  title: "2nd Worship",
  description: undefined,
};

export const data3 = {
  places: createPlaces(6, 4),
  row: "F",
  col: 8,
  date: getDay(3),
  title: "3rd Worship",
  description: undefined,
};

export const data4 = {
  places: createPlaces(7, 4),
  row: "G",
  col: 8,
  date: getDay(4),
  title: "4th Worship",
  description: undefined,
};

export const data5 = {
  places: createPlaces(8, 4),
  row: "H",
  col: 8,
  date: getDay(5),
  title: "5th Worship",
  description: undefined,
};
