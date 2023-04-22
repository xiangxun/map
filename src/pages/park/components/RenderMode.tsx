import Image from "next/image";
import React from "react";
import { useState } from "react";

import { A, B, C, logo } from "@/assets";
import { Switch } from "antd";

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className='border-b border-gray-200'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='border-b border-gray-200'>
          <div className='grid grid-cols-3 gap-4 py-4'>
            {children.map((child, index) => (
              <div key={index}>
                <Image
                  // src={child.props.label}
                  src={child.props.label}
                  alt='Logo'
                  width={100}
                  height={100}
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`${
                    index === activeTab
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                ></Image>
                {/* {child.props.label} */}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {children[activeTab]}
      </div>
    </div>
  );
};

const Tab = ({ children, label }) => {
  return <div label={label}>{children}</div>;
};

const onChange = (checked: boolean) => {
  console.log(`switch to ${checked}`);
};

const RenderMode = () => {
  return (
    <div>
      <Tabs>
        {/* <div>
          <Image src={logo} alt='Logo' />
        </div>
        <div>
          <Image src={logo} alt='Logo' />
        </div> */}
        <Tab label={A}>
          <div>
            <Image src={A} alt='A' sizes='10' />
          </div>
          <p>白模</p>
          <p>Content for Tab 1 goes here.</p>
        </Tab>
        <Tab label={B}>
          <div>
            <Image src={B} alt='A' sizes='10' />
          </div>
          <p>分析图</p>
          <p>Content for Tab 2 goes here.</p>
        </Tab>
        <Tab label={C}>
          <div>
            <Image src={C} alt='A' sizes='10' />
          </div>
          <p>语义分割图</p>
          <p>Content for Tab 3 goes here.</p>
        </Tab>
      </Tabs>
      <div className=' p-4 flex flex-row'>
        <Image src={logo} alt='Logo' width={80} height={80} />
        <div className='p-2'>
          <p>AO效果</p>
          <Switch defaultChecked onChange={onChange} />
        </div>
      </div>
    </div>
  );
};

export default RenderMode;
