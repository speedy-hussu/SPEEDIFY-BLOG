import { useEffect, useState } from "react";
import { Container, PostCard } from "../../components/index";
import appwriteServiceDb from "../../appwrite/database";
import { Query } from "appwrite";
import { useSelector } from "react-redux";
import "./Home.css";
import loginIllustration from "../../assets/login-illustration.png";
import noPostIllustration from "../../assets/no-post-illustration.png";

import CardsSkeleton from "../../Skeleton/CardsSkeleton";
function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = useSelector((state) => state.auth.userData);
  async function getAllPosts() {
    try {
      if (currentUser) {
        const allPosts = await appwriteServiceDb.getPosts([
          Query.equal("userId", currentUser.$id),
        ]);
        setLoading(false);
        if (allPosts) setPosts(allPosts.documents);
      }
    } catch (error) {
      console.error("Appwrite fetch error:", error);
    }
  }

  useEffect(() => {
    getAllPosts();
  }, []);
  if (loading) {
    if (currentUser) {
      return (
        <Container>
          <CardsSkeleton />
        </Container>
      );
    } else
      return (
        <Container>
          <div className="login-alert-div">
            <div className="login-alert">
              <img
                src={loginIllustration}
                alt="Login Illustration"
                height={350}
              />
              <h1>Login to see the posts</h1>
            </div>
          </div>
        </Container>
      );
  }

  if (posts.length == 0)
    return (
      <Container>
        <div className="login-alert-div">
          <div className="login-alert">
            <img
              src={noPostIllustration}
              alt="No post Illustration"
              height={350}
            />
            <h1> No posts Yet</h1>
          </div>
        </div>
      </Container>
    );
  return (
    <Container>
      <div className="home-div">
        {posts.map((post) => (
          <PostCard
            key={post.$id}
            $id={post.$id}
            title={post.title}
            image={post.image}
          />
        ))}
      </div>
    </Container>
  );
}

export default Home;
