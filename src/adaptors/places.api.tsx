import axios from "axios";
import { Place, WorshipPlace, WorshipPlaceList } from "../entities";

const url = `http://localhost:${process.env.REACT_APP_ENDPOINT_PORT}`;

export class PlacesAPI {
  async getWorshipPlaceList() {
    const result = await axios.get<{
      worshipPlaceList: WorshipPlaceList;
    }>(`${url}/worship-place`);

    return result.data;
  }

  async getWorshipPlace(id: string) {
    const result = await axios.get<{
      worshipPlace: WorshipPlace | undefined;
    }>(`${url}/worship-place/${id}`);

    return result.data;
  }

  async setWorshipPlace(
    places: Place[],
    row: string,
    col: number,
    date: string,
    title: string,
    description?: string
  ) {
    const result = await axios.post<{
      worshipPlace: WorshipPlace;
    }>(`${url}/worship-place`, {
      places,
      row,
      col,
      date,
      title,
      description,
    });
    return result.data;
  }

  async deleteAllWorshipPlace() {
    const result = await axios.delete(`${url}/worship-place`);
    return result.data;
  }

  async deleteWorshipPlace(id: string) {
    const result = await axios.delete<{
      id: string;
    }>(`${url}/worship-place/${id}`);
    return result.data;
  }

  async checkId(id: string) {
    const result = await axios.get<{
      result: boolean;
    }>(`${url}/check-id/${id}`);
    return result.data;
  }

  async setPlace(
    id: string,
    row: string,
    col: number,
    name: string,
    cell: string
  ) {
    const result = await axios.post<{
      place: Place;
    }>(`${url}/place/${id}`, {
      id,
      row,
      col,
      name,
      cell,
    });

    return result.data;
  }

  async deletePlace(id: string, row: string, col: number) {
    const result = await axios.put<{
      place: Place;
    }>(`${url}/place/${id}`, {
      id,
      row,
      col,
    });

    return result.data;
  }

  async getDisplay() {
    const result = await axios.get<{
      worshipPlace: WorshipPlace | undefined;
    }>(`${url}/display`);

    return result.data;
  }

  async setDisplay(id: string, afterIsDisplay: boolean) {
    const result = await axios.put<{
      id: string;
      afterIsDisplay: boolean;
    }>(`${url}/display`, {
      id,
      afterIsDisplay,
    });
    return result.data;
  }
}
