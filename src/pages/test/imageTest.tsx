import Image from "next/image";
import { useState } from "react";
import { type1, type2 } from "@/assets";
const ImageSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e) => {
    setSliderPosition(e.target.value);
  };
  return (
    <div className='relative w-full'>
      <Image className='w-full h-auto' src={type2} alt='After' />
      <div
        className='absolute top-0 left-0 right-0 bottom-0 '
        style={{ clipPath: `inset(0% ${100 - sliderPosition}% 0% 0%)` }}
      >
        <Image className='w-full h-auto' src={type1} alt='Before' />
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
  );
};
export default ImageSlider;
