const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
// app.use(function (req, res, next) {
//   setTimeout(next, 2000);
// });

let users = [
  { id: 1, name: "Alpha", username: "alphaabc" },
  { id: 2, name: "Charlie", username: "charlieabc" },
  { id: 3, name: "Bravo", username: "bravoabc" },
];

app.get("/api", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

app.get("/api/get-all-users", (req, res) => {
  res.json(users);
});

app.post("/api/add-user", (req, res) => {
  const usersList = req.body;
  users.push(usersList);
  res.json({
    message: "New user was added to the list",
  });
});

app.put("/api/update-user", (req, res) => {
  const usersList = req.body;
  users = users.map((user) => {
    if (user.id === usersList.id) {
      return { ...user, name: usersList.name, username: usersList.username };
    }
    return user;
  });
  res.json({
    message: "updated user to the list",
  });
});

app.delete("/api/delete-user/:id", (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter((user) => user.id !== id);
  res.json({ message: "user deleted" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
