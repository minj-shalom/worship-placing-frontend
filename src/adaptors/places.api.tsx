import { AxiosInstance, AxiosRequestConfig } from "axios";
import { Place, WorshipPlace } from "../entities";
import AxiosAPIAdapter from "./instance/axios";

export class PlacesAPI {
  protected instance: AxiosAPIAdapter;

  constructor(
    advancedOption?: AxiosRequestConfig,
    extendSessionSetup?: (session: AxiosInstance) => void
  ) {
    this.instance = new AxiosAPIAdapter(
      {
        baseURL: `${process.env.REACT_APP_REST_API_PROTOCOL}://${process.env.REACT_APP_REST_API_URL}/api`,
        ...advancedOption,
      },
      extendSessionSetup
    );
  }

  async info() {
    const result = await this.instance.get<{
      version: string;
    }>(`/info`);

    return result.data;
  }

  async getWorshipPlaceList() {
    const result = await this.instance.get<{
      count: number;
      worshipPlaces: WorshipPlace[];
    }>(`/worship-place`);

    return result.data;
  }

  async getWorshipPlace(id: string) {
    const result = await this.instance.get<WorshipPlace>(
      `/worship-place/${id}`
    );

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
    const result = await this.instance.post<WorshipPlace>(`/worship-place`, {
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
    const result = await this.instance.delete(`/worship-place`);
    return result.data;
  }

  async deleteWorshipPlace(id: string) {
    const result = await this.instance.delete<{
      id: string;
    }>(`/worship-place/${id}`);
    return result.data;
  }

  async checkId(id: string) {
    const result = await this.instance.get<{
      result: boolean;
    }>(`/check-id/${id}`);
    return result.data;
  }

  async setPlace(
    id: string,
    row: string,
    col: number,
    name: string,
    cell: string
  ) {
    const result = await this.instance.post<Place>(`/place/${id}`, {
      id,
      row,
      col,
      name,
      cell,
    });

    return result.data;
  }

  async deletePlace(id: string, row: string, col: number) {
    const result = await this.instance.put<Place>(`/place/${id}`, {
      id,
      row,
      col,
    });

    return result.data;
  }

  async getDisplay() {
    const result = await this.instance.get<WorshipPlace>(`/display`);

    return result.data;
  }

  async setDisplay(id: string, afterIsDisplay: boolean) {
    const result = await this.instance.put<{
      id: string;
      afterIsDisplay: boolean;
    }>(`/display`, {
      id,
      afterIsDisplay,
    });
    return result.data;
  }
}
