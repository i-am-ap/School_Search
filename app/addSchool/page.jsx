"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [message, setMessage] = useState("");
  const router = useRouter();

  const onSubmit = async (data) => {
    const formData = new FormData();

    //Fix for file input
    Object.keys(data).forEach((key) => {
      if (key === "image") {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    });

    try{
        const res = await fetch("/api/addSchool", {
        method: "POST",
        body: formData,
    });

    const result = await res.json();
    if (res.ok) {
      setMessage("✅ School added successfully!");
      reset();

      // ✅ Route to showSchools page
      router.push("/showSchools"); 

    } else {
      setMessage("❌ " + result.error);
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    setMessage("❌ Something went wrong");
  }
};


  return (

    <div className="flex flex-col justify-center items-center bg-gradient-to-tr from-blue-500 via-purple-700 to-pink-500 p-4 min-h-screen">
        <div className=" flex justify-center items-center mb-6">
            <h1 className=" text-2xl sm:text-xl font-bold text-white">School Management</h1>
        </div>
    <div className="flex justify-center items-center mx-4">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-transparent border border-gray-300 p-8 rounded-xl shadow-md w-full max-w-lg space-y-4 sm:p-6 sm:mx-4">
        <h2 className="text-2xl sm:text-xl font-bold text-center text-white-100">Add School</h2>

        <input {...register("name", { required: true })} placeholder="School Name"
          className="w-full p-2 border rounded text-white-500" />
        {errors.name && <p className="text-red-500">Name is required</p>}

        <input {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          placeholder="Email" className="w-full p-2 border rounded text-white-500" />
        {errors.email && <p className="text-red-500">Valid Email is required</p>}

        <input {...register("phone", { required: true, minLength: 10, maxLength: 12 })}
          placeholder="Phone" className="w-full p-2 border rounded text-white-500" />
        {errors.phone && <p className="text-red-500">Valid Phone is required</p>} 

        <input {...register("address", { required: true })} placeholder="Address"
          className="w-full p-2 border rounded text-white-500" />
        {errors.address && <p className="text-red-500">Address is required</p>}

        <input {...register("city", { required: true })} placeholder="City"
          className="w-full p-2 border rounded text-white-500" />
        {errors.city && <p className="text-red-500">City is required</p>}

        <input {...register("state", { required: true })} placeholder="State"
          className="w-full p-2 border rounded text-white-500" />
        {errors.state && <p className="text-red-500">State is required</p>}

        <input type="file" {...register("image", { required: true })} className="w-full p-2 border rounded text-white-500" />
        {errors.image && <p className="text-red-500">Image is required</p>}

        <button type="submit"
            onClick={handleSubmit(onSubmit)}
          className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition sm:py-2 md:py-3">
          Submit
        </button>

        {message && <p className="text-center mt-2">{message}</p>}
      </form>
    </div>
    </div>
  );
}







