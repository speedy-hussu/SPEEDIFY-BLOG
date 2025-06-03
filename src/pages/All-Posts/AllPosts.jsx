import React, { useEffect, useState } from "react";
import appwriteService from "../../appwrite/database";
import { Container, PostCard } from "../../components";
import "./AllPosts.css";
import CardsSkeleton from "../../Skeleton/CardsSkeleton";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  async function getAllPosts() {
    const allPosts = await appwriteService.getPosts();
    if (allPosts) setPosts(allPosts.documents);
    setLoading(false);
  }
  useEffect(() => {
    getAllPosts();
  }, []);
  if (loading)
    return (
      <Container>
        <CardsSkeleton />
      </Container>
    );
  return (
    <Container>
      <div className="all-posts-div">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard
              key={post.$id}
              $id={post.$id}
              title={post.title}
              image={post.image}
            />
          ))
        ) : (
          <h1>No posts</h1>
        )}
      </div>
    </Container>
  );
}

export default AllPosts;
