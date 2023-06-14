import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Pagination from "../components/Pagination";
import Carousel from "react-bootstrap/Carousel";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [currPage, setCurrPage] = useState(0);
  const [search, setSearch] = useState("");
  const pageSize = 5;

  const filter = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/posts${filter}`,
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
      {filter === "" ? (
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
      ) : (
        <div className="category-title">
          {filter[1] === "c" && (
            <h1>
              Category: <span>{filter.slice(5).toUpperCase()}</span>
            </h1>
          )}
          {filter[1] === "s" && (
            <h1>
              Search: <span>{filter.slice(3).toUpperCase()}</span>
            </h1>
          )}
        </div>
      )}

      <div className="searchbar">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <a href={search === "" ? "javascript:void(0)" : "/?s=" + search}>
          <button disabled={search === ""}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </a>
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
                {/* <div className="reaction">
                  <div>{post.like}</div>
                  <div>
                    <FontAwesomeIcon icon={faThumbsUp} />
                  </div>
                </div> */}
              </div>
              <div className="detail">
                <div>
                  Author:<br></br>
                  &nbsp;&nbsp;&nbsp;<span>{post.username}</span>
                </div>
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

export default Home;
