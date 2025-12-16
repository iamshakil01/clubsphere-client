import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import useAuth from '../../../Hooks/useAuth';


const Login = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    console.log('after login', data);
    signInUser(data.email, data.password)
      .then(res => {
        console.log(res);
        navigate(location?.state || '/');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="flex justify-center items-center">

      <div className="bg-white w-full mx-auto max-w-sm shrink-0 rounded-2xl shadow-2xl p-8 transform transition-all duration-500 hover:shadow-3xl">

        <h2 className='text-3xl text-center font-extrabold text-gray-800 tracking-tight'>Welcome Back</h2>
        <p className='text-sm text-center mt-2 text-gray-500'>Please Login to Continue</p>

        <form onSubmit={handleSubmit(handleLogin)} className="card-body p-0 mt-8 space-y-4">

          <fieldset className="space-y-4">

            <div>
              <label className="label block text-sm font-medium text-gray-700 mb-1 ml-1">Email</label>
              <input
                type="email"
                {...register('email', { required: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-400 transition duration-150"
                placeholder="Email"
              />
              {
                errors.email?.type === 'required' && <p className='text-red-500 text-xs mt-1'>Email Is Required</p>
              }
            </div>

            <div>
              <label className="label block text-sm font-medium text-gray-700 mb-1 ml-1">Password</label>
              <input
                type="password"
                {...register('password',
                  {
                    required: true,
                    minLength: 6
                  })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-400 transition duration-150"
                placeholder="Password"
              />
              {
                errors.password?.type === 'minLength' && <p className='text-red-500 text-xs mt-1'>Password must be 6 character or longer</p>
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
              Login
            </button>
          </fieldset>

          <p className='text-center text-sm text-gray-500 pt-4'>
            Are you new here?
            <Link state={location.state} to={'/register'} className='ml-1 font-medium text-blue-500 hover:text-blue-600 transition duration-150'> Register</Link>
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

        <SocialLogin />
      </div>
    </div>
  );
};

export default Login;