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
      senderEmail: clubs.createdBy,
      clubName: clubs.clubName,
    };

    const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
    if (res.data.url) {
      window.location.href = res.data.url;
    }
    document.getElementById("join_modal").close();
  };


  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Image */}
      <img
        src={clubs.image}
        alt={clubs.clubName}
        className="w-full h-96 object-cover rounded-xl"
      />

      {/* Content */}
      <div className="mt-6 space-y-4">
        <h1 className="text-4xl font-bold">{clubs.clubName}</h1>
        <p className="text-gray-600">{clubs.description}</p>

        <div className="flex gap-4 flex-wrap text-sm">
          <span className="badge badge-outline">
            {clubs.category}
          </span>

          <span className="badge badge-outline">
            {clubs.membershipFee === 0 ? "✅ Free" : `💳 $${clubs.membershipFee}`}
          </span>
        </div>

        <div className="mt-6 flex gap-4">
          <button
            className="btn btn-secondary"
            onClick={() => document.getElementById("join_modal").showModal()}
          >
            Join Club
          </button>

          <Link to="/all-clubs" className="btn btn-outline">
            Back
          </Link>
        </div>
      </div>


      <dialog id="join_modal" className="modal">
        <div className="modal-box">

          <h3 className="text-lg font-bold mb-3">
            Join {clubs.clubName}
          </h3>

          <div className="space-y-2 text-sm">
            <p><strong>Category:</strong> {clubs.category}</p>
            <p>
              <strong>Fee:</strong>{" "}
              {clubs.membershipFee === 0 ? "Free" : `$${clubs.membershipFee}`}
            </p>
            <p className="text-gray-500">{clubs.description}</p>
          </div>

          <div className="modal-action flex flex-col gap-2">
            {clubs.paymentStatus === "paid" ? (
              <>
                <button className="btn btn-success w-full" disabled>
                  ✅ Paid
                </button>

                <button
                  className="btn btn-outline w-full"
                  onClick={() => document.getElementById("join_modal").close()}
                >
                  ❌ Close
                </button>
              </>
            ) : clubs.membershipFee === 0 ? (
              <>
                <button
                  className="btn btn-secondary w-full"
                  onClick={handleJoin}
                >
                  ✅ Confirm Join
                </button>

                <button
                  className="btn btn-outline w-full"
                  onClick={() => document.getElementById("join_modal").close()}
                >
                  ❌ Close
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn btn-secondary w-full"
                  onClick={handleStripePay}
                >
                  💳 Pay with Stripe
                </button>

                <button
                  className="btn btn-outline w-full"
                  onClick={() => document.getElementById("join_modal").close()}
                >
                  ❌ Close
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
