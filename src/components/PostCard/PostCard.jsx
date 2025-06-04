import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../../appwrite/database";
import "./PostCard.css";
function PostCard({ $id, title, image }) {
  return (
    <Link to={`/post/${$id}`} className="card-div">
      <div className="card-img-div">
        <img
          src={appwriteService.filePreview(image)}
          alt="image"
          style={{ height: "200px" }}
        />
      </div>
      <hr />
      <div className="card-title-div">
        <h2>{title.length > 20 ? title.slice(0, 30) + "..." : title}</h2>
      </div>
      <p>{}</p>
    </Link>
  );
}

export default PostCard;
