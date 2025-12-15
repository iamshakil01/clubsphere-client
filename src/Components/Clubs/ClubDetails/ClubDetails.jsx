import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../Loading/Loading";

const ClubDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: clubs, isLoading } = useQuery({
    queryKey: ["clubs", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/clubs/${id}`);
      return res.data;
    }
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  const handleJoin = () => {
    Swal.fire({
      icon: "success",
      title: "Joined Successfully!",
      text: `You are now a member of ${clubs.clubName}`,
      confirmButtonColor: "#16a34a"
    });
    document.getElementById("join_modal").close();
  };

  const handleStripePay = async () => {
    const paymentInfo = {
      cost: clubs.membershipFee,
      clubId: clubs._id,
      clubName: clubs.clubName,
    };

    const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
    if (res.data.url) {
      window.location.href = res.data.url;
    }
    document.getElementById("join_modal").close();
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="relative rounded-2xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
        <img
          src={clubs.image}
          alt={clubs.clubName}
          className="w-full h-96 object-cover transition-transform duration-500 hover:scale-105"
        />
        <h1 className="absolute bottom-4 left-6 text-4xl font-extrabold text-white drop-shadow-lg">
          {clubs.clubName}
        </h1>
      </div>

      <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6">
        <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed">
          {clubs.description}
        </p>

        <div className="flex flex-wrap gap-4 mt-4">
          <span className="px-4 py-2 bg-indigo-100 text-indigo-800 font-semibold rounded-full text-sm">
            {clubs.category}
          </span>
          <span className="px-4 py-2 bg-green-100 text-green-800 font-semibold rounded-full text-sm">
            {clubs.membershipFee === 0 ? "🎉 Free" : `💳 $${clubs.membershipFee}`}
          </span>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 items-center">
          <button
            className="btn bg-indigo-600 text-white hover:bg-indigo-700 px-6 py-2 rounded-full font-semibold transition"
            onClick={() => document.getElementById("join_modal").showModal()}
          >
            Join Club
          </button>

          <Link
            to="/all-clubs"
            className="text-indigo-600 font-medium hover:underline"
          >
            ← Back to All Clubs
          </Link>
        </div>
      </div>

      <dialog id="join_modal" className="modal">
        <div className="modal-box space-y-4 p-6 bg-white rounded-xl shadow-2xl">
          <h3 className="text-2xl font-bold text-center">{`Join ${clubs.clubName}`}</h3>

          <div className="text-sm text-gray-700 space-y-2">
            <p><strong>Category:</strong> {clubs.category}</p>
            <p><strong>Fee:</strong>{" "}
              {clubs.membershipFee === 0 ? "Free" : `$${clubs.membershipFee}`}</p>
            <p className="text-gray-500">{clubs.description}</p>
          </div>

          <div className="modal-action flex flex-col gap-3">
            {clubs.membershipFee === 0 ? (
              <>
                <button
                  className="btn btn-secondary w-full rounded-full"
                  onClick={handleJoin}
                >
                  Confirm Join
                </button>
                <button
                  className="btn btn-outline w-full rounded-full"
                  onClick={() => document.getElementById("join_modal").close()}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn btn-secondary w-full rounded-full"
                  onClick={handleStripePay}
                >
                  Pay with Stripe
                </button>
                <button
                  className="btn btn-outline w-full rounded-full"
                  onClick={() => document.getElementById("join_modal").close()}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ClubDetails;