import { Button, Divider, Tooltip } from "antd";
import Table, { ColumnsType, TableProps } from "antd/lib/table";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { WorshipPlace, WorshipPlaceTableColumns } from "../../../entities";
import { useGetWorshipPlaceList } from "../../../interactors/places.service";
import { CreateMockDataButton } from "../../components/CreateMockDataButton";
import { DisplayButton } from "../../components/DisplayButton/DisplayButton";
import { PlacesDeleteModal } from "../../components/PlacesDeleteModal";
import { getWorshipPlaceData } from "../../utils";
import "./DesktopPlaces.scss";

export default function DesktopPlaces() {
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
      title: "전체 좌석",
      dataIndex: "entireCount",
      key: "entireCount",
      onCell: (record) => {
        return {
          onClick: () => {
            navigateToDetail(record.id);
          },
        };
      },
    },
    {
      title: "예약 좌석",
      dataIndex: "reservedCount",
      key: "reservedCount",
      onCell: (record) => {
        return {
          onClick: () => {
            navigateToDetail(record.id);
          },
        };
      },
    },
    {
      title: "빈 좌석",
      dataIndex: "emptyCount",
      key: "emptyCount",
      onCell: (record) => {
        return {
          onClick: () => {
            navigateToDetail(record.id);
          },
        };
      },
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
      title: "생성일",
      dataIndex: "createdAt",
      key: "createdAt",
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
      render: (value: Date) => (
        <Tooltip title={value.toLocaleString()}>
          {value.toLocaleDateString()}
        </Tooltip>
      ),
    },
    {
      title: "최종 수정일",
      dataIndex: "updatedAt",
      key: "updatedAt",
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
      render: (value: Date) => (
        <Tooltip title={value.toLocaleString()}>
          {value.toLocaleDateString()}
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
    <div className="desktop-places">
      <div className="desktop-places___header">
        <div className="desktop-places___header___left">
          <div className="page-title">관리</div>
          <div className="desktop-places___header___left___title">
            유스예배 목록
          </div>
          <div className="desktop-places___header___left___description">
            이곳에서 유스예배 자리를 관리하실 수 있습니다.
          </div>
        </div>
        <div className="desktop-places___header___right">
          <CreateMockDataButton type="desktop" callback={refetch} />
          <Button
            className="create-button"
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
            isMobile={false}
            refetch={refetch}
          />
        </div>
      </div>
      <Divider />
      <div className="desktop-places___body">
        <Table
          {...tableProps}
          pagination={{ position: ["bottomCenter"] }}
          columns={columns}
          dataSource={data.length !== 0 ? data : []}
          rowClassName={(record) => (record.isDisplay ? "isDisplayRow" : "")}
        />
      </div>
    </div>
  );
}
