import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaEdit, FaUserCircle } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";

const ProfilePage = () => {

  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  //Fecth user data from the server using Tanstack's useQuery hook
  const { data: currentUser = [], refetch } = useQuery({
    queryKey: ['currentUser', user?.email],
    queryFn: async () => {
        const res = await axiosPublic.get(`/users/${user?.email}`);
        return res.data;
    },
});

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md ">
        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          {currentUser.photoURL ? (
            <img
              src={currentUser.photoURL}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-lg"
            />
          ) : (
            <FaUserCircle className="w-24 h-24 text-gray-400" />
          )}

          <h2 className="mt-4 text-2xl font-semibold text-gray-800">
           {currentUser.name}
          </h2>
          <p className="text-gray-500 text-sm">{currentUser.role}</p>
        </div>

        {/* User Info */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
            <span className="text-gray-600 font-medium">📧 Email:</span>
            <span className="text-gray-800">{currentUser.email}</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
            <span className="text-gray-600 font-medium">📱 Phone:</span>
            <span className="text-gray-800">+880 0160 953 117</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
            <span className="text-gray-600 font-medium">🏠 Address:</span>
            <span className="text-gray-800">Jashore, Khulna, Bangladesh</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
