import { useForm } from "react-hook-form";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";



const CreateClub = () => {
  const { register, handleSubmit, watch } = useForm();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [isPaid, setIsPaid] = useState(false);

  const image = watch("image");

  const createClubSubmit = (data) => {
    const clubData = {
      clubName: data.clubName,
      description: data.description,
      category: data.category,
      image: data.image,
      membershipFee: isPaid ? Number(data.membershipFee) : 0,
      createdBy: user?.email
    };
    console.log(clubData)

    axiosSecure.post("/clubs", clubData)
      .then(res => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "✅ Club created! Waiting for admin approval",
            showConfirmButton: false,
            timer: 2500
          });
        }
      });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow">
      <h2 className="text-4xl font-bold mb-6 text-center">Create New Club</h2>

      <form onSubmit={handleSubmit(createClubSubmit)} className="space-y-6">

        {/* Club Name */}
        <div>
          <label className="font-medium">Club Name</label>
          <input
            {...register("clubName", { required: true })}
            placeholder="Club Name"
            className="input input-bordered w-full mt-1"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="font-medium">Club Banner Image URL</label>
          <input
            {...register("image", { required: true })}
            placeholder="https://image-url.com"
            className="input input-bordered w-full mt-1"
          />

          {image && (
            <img
              src={image}
              alt="preview"
              className="mt-3 rounded-xl max-h-48 object-cover"
            />
          )}
        </div>

        {/* Description */}
        <div>
          <label className="font-medium">Description</label>
          <textarea
            {...register("description", { required: true })}
            rows="4"
            placeholder="Write about your club..."
            className="textarea textarea-bordered w-full mt-1"
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <label className="font-medium">Category</label>
          <select {...register("category")} className="select select-bordered w-full mt-1">
            <option>Photography</option>
            <option>Tech</option>
            <option>Sports</option>
            <option>Book Club</option>
            <option>Journalism</option>
            <option>Media</option>
          </select>
        </div>


        {/* Membership Fee */}
        <div className="bg-gray-50 p-5 rounded-xl space-y-3">
          <label className="font-medium">Membership Type</label>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="feeType"
                defaultChecked
                onChange={() => setIsPaid(false)}
              />
              Free
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="feeType"
                onChange={() => setIsPaid(true)}
              />
              Paid
            </label>
          </div>

          {isPaid && (
            <input
              type="number"
              {...register("membershipFee")}
              placeholder="Enter fee amount"
              className="input input-bordered w-full"
            />
          )}
        </div>

        {/* Submit */}
        <button className="btn btn-success w-full font-bold">
          Create Club
        </button>

      </form>
    </div>
  );
};

export default CreateClub;
