import React from "react";
import { Table, Divider } from "antd";
import type { ColumnsType } from "antd/es/table";

interface DataType {
  key: React.Key;
  name: string;
  value: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: "",
    dataIndex: "name",
  },
  {
    title: "",
    dataIndex: "value",
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "用地面积(m2)",
    value: 52365,
  },
  {
    key: "2",
    name: "容积率",
    value: 3,
  },
  {
    key: "3",
    name: "建筑面积(m2)",
    value: 45522,
  },
  {
    key: "3",
    name: "建筑密度(%)",
    value: 32,
  },
];

const IndexTable: React.FC = () => (
  <div className="min-w-full p-4 bg-white rounded-lg w-60 opacity-90 md:min-w-0">
    <div className="px-1 py-2 text-xl font-bold">总体技术指标</div>
    {/* <Divider /> */}
    <Table
      showHeader={false}
      columns={columns}
      dataSource={data}
      // size="middle"
      size="small"
      pagination={{ hideOnSinglePage: true }}
    />
  </div>
);

export default IndexTable;
