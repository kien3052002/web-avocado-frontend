import React, { useContext, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { AuthContext } from "../context/authContext";
import Error from "./Error.jsx";

const Write = () => {
  const state = useLocation().state;
  const [summary, setSum] = useState(state?.summary || "");
  const [title, setTitle] = useState(state?.title || "");
  const [content, setContent] = useState(state?.content || "");
  const [cat, setCat] = useState(state?.category || "");
  const [img, setImg] = useState(null);
  const [status, setStatus] = useState(state?.status || "draft");

  const { currUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    try {
      state
        ? await axios.put(
            `http://localhost:8800/api/posts/${state.id}`,
            {
              title,
              summary,
              content,
              cat,
              img: img ? imgUrl : "",
            },
            {
              withCredentials: true,
              credentials: "include",
            }
          )
        : await axios.post(
            "http://localhost:8800/api/posts/",
            {
              title,
              summary,
              content,
              cat,
              img: img ? imgUrl : "../default-thumbnail.jpg",
              date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
              withCredentials: true,
              credentials: "include",
            }
          );
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("img", img);
      const res = await axios.post(
        "http://localhost:8800/api/upload",
        formData,
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  if (currUser == null) {
    return <Error err="Authentication Error" msg="You are not authenticated" />;
  } else
    return (
      <div className="write">
        <div className="title">
          {state ? <h1>Edit Post</h1> : <h1>Create New Post</h1>}
        </div>
        <hr></hr>
        <div className="body">
          <div className="content">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              id="title"
              required={true}
            />
            <label htmlFor="summary">Summary</label>
            <div className="editorContainer" id="summary">
              <ReactQuill theme="snow" value={summary} onChange={setSum} />
            </div>
            <label htmlFor="content">Content</label>
            <div className="editorContainer" id="content">
              <ReactQuill theme="snow" value={content} onChange={setContent} />
            </div>
          </div>
          <div className="menu">
            <div className="item">
              <h1>Category</h1>
              <div className="cat">
                <input
                  type="radio"
                  checked={cat === "art"}
                  name="cat"
                  value="art"
                  id="art"
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor="art">Art</label>
              </div>
              <div className="cat">
                <input
                  type="radio"
                  checked={cat === "science"}
                  name="cat"
                  value="science"
                  id="science"
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor="science">Science</label>
              </div>
              <div className="cat">
                <input
                  type="radio"
                  checked={cat === "technology"}
                  name="cat"
                  value="technology"
                  id="technology"
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor="technology">Technology</label>
              </div>
              <div className="cat">
                <input
                  type="radio"
                  checked={cat === "cinema"}
                  name="cat"
                  value="cinema"
                  id="cinema"
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor="cinema">Cinema</label>
              </div>
              <div className="cat">
                <input
                  type="radio"
                  checked={cat === "design"}
                  name="cat"
                  value="design"
                  id="design"
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor="design">Design</label>
              </div>
              <div className="cat">
                <input
                  type="radio"
                  checked={cat === "food"}
                  name="cat"
                  value="food"
                  id="food"
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor="food">Food</label>
              </div>
              <div className="cat">
                <input
                  type="radio"
                  checked={cat === ""}
                  name="cat"
                  value=""
                  id="other"
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor="other">Other</label>
              </div>
            </div>
            <div className="item">
              <h1>Image</h1>
              <label htmlFor="imgFile">
                Upload thumbnail image for your post:
              </label>
              <br></br>
              <input
                type="file"
                id="imgFile"
                onChange={(e) => setImg(e.target.files[0])}
              />
            </div>
          </div>
        </div>
        <div className="publish">
          <button onClick={handleSubmit} disabled={title === ""}>
            Publish
          </button>
          {title === "" && <span>*Missing title</span>}
        </div>
      </div>
    );
};

export default Write;
