'use client';
import { signIn } from 'next-auth/react';
import React from 'react';

const LoginView = () => {
  return (
    <div className='w-full pt-8 text-center'>
      <button onClick={() => signIn('google')} className='primary'>
        Login
      </button>
    </div>
  );
};

export default LoginView;
