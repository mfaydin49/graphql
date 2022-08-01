const Comment = {
  user: (parent, { db }) => db.users.find((user) => user.id === parent.user_id),
  post: (parent, { db }) => db.posts.find((post) => post.id === parent.post_id),
};
module.exports = Comment;
