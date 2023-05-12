'use client';

import { Post } from "../page";

export default function PostSection({posts}:{posts:Post[]}) {

  return (
    <div>
      
      {posts?.map((post) => (
        <div key={post.id} className="text-lg py-6 bg-red-400 w-fit ">
          <h1>{post.title}</h1>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
