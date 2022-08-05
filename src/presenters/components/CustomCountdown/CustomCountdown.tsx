import Countdown from "antd/lib/statistic/Countdown";
import { useEffect, useState } from "react";

function CustomCountdown(target: string) {
  const [format, setFormat] = useState("HH:mm:ss");
  const oneDay = 1000 * 60 * 60 * 24;
  const oneHour = 1000 * 60 * 60;
  const oneMinute = 1000 * 60;

  const deadline =
    new Date(`${target}T05:00:00.000Z`).getTime() - new Date().getTime();

  const deadlineDate = deadline / oneDay;

  useEffect(() => {
    if (deadline < oneMinute / 6) {
      setFormat("s");
    } else if (deadline < oneMinute) {
      setFormat("ss");
    } else if (deadline < oneHour) {
      setFormat("mm:ss");
    }
  }, [deadline, oneHour, oneMinute]);

  if (deadlineDate >= 1) {
    return `D-${Math.floor(deadlineDate)}`;
  } else if (deadlineDate >= 0) {
    return (
      <Countdown
        value={Date.now() + deadline}
        valueStyle={{ fontSize: "18px", color: "#ffffff" }}
        format={format}
      />
    );
  } else if (deadline > -1 * oneHour) {
    return "예배 중";
  } else {
    return "예배 종료";
  }
}

export default CustomCountdown;
