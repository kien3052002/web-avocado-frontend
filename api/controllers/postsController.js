import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  var q =
    "SELECT p.id, `username`, `title`, `summary`, `img`, `avatar`, `date`, `category`, `like`, `dislike`, `uid` FROM users u JOIN posts p ON u.id = p.uid ORDER BY `date` DESC";

  if (req.query.cat)
    q =
      "SELECT p.id, `username`, `title`, `summary`, `img`, `avatar`, `date`, `category`, `like`, `dislike`, `uid` FROM users u JOIN posts p ON u.id = p.uid WHERE category=? ORDER BY `date` DESC";

  if (req.query.s)
    q =
      "SELECT p.id, `username`, `title`, `summary`, `img`, `avatar`, `date`, `category`, `like`, `dislike`, `uid` FROM users u JOIN posts p ON u.id = p.uid WHERE `title` LIKE ? ORDER BY `date` DESC";

  var filter = req.query.cat ? req.query.cat : "%" + req.query.s + "%";

  db.query(q, [filter], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

export const getPost = (req, res) => {
  const q =
    "SELECT p.id, `username`, `title`, `summary`, `content`, `img`, `avatar`, `date`, `category`, `uid`, `like`, `dislike` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
};

export const getMyPosts = (req, res) => {
  var q =
    "SELECT p.id, `username`, `title`, `summary`, `img`, `avatar`, `date`, `category`, `like`, `dislike`, `uid` FROM users u JOIN posts p ON u.id = p.uid WHERE `uid` = ? ORDER BY `date` DESC";

  db.query(q, [req.query.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO posts(`title`, `summary`,`content`, `category`, `img`, `date`,`uid`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.summary,
      req.body.content,
      req.body.cat,
      req.body.img,
      req.body.date,
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post Created.");
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const id = req.params.id;
    const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

    db.query(q, [id, userInfo.id], (err, data) => {
      if (err) return res.status(403).json(err);

      return res.json("Post deleted!");
    });
  });
};

export const updatePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    var q = "";
    var values = [];

    if (req.body.img == "") {
      q =
        "UPDATE posts SET `title`=?, `summary`=?, `content`=?, `category` = ? WHERE `id` = ?";
      values = [
        req.body.title,
        req.body.summary,
        req.body.content,
        req.body.cat,
        postId,
      ];
    } else {
      q =
        "UPDATE posts SET `title`=?, `summary`=?, `content`=?, `category` = ?, `img`= ? WHERE `id` = ?";
      values = [
        req.body.title,
        req.body.summary,
        req.body.content,
        req.body.cat,
        req.body.img,
        postId,
      ];
    }

    db.query(q, [...values], (err, data) => {
      console.log(values);
      if (err) return res.status(500).json(err);
      return res.json("Post Updated");
    });
  });
};

export const reactPost = (req, res) => {
  const q =
    "INSERT INTO reactions (`pid`, `uid`, `reaction`) VALUES ( ?, ?, ?) ON DUPLICATE KEY UPDATE `reaction`=?";
  const values = [req.params.id, req.params.uid, req.body.reaction];

  if (req.body.currReaction != "") {
    const minus =
      "UPDATE posts SET posts." +
      req.body.currReaction +
      " = posts." +
      req.body.currReaction +
      " - 1 WHERE `id` = ?";

    db.query(minus, [req.params.id], (err, data) => {
      if (err) console.log(err);
      console.log("currReaction = " + req.body.currReaction);
    });
  }

  if (req.body.reaction != "") {
    const plus =
      "UPDATE posts SET posts." +
      req.body.reaction +
      " = posts." +
      req.body.reaction +
      " + 1 WHERE `id` = ?";

    db.query(plus, [req.params.id], (err, data) => {
      if (err) console.log(err);
      console.log("reaction = " + req.body.reaction);
    });
  }

  db.query(q, [...values, req.body.reaction], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Reacted!!");
  });
};

export const getReact = (req, res) => {
  const q = "SELECT `reaction` FROM reactions WHERE `pid` = ? AND `uid` = ? ";

  db.query(q, [req.params.id, req.params.uid], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data[0] === undefined) return "";
    return res.json(data[0].reaction);
  });
};
