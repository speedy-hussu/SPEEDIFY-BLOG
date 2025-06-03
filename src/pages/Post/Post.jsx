import React, { useEffect, useState } from "react";
import appwriteServie from "../../appwrite/database";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import "./Post.css";
import { Container } from "../../components";

function Post() {
  const [post, setPost] = useState();
  const navigate = useNavigate();
  const { slug } = useParams();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId == userData.$id : false;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      appwriteServie.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
          setLoading(false);
        } else navigate("/");
      });
    } else navigate("/");
  }, [navigate, slug]);

  const deletPost = () => {
    let confirmation = confirm(
      `Are your sure to delete this post "${post.title}"`
    );
    if (confirmation) {
      appwriteServie.deletePost(post.$id).then((status) => {
        if (status) {
          appwriteServie.deleteFile(post.image);
          navigate(`/`);
        }
      });
    }
  };
  if (!post) return <p>loading</p>;
  return (
    <Container>
      <div className="post-div">
        <div className="post-left-col">
          <div className="post-image-div">
            <img src={appwriteServie.filePreview(post.image)} alt="img" />
          </div>
        </div>
        <div className="post-right-col">
          <div className="post-title-div">
            <h2>{post.title}</h2>
          </div>
          <div className="post-content-div">{parse(post.content)}</div>
          {isAuthor && (
            <div className="action-btns-div">
              <button
                className="post-edit-btn"
                onClick={() => {
                  navigate(`/edit-post/${post.$id}`);
                }}
              >
                Edit
              </button>
              <button className="post-dlt-btn" onClick={deletPost}>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}

export default Post;
