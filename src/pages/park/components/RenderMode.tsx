import React from "react";
import { useState } from "react";

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className='border-b border-gray-200'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='border-b border-gray-200'>
          <div className='grid grid-cols-3 gap-4 py-4'>
            {children.map((child, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`${
                  index === activeTab
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                {child.props.label}
              </button>
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

const RenderMode = () => {
  return (
    <div>
      <Tabs>
        <Tab label='Tab 1'>
          <p>Content for Tab 1 goes here.</p>
        </Tab>
        <Tab label='Tab 2'>
          <p>Content for Tab 2 goes here.</p>
        </Tab>
        <Tab label='Tab 3'>
          <p>Content for Tab 3 goes here.</p>
        </Tab>
      </Tabs>
    </div>
  );
};

export default RenderMode;
