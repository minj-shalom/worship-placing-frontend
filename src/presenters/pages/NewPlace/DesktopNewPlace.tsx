import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  Select,
  Steps,
  Switch,
} from "antd";
import { RangePickerProps } from "antd/lib/date-picker";
import moment from "moment";
import { useEffect, useState } from "react";
import { Place } from "../../../entities";
import DesktopDisplay from "../../components/Display/DesktopDisplay";
import { PlacesCreateModal } from "../../components/PlacesCreateModal";
import createPlaces from "../../utils/createPlaces";
import "./DesktopNewPlace.scss";

export default function DesktopNewPlace() {
  const { Step } = Steps;
  const { Option } = Select;
  const { TextArea } = Input;
  const [form] = Form.useForm();

  const [btnDisabled, setBtnDisabled] = useState(true);
  const [seatNumMode, setSeatNumMode] = useState(true);
  const [step, setStep] = useState(0);
  const [showDate, setShowDate] = useState("");
  const [showCount, setShowCount] = useState("");
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState();
  const [row, setRow] = useState<string>("");
  const [col, setCol] = useState<number>(0);
  const [places, setPlaces] = useState<Place[]>([]);

  const prev = () => {
    setStep(step - 1);
  };

  const next = () => {
    setStep(step + 1);
  };

  function getStep() {
    return (
      <Steps direction="vertical" current={step}>
        <Step
          title="예배 날짜 및 제목 설정"
          description={
            step !== 0 ? showDate : "예배 날짜 및 제목, 설명을 설정하세요."
          }
        />
        <Step
          title="예배 자리수 설정"
          description={step === 2 ? showCount : "예배 자리수를 설정하세요."}
        />
        <Step
          title="예배 자리 확인"
          description="생성된 예배 자리를 확인하세요."
        />
      </Steps>
    );
  }

  function useGetForm() {
    const peopleCountArray = [2, 3, 4];
    const lineCountArray = [4, 5, 6, 7, 8];
    const seatCountArray = peopleCountArray
      .map((people) => {
        return lineCountArray.map((line) => (line * 2 - 1) * people);
      })
      .reduce(function (acc, cur) {
        return acc.concat(cur);
      })
      .sort();

    const layout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 21 },
    };

    const disabledDate: RangePickerProps["disabledDate"] = (current) => {
      if (current <= moment().subtract(1, "day")) {
        return true;
      } else if (current.format("dddd") !== "Sunday") {
        return true;
      } else {
        return false;
      }
    };

    const onFirstChange = () => {
      const date = form.getFieldValue("date");
      const title = form.getFieldValue("title");
      if (date && title) {
        setBtnDisabled(false);
      } else {
        setBtnDisabled(true);
      }
    };

    const onFirstFinish = (value: any) => {
      setShowDate(value.date.format("YYYY년 M월 D일 주일"));
      setDate(value.date.format("YYYY-MM-DD"));
      setTitle(value.title);
      setDescription(value.description);
      next();
    };

    const onSecondChange = () => {
      if (!seatNumMode) {
        const peopleCount = form.getFieldValue("peopleCount");
        const lineCount = form.getFieldValue("lineCount");
        var seat: number | undefined;

        if (peopleCount && lineCount) {
          seat = Number(peopleCount) * (Number(lineCount) * 2 - 1);
          setBtnDisabled(false);
        } else {
          seat = undefined;
          setBtnDisabled(true);
        }

        if (seat) {
          form.setFieldsValue({ seatCount: seat });
        } else {
          form.setFieldsValue({ seatCount: "" });
        }
      } else {
        const seatCount = form.getFieldValue("seatCount");
        var people: number | undefined;
        var line: number | undefined;

        if (seatCount) {
          line = lineCountArray.filter((item) => {
            var peo = Number(seatCount) / (item * 2 - 1);
            if (peopleCountArray.includes(peo)) {
              return true;
            } else {
              return false;
            }
          })[0];
          people = Number(seatCount) / (Number(line) * 2 - 1);
          setBtnDisabled(false);
        } else {
          people = undefined;
          line = undefined;
          setBtnDisabled(true);
        }

        if (people) {
          form.setFieldsValue({ peopleCount: people });
        } else {
          form.setFieldsValue({ peopleCount: "" });
        }
        if (line) {
          form.setFieldsValue({ lineCount: line });
        } else {
          form.setFieldsValue({ lineCount: "" });
        }
      }
    };

    const onSecondFinish = (value: any) => {
      setRow(String.fromCharCode(64 + Number(value.lineCount)));
      setCol(Number(value.peopleCount) * 2);
      const count =
        Number(value.peopleCount) * (Number(value.lineCount) * 2 - 1);
      setShowCount(`총 ${count}자리`);

      const places = createPlaces(
        Number(value.lineCount),
        Number(value.peopleCount)
      );

      setPlaces(places);
      next();
    };

    const onChange = (checked: boolean) => {
      setSeatNumMode(checked);
    };

    const getPeopleOption = peopleCountArray.map((item, index) => {
      return <Option key={index} value={item}>{`${item}명`}</Option>;
    });

    const getLineOption = lineCountArray.map((item, index) => {
      return <Option key={index} value={item}>{`${item}줄`}</Option>;
    });

    const getSeatOption = seatCountArray.map((item, index) => {
      return <Option key={index} value={item}>{`${item}자리`}</Option>;
    });

    useEffect(() => {
      switch (step) {
        case 0:
          onFirstChange();
          break;
        case 1:
          onSecondChange();
          break;
        default:
          break;
      }
      // eslint-disable-next-line
    }, [step]);

    return (
      <>
        {step === 0 && (
          <Form
            {...layout}
            form={form}
            onFinish={(value) => onFirstFinish(value)}
          >
            <Form.Item
              name="date"
              label="날짜"
              rules={[
                {
                  type: "object" as const,
                  required: true,
                  message: "날짜를 지정해주세요.",
                },
              ]}
            >
              <DatePicker
                placeholder="날짜 선택"
                disabledDate={disabledDate}
                onChange={onFirstChange}
              />
            </Form.Item>
            <Form.Item
              name="title"
              label="제목"
              rules={[{ required: true, message: "제목을 입력해주세요." }]}
            >
              <Input
                placeholder="제목"
                showCount
                maxLength={32}
                onChange={onFirstChange}
              />
            </Form.Item>
            <Form.Item name="description" label="설명">
              <TextArea
                placeholder="설명"
                autoSize={{ minRows: 3, maxRows: 3 }}
                showCount
                maxLength={100}
              />
            </Form.Item>
            <div className="button-group">
              <a href="/admin">
                <Button>취소</Button>
              </a>
              <Button
                className="primary-button"
                type="primary"
                htmlType="submit"
                disabled={btnDisabled}
              >
                다음
              </Button>
            </div>
          </Form>
        )}
        {step === 1 && (
          <>
            <div className="seat-num-controll">
              <div className="seat-num-controll___text description">
                예배 자리수 직접 지정
              </div>
              <Switch
                className="seat-num-controll___switch"
                checked={seatNumMode}
                onChange={onChange}
              />
            </div>
            <Form
              form={form}
              layout="vertical"
              onFinish={(value) => onSecondFinish(value)}
            >
              <Form.Item
                name="peopleCount"
                label="의자 하나에 몇 명까지 앉을 수 있나요?"
                rules={[
                  {
                    required: true,
                    message: "의자 하나에 앉을 수 있는 인원수를 지정해주세요.",
                  },
                ]}
              >
                <Select
                  placeholder="의자 하나에 앉을 수 있는 인원수"
                  disabled={seatNumMode}
                  onChange={onSecondChange}
                  allowClear
                >
                  {getPeopleOption}
                </Select>
              </Form.Item>
              <Form.Item
                name="lineCount"
                label="앞뒤로 총 몇 줄까지 앉을 수 있나요?"
                rules={[
                  {
                    required: true,
                    message: "앞뒤로 앉을 수 있는 줄수를 지정해주세요.",
                  },
                ]}
              >
                <Select
                  placeholder="앞뒤로 앉을 수 있는 줄수"
                  disabled={seatNumMode}
                  onChange={onSecondChange}
                  allowClear
                >
                  {getLineOption}
                </Select>
              </Form.Item>
              <Form.Item
                name="seatCount"
                label="예배 자리수"
                rules={[
                  {
                    required: true,
                    message: "예배 자리수를 지정해주세요.",
                  },
                ]}
              >
                <Select
                  placeholder="예배 자리수"
                  disabled={!seatNumMode}
                  onChange={onSecondChange}
                  allowClear
                >
                  {getSeatOption}
                </Select>
              </Form.Item>
              <div className="button-group">
                <Button onClick={() => prev()}>이전</Button>
                <Button
                  className="primary-button"
                  type="primary"
                  htmlType="submit"
                  disabled={btnDisabled}
                >
                  다음
                </Button>
              </div>
            </Form>
          </>
        )}
        {step === 2 && (
          <>
            <DesktopDisplay places={places} />
            <div className="button-group" style={{ marginTop: "30px" }}>
              <Button onClick={() => prev()}>이전</Button>
              <PlacesCreateModal
                date={date}
                title={title}
                description={description}
                places={places}
                row={row}
                col={col}
                showCount={showCount}
              />
            </div>
          </>
        )}
      </>
    );
  }

  return (
    <div className="desktop-new-place">
      <div className="desktop-new-place___header">
        <div className="page-title">관리</div>
        <div className="desktop-new-place___header___title">
          유스예배 자리 생성
        </div>
        <div className="desktop-new-place___header___description">
          이곳에서 유스예배 자리를 생성하실 수 있습니다.
        </div>
      </div>
      <Divider />
      <div className="desktop-new-place___body">
        <div className="desktop-new-place___body___left">{getStep()}</div>
        <Divider
          className="desktop-new-place___body___divider"
          type="vertical"
        />
        <div
          className="desktop-new-place___body___right"
          style={{ width: step === 2 ? "1000px" : "500px" }}
        >
          {useGetForm()}
        </div>
      </div>
    </div>
  );
}
