import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Pagination from "../components/Pagination";
import Carousel from "react-bootstrap/Carousel";
import { AuthContext } from "../context/authContext";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [currPage, setCurrPage] = useState(0);
  const pageSize = 5;

  const filter = useLocation().search;

  const { currUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/posts/myPosts`,
          { params: { id: currUser.id } },
          {
            withCredentials: true,
            credentials: "include",
          }
        );
        setPosts(res.data);
        setCurrPage(1);
      } catch (err) {}
    };
    fetchData();
  }, [filter]);

  const currPagePosts = useMemo(() => {
    const firstPageIndex = (currPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return posts.slice(firstPageIndex, lastPageIndex);
  }, [currPage]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  const capitalize = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  return (
    <div className="home">
      <Carousel className="carousel-slide" fade>
        {posts.slice(0, 4).map((post) => (
          <Carousel.Item key={post.id}>
            <div className="item">
              <div className="image">
                <img src={`../uploads/${post.img}`} />
              </div>
              <div className="detail">
                <h3 className="title">{post.title}</h3>
                <p>
                  by <span>{post.username}</span>
                </p>
                <p className="summary">{getText(post.summary)}</p>
                <Link to={`/post/${post.id}`}>
                  <button>Read more</button>
                </Link>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
      <div className="username">
        <h1>{currUser.username}</h1>
        <hr></hr>
        <h4>{posts.length} posts</h4>
      </div>
      <div className="posts">
        {currPagePosts.map((post) => {
          const date = post.date.slice(0, 10);
          const time = post.date.slice(11, 16);
          return (
            <Link className="post" key={post.id} to={`/post/${post.id}`}>
              <div className="image">
                <img src={`../uploads/${post.img}`} />
              </div>
              <div className="content">
                <h1 className="title">{post.title}</h1>
                <h1 className="summary">{getText(post.summary)}</h1>
              </div>
              <div className="detail">
                <div>
                  Published:<br></br>
                  &nbsp;&nbsp;&nbsp;<span>{date}</span> at <span>{time}</span>
                </div>
                <div>
                  Category:<br></br>
                  &nbsp;&nbsp;&nbsp;<span>{capitalize(post.category)}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <Pagination
        className="pagination-bar"
        currentPage={currPage}
        totalCount={posts.length}
        pageSize={pageSize}
        onPageChange={(page) => setCurrPage(page)}
      />
    </div>
  );
};

export default MyPosts;
