// src/app/add-learning/page.tsx
"use client";

import { useState } from "react";

export default function AddLearningPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [source, setSource] = useState("Book");
  const [type, setType] = useState("text");
  const [isImportant, setIsImportant] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      title,
      content,
      source,
      type,
      isImportant,
    };

    const res = await fetch("/api/learnings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      alert("Learning saved!");
      setTitle("");
      setContent("");
      setIsImportant(false);
    } else {
      alert("Error saving learning.");
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Add New Learning</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-2xl shadow">
        <div>
          <label className="block font-medium">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="flex gap-4">
          <div>
            <label className="block font-medium">Source</label>
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="p-2 border rounded"
            >
              <option>Book</option>
              <option>YouTube</option>
              <option>Podcast</option>
              <option>SelfHelp</option>
              <option>EE</option>
              <option>ML</option>
              <option>Blockchain</option>
              <option>Cloud</option>
            </select>
          </div>

          <div>
            <label className="block font-medium">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="text">Text</option>
              <option value="link">Link</option>
              <option value="pdf">PDF</option>
              <option value="image">Image</option>
            </select>
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isImportant}
            onChange={(e) => setIsImportant(e.target.checked)}
            className="mr-2"
          />
          <label>Mark as Important</label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Learning
        </button>
      </form>
    </main>
  );
}
