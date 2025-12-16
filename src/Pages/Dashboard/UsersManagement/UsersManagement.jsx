import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [errorMessage, setErrorMessage] = useState("");
  const [pendingChange, setPendingChange] = useState(null);

  
  const [searchText, setSearchText] = useState("");

  const { data: users = [], refetch, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const requestRoleChange = async (user, newRole) => {
    try {
      await axiosSecure.patch(`/users/${user._id}`, { role: newRole });
      await refetch();
      setErrorMessage("");
    } catch (err) {
      console.error(err);
      setErrorMessage(
        err.response?.data?.message ||
        err.message ||
        "Failed to update user role"
      );
    }
  };

  const handleSelectChange = (user, newRole) => {
    if (user.role === newRole) return;
    setPendingChange({ user, newRole });
  };

  const confirmChange = () => {
    if (pendingChange) {
      requestRoleChange(pendingChange.user, pendingChange.newRole);
      setPendingChange(null);
    }
  };

  const cancelChange = () => {
    setPendingChange(null);
  };

  if (isLoading) return <div>Loading users…</div>;
  if (isError) return <div className="text-red-500">Error: {error.message}</div>;

  
  const filteredUsers = users.filter((u) => {
    const searchLower = searchText.toLowerCase();
    const name = u.displayName?.toLowerCase() || "";
    const email = u.email?.toLowerCase() || "";
    return name.includes(searchLower) || email.includes(searchLower);
  });

  return (
    <div className="p-5">
      
      
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-4xl font-bold">
          Manage Users ({filteredUsers.length})
        </h2>

        <input
          type="text"
          placeholder="Search by name or email…"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
      </div>

      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">
          {errorMessage}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name / Avatar</th>
              <th>Email</th>
              <th>Role</th>
              <th>Change Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u, idx) => (
              <tr key={u._id}>
                <th>{idx + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={u.photoURL || ""} alt="Avatar" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{u.displayName || "No name"}</div>
                    </div>
                  </div>
                </td>
                <td>{u.email}</td>
                <td>
                  <span className="badge badge-info text-white font-bold">
                    {u.role}
                  </span>
                </td>
                <td>
                  <select
                    className="select select-bordered select-sm w-full max-w-xs"
                    defaultValue={u.role}
                    onChange={(e) => handleSelectChange(u, e.target.value)}
                  >
                    <option value="member">Member</option>
                    <option value="clubManager">Club Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {pendingChange && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-base-100 rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-semibold mb-4">
              Confirm Role Change
            </h3>
            <p className="mb-6">
              Are you sure you want to change{" "}
              <strong>{pendingChange.user.displayName}</strong>’s role to{" "}
              <strong>{pendingChange.newRole}</strong>?
            </p>
            <div className="flex justify-end space-x-4">
              <button onClick={cancelChange} className="btn btn-outline">
                Cancel
              </button>
              <button onClick={confirmChange} className="btn btn-secondary">
                Yes, Change Role
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default UsersManagement;
