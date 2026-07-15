export default function RecentActivity() {
  const activities = JSON.parse(
    localStorage.getItem("recentActivities") || "[]"
  );

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-indigo-700 mb-6">
          📜 Recent Activity
        </h1>

        <button
          onClick={() => {
            localStorage.removeItem("recentActivities");
            window.location.reload();
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg mb-6"
        >
          🗑 Clear History
        </button>

        {activities.length === 0 ? (
          <p className="text-gray-500">
            No recent activity found.
          </p>
        ) : (
          activities.map((item, index) => (
            <div
              key={index}
              className="border-b py-4"
            >
              <h3 className="font-bold">
                {item.title}
              </h3>

              <p className="text-gray-600">
                {item.time}
              </p>
            </div>
          ))
        )}

      </div>
    </div>
  );
}