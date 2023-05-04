import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";

const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  multiple: true,
  action: "http://127.0.0.1:5000",
  // action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  beforeUpload(file) {
    // 假设 file 是一个 File 对象
    let isModel: boolean = true;
    let fileName: string = file.name; // 获取文件名
    let index: number = fileName.lastIndexOf("."); // 获取最后一个点号的位置
    let ext: string = fileName.substring(index + 1); // 截取点号后面的部分作为扩展名
    if (ext === "txt") {
      console.log("This is a glTF file.");
    } else if (ext === "glb") {
      console.log("This is a GLB file.");
    } else if (ext === "3dm") {
      console.log("This is a 3DM file.");
    } else {
      isModel = false;
      message.error(`${file.name} is not a model file`);
      console.log("Unknown file format.");
    }
    return isModel || Upload.LIST_IGNORE;
  },
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
  progress: {
    strokeColor: {
      "0%": "#108ee9",
      "100%": "#87d068",
    },
    strokeWidth: 3,
    format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
  },
};

const UploadModule: React.FC = () => (
  <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">点击或拖拽文件到这里上传</p>
    <p className="ant-upload-hint">上传3dm/gltf模型文件</p>
  </Dragger>
);

export default UploadModule;
