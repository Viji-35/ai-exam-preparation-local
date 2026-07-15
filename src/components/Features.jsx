function Features() {
  const features = [
    {
      title: "AI Question Generator",
      description: "Generate unlimited exam questions using AI.",
    },
    {
      title: "Mock Tests",
      description: "Practice with timed tests and instant results.",
    },
    {
      title: "Study Planner",
      description: "Create personalized AI study schedules.",
    },
    {
      title: "Progress Tracking",
      description: "Analyze your performance with charts.",
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <h2 className="text-4xl font-bold text-center mb-10">
        Our Features
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 hover:scale-105 transition"
          >
            <h3 className="text-xl font-bold text-indigo-700 mb-3">
              {feature.title}
            </h3>

            <p className="text-gray-600">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;