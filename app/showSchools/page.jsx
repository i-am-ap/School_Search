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
    <div className="min-h-screen bg-gradient-to-tr from-blue-500 via-purple-700 to-pink-500 p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Schools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {schools.map((school) => (
          <div key={school.id} className="bg-white rounded-xl shadow-md p-4">
            <img src={school.image} alt={school.name} className="w-full h-40 object-cover rounded-md" />
            <h3 className="text-lg font-bold mt-2">{school.name}</h3>
            <p>{school.address}</p>
            <p className="text-gray-600">{school.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

