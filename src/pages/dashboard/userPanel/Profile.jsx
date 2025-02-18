import { useEffect, useState } from 'react'
import useAuth from '../../../hooks/useAuth'
import useAxiosPublic from '../../../hooks/useAxiosPublic'
import PaymentModal from './PaymentModal'
import { useQuery } from '@tanstack/react-query'
import { FaUserCircle } from 'react-icons/fa'

const Profile = () => {
  const { user } = useAuth() // Fetch authenticated user
  const [showModal, setShowModal] = useState(false)
  const axiosPublic = useAxiosPublic()

  //Fecth user data from the server using Tanstack's useQuery hook
  const { data: currentUser = [], refetch } = useQuery({
    queryKey: ['currentUser', user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/${user?.email}`)
      return res.data
    }
  })

  const handleSubscribe = () => {
    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false)
    refetch()
  }

  return (
    <div className='container mx-auto p-5'>
      <h1 className='text-3xl font-bold text-center mb-5'>My Profile</h1>
      <div className='bg-white shadow-md p-6 rounded-lg max-w-md mx-auto'>
        {/* Profile Picture */}
        <div className='flex flex-col items-center'>
          {currentUser.photoURL ? (
            <img
              src={currentUser.photoURL}
              alt='Profile'
              className='w-24 h-24 rounded-full border-4 border-blue-500 shadow-lg'
            />
          ) : (
            <FaUserCircle className='w-24 h-24 text-gray-400' />
          )}

          <h2 className='mt-4 text-2xl font-semibold text-gray-800'>
            {currentUser.name}
          </h2>
          <p className='text-gray-500 text-sm'>{currentUser.role}</p>
        </div>

        {/* User Info */}
        <div className='mt-6 space-y-4'>
          <div className='flex items-center justify-between p-3 bg-gray-100 rounded-lg'>
            <span className='text-gray-600 font-medium'>📧 Email:</span>
            <span className='text-gray-800'>{currentUser.email}</span>
          </div>

          <div className='flex items-center justify-between p-3 bg-gray-100 rounded-lg'>
            <span className='text-gray-600 font-medium'>📱 Phone:</span>
            <span className='text-gray-800'>+880 0160 953 117</span>
          </div>

          <div className='flex items-center justify-between p-3 bg-gray-100 rounded-lg'>
            <span className='text-gray-600 font-medium'>🏠 Address:</span>
            <span className='text-gray-800'>Jashore, Khulna, Bangladesh</span>
          </div>
        </div>

        {currentUser?.isSubscribed ? (
          <div className='mt-6 text-center'>
            <p className='text-green-600 font-semibold'>Status: Verified</p>
          </div>
        ) : (
          <button
            onClick={handleSubscribe}
            className='mt-6 btn btn-primary text-white px-6 py-2 rounded-lg w-full '
          >
            Subscribe - $50
          </button>
        )}
      </div>

      {/* Render Subscription Modal */}
      {showModal && <PaymentModal onClose={handleClose} />}
    </div>
  )
}

export default Profile
