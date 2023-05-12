"use client"

import { useEffect, useState } from "react";
import AddPost from "./components/addPost";
import PostSection from "./components/posts";
import { useAuth, useUser } from "@clerk/nextjs";
export interface Post {
  id: number;
  title: string;
  content: string;
}
const PostPage = () => {

  async function getPosts() {
    try{
      const res = await fetch('/api/user/posts');
   
      const data = await res.json() as Post[];

      setPosts(data);
      return data;
    }catch(err){
      console.log(err);
    }
  }

  const [posts, setPosts] = useState<Post[]>([]);
 
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div>
      <h1 className="text-[2em]">Posts</h1>
      <AddPost getPosts={getPosts}/>
      <PostSection posts={posts}/>
    </div>
  );
};

export default PostPage;
