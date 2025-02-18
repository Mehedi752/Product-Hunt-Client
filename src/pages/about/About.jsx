const About = () => {
  return (
    <div className='mt-24 container mx-auto mb-2'>
        <section className="bg-gray-100 text-black py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-red-500 mb-6">
          About <span className="text-green-500">Product Hunt</span>
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          Discover, explore, and share the latest innovations in tech! 🚀 Our platform connects 
          creators and enthusiasts, bringing **cutting-edge products, AI tools, and software** into 
          the spotlight.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-10 mt-10">
        {/* Left - Mission Card */}
        <div className="bg-white text-black rounded-lg p-6 shadow-lg w-full md:w-1/2 hover:scale-105 transition">
          <h3 className="text-2xl font-bold text-blue-600 mb-4">Our Mission</h3>
          <p className="text-gray-700">
            Empowering innovators by **providing a platform to showcase their products**, 
            connect with tech enthusiasts, and gain the recognition they deserve.
          </p>
        </div>

        {/* Right - Why Choose Us */}
        <div className="bg-red-500 text-white rounded-lg p-6 shadow-lg w-full md:w-1/2 hover:scale-105 transition">
          <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>🚀 **Upvote & Support** - Help amazing products gain visibility</li>
            <li>🌍 **Global Community** - Connect with like-minded tech lovers</li>
            <li>🔥 **Exclusive Finds** - Discover the next big thing before everyone else</li>
          </ul>
        </div>
      </div>

      <div className="mt-12 text-center">
        <a
          href="/products"
          className="btn btn-primary text-white px-6 py-2 rounded-md text-lg font-semibold transition"
        >
          Explore Products 🚀
        </a>
      </div>
    </section>
    </div>
  )
}

export default About
