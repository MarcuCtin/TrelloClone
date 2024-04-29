'use client';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut } from 'next-auth/react';
import React from 'react';

const LogoutButton = () => {
  return (
    <button
      onClick={() => signOut()}
      className='bg-gray-300 py-2 px-4 ml-2 inline-flex gap-2 justify-center align-center'
    >
      Logout
      <FontAwesomeIcon className=' mt-0.9 h-5' icon={faArrowRightFromBracket} />
    </button>
  );
};

export default LogoutButton;
