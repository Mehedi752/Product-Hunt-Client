const Testimonials = () => {
  const reviews = [
    {
      name: 'John Doe',
      feedback:
        'An incredible platform! Found amazing tools to boost my workflow.',
      color: 'text-red-500',
      image: 'https://i.ibb.co.com/dB9XB6C/final1.webp'
    },
    {
      name: 'Jane Smith',
      feedback:
        'Love how the community drives product discovery. Highly recommended!',
      color: 'text-blue-500',
      image: 'https://i.ibb.co.com/LZYNmBK/img1.webp'
    },
    {
      name: 'Michael Chen',
      feedback: 'Submitted my app here and got great exposure!',
      color: 'text-green-500',
      image: 'https://i.ibb.co.com/wWPQ4GL/final3.jpg'
    }
  ]

  return (
    <section className='bg-white text-black pb-24 px-6 md:px-12'>
      <div className='max-w-5xl mx-auto text-center'>
        <h2 className='text-4xl font-bold text-green-600 mb-6'>
          What Our Users Say ❤️
        </h2>
        <p className='text-lg text-gray-700 mb-8'>
          Hear from **tech enthusiasts & creators** who love our platform.
        </p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto'>
        {reviews.map((review, index) => (
          <div
            key={index}
            className='bg-gray-100 p-6 rounded-lg shadow-md hover:scale-105 transition'
          >
            <div className='flex items-center gap-1 mb-4'>
              <img
                src={review.image}
                alt={review.name}
                className='w-12 h-12 rounded-full'
              />
              <h3 className={`text-xl font-bold ${review.color} ml-4`}>
                {review.name}
              </h3>
            </div>
            <p className='text-gray-700'>{review.feedback}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Testimonials
