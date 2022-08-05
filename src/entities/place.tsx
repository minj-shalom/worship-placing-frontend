export interface Place {
  row: string;
  col: number;
  status: string;
  name?: string;
  cell?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorshipPlace {
  id: string;
  count: number;
  places: Place[];
  row: string;
  col: number;
  date: string;
  title: string;
  description?: string;
  isDisplay: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WorshipPlaceList {
  count: number;
  worshipPlaces: WorshipPlace[];
  createdAt: string;
  updatedAt: string;
}

export interface WorshipPlaceTableColumns {
  key: number;
  id: string;
  date: string;
  status: string;
  entireCount: number;
  reservedCount: number;
  emptyCount: number;
  title: string;
  isDisplay: boolean;
  createdAt: Date;
  updatedAt: Date;
}
