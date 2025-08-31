"use client";
import { useEffect, useState } from "react";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    fetch("/api/getSchools")
      .then((res) => res.json())
      .then((data) => setSchools(data));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-cyan-500 via-blue-700 to-pink-500 p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Schools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {schools.map((school) => (
          <div key={school.id} className="bg-white rounded-xl shadow-md p-4">
            <img src={school.image} alt={school.name} className="w-full h-40 object-cover rounded-md" />
            <h3 className="text-3xl p-4 text-center font-bold mt-2 text-green-500">{school.name}</h3>
            <p className="text-red-600 text-center text-xl">{school.address}</p>
            <p className="text-gray-600 text-center text-xl">{school.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

