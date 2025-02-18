const Community = () => {
  return (
    <div className='container mx-auto pt-24 mb-2'>
      <section className='bg-gray-100 text-black py-16 pb-20 px-6 md:px-12 lg:px-20'>
        <div className='max-w-5xl mx-auto text-center'>
          <h2 className='text-4xl md:text-5xl font-bold text-red-500 mb-6'>
            Join the <span className='text-blue-600'>Tech Revolution</span> 🚀
          </h2>
          <p className='text-lg text-gray-700 mb-8'>
            Explore the **latest tech trends, AI innovations, and groundbreaking
            gadgets**. Whether you're a creator or enthusiast, there's something
            for you!
          </p>
        </div>

        {/* Card Section */}
        <div className='flex flex-col md:flex-row items-center justify-center gap-10 mt-10'>
          {/* Discover New Products */}
          <div className='bg-white text-black rounded-lg p-6 shadow-lg w-full md:w-1/2 hover:scale-105 transition'>
            <h3 className='text-2xl font-bold text-green-600 mb-4'>
              Discover New Innovations
            </h3>
            <p className='text-gray-700'>
              Stay ahead of the curve with **curated tech discoveries**. Explore
              the newest products that are changing the game.
            </p>
            <a
              href='/products'
              className='mt-4 btn btn-primary text-white px-6 py-2 rounded-md text-lg font-semibold  transition'
            >
              Browse Products 🔥
            </a>
          </div>

          {/* Become a Part of the Community */}
          <div className='bg-blue-500 text-white rounded-lg p-6 shadow-lg w-full md:w-1/2 hover:scale-105 transition'>
            <h3 className='text-2xl font-bold mb-4'>
              Be Part of the Community
            </h3>
            <p>
              Join a **thriving tech community**, connect with innovators, and
              support the products that inspire you.
            </p>
            <a
              href='/auth/login'
              className='mt-4 btn inline-block bg-white text-blue-600 px-6 py-2 rounded-md text-lg font-semibold hover:bg-gray-200 transition'
            >
              Sign Up Now ✨
            </a>
          </div>
        </div>
      </section>
    </div>
  )}

export default Community
