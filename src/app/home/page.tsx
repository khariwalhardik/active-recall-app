"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar"; // Adjusted path to locate Navbar component

interface Learning {
  id: string;
  title: string;
  content: string;
  source: string;
  type: string;
  isImportant: boolean;
  image?: string;
}

export default function HomePage() {
  const [learnings, setLearnings] = useState<Learning[]>([]);
  const [randomLearning, setRandomLearning] = useState<Learning | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchLearnings = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/library");
        const data = await response.json();
        setLearnings(data);
        if (data.length > 0) {
          const random = data[Math.floor(Math.random() * data.length)];
          setRandomLearning(random);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLearnings();
  }, []);

  return (
    <>
      <Navbar /> {/* ✅ Add the navbar here */}

      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6 flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">🎯 Daily Highlight</h1>

        {loading ? (
  <p className="text-gray-500">Loading...</p>
) : randomLearning ? (
  <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">
    {/* Image preview (if exists) */}
    {randomLearning.image && (
      <img
        src={randomLearning.image}
        alt={randomLearning.title}
        className="w-full h-80 object-cover rounded-xl mb-4"
      />
    )}

    <h2 className="text-xl font-semibold text-gray-900 mb-2">{randomLearning.title}</h2>
    <p className="text-gray-700 mb-4 line-clamp-4 text-2xl">{randomLearning.content}</p>
    <div className="text-xs text-gray-500 mb-4">
      {randomLearning.source} | {randomLearning.type}
    </div>
  </div>
) : (
  <p className="text-gray-500">No learning entries yet.</p>
)}

        <div className="mt-8 flex gap-4">
          <button
            onClick={() => router.push("/add-learning")}
            className="px-5 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
          >
            ➕ Add Learning
          </button>
          <button
            onClick={() => router.push("/library")}
            className="px-5 py-2 bg-gray-200 text-gray-800 rounded-xl font-medium hover:bg-gray-300 transition"
          >
            📚 Go to Library
          </button>
        </div>
      </main>
    </>
  );
}
