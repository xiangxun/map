// import Image from "next/image";
import React, { useRef, useState } from "react";
import { Table, Divider, Button, Image } from "antd";
import type { ColumnsType } from "antd/es/table";
import { saveAs } from "file-saver";
// import { park, parkImage } from "@/assets";
import park from "public/images/park.png";
import { A, B, C, logo, parkImage } from "@/assets";
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
  //  image1 = image ? image : parkImage;
  // const { gl, scene, camera } = useThree();
  const handleSaveImage = () => {
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL("image/png");
      setImage(dataUrl);
      // saveAs(dataUrl, "image.png");
    }
  };
  return (
    <div className='p-2 bg-white'>
      {/* <div className='p-1 text-lg font-bold'>方案</div> */}
      <Image
        src={image ? image : "/images/park.png"}
        alt={"save image"}
        width={250}
        height={200}
      />
      <div className='min-w-full p-1 bg-white rounded-lg w-60  md:min-w-0'>
        <div className='p-2 text-sm font-bold'>总体技术指标</div>
        <Table
          showHeader={false}
          columns={columns}
          dataSource={data}
          // size="middle"
          size='small'
          pagination={{ hideOnSinglePage: true }}
        />
      </div>
      {/* <div>
        <Image src='/images/park.png' alt='Logo' width={80} height={80} />
      </div> */}
      <Button
        block
        type='primary'
        className='font-bold text-white bg-blue-500 hover:bg-blue-700 '
        onClick={handleSaveImage}
      >
        保存方案
      </Button>
    </div>
  );
};

export default Solution;
