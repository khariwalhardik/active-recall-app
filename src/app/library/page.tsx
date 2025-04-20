"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar"; // Adjusted path to locate Navbar component
interface Learning {
  id: number;
  title: string;
  content: string;
  source: string;
  type: string;
  isImportant: boolean;
  image: string;
}

const availableSources = ["Book", "YouTube", "Podcast", "SelfHelp", "EE", "ML", "Blockchain", "Cloud"];
const availableTypes = ["text", "link", "pdf", "image"];

export default function LibraryPage() {
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
const [deleteId, setDeleteId] = useState<number | null>(null);

  const [learnings, setLearnings] = useState<Learning[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredLearnings, setFilteredLearnings] = useState<Learning[]>([]);
  const [sourceFilter, setSourceFilter] = useState<string>("All");
  const [typeFilter, setTypeFilter] = useState<string>("All");

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedLearning, setSelectedLearning] = useState<Learning | null>(null);

  const [editedLearning, setEditedLearning] = useState<Learning | null>(null);

  useEffect(() => {
    async function fetchLearnings() {
      setLoading(true);
      try {
        const response = await fetch("/api/library");
        const data = await response.json();
        setLearnings(data);
        setFilteredLearnings(data);
      } catch (error) {
        console.error("Error fetching learnings:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLearnings();
  }, []);

  useEffect(() => {
    let filtered = learnings.filter((learning) => 
      learning.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sourceFilter !== "All") {
      filtered = filtered.filter((learning) => learning.source === sourceFilter);
    }

    if (typeFilter !== "All") {
      filtered = filtered.filter((learning) => learning.type === typeFilter);
    }

    setFilteredLearnings(filtered);
  }, [searchQuery, learnings, sourceFilter, typeFilter]);

  const handleEdit = (learning: Learning) => {
    setEditedLearning({ ...learning }); // Clone to edit
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this learning item?");
    if (confirmed) {
      try {
        const response = await fetch(`/api/library/${id}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          // Handle the successful deletion
          setLearnings((prevLearnings) => prevLearnings.filter((learning) => learning.id !== id));
          alert("Deleted successfully");
        } else {
          alert("Failed to delete learning");
        }
      } catch (error) {
        console.error("Error deleting learning:", error);
        alert("Error deleting learning");
      }
    }
  };
  
  const handleSave = async () => {
    if (editedLearning) {
      try {
        const response = await fetch(`/api/library/${editedLearning.id}`, {
          method: "PUT", // Or PATCH, depending on your backend
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedLearning),
        });
  
        if (response.ok) {
          // Update frontend state
          setLearnings((prevLearnings) =>
            prevLearnings.map((learning) =>
              learning.id === editedLearning.id ? editedLearning : learning
            )
          );
          alert("Changes saved successfully!");
        } else {
          alert("Failed to save changes.");
        }
      } catch (error) {
        console.error("Error updating learning:", error);
        alert("Error saving changes.");
      } finally {
        setShowModal(false);
        setEditedLearning(null);
      }
    }
  };
  

  const handleCloseModal = () => {
    setShowModal(false);
    setEditedLearning(null);
  };

  return (
        <>
          <Navbar /> {/* ✅ Add the navbar here */}
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">📚 My Learning Library</h1>

        <div className="mb-4 flex flex-col sm:flex-row gap-4 w-full">
  <input
    type="text"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="Search by title..."
    className="w-full px-4 py-2 border rounded-lg shadow-sm text-black focus:outline-none focus:ring focus:border-blue-300"
  />

  <select
    value={sourceFilter}
    onChange={(e) => setSourceFilter(e.target.value)}
    className="w-full sm:w-auto px-4 py-2 border rounded-lg shadow-sm text-black focus:outline-none focus:ring focus:border-blue-300"
  >
    <option value="All">All Sources</option>
    {availableSources.map((source) => (
      <option key={source} value={source}>
        {source}
      </option>
    ))}
  </select>

  <select
    value={typeFilter}
    onChange={(e) => setTypeFilter(e.target.value)}
    className="w-full sm:w-auto px-4 py-2 border rounded-lg shadow-sm text-black focus:outline-none focus:ring focus:border-blue-300"
  >
    <option value="All">All Types</option>
    {availableTypes.map((type) => (
      <option key={type} value={type}>
        {type}
      </option>
    ))}
  </select>
</div>


        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6">
            {filteredLearnings.length > 0 ? (
              filteredLearnings.map((learning) => {
                const imageUrl =
                  learning.image?.trim() !== ""
                    ? learning.image
                    : "https://placehold.co/400x200/EEE/31343C/"; // Default placeholder image

                return (
                  <div
                    key={learning.id}
                    className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200 flex flex-col"
                    style={{ minHeight: "400px" }}
                  >
                    <img
                      src={imageUrl}
                      alt={learning.title}
                      className="h-60 object-cover"
                    />
                    <div className="flex flex-col flex-grow p-4">
                      <h2 className="font-semibold text-lg text-gray-800 mb-2 truncate">
                        {learning.title}
                      </h2>

                      <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                        {learning.content}
                      </p>

                      <div className="text-xs text-gray-500 mb-4">
                        <span className="inline-block bg-blue-100 text-blue-900 px-3 py-0.5 rounded-full mr-2">
                          {learning.source}
                        </span>
                        <span className="inline-block bg-green-100 text-green-900 px-3 py-0.5 rounded-full">
                          {learning.type}
                        </span>
                      </div>

                      <div className="flex justify-between items-center mt-auto pt-2 border-t">
                        <button
                          className="text-sm text-blue-600 font-medium bg-blue-200 hover:bg-blue-300 px-3 py-1 rounded-md cursor-pointer"
                          onClick={() => handleEdit(learning)} // Call handleEdit on click
                        >
                          Edit
                        </button>
                        <button
  onClick={() => {
    setDeleteId(learning.id);
    setShowDeleteModal(true);
  }}
  className="text-sm text-red-600 font-medium bg-red-200 hover:bg-red-300 px-3 py-1 rounded-md"
>
  Delete
</button>
{showDeleteModal && deleteId !== null && (
  <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-10">
    <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg text-center">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Confirm Deletion</h2>
      <p className="text-gray-600 mb-6">Are you sure you want to delete this learning item?</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={async () => {
            try {
              const response = await fetch(`/api/library/${deleteId}`, {
                method: 'DELETE',
              });

              if (response.ok) {
                setLearnings((prev) =>
                  prev.filter((learning) => learning.id !== deleteId)
                );
                alert("Deleted successfully");
              } else {
                alert("Failed to delete learning");
              }
            } catch (error) {
              console.error("Error deleting learning:", error);
              alert("Error deleting learning");
            } finally {
              setShowDeleteModal(false);
              setDeleteId(null);
            }
          }}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md"
        >
          Delete
        </button>
        <button
          onClick={() => {
            setShowDeleteModal(false);
            setDeleteId(null);
          }}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="col-span-full text-gray-500 text-center">No learnings found</p>
            )}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showModal && editedLearning && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full shadow-lg">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">Edit Learning Item</h1>

            <input
              type="text"
              value={editedLearning.title}
              onChange={(e) => setEditedLearning({ ...editedLearning, title: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg shadow-sm text-black mb-4"
              placeholder="Title"
            />

            <textarea
              value={editedLearning.content}
              onChange={(e) => setEditedLearning({ ...editedLearning, content: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg shadow-sm text-black mb-4"
              placeholder="Content"
            />

            <div className="text-xs text-gray-500 mb-4">
              <select
                value={editedLearning.source}
                onChange={(e) => setEditedLearning({ ...editedLearning, source: e.target.value })}
                className="inline-block bg-blue-100 text-blue-900 px-3 py-0.5 rounded-full mr-2"
              >
                {availableSources.map((source) => (
                  <option key={source} value={source}>
                    {source}
                  </option>
                ))}
              </select>
              
              <select
                value={editedLearning.type}
                onChange={(e) => setEditedLearning({ ...editedLearning, type: e.target.value })}
                className="inline-block bg-green-100 text-green-900 px-3 py-0.5 rounded-full"
              >
                {availableTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mr-4"
              >
                Save Changes
              </button>
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
    </>
  );
}
