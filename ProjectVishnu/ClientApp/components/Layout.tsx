import React from 'react';
import NavMenu from './NavMenu';

export default function Layout({ children }: {children:React.ReactNode}) {
    return (
      <div className='h-full w-full'>
        <NavMenu />
        <div className='m-5'>
          {children}
        </div>
      </div>
    );
}
