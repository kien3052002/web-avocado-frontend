import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Menu = ({ currPost }) => {
  const [posts, setPosts] = useState([]);
  const cat = currPost.category;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (cat != "") {
          const res = await axios.get(
            `http://localhost:8800/api/posts/?cat=${cat}`,
            {
              withCredentials: true,
              credentials: "include",
            }
          );
          setPosts(res.data);
        }
      } catch (err) {}
    };
    fetchData();
  }, [cat]);

  const capitalize = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  return (
    <div className="menu">
      {cat != null && <h1>Category: {capitalize(cat)}</h1>}
      {posts.map((post) => {
        if (post.id != currPost.id)
          return (
            <Link to={`/post/${post.id}`} key={post.id}>
              <div className="post" key={post.id}>
                <div className="image">
                  <img src={`../uploads/${post.img}`} />
                </div>
                <div className="content">
                  <h1>{post.title}</h1>
                  <span>
                    {post.date.slice(0, 10)} by <b>{post.username}</b>
                  </span>
                </div>
                <hr></hr>
              </div>
            </Link>
          );
      })}
    </div>
  );
};

export default Menu;
