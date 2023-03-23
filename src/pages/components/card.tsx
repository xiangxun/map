import Image from "next/image";
import Link from "next/link";

const Card = () => {
  return (
    <div className="grid grid-cols-2 gap-4 p-10">
      <div className="flex items-center p-10 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200">
        <Image
          src="/images/park1.png"
          alt="Picture of the author"
          width={500}
          height={500}
          className="w-2/3 rounded-lg shadow-md"
          priority // add this property if the image is above the fold
        />
        {/* <img src={image1} alt="image1" className="w-1/2" /> */}
        <div className="flex flex-col justify-center ml-4">
          <h2 className="text-lg font-bold">产业园区</h2>
          <p className="text-sm">
            Description 1 Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Odit rem est exercitationem eaque totam, culpa, dolor
            perferendis facilis commodi dolore labore. Dolores dolorum deleniti
            a alias recusandae ab, eaque nisi?
          </p>
          <button className="px-4 py-2 mt-4 text-white bg-blue-500 hover:bg-blue-700">
            <Link href="/upload">Enter</Link>
          </button>
        </div>
      </div>
      <div className="flex items-center p-10 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200">
        <Image
          src="/images/park1.png"
          alt="Picture of the author"
          width={500}
          height={500}
          className="w-2/3 rounded-lg shadow-md"
          priority // add this property if the image is above the fold
        />
        <div className="flex flex-col justify-center ml-4">
          <h2 className="text-lg font-bold">城市</h2>
          <p className="text-sm">
            Description 2 Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Odit rem est exercitationem eaque totam, culpa, dolor
            perferendis facilis commodi dolore labore. Dolores dolorum deleniti
            a alias recusandae ab, eaque nisi?
          </p>
          <button className="px-4 py-2 mt-4 text-white bg-blue-500 hover:bg-blue-700">
            <Link href="/city">Enter</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
