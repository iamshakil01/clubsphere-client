import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const CreateEvent = ({ clubId }) => {
    const axiosSecure = useAxiosSecure();
    const [type, setType] = useState('free');
    console.log(type, setType)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm();

    const watchType = watch('type', 'free');

    const onSubmit = async (data) => {
        try {
            const payload = {
                clubId,
                title: data.title,
                date: data.date,
                location: data.location,
                description: data.description,
                price: data.type === 'paid' ? Number(data.amount) : 0,
            };

            console.log("Sending payload:", payload);

            const res = await axiosSecure.post('/events', payload);
            console.log('Event created:', res.data);

            Swal.fire({
                icon: 'success',
                title: 'Event Created',
                text: 'Your event has been created successfully.',
                confirmButtonText: 'OK',
            });
        } catch (err) {
            console.error('Failed to create event', err);

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to create event. Please try again.',
                confirmButtonText: 'OK',
            });
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 shadow-md bg-white rounded">
            <h2 className="text-2xl font-semibold mb-4">Create Event</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Title */}
                <div>
                    <label className="block font-medium mb-1">Event Title</label>
                    <input
                        type="text"
                        className="w-full border px-3 py-2 rounded"
                        {...register('title', { required: 'Title is required' })}
                    />
                    {errors.title && (
                        <p className="text-red-600 text-sm mt-1">
                            {errors.title.message}
                        </p>
                    )}
                </div>

                {/* Date */}
                <div>
                    <label className="block font-medium mb-1">Date</label>
                    <input
                        type="date"
                        className="w-full border px-3 py-2 rounded"
                        {...register('date', { required: 'Date is required' })}
                    />
                    {errors.date && (
                        <p className="text-red-600 text-sm mt-1">
                            {errors.date.message}
                        </p>
                    )}
                </div>

                {/* Location */}
                <div>
                    <label className="block font-medium mb-1">Location</label>
                    <input
                        type="text"
                        className="w-full border px-3 py-2 rounded"
                        {...register('location', { required: 'Location is required' })}
                    />
                    {errors.location && (
                        <p className="text-red-600 text-sm mt-1">
                            {errors.location.message}
                        </p>
                    )}
                </div>

                {/* Description */}
                <div>
                    <label className="block font-medium mb-1">Description</label>
                    <textarea
                        className="w-full border px-3 py-2 rounded"
                        rows={4}
                        {...register('description')}
                    />
                </div>

                {/* Free / Paid */}
                <div>
                    <label className="block font-medium mb-1">Type</label>
                    <div className="flex gap-4 items-center">
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                value="free"
                                {...register('type')}
                                defaultChecked
                            />
                            <span>Free</span>
                        </label>

                        <label className="flex items-center space-x-2">
                            <input type="radio" value="paid" {...register('type')} />
                            <span>Paid</span>
                        </label>
                    </div>
                </div>

                {watchType === 'paid' && (
                    <div>
                        <label className="block font-medium mb-1">Amount</label>
                        <input
                            type="number"
                            min="0"
                            className="w-full border px-3 py-2 rounded"
                            {...register('amount', {
                                required: 'Amount is required when paid',
                                min: {
                                    value: 1,
                                    message: 'Amount must be at least 1',
                                },
                            })}
                        />
                        {errors.amount && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.amount.message}
                            </p>
                        )}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {isSubmitting ? 'Creating...' : 'Create Event'}
                </button>
            </form>
        </div>
    );
};

export default CreateEvent;
