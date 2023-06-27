import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import moment from "moment";
import { AuthContext } from "../context/authContext.js";
import {
  faPenToSquare,
  faThumbsDown,
  faThumbsUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { posts } from "../data.js";

const Single = () => {
  const id = useLocation().pathname.split("/")[2];
  const [post, setPost] = useState(() => {
    for (var i = 0; i < posts.length; i++) {
      if (posts[i].id == id) return posts[i];
    }
  });
  const [react, setReact] = useState("");
  const [currReact, setCurrReact] = useState("");
  const initialRender = useRef(-1);

  const { currUser } = useContext(AuthContext);

  useEffect(() => {
    if (initialRender.current >= 1) {
      setCurrReact(react);
    }
    if (initialRender.current < 1) {
      initialRender.current += 1;
    }
  }, [react]);

  return (
    <div className="single">
      <div className="image">
        <img src={`../uploads/${post.img}`} alt="" />
      </div>
      <div className="container">
        <div className="content">
          <h1 className="post-title">
            {post.title} {currReact} {react}
          </h1>
          <div className="user">
            <div className="info">
              {currUser != null && currUser.id === post.uid ? (
                <span>my post</span>
              ) : (
                <p>by {<span>{post.username}</span>}</p>
              )}
              <p>Posted {moment(post.date).fromNow()}</p>
            </div>
            {currUser != null && currUser.id === post.uid && (
              <div>
                <div className="edit">
                  <Link to={`/edit?id=${post.id}`} state={post}>
                    <button id="edit">
                      <FontAwesomeIcon icon={faPenToSquare} /> Edit
                    </button>
                  </Link>
                  <Link to={"/"}>
                    <button id="delete">
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
          <hr></hr>
          <div className="post-body">
            <div
              className="post-summary"
              dangerouslySetInnerHTML={{ __html: post.summary }}
            ></div>
            <div
              className="post-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></div>
          </div>
          <hr></hr>
          <div className="post-react">
            <div className="react">
              <div className="header">
                <h4>How do you feel about this post?</h4>
                <div className="stats">
                  <div id="like">
                    <FontAwesomeIcon icon={faThumbsUp} /> {post.like}
                  </div>
                  <div id="dislike">
                    <FontAwesomeIcon icon={faThumbsDown} /> {post.dislike}
                  </div>
                </div>
              </div>
              <div className="buttons">
                <button
                  id="like"
                  className={currReact === "like" ? "selected" : "none"}
                  onClick={() => {
                    currReact === "like" ? setReact("") : setReact("like");
                  }}
                >
                  <div>
                    <FontAwesomeIcon icon={faThumbsUp} />
                  </div>
                  Like
                </button>

                <button
                  id="dislike"
                  className={currReact === "dislike" ? "selected" : "none"}
                  onClick={() => {
                    currReact === "dislike"
                      ? setReact("")
                      : setReact("dislike");
                  }}
                >
                  <div>
                    <FontAwesomeIcon icon={faThumbsDown} />
                  </div>
                  Dislike
                </button>
              </div>
            </div>
          </div>
        </div>
        <hr></hr>
        <Menu currPost={post} />
      </div>
    </div>
  );
};

export default Single;
