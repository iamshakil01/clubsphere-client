import React from 'react';
import { Link } from 'react-router';
import logoImg from '../../assets/images.jpeg'

const Logo = () => {
    return <div>
        <Link to={'/'}>
            <div className='flex items-center'>
                <img className='w-12 h-12' src={logoImg} alt="" />
                <h3 className='text-3xl font-bold -ms-2.5 ml-2'>ClubSphere</h3>
            </div>
        </Link>
    </div>
        ;
};

export default Logo;