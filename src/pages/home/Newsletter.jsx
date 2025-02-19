import { useState } from 'react'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)


  const handleInputChange = e => {
    setEmail(e.target.value)
  }

  const handleSubscribe = e => {
    e.preventDefault()
    if (email) {
      // You can replace this with a real subscription API
      setIsSubscribed(true)
      setEmail('')
    }
    
  }


  return (
    <div className='container mx-auto pt-12'>
      <section className='bg-gray-100 py-16'>
        <div className='max-w-7xl mx-auto px-4 text-center'>
          <h2 className='text-3xl lg:text-4xl font-bold text-gray-800'>
            Stay Updated with the Latest <span className='text-red-500'>Tech Trends</span>🚀
          </h2>
          <p className='mt-4 text-lg text-gray-600'>
            Get exclusive updates on new products, trending tech, and special
            promotions straight to your inbox!
          </p>
          {isSubscribed ? (
            <p className='mt-8 text-lg text-green-500 font-semibold flex items-center justify-center space-x-2 bg-green-100 p-4 rounded-lg shadow-md max-w-lg mx-auto'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                className='w-6 h-6 text-green-500 animate-bounce'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M5 13l4 4L19 7'
                />
              </svg>
              <span>Thank you for subscribing us! 🎉</span>
            </p>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className='mt-8 flex justify-center items-center'
            >
              <input
                type='email'
                value={email}
                onChange={handleInputChange}
                placeholder='Enter your email'
                className='p-3 w-72 sm:w-96 dark:bg-white dark:text-black rounded-l-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300'
                required
              />
              <button
                type='submit'
                className='bg-red-600 text-white font-semibold p-3 rounded-r-lg hover:bg-red-700 transition duration-300'
              >
                Subscribe Now
              </button>
            </form>
          )}
          <p className='mt-4 text-gray-500 text-sm'>
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Newsletter
