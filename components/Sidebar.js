import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'

const  Sidebar = () => {
    //routing de next
    const router = useRouter();
  return (
    <aside className='bg-white sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5 shadow-lg shadow-gray-300 '>
      <div className='p-2'>
          <img className='w-auto h-16' src="https://static.tokkobroker.com/static/img/logotokko.svg?20211220192937"/>
      </div>
      <nav className="mt-5 list-none">
          <li className={router.pathname === "/" ? "bg-gray-200 p-2" : "p-2"}>
            <Link href="/">
              <a className='text-gray-500 flex justify-start items-center text-1xl'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 mx-1 leading-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
                  BROKERS
              </a>
            </Link>
          </li>
          <li className={router.pathname === "/propiedades" ? "bg-gray-200 p-2" : "p-2"}>
            <Link href="/propiedades">
              <a className='text-gray-500 flex justify-start items-center text-1xl'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 mx-1 leading-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  PROPIEDADES
              </a>
            </Link>
          </li>
      </nav>
    </aside>
  )
}
export default Sidebar;