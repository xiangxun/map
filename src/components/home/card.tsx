import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

type CardProps = {
  data: {
    image1: StaticImageData;
    image2: StaticImageData;
    link: string;
    title: string;
    description: string;
  };
};

const Card: React.FC<CardProps> = ({ data }) => {
  const { image1, image2, link, title, description } = data;
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e: any) => {
    setSliderPosition(e.target.value);
  };
  return (
    <div className='max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl'>
      <div className='md:flex'>
        <div className='md:flex-shrink-0'>
          <div className='md:w-[400px] h-auto'>
            <div className='relative w-full'>
              <Image
                className='w-full h-auto'
                src={image2}
                alt='After'
                property='true'
              />
              <div
                className='absolute top-0 left-0 right-0 bottom-0 '
                style={{ clipPath: `inset(0% ${100 - sliderPosition}% 0% 0%)` }}
              >
                <Image
                  className='w-full h-auto'
                  src={image1}
                  alt='Before'
                  property='true'
                />
              </div>
              <input
                type='range'
                min='0'
                max='100'
                value={sliderPosition}
                onChange={handleSliderChange}
                className='absolute top-0 left-0 w-full h-full z-10 opacity-0 cursor-pointer '
              />
            </div>
          </div>
        </div>
        <div className='p-8 relative'>
          <div className='uppercase tracking-wide text-lg text-indigo-500 font-semibold'>
            {title}
          </div>
          <p className='mt-2 text-gray-500 text-sm'>{description}</p>
          <div className='md:absolute bottom-4'>
            <Link href={link}>
              <button className='mt-4 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded'>
                Enter
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
