"use client"
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/addSchool");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-green-500 via-blue-700 to-pink-500 sm:p-6 md:p-10">
      <h1 className="text-4xl sm:text-4xl md:text-3xl text-center font-bold text-white mb-4">
        Welcome to Student Management System!
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-center mb-6 px-4 sm:px-6 md:px-12 text-white">
        Manage your school's information efficiently.
      </p>
      <button onClick={handleGetStarted} className="bg-white text-blue-500 py-2 px-4 sm:py-2 md:py-4 md:px-8 rounded-lg hover:bg-gray-100">
        Get Started
      </button>
    </div>
  );
}
