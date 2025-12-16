import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate, } from 'react-router';
import useAuth from '../../../Hooks/useAuth';
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const Register = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const { registerUser, updateUserProfile } = useAuth()
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const handleRegister = (data) => {
        const profileImg = data.photo[0];

        registerUser(data.email, data.password)
            .then(() => {

                const formData = new FormData()
                formData.append('image', profileImg)

                const image_URL_API = `https://api.imgbb.com/1/upload?key=
                ${import.meta.env.VITE_image_host}`

                axios.post(image_URL_API, formData)
                    .then(res => {
                        const photoURL = res.data.data.url;

                        const userInfo = {
                            email: data.email,
                            displayName: data.name,
                            photoURL: photoURL,
                            role: "member"
                        }
                        axiosSecure.post('/users', userInfo)
                            .then((res) => {
                                if (res.data.insertedId) {
                                    console.log('user created in the database');
                                }
                            })

                        const userprofile = {
                            displayName: data.name,
                            photoURL: photoURL
                        }
                        updateUserProfile(userprofile)
                            .then((res) => {
                                console.log('user Profile updated done', res)
                                navigate(location?.state || '/');
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    })
            })
    }

    return (
        <div className="flex justify-center items-center">

            <div className="bg-white w-full mx-auto max-w-sm shrink-0 rounded-2xl shadow-2xl p-8 transform transition-all duration-500 hover:shadow-3xl">

                <h2 className='text-3xl text-center font-extrabold text-gray-800 tracking-tight'>Create Your Account</h2>

                <form onSubmit={handleSubmit(handleRegister)} className="mt-8 space-y-4">

                    <fieldset className="space-y-4">

                        <div>
                            <label className="label block text-sm font-medium text-gray-700 mb-1 ml-1">Name</label>
                            <input
                                type="text"
                                {...register('name', { required: true })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-400 transition duration-150"
                                placeholder="Your Name"
                            />
                            {errors.name?.type === 'required' && <p className='text-red-500 text-xs mt-1'>Name Is Required</p>}
                        </div>

                        <div>
                            <label className="label block text-sm font-medium text-gray-700 mb-1 ml-1">Photo</label>
                            <input
                                type="file"
                                {...register('photo', { required: true })}
                                className="file-input file-input-bordered file-input-info w-full text-gray-500 text-sm py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400"
                                placeholder="Your Photo"
                            />
                            {errors.photo?.type === 'required' && <p className='text-red-500 text-xs mt-1'>Photo Is Required</p>}
                        </div>

                        <div>
                            <label className="label block text-sm font-medium text-gray-700 mb-1 ml-1">Email</label>
                            <input
                                type="email"
                                {...register('email', { required: true })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-400 transition duration-150"
                                placeholder="Email"
                            />
                            {errors.email?.type === 'required' && <p className='text-red-500 text-xs mt-1'>Email Is Required</p>}
                        </div>

                        <div>
                            <label className="label block text-sm font-medium text-gray-700 mb-1 ml-1">Password</label>
                            <input
                                type="password"
                                {...register('password', {
                                    required: true,
                                    minLength: 6,
                                    pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$/
                                })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-400 transition duration-150"
                                placeholder="Password"
                            />

                            {errors.password?.type === 'required' && <p className='text-red-500 text-xs mt-1'>Password is Required</p>}
                            {errors.password?.type === 'minLength' && <p className='text-red-500 text-xs mt-1'>Password must be 6 characters or longer</p>}
                            {
                                errors.password?.type === 'pattern' && <p className='text-red-500 text-xs mt-1'>Password must have at least 8 characters, at least one uppercase, one lowercase, one digit, one special character </p>
                            }

                            <div className='text-left mt-1.5'>
                                <a className="link link-hover text-xs font-medium text-blue-500 hover:text-blue-600 transition duration-150">Forgot password?</a>
                            </div>
                        </div>

                        <button
                            className="w-full py-3 px-4 rounded-lg text-white font-bold mt-4 
                                       bg-gradient-to-r from-orange-500 to-blue-500 
                                       shadow-lg hover:shadow-xl transition duration-200 
                                       transform hover:scale-[1.005] active:scale-[0.99] disabled:opacity-70"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Registering...' : 'Register'}
                        </button>
                    </fieldset>

                    <p className='text-center text-sm text-gray-500 pt-4'>
                        Already have an account?
                        <Link state={location.state} to={'/login'} className='ml-1 font-medium text-blue-500 hover:text-blue-600 transition duration-150'>Login</Link>
                    </p>
                </form>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">
                            Or continue with
                        </span>
                    </div>
                </div>

                <SocialLogin></SocialLogin>

            </div>
        </div>
    );
};

export default Register;