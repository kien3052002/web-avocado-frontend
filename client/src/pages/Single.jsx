import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import moment from "moment";
import axios from "axios";
import { AuthContext } from "../context/authContext.js";
import {
  faPenToSquare,
  faThumbsDown,
  faThumbsUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Single = (props) => {
  const [post, setPost] = useState([]);
  const [react, setReact] = useState("");
  const [currReact, setCurrReact] = useState("");
  const initialRender = useRef(-1);

  const id = useLocation().pathname.split("/")[2];

  const navigate = useNavigate();

  const { currUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/posts/${id}`, {
          withCredentials: true,
          credentials: "include",
        });
        setPost(res.data);
      } catch (err) {}

      try {
        const res = await axios.get(
          `http://localhost:8800/api/posts/reaction/${id}/${currUser.id}`,
          {
            withCredentials: true,
            credentials: "include",
          }
        );
        setReact(res.data);
        setCurrReact(res.data);
      } catch (err) {}
    };
    fetchData();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8800/api/posts/${id}`, {
        withCredentials: true,
        credentials: "include",
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (initialRender.current >= 1) {
      const handleReact = async () => {
        try {
          await axios.post(
            `http://localhost:8800/api/posts/react/${id}/${currUser.id}`,
            {
              reaction: react,
              currReaction: currReact,
            },
            {
              withCredentials: true,
              credentials: "include",
            }
          );
        } catch (err) {}
      };
      handleReact();
      setCurrReact(react);
    }
    if (initialRender.current < 1) {
      initialRender.current += 1;
    }
  }, [react]);

  return (
    <div className="single">
      <div className="image">
        <img src={`../uploads/${post.img}`} />
      </div>
      <div className="container">
        <div className="content">
          <h1 className="post-title">
            {post.title} {currReact} {react}
          </h1>
          <div className="user">
            <div className="info">
              {currUser != null && currUser.username === post.username ? (
                <span>my post</span>
              ) : (
                <p>by {<span>{post.username}</span>}</p>
              )}
              <p>Posted {moment(post.date).fromNow()}</p>
            </div>
            {currUser != null && currUser.username === post.username && (
              <div>
                <div className="edit">
                  <Link to={`/edit?id=${post.id}`} state={post}>
                    <button id="edit">
                      <FontAwesomeIcon icon={faPenToSquare} /> Edit
                    </button>
                  </Link>
                  <Link onClick={handleDelete}>
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
