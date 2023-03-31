import Link from "next/link";

const Footer = () => {
  return (
    <footer className='bg-white text-gray-400'>
      <div className='container mx-auto px-4 py-6 flex justify-between items-center max-w-screen-xl sm:px-6 lg:px-8'>
        <p className='text-sm'>&copy; 2023 MAP. All Rights Reserved.</p>
        <ul className='flex space-x-4'>
          <li>
            <Link href='/about'>
              <div className='text-gray-400 hover:text-white'>关于我们</div>
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
