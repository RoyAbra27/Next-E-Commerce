"use client";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function AddPost({ getPosts }: { getPosts: () => void }) {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  async function createPost(e: React.FormEvent) {
    e.preventDefault();
    const data = await fetch("/api/user/posts", {
      method: "POST",
      body: JSON.stringify({ title, content }),
    });
    
    if (data) {
      getPosts();
    }
  }

  return (
    <div>
      <form onSubmit={createPost} className="py-12">
        <input
          type="text"
          value={title}
          className="border-2 border-black rounded-md block"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          value={content}
          className="border-2 border-black rounded-md block"
          placeholder="Content"
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          type="submit"
          className="bg-teal-700 text-black font-medium py-2 px-4 rounded-md"
        >
          Make a new post!
        </button>
      </form>
    </div>
  );
}

//user_2PedYyT9nL9VLD7QgTPGX5FJH8m
