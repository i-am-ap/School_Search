"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditSchool() {
  const { id } = useParams();
  const router = useRouter();
  const [school, setSchool] = useState({
    name: "",
    address: "",
    city: "",
    image: "",
  });
  const [preview, setPreview] = useState("");

  // Load existing data
  useEffect(() => {
    fetch(`/api/schools/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSchool(data);
        setPreview(data.image);
      });
  }, [id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSchool({ ...school, image: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", school.name);
    formData.append("address", school.address);
    formData.append("city", school.city);
    formData.append("existingImage", preview); // keep old one if no new file
    if (school.image instanceof File) {
      formData.append("image", school.image);
    }

    await fetch(`/api/schools/${id}`, {
      method: "PUT",
      body: formData,
    });

    router.push("/showSchools");
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-cyan-500 via-blue-700 to-pink-500 p-6">
      <div className="max-w-lg mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-xl mt-6 sm:mt-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-600 mb-4 sm:mb-6">
          ✏️ Edit School
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={school.name}
            onChange={(e) => setSchool({ ...school, name: e.target.value })}
            placeholder="School Name"
            className="w-full border px-3 py-2 sm:py-4 sm:py-2 rounded text-sm sm:text-base"
          />
          <input
            value={school.address}
            onChange={(e) => setSchool({ ...school, address: e.target.value })}
            placeholder="Address"
            className="w-full border px-3 py-2 sm:px-4 sm:py-2 rounded text-sm sm:text-base"
          />
          <input
            value={school.city}
            onChange={(e) => setSchool({ ...school, city: e.target.value })}
            placeholder="City"
            className="w-full border px-3 py-2 sm:px-4 sm:py-2 rounded text-sm sm:text-base"
          />

          <div>
            <label className="block mb-2 font-semibold text-sm sm:text-base">Upload Image</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="text-sm sm:text-base" />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-3 sm:mt-4 h-36 sm:h-40 w-full object-cover rounded-lg shadow"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 sm:py-3 rounded font-semibold text-sm sm:text-base transition"
          >
            ✅ Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
