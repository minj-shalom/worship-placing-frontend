import { Button, Divider, Tooltip } from "antd";
import Table, { ColumnsType, TableProps } from "antd/lib/table";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { PlacesAPI } from "../../../adaptors/places.api";
import {
  Place,
  WorshipPlace,
  WorshipPlaceTableColumns,
} from "../../../entities";
import {
  PlacesService,
  useGetWorshipPlaceList,
} from "../../../interactors/places.service";
import { DisplayButton } from "../../components/DisplayButton/DisplayButton";
import { PlacesDeleteModal } from "../../components/PlacesDeleteModal";
import { data1, data2, data3, data4, data5 } from "../../mock-data";
import { getWorshipPlaceData } from "../../utils";
import "./TabletPlaces.scss";

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

export default function TabletPlaces() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [serverData, setServerData] = useState<WorshipPlace[]>();
  const hasSelected = selectedRowKeys.length > 0;

  const { data: result, refetch } = useGetWorshipPlaceList();
  const navigate = useNavigate();

  useEffect(() => {
    if (result && result?.worshipPlaces) {
      setServerData(result?.worshipPlaces);
    }
  }, [result]);

  const createMockData = () => {
    setWorshipPlace(
      data1.places,
      data1.row,
      data1.col,
      data1.date,
      data1.title,
      data1.description,
      refetch
    );
    setWorshipPlace(
      data2.places,
      data2.row,
      data2.col,
      data2.date,
      data2.title,
      data2.description,
      refetch
    );
    setWorshipPlace(
      data3.places,
      data3.row,
      data3.col,
      data3.date,
      data3.title,
      data3.description,
      refetch
    );
    setWorshipPlace(
      data4.places,
      data4.row,
      data4.col,
      data4.date,
      data4.title,
      data4.description,
      refetch
    );
    setWorshipPlace(
      data5.places,
      data5.row,
      data5.col,
      data5.date,
      data5.title,
      data5.description,
      refetch
    );
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const navigateToDetail = (id: string) => {
    navigate(`/admin/${id}`, { state: { id: id } });
  };

  const statusBadge = (status: string) => {
    switch (status) {
      case "예배 전":
        return <div className="status-badge todo">{status}</div>;
      case "예배 중":
        return <div className="status-badge in-progress">{status}</div>;
      default:
        return <div className="status-badge complete">{status}</div>;
    }
  };

  const columns: ColumnsType<WorshipPlaceTableColumns> = [
    {
      title: "예배일",
      dataIndex: "date",
      key: "date",
      // fixed: true,
      sorter: (a, b) =>
        moment(a.date, "YYYY-MM-DD").isBefore(moment(b.date, "YYYY-MM-DD"))
          ? -1
          : 1,
      onCell: (record) => {
        return {
          onClick: () => {
            navigateToDetail(record.id);
          },
        };
      },
      render: (value: string, record: WorshipPlaceTableColumns) => (
        <span>{value}</span>
      ),
    },
    {
      title: "상태",
      dataIndex: "status",
      key: "status",
      // fixed: true,
      filters: [
        {
          text: "예배 전",
          value: "예배 전",
        },
        {
          text: "예배 중",
          value: "예배 중",
        },
        {
          text: "예배 종료",
          value: "예배 종료",
        },
      ],
      onFilter: (value: any, record) => record.status.includes(value),
      onCell: (record) => {
        return {
          onClick: () => {
            navigateToDetail(record.id);
          },
        };
      },
      render: (value: string) => statusBadge(value),
    },
    {
      title: "제목",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
      onCell: (record) => {
        return {
          onClick: () => {
            navigateToDetail(record.id);
          },
        };
      },
      render: (value: string, record: WorshipPlaceTableColumns) => (
        <Tooltip title={value}>
          <span>{value}</span>
        </Tooltip>
      ),
    },
    {
      title: "액션",
      dataIndex: "isDisplay",
      key: "isDisplay",
      render: (value: boolean, record: WorshipPlaceTableColumns) =>
        DisplayButton(value, record.id, record.status, refetch),
    },
  ];

  const data: WorshipPlaceTableColumns[] = serverData
    ? serverData.map((item, index) => {
        const key: number = index;
        const id: string = item.id;
        const date: string = item.date;
        const { status, entireCount, reservedCount, emptyCount } =
          getWorshipPlaceData(item);
        const title: string = item.title;
        const isDisplay: boolean = item.isDisplay;
        const createdAt: Date = new Date(item.createdAt);
        const updatedAt: Date = new Date(item.updatedAt);

        return {
          key,
          id,
          date,
          status,
          entireCount,
          reservedCount,
          emptyCount,
          title,
          isDisplay,
          createdAt,
          updatedAt,
        };
      })
    : [];

  const tableProps: TableProps<WorshipPlaceTableColumns> = {
    className: "places-table",
    bordered: false,
    loading: false,
    size: "middle",
    showHeader: true,
    rowSelection: { selectedRowKeys, onChange: onSelectChange },
    tableLayout: "auto",
  };

  return (
    <div className="tablet-places">
      <div className="tablet-places___header">
        <div className="tablet-places___header___top">
          <div className="page-title">관리</div>
          <div className="tablet-places___header___top___title">
            유스예배 목록
          </div>
          <div className="tablet-places___header___top___description">
            이곳에서 유스예배 자리를 관리하실 수 있습니다.
          </div>
        </div>
        <div className="tablet-places___header___bottom">
          {process.env.REACT_APP_USE_CREATE_MOCKUP && (
            <Button
              className="mobile-create-button"
              onClick={() => createMockData()}
            >
              create mock data
            </Button>
          )}
          <Button
            className="mobile-create-button"
            onClick={() => (window.location.href = "/admin/new")}
            type="primary"
            ghost
          >
            유스예배 자리 생성
          </Button>

          <PlacesDeleteModal
            selectedRowKeys={selectedRowKeys}
            hasSelected={hasSelected}
            data={data}
            isMobile={true}
            refetch={refetch}
          />
        </div>
      </div>
      <Divider />
      <div className="tablet-places___body">
        <Table
          {...tableProps}
          pagination={{ position: ["bottomCenter"] }}
          columns={columns}
          dataSource={data.length !== 0 ? data : []}
          rowClassName={(record) => (record.isDisplay ? "isDisplayRow" : "")}
          scroll={{ x: "100vw" }}
        />
      </div>
    </div>
  );
}
