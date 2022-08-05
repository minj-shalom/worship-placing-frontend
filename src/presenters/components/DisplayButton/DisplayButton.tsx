import { Button, Tooltip } from "antd";
import { PlacesAPI } from "../../../adaptors/places.api";
import { PlacesService } from "../../../interactors/places.service";

const placesService = new PlacesService(new PlacesAPI());

const setDisplay = async (
  id: string,
  afterIsDisplay: boolean,
  callback: () => void
) => {
  await placesService.setDisplay(id, afterIsDisplay, callback);
};

export const DisplayButton = (
  isDisplay: boolean,
  id: string,
  status: string,
  callback: () => void
) => {
  if (status === "예배 종료") {
    return (
      <Tooltip title={"종료된 예배는 디스플레이를 지정할 수 없습니다."}>
        <Button
          type={isDisplay ? "default" : "primary"}
          onClick={() => setDisplay(id, !isDisplay, callback)}
          disabled={status === "예배 종료"}
        >
          {isDisplay ? "디스플레이 지정 해제" : "디스플레이 지정"}
        </Button>
      </Tooltip>
    );
  } else {
    return (
      <Button
        type="primary"
        danger={isDisplay ? true : false}
        onClick={() => setDisplay(id, !isDisplay, callback)}
        disabled={status === "예배 종료"}
      >
        {isDisplay ? "디스플레이 지정 해제" : "디스플레이 지정"}
      </Button>
    );
  }
};
