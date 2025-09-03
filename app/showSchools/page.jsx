"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function ShowSchools() {
  // const [allSchools, setAllSchools] = useState([]); // All schools from DB for search across pages
  const [schools, setSchools] = useState([]);    //current page
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);   // Current page
  const [total, setTotal] = useState(0);  // Total schools
  const limit = 8;                        // Schools per page

  // Fetch all schools once
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await fetch(
          `/api/getSchools?page=${page}&limit=${limit}&search=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        setSchools(data.schools || []);
        setTotal(data.total || 0);
      } catch (error) {
        console.error("Error fetching schools:", error);
        toast.error("Failed to fetch schools");
      }
    };

    fetchSchools();
  }, [page, query]); // Re-fetch when page or search changes


  //total pages calculation
  const totalPages = Math.ceil(total / limit);

  // Delete School
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this school?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/schools/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        setSchools(schools.filter((s) => s.id !== id));
        setTotal((prev) => prev - 1);
        toast.success("School deleted successfully!");
      } else {
        toast.error(data.error || "Failed to delete school");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-cyan-500 via-blue-700 to-pink-500 p-6">
      <Toaster position="top-right" />
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <h2 className="text-3xl font-bold text-white">Schools</h2>

        <input
          type="text"
          placeholder="🔍 Search by name, city, address, state..."
          value={query}
          onChange={(e) => { setQuery(e.target.value); setPage(1); }} // reset to page 1 on new search
          className="px-4 py-2 rounded-md border border-gray-300 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <button
          type="button"
          onClick={() => router.push("/addSchool")}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          + Add School
        </button>
      </div>

      {/* Schools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
        {schools.length > 0 ? (
        schools.map((school) => (
          <div key={school.id} className="bg-white rounded-xl shadow-md p-4 w-full max-w-sm">
            <img src={school.image} alt={school.name} className="w-full h-40 object-cover rounded-md" />
            <h3 className="text-xl p-2 text-center font-bold mt-2 text-green-500">{school.name}</h3>
            <p className="text-red-600 text-center text-base">{school.address}</p>
            <p className="text-gray-600 text-center text-base">{school.city}</p>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => router.push(`/editSchool/${school.id}`)}
                className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => handleDelete(school.id)}
                className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))
        ) : (
          <p className="text-white col-span-full text-center">No schools found.</p>
        )}
      </div>

      {/* Pagination */}
      { totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6 flex-wrap">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 hover:bg-blue-500 hover:text-white transition">
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded transition hover:bg-blue-500 hover:text-white ${page === i + 1 ? "bg-green-500 text-white" : "bg-gray-300"}`}
              >
                {i + 1}
              </button>
            ))}
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 hover:bg-blue-500 hover:text-white transition">
              Next
            </button>
        </div>
      )}
    </div>
  );
}