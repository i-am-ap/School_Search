"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const router = useRouter();
  const [query, setQuery] = useState("");    //Search query

  useEffect(() => {
    fetch("/api/getSchools")
      .then((res) => res.json())
      .then((data) => setSchools(data));
  }, []);


  // Filter schools based on search query
  const filteredSchools = schools.filter((school) =>
  [school.name, school.address, school.city, school.state].some((field) =>
    field.toLowerCase().includes(query.toLowerCase())
  ));
  

  return (
    <div className="min-h-screen bg-gradient-to-tr from-cyan-500 via-blue-700 to-pink-500 p-6">
      {/* Heading Row */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <h2 className="text-3xl font-bold text-white">Schools</h2>

        {/* Search bar */}
        <input
          type="text"
          placeholder="🔍 Search by name, city, address, state..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-300 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <button
          type="button"
          onClick={() => router.push("/addSchool")}  //navigate to form
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          + Add School
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
        {filteredSchools.map((school) => (
          <div key={school.id} className="bg-white rounded-xl shadow-md p-4 w-full max-w-sm">
            <img src={school.image} alt={school.name} className="w-full h-40 object-cover rounded-md" />
            <h3 className="text-xl p-2 text-center font-bold mt-2 text-green-500">{school.name}</h3>
            <p className="text-red-600 text-center text-base">{school.address}</p>
            <p className="text-gray-600 text-center text-base">{school.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

