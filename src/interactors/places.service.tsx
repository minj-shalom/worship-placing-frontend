import { useQuery, UseQueryResult } from "react-query";
import { message } from "antd";
import { PlacesAPI } from "../adaptors/places.api";
import { Place, WorshipPlace } from "../entities";
import { useState } from "react";

export class PlacesService {
  constructor(private placesApi: PlacesAPI) {}

  async getWorshipPlaceList() {
    const result = await this.placesApi
      .getWorshipPlaceList()
      .then((response) => {
        return response.data;
      })
      .catch((e) => {
        if (e.response?.status) {
          if (e.response?.status >= 400) {
            message.error(e.response.data?.message);
          }
        }
        return undefined;
      });
    return result;
  }

  async getWorshipPlace(id: string) {
    const result = await this.placesApi
      .getWorshipPlace(id)
      .then((response) => {
        return response.data;
      })
      .catch((e) => {
        if (e.response?.status) {
          if (e.response?.status >= 400) {
            message.error(e.response.data?.message);
          }
        }
        return undefined;
      });
    return result;
  }

  async setWorshipPlace(
    places: Place[],
    row: string,
    col: number,
    date: string,
    title: string,
    description?: string,
    callback?: () => void
  ) {
    const result = await this.placesApi
      .setWorshipPlace(places, row, col, date, title, description)
      .then((response) => {
        if (callback) {
          callback();
        }
        return response.data;
      })
      .catch((e) => {
        if (e.response?.status) {
          if (e.response?.status >= 400) {
            message.error(e.response.data?.message);
          }
        }
        return undefined;
      });
    return result;
  }

  // TODO: Implement the deleteAllWorshipPlace function.

  async deleteWorshipPlace(id: string, callback: () => void) {
    const result = await this.placesApi
      .deleteWorshipPlace(id)
      .then((response) => {
        callback();
        return response.data;
      })
      .catch((e) => {
        if (e.response?.status) {
          if (e.response?.status >= 400) {
            message.error(e.response.data?.message);
          }
        }
        return e;
      });
    return result;
  }

  async deleteWorshipPlaceList(idList: string[], callback: () => void) {
    try {
      idList.forEach((item) => this.deleteWorshipPlace(item, callback));
      message.success("성공적으로 삭제하였습니다.");
    } catch (e: any) {
      message.error(e);
    }
  }

  async checkId(id: string) {
    const result = await this.placesApi
      .checkId(id)
      .then((response) => {
        return response.data;
      })
      .catch((e) => {
        if (e.response?.status) {
          if (e.response?.status >= 400) {
            message.error(e.response.data?.message);
          }
        }
        return undefined;
      });
    return result;
  }

  async setPlace(
    id: string,
    row: string,
    col: number,
    name: string,
    cell: string,
    callback?: () => void
  ) {
    const result = await this.placesApi
      .setPlace(String(id), row, col, name, cell)
      .then((response) => {
        if (callback) {
          callback();
        }
        message.success("성공적으로 편집하였습니다.");
        return response.data;
      })
      .catch((e) => {
        if (e.response?.status) {
          if (e.response?.status >= 400) {
            message.error(e.response.data?.message);
          }
        }
        return undefined;
      });
    return result;
  }

  async deletePlace(
    id: string,
    row: string,
    col: number,
    callback?: () => void
  ) {
    const result = await this.placesApi
      .deletePlace(String(id), row, col)
      .then((response) => {
        if (callback) {
          callback();
        }
        message.success("성공적으로 삭제하였습니다.");
        return response.data;
      })
      .catch((e) => {
        if (e.response?.status) {
          if (e.response?.status >= 400) {
            message.error(e.response.data?.message);
          }
        }
        return undefined;
      });
    return result;
  }

  async getDisplay() {
    const result = await this.placesApi
      .getDisplay()
      .then((response) => {
        return response.data;
      })
      .catch((e) => {
        if (e.response?.status) {
          if (e.response?.status >= 400) {
            message.error(e.response.data?.message);
          }
        }
        return undefined;
      });
    return result;
  }

  async setDisplay(id: string, afterIsDisplay: boolean, callback: () => void) {
    const result = await this.placesApi
      .setDisplay(String(id), afterIsDisplay)
      .then((response) => {
        if (response.data.afterIsDisplay) {
          message.success("성공적으로 지정하였습니다.");
        } else {
          message.success("성공적으로 지정 해제하였습니다.");
        }
        callback();
        return response;
      })
      .catch((e) => {
        if (e.response?.status) {
          if (e.response?.status >= 400) {
            message.error(e.response.data?.message);
          }
        }
        return undefined;
      });
    return result;
  }
}

export function useGetWorshipPlaceList(): UseQueryResult<
  {
    count: number;
    worshipPlaces: WorshipPlace[];
  },
  undefined
> {
  return useQuery("worshipPlaceList", () =>
    new PlacesService(new PlacesAPI()).getWorshipPlaceList()
  );
}

export function useGetWorshipPlace(
  id: string
): UseQueryResult<WorshipPlace, undefined> {
  return useQuery("worshipPlace", () =>
    new PlacesService(new PlacesAPI()).getWorshipPlace(id)
  );
}

export function useCheckId(id: string): UseQueryResult<boolean, undefined> {
  return useQuery("check-id", () =>
    new PlacesService(new PlacesAPI()).checkId(id)
  );
}

export function useGetDisplay(): UseQueryResult<WorshipPlace, undefined> {
  return useQuery(
    "display-worshipPlace",
    () => new PlacesService(new PlacesAPI()).getDisplay(),
    {
      refetchInterval: 5000,
    }
  );
}
