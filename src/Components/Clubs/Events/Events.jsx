import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../Loading/Loading";

const Events = () => {
  const axiosSecure = useAxiosSecure();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await axiosSecure.get("/events");
        setEvents(res.data || []);
      } catch (err) {
        console.error("Failed to fetch events", err);
        setError("Could not load events.");
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, [axiosSecure]);

  if (loading) return <Loading />;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const handleFreeJoin = async () => {
    try {
      await axiosSecure.patch(`/events/${selectedEvent._id}/join`);
      setEvents(events.map(ev =>
        ev._id === selectedEvent._id
          ? { ...ev, maxAttendees: (ev.maxAttendees || 0) + 1 }
          : ev
      ));
      alert("Joined Free Event 🎉");
    } catch (err) {
      console.error(err);
      alert("Failed to join");
    }
    setSelectedEvent(null);
  };

  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Upcoming Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(evt => (
          <div key={evt._id} className="card bg-base-100 shadow-lg">
            <div className="card-body flex flex-col">
              <h2 className="card-title text-xl font-semibold">{evt.title}</h2>
              <p className="text-sm text-gray-500">
                {new Date(evt.date).toLocaleDateString()}
              </p>
              {evt.location && <p className="text-sm">Location: {evt.location}</p>}
              {evt.description && (
                <p className="text-sm text-gray-700 line-clamp-3 overflow-hidden text-ellipsis">
                  {evt.description}
                </p>
              )}
              <div className="mt-2">
                {evt.price > 0 ? (
                  <span className="badge bg-yellow-400">${evt.price}</span>
                ) : (
                  <span className="badge bg-green-500">Free</span>
                )}
              </div>
              <button
                className="btn btn-secondary btn-sm mt-3"
                onClick={() => setSelectedEvent(evt)}
              >
                Join Event
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold">{selectedEvent.title}</h2>
            <p className="text-sm text-gray-600">
              {new Date(selectedEvent.date).toLocaleDateString()}
            </p>
            {selectedEvent.location && (
              <p className="text-sm">Location: {selectedEvent.location}</p>
            )}
            <p className="mt-2">{selectedEvent.description}</p>
            <p className="font-semibold mt-3">
              {selectedEvent.price > 0
                ? `Price: $${selectedEvent.price}`
                : "Free Event"}
            </p>

            {selectedEvent.price > 0 ? (
              <div className="flex justify-end gap-2">
                <button
                  className="btn btn-outline"
                  onClick={() => setSelectedEvent(null)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => alert("Implement Stripe payment here")}
                >
                  Pay & Join
                </button>
              </div>
            ) : (
              <div className="flex justify-end gap-2">
                <button
                  className="btn btn-outline"
                  onClick={() => setSelectedEvent(null)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleFreeJoin}>
                  Join
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
