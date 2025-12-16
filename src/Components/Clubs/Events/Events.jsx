import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../Loading/Loading";
import useAuth from "../../../Hooks/useAuth";

const Events = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth()

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axiosSecure.get("/events");
        setEvents(res.data || []);
      } catch (err) {
        console.error(err);
        setError("Could not load events");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [axiosSecure]);

  if (loading) return <Loading />;
  if (error) return <p className="text-center text-red-500">{error}</p>;


  const handleFreeJoin = async () => {
    try {
      await axiosSecure.post(`/events/${selectedEvent._id}/register`);
      alert("Registered successfully 🎉");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
    setSelectedEvent(null);
  };


  const handleStripePay = async () => {
    try {
      const paymentInfo = {
        cost: selectedEvent.price,
        clubId: selectedEvent.clubId,     
        eventId: selectedEvent._id,        
        senderEmail: user.email,             
        clubName: selectedEvent.title,
      };

      const res = await axiosSecure.post(
        "/create-checkout-session",
        paymentInfo
      );

      if (res.data?.url) {
        window.location.href = res.data.url;
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Payment failed");
    }
    setSelectedEvent(null);
  };

  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Upcoming Events
      </h1>

      {/* EVENT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((evt) => (
          <div key={evt._id} className="card bg-base-100 shadow-lg h-full">
            <div className="card-body flex flex-col">
              <h2 className="card-title line-clamp-1">
                {evt.title}
              </h2>

              <p className="text-sm text-gray-500">
                {new Date(evt.date).toLocaleDateString()}
              </p>

              {evt.location && (
                <p className="text-sm">📍 {evt.location}</p>
              )}

              {evt.description && (
                <p className="text-sm text-gray-600 line-clamp-3">
                  {evt.description}
                </p>
              )}

              <div className="mt-auto flex justify-between items-center pt-3">
                <span className="badge badge-outline">
                  {evt.price > 0 ? `$${evt.price}` : "Free"}
                </span>

                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setSelectedEvent(evt)}
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6 space-y-4">

            <div>
              <h2 className="text-xl font-bold">
                {selectedEvent.title}
              </h2>
              <p className="text-sm text-gray-500">
                {new Date(selectedEvent.date).toLocaleDateString()}
              </p>
            </div>

            <p className="text-gray-700">
              {selectedEvent.description}
            </p>

            <div className="flex justify-between items-center">
              <span className="font-semibold">
                {selectedEvent.price > 0
                  ? `$${selectedEvent.price}`
                  : "Free Event"}
              </span>

              {selectedEvent.price > 0 ? (
                <button
                  className="btn btn-secondary"
                  onClick={handleStripePay}
                >
                  Pay & Join
                </button>
              ) : (
                <button
                  className="btn btn-secondary"
                  onClick={handleFreeJoin}
                >
                  Join
                </button>
              )}
            </div>

            <button
              className="btn btn-outline w-full"
              onClick={() => setSelectedEvent(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
