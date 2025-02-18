const WhyChooseUs = () => {
    const features = [
      { title: "Community-Powered", desc: "Users upvote the best products, ensuring quality.", color: "text-red-500" },
      { title: "Curated Innovations", desc: "Only the most promising tech gets featured.", color: "text-blue-500" },
      { title: "Real Reviews", desc: "Authentic insights from real users.", color: "text-green-500" },
      { title: "Tech for Everyone", desc: "Find AI tools, apps, software & gadgets.", color: "text-black" },
    ];
  
    return (
      <section className="bg-white text-black pb-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold  mb-6">Why Choose <span className="text-red-500">Us?</span></h2>
          <p className="text-lg text-gray-700 mb-8">
            We bring you the **most innovative tech products**, curated and upvoted by a passionate community.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md hover:scale-105 transition">
              <h3 className={`text-2xl font-bold ${feature.color} mb-3`}>{feature.title}</h3>
              <p className="text-gray-700">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default WhyChooseUs;
  