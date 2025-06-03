import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/database";
import { PostForm } from "../components/index";
import { useNavigate, useParams } from "react-router-dom";
function EditPost() {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();
  async function getPostData() {
    const postdata = await appwriteService.getPost(slug);
    if (postdata) {
      setPost(postdata);
      setLoading(false);
    }
  }
  useEffect(() => {
    try {
      if (slug) getPostData();
      else navigate("/");
    } catch (error) {
      console.log(error);
    }
  }, [navigate, slug]);
  if (loading) return <p>Loading</p>;
  return <PostForm post={post} />;
}

export default EditPost;
