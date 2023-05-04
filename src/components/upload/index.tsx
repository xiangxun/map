import { Button, Layout } from "antd";
import Link from "next/link";
import ThreeScene from "./components/ThreeScene";
import UploadModule from "./components/UploadModule";

const Upload = () => {
  // const [count, setCount] = useState(0)
  const { Header, Footer, Sider, Content } = Layout;
  const siderStyle = {
    textAlign: "center",
    lineHeight: "120px",
    color: "#3ba0e9",
    backgroundColor: "#fff",
  };
  return (
    <div className='UploadView'>
      <div className='grid h-screen grid-cols-3'>
        <div className='h-full col-span-2'>
          {/* <ShaderScene /> */}
          <ThreeScene />
        </div>
        <div className='flex items-center justify-center col-span-1'>
          <div className='flex flex-col items-center bg-white rounded-lg '>
            <div className='rounded-lg shadow-md h-84 md:h-48 lg:h-84 w-72 md:w-48 lg:w-72 '>
              <UploadModule />
            </div>
            <div className='flex items-center justify-center py-10'>
              <button className='px-12 py-4 mt-4 text-blue-700 bg-white rounded shadow-md hover:bg-blue-700 hover:text-white'>
                <Link href='/park'>Enter</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
