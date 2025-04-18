"use client";

import { useState, useEffect } from "react";
import { fetchAnimeData } from "../actions/aniListFetch";

export default function CharacterVoiceStaff({ animeId }) {
  const defaultId = 16498;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const id = animeId || defaultId;
      setLoading(true);
      try {
        const animeData = await fetchAnimeData(id);
        if (!animeData) throw new Error("Failed to fetch anime data");
        setData(animeData);
        setError(null);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(
          "Failed to fetch data. Please check your connection or try again later."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [animeId]);

  if (loading) {
    return (
      <div className="p-4 rounded-lg shadow-md animate-pulse">
        <div className="w-full h-6 bg-gray-700 rounded mb-4"></div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="flex items-center space-x-3 bg-gray-800 p-2 rounded-lg"
            >
              <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
              <div className="flex flex-col space-y-2">
                <div className="w-24 h-4 bg-gray-700 rounded"></div>
                <div className="w-16 h-3 bg-gray-600 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) return <p className="text-red-400">{error}</p>;

  return (
    <div className="py-6 px-4 max-w-screen overflow-hidden min-w-0">
      <div className="max-w-screen-xl mx-auto w-full space-y-12 min-w-0">
        {/* Characters Section */}
        <div className="space-y-4 min-w-0 relative">
          <h2 className="text-white text-2xl font-semibold">
            Characters & Voice Actors
          </h2>
          <div className="relative max-w-full overflow-hidden">
            {/* Gradient Left */}
            <div className="absolute left-0 top-0 h-full w-8 z-10 bg-gradient-to-r from-[#0f0f1b] to-transparent pointer-events-none" />
            {/* Gradient Right */}
            <div className="absolute right-0 top-0 h-full w-8 z-10 bg-gradient-to-l from-[#0f0f1b] to-transparent pointer-events-none" />

            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-transparent max-w-full">
              <div className="flex gap-4 w-max pr-4">
                {data.characters.edges.map(({ node }) => (
                  <div
                    key={node.id}
                    className="flex flex-col items-center shrink-0 w-32"
                  >
                    <img
                      src={node.image.large}
                      alt={node.name.full}
                      className="w-28 h-28 rounded-full object-cover border-4 border-purple-500 shadow-lg"
                    />
                    <span className="mt-2 text-white text-center text-sm">
                      {node.name.full}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Staff Section */}
        <div className="space-y-4 min-w-0 relative">
          <h2 className="text-white text-2xl font-semibold">Staff</h2>
          <div className="relative max-w-full overflow-hidden">
            {/* Gradient Left */}
            <div className="absolute left-0 top-0 h-full w-8 z-10 bg-gradient-to-r from-[#0f0f1b] to-transparent pointer-events-none" />
            {/* Gradient Right */}
            <div className="absolute right-0 top-0 h-full w-8 z-10 bg-gradient-to-l from-[#0f0f1b] to-transparent pointer-events-none" />

            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-transparent max-w-full">
              <div className="flex gap-4 w-max pr-4">
                {data.staff.edges.map(({ node }) => (
                  <div
                    key={node.id}
                    className="flex flex-col items-center shrink-0 w-32"
                  >
                    <img
                      src={node.image.large}
                      alt={node.name.full}
                      className="w-28 h-28 rounded-full object-cover border-4 border-purple-500 shadow-lg"
                    />
                    <span className="mt-2 text-white text-center text-sm">
                      {node.name.full}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
