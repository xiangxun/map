import Image from "next/image";
import React, { useRef, useState } from "react";
import { Table, Divider, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { saveAs } from "file-saver";

interface DataType {
  key: React.Key;
  name: string;
  value: number;
}
interface SolutionProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
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
    key: "4",
    name: "建筑密度(%)",
    value: 32,
  },
];

const Solution: React.FC<SolutionProps> = ({ canvasRef }) => {
  const [image, setImage] = useState<string | undefined>(undefined);
  // const { gl, scene, camera } = useThree();
  const handleSaveImage = () => {
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL("image/png");
      setImage(dataUrl);
      // saveAs(dataUrl, "image.png");
    }
  };
  return (
    <div className="px-2 py-2 bg-white rounded-lg shadow-md">
      <div className="px-1 py-2 text-xl font-bold">方案</div>
      <Image src={image} alt={"save image"} width={250} height={150} />
      <div className="min-w-full p-4 bg-white rounded-lg w-60 opacity-90 md:min-w-0">
        <div className="px-1 py-2 text-base font-bold">总体技术指标</div>
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
      <Button
        block
        type="primary"
        className="font-bold text-white bg-blue-500 hover:bg-blue-700 "
        // onClick={() => submit({ onResultChange: setResult })}
        onClick={handleSaveImage}
      >
        保存方案
      </Button>
      {/* <button onClick={handleSaveImage}>Save Image</button> */}
    </div>
  );
};

export default Solution;
