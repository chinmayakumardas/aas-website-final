import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';
const More = () => {
  const navigationItems = [
      { name: 'About us', path: '/about-us' },
      { name: 'Career', path: '/career' },
      { name: 'Contact us', path: '/contact' },
      
  ];
  const router = useRouter();

  const handleClick = () => {
    router.push('/about-us');
  };
  return (
    <div className=" p-4 w-[100vw] flex justify-around">
      <div className="col-span-1 flex flex-col gap-4 w-[40%]">
        <h2 className="text-3xl font-bold mb-4">Explore More</h2>
        <p className="text-gray-700 mb-6">
          Asking the better questions that unlock <br /> new answers to the working
          world's most complex issues.
        </p>
        <span>
        <button 
      className="bg-[#AF9A57] text-white py-2 px-4 rounded-lg  mt-0" 
      onClick={handleClick}
    >
      Who We Are
    </button>
        </span>
      </div>
      <div className="col-span-1  w-[30%] flex flex-wrap">
        {navigationItems.map((item, index) => (
          <div className='w-full' key={index}>
               <Link href={item.path}>
                    <div href={item.path} className='px-5  border-l-4 border-transparent hover:border-l-[#000] dark:hover:border-l-[#fff] transition-colors duration-300  hover:bg-[#ced4da] cursor-pointer  p-1'>
                    {item.name}
                    </div>
            </Link>
            
          </div>
        ))}
      </div>
   

    </div>
  );
};

export default More;