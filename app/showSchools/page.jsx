// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function ShowSchools() {
//   const [schools, setSchools] = useState([]);
//   const router = useRouter();
//   const [query, setQuery] = useState("");    //Search query

//   useEffect(() => {
//     fetch("/api/getSchools")
//       .then((res) => res.json())
//       .then((data) => setSchools(data));
//   }, []);


//   // Filter schools based on search query
//   const filteredSchools = schools.filter((school) =>
//     [school.name, school.address, school.city, school.state].some((field) =>
//       field.toLowerCase().includes(query.toLowerCase())
//     ));


//   return (
//     <div className="min-h-screen bg-gradient-to-tr from-cyan-500 via-blue-700 to-pink-500 p-6">
//       {/* Heading Row */}
//       <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
//         <h2 className="text-3xl font-bold text-white">Schools</h2>

//         {/* Search bar */}
//         <input
//           type="text"
//           placeholder="🔍 Search by name, city, address, state..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           className="px-4 py-2 rounded-md border border-gray-300 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-green-400"
//         />

//         <button
//           type="button"
//           onClick={() => router.push("/addSchool")}  //navigate to form
//           className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
//         >
//           + Add School
//         </button>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
//         {filteredSchools.map((school) => (
//           <div key={school.id} className="bg-white rounded-xl shadow-md p-4 w-full max-w-sm">
//             <img src={school.image} alt={school.name} className="w-full h-40 object-cover rounded-md" />
//             <h3 className="text-xl p-2 text-center font-bold mt-2 text-green-500">{school.name}</h3>
//             <p className="text-red-600 text-center text-base">{school.address}</p>
//             <p className="text-gray-600 text-center text-base">{school.city}</p>

//             {/* Action Buttons */}
//             <div className="flex justify-between mt-4">
//               <button
//                 onClick={() => router.push(`/editSchool/${school.id}`)}
//                 className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded"
//               >
//                 ✏️ Edit
//               </button>
//               <button
//                 onClick={async () => {
//                   await fetch(`/api/schools/${school.id}`, { method: "DELETE" });
//                   setSchools(schools.filter((s) => s.id !== school.id)); // update UI instantly
//                 }}
//                 className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
//               >
//                 🗑 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }














"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const router = useRouter();
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/api/getSchools")
      .then((res) => res.json())
      .then((data) => setSchools(data));
  }, []);

  const filteredSchools = schools.filter((school) =>
    [school.name, school.address, school.city, school.state].some((field) =>
      field.toLowerCase().includes(query.toLowerCase())
    )
  );

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this school?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/schools/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        setSchools(schools.filter((s) => s.id !== id));
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
      
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <h2 className="text-3xl font-bold text-white">Schools</h2>

        <input
          type="text"
          placeholder="🔍 Search by name, city, address, state..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
        {filteredSchools.map((school) => (
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
        ))}
      </div>
    </div>
  );
}

