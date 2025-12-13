import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate, } from 'react-router';
import useAuth from '../../../Hooks/useAuth';
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser, updateUserProfile } = useAuth()
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const handleRegister = (data) => {
        const profileImg = data.photo[0];

        registerUser(data.email, data.password)
            .then(() => {

                // Store image in FormData
                const formData = new FormData()
                formData.append('image', profileImg)

                // send the photo to store and get the url from ImgBB
                const image_URL_API = `https://api.imgbb.com/1/upload?key=
                ${import.meta.env.VITE_image_host}`

                axios.post(image_URL_API, formData)
                    .then(res => {
                        const photoURL = res.data.data.url;

                        // Create user in the database
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


                        // Update user Profile to firebase
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
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl p-5">
            <h2 className='text-3xl text-center font-bold'>Create Your Account</h2>
            <form onSubmit={handleSubmit(handleRegister)}>
                <fieldset className="fieldset">

                    {/* Name */}
                    <label className="label">Name</label>
                    <input type="text" {...register('name', { required: true })} className="input" placeholder="Your Name" />
                    {errors.name?.type === 'required' && <p className='text-red-500'>Name Is Required</p>}

                    {/* Photo */}
                    <label className="label">Name</label>
                    <input type="file" {...register('photo', { required: true })} className="file-input" placeholder="Your Photo" />
                    {errors.photo?.type === 'required' && <p className='text-red-500'>Photo Is Required</p>}

                    {/* Email */}
                    <label className="label">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
                    {errors.email?.type === 'required' && <p className='text-red-500'>Email Is Required</p>}

                    {/* Password  */}
                    <label className="label">Password</label>
                    <input type="password" {...register('password', {
                        required: true,
                        minLength: 6,
                        pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$/

                    })} className="input" placeholder="Password" />
                    {
                        errors.password?.type === 'required' && <p className='text-red-500'>Password is Required</p>
                    }
                    {
                        errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 characters or longer</p>
                    }
                    {
                        errors.password?.type === 'pattern' && <p className='text-red-500'>Password must have at least 8 characters, at least one uppercase, one lowercase, one digit, one special character </p>
                    }

                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Register</button>
                </fieldset>

                <p>Already have an account?
                    <Link state={location.state} to={'/login'} className='text-red-500'>Login</Link></p>
            </form>
            <SocialLogin></SocialLogin>

        </div>
    );
};

export default Register;