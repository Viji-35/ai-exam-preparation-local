import { useState, useEffect } from "react";

function Profile() {

    const [user, setUser] = useState({
        name: "",
        email: "",
        college: "",
        course: "",
        joined: "",
    });

    const [profileImage, setProfileImage] = useState(
        localStorage.getItem("profileImage") || ""
    );

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("user"));

        if (savedUser) {
            setUser({
                name: savedUser.name || "",
                email: savedUser.email || "",
                college: savedUser.college || "",
                course: savedUser.course || "",
                joined:
                    savedUser.joined ||
                    new Date().toLocaleDateString(),
            });

            setProfileImage(savedUser.profileImage || "");
        }
    }, []);

    const handleChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });

    };

    const handleImageChange = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = () => {

            setProfileImage(reader.result);

            const existingUser =
                JSON.parse(localStorage.getItem("user")) || {};

            const updatedUser = {
                ...existingUser,
                ...user,
                profileImage: reader.result,
            };

            localStorage.setItem(
                "user",
                JSON.stringify(updatedUser)
            );

            setProfileImage(reader.result);

        };

        reader.readAsDataURL(file);

    };

    const saveProfile = () => {
        const existingUser =
            JSON.parse(localStorage.getItem("user")) || {};

        const updatedUser = {
            ...existingUser,   // password preserve aagum
            ...user,
            profileImage,
        };

        localStorage.setItem(
            "user",
            JSON.stringify(updatedUser)
        );

        alert("Profile Updated Successfully!");
    };

    const stats = JSON.parse(localStorage.getItem("dashboardStats")) || {
        subjects: 12,
        mockTests: 28,
        averageScore: 89,
        streak: 15,
    };

    const initials = user.name
        ? user.name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .toUpperCase()
        : "U";

    return (
        <div className="min-h-screen bg-slate-100">

            <div className="bg-indigo-700 text-white py-8 shadow-lg">

                <h1 className="text-4xl font-bold text-center">
                    👤 My Profile
                </h1>

            </div>

            <div className="max-w-3xl mx-auto mt-10 bg-white rounded-xl shadow-lg p-8">

                <div className="flex justify-center">

                    <img
                        src={
                            profileImage
                                ? profileImage
                                : "https://ui-avatars.com/api/?name=" + encodeURIComponent(initials) + "&size=180"
                        }
                        alt="Profile"
                        className="rounded-full w-40 h-40 border-4 border-indigo-600 object-cover"
                    />

                </div>

                <div className="text-center mt-4">

                    <input
                        id="profile-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />

                    <label
                        htmlFor="profile-upload"
                        className="inline-block mt-4 bg-indigo-700 hover:bg-indigo-800 text-white px-6 py-3 rounded-lg cursor-pointer font-semibold"
                    >
                        📷 Change Photo
                    </label>

                </div>

                <div className="mt-8">

                    <label className="font-semibold">
                        Full Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3 mt-2 mb-5"
                    />

                    <label className="font-semibold">
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3 mt-2 mb-5"
                    />

                    <label className="font-semibold">
                        College
                    </label>

                    <input
                        type="text"
                        name="college"
                        value={user.college}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3 mt-2 mb-5"
                    />

                    <label className="font-semibold">
                        Course
                    </label>

                    <input
                        type="text"
                        name="course"
                        value={user.course}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3 mt-2 mb-5"
                    />

                    <label className="font-semibold">
                        Joined Date
                    </label>

                    <input
                        type="text"
                        value={user.joined}
                        readOnly
                        className="w-full border rounded-lg p-3 mt-2 mb-6 bg-gray-100"
                    />

                    <div className="grid grid-cols-2 gap-4 mb-6">

                        <div className="bg-indigo-100 rounded-lg p-4 text-center">
                            <h3 className="font-bold text-indigo-700">
                                📚 Subjects
                            </h3>

                            <p className="text-3xl font-bold mt-2">
                                {stats.subjects}
                            </p>
                        </div>

                        <div className="bg-green-100 rounded-lg p-4 text-center">
                            <h3 className="font-bold text-green-700">
                                📝 Mock Tests
                            </h3>

                            <p className="text-3xl font-bold mt-2">
                                {stats.mockTests}
                            </p>
                        </div>

                        <div className="bg-yellow-100 rounded-lg p-4 text-center">
                            <h3 className="font-bold text-yellow-700">
                                ⭐ Average Score
                            </h3>

                            <p className="text-3xl font-bold mt-2">
                                {stats.averageScore}%
                            </p>
                        </div>

                        <div className="bg-red-100 rounded-lg p-4 text-center">
                            <h3 className="font-bold text-red-700">
                                🔥 Study Streak
                            </h3>

                            <p className="text-3xl font-bold mt-2">
                                {stats.streak} Days
                            </p>
                        </div>

                    </div>

                    <button
                        onClick={saveProfile}
                        className="w-full bg-indigo-700 hover:bg-indigo-800 text-white py-3 rounded-lg font-semibold"
                    >
                        💾 Save Profile
                    </button>

                </div>

            </div>

        </div>
    );

}

export default Profile;