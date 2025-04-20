"use client";

import { useState } from "react";
// import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar"; // Adjusted path to locate Navbar component
import { useLearningState } from "../context/LearningContext"; // Adjusted path to locate LearningContext
import { useRouter } from "next/navigation";
export default function AddLearningPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [source, setSource] = useState("Book");
  const [typek, setType] = useState("text");
  const [isImportant, setIsImportant] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  // const [isnewlearningadded, setIsNewLearningAdded] = useState(false);
  const { isNewLearningAdded, setIsNewLearningAdded } = useLearningState()!;
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
    if (!file) {
      setImagePreview(null);
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // debugging
    console.log("Form submitted with values:", {
      title,
      content,
      source,
      typek,
      isImportant,
      imageFile,
    });
    // Basic validation
    if (!title || !content || !source || !typek) {
      alert("Please fill in all required fields.");
      setLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("source", source);
    formData.append("typek", typek);
    formData.append("isImportant", String(isImportant));
    
    if (imageFile) {
      formData.append("image", imageFile);
      // debugging
      console.log("Image file added to FormData:", imageFile.name);
      console.log("Image file size:", imageFile.size);
      console.log("Image file type:", imageFile.type);
    }

    try {
      const res = await fetch("/api/learnings", {
        method: "POST",
        body: formData, // Send FormData directly
      });

      if (!res.ok) throw new Error("Failed to save");
      alert("Learning saved!");
      // reset form
      setTitle("");
      setContent("");
      setSource("Book");
      setType("text");
      setIsImportant(false);
      setImageFile(null);
      setImagePreview(null);
    } catch (err) {
      console.error(err);
      alert("There was an error saving your learning.");
    } finally {
      setLoading(false);
    }
    setIsNewLearningAdded(!isNewLearningAdded); // Toggle the state to trigger re-fetch in the library page
    console.log("isNewLearningAdded state updated:", !isNewLearningAdded);
    router.push("/home"); // Redirect to the library page after saving
  };

  return (
    <>
      <Navbar /> {/* ✅ Add the navbar here */}
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-xl p-6">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">📚 Add a New Learning</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm text-black focus:outline-none focus:ring focus:border-blue-300"
              placeholder="e.g. How to build a habit"
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm text-black focus:outline-none focus:ring focus:border-blue-300"
              rows={4}
              placeholder="Write your learning or explanation..."
              required
            />
          </div>

          {/* Image Upload Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image (Optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {imagePreview && (
              <div className="mt-3 w-full h-48 bg-gray-200 rounded-md overflow-hidden">
                <img src={imagePreview} alt="Preview" className="object-cover w-full h-full" />
              </div>
            )}
          </div>

          {/* Source and Type */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="Book">📘 Book</option>
                <option value="YouTube">📺 YouTube</option>
                <option value="Podcast">🎧 Podcast</option>
                <option value="SelfHelp">🧠 Self-Help</option>
                <option value="EE">🔌 Electrical Engg</option>
                <option value="ML">🤖 Machine Learning</option>
                <option value="Blockchain">🔗 Blockchain</option>
                <option value="Cloud">☁️ Cloud</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={typek}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="text">📝 Text</option>
                <option value="link">🔗 Link</option>
                <option value="pdf">📄 PDF</option>
                <option value="image">🖼️ Image</option>
              </select>
            </div>
          </div>

          {/* Important */}
          <div className="flex items-center">
            <input
              id="important"
              type="checkbox"
              checked={isImportant}
              onChange={(e) => setIsImportant(e.target.checked)}
              className="mr-2 h-4 w-4"
            />
            <label htmlFor="important" className="text-sm text-gray-700">
              Mark as Important
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 text-white font-semibold rounded-lg transition-all ${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {loading ? "Saving..." : "💾 Save Learning"}
          </button>
        </form>
      </div>
    </main>
    </>
  );
}
