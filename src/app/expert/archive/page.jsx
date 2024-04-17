"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ImageTitle from "@/components/ImageTitle";
import useArchive from "@/hooks/useArchive";
import ArchiveCard from "@/components/ArchiveCard";

export default function Archive() {
  const { getArchive } = useArchive();

  const [archive, setArchive] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadArchive();
  }, []);

  const loadArchive = async () => {
    const responseArchive = await getArchive();
    setArchive(responseArchive);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredArchive = archive.filter((file) =>
    file.vehicleMakerAndModel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <ImageTitle imgName="cars-archive.jpg" titleText="Archive" />
      <div>
        <div className="flex w-full justify-between mb-6">
          <h1 className="text-2xl font-medium text-cyan-900 mb-5">Archive</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search For Cars"
              className="px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-800 transition-colors duration-300 ease-in-out"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-5.2-5.2M15 11a4 4 0 11-8 0 4 4 0 018 0z"
                ></path>
              </svg>
            </span>
          </div>
          <button
            className="px-4 py-2 bg-cyan-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-800 transition-colors duration-300 ease-in-out hover:bg-cyan-800"
            type="button"
          >
            <Link href="/expert/archive/add-new-archive">Add to Archive</Link>
          </button>
        </div>
        <div className="flex flex-col gap-6 mb-10">
          {filteredArchive.length > 0 ? (
            filteredArchive.map((file) => (
              <ArchiveCard file={file} key={file.id} />
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>
      </div>
    </>
  );
}
