import { Button } from "antd";
import { PlacesAPI } from "../../../adaptors/places.api";
import { Place } from "../../../entities";
import { PlacesService } from "../../../interactors/places.service";
import { data1, data2, data3, data4, data5 } from "../../mock-data";

interface CreateMockDataButtonProps {
  type: "desktop" | "mobile";
  callback?: () => void;
}

const placesService = new PlacesService(new PlacesAPI());

const setWorshipPlace = async (
  places: Place[],
  row: string,
  col: number,
  date: string,
  title: string,
  description?: string,
  callback?: () => void
) => {
  await placesService.setWorshipPlace(
    places,
    row,
    col,
    date,
    title,
    description,
    callback
  );
};

export default function CreateMockDataButton({
  type,
  callback,
}: CreateMockDataButtonProps) {
  const createMockData = () => {
    setWorshipPlace(
      data1.places,
      data1.row,
      data1.col,
      data1.date,
      data1.title,
      data1.description,
      callback
    );
    setWorshipPlace(
      data2.places,
      data2.row,
      data2.col,
      data2.date,
      data2.title,
      data2.description,
      callback
    );
    setWorshipPlace(
      data3.places,
      data3.row,
      data3.col,
      data3.date,
      data3.title,
      data3.description,
      callback
    );
    setWorshipPlace(
      data4.places,
      data4.row,
      data4.col,
      data4.date,
      data4.title,
      data4.description,
      callback
    );
    setWorshipPlace(
      data5.places,
      data5.row,
      data5.col,
      data5.date,
      data5.title,
      data5.description,
      callback
    );
  };

  if (
    String(process.env.REACT_APP_USE_CREATE_MOCKUP) === "true" ||
    String(process.env.REACT_APP_USE_CREATE_MOCKUP) === "false"
  ) {
    if (JSON.parse(String(process.env.REACT_APP_USE_CREATE_MOCKUP))) {
      return (
        <Button
          className={
            type === "desktop" ? "create-button" : "mobile-create-button"
          }
          onClick={() => createMockData()}
        >
          create mock data
        </Button>
      );
    } else {
      return null;
    }
  } else {
    return null;
  }
}
