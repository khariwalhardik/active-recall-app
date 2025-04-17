"use client";

import { useState } from "react";

export default function AddLearningPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [source, setSource] = useState("Book");
  const [typek, setType] = useState("text");
  const [isImportant, setIsImportant] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("source", source); // Enum value
    formData.append("typek", typek);   // Enum value
    formData.append("isImportant", isImportant.toString());
    if (image) {
      formData.append("image", image);
    }

    // Log FormData to check its content
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const res = await fetch("/api/learnings", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("✅ Learning saved!");
        setTitle("");
        setContent("");
        setIsImportant(false);
        setImage(null);
        setImagePreview(null);
      } else {
        alert("❌ Error saving learning.");
      }
    } catch (err) {
      alert("❌ Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-xl p-6">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">📚 Add a New Learning</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
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
  );
}
