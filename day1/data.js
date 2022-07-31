let users = [
  { id: "1", fullName: "fullName 1", age: 1 },
  { id: "2", fullName: "fullName 2", age: 12 },
  { id: "3", fullName: "fullName 3", age: 123 },
];

let posts = [
  { id: "1", title: "post 1", user_id: "1" },
  { id: "2", title: "post 2", user_id: "2" },
  { id: "3", title: "post 3", user_id: "3" },
];

let comments = [
  { id: "1", text: "comment 1", post_id: "1" },
  { id: "2", text: "comment 2", post_id: "2" },
  { id: "3", text: "comment 3", post_id: "3" },
];

module.exports = { users, posts, comments };
