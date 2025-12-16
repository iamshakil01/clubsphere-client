import React from 'react';
import Logo from '../Components/Logo/Logo';
import { Outlet } from 'react-router';
import authImg from '../assets/Gemini_Generated_Image_86us9186us9186us.png';

const AuthLayout = () => {
    return (
        <div>
            <Logo></Logo>
            <div className='flex justify-center items-center my-30 border p-5'>
                <div className='flex-1 '>
                    <Outlet></Outlet>
                </div>
                <div className='flex-1'>
                    <img className='w-[600px] rounded-3xl' src={authImg} alt="" />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;