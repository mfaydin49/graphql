const Post = {
  user: (parent, { db }) => db.users.find((user) => user.id === parent.id),
  comments: (parent, { db }) =>
    db.comments.filter((comment) => comment.post_id === parent.id),
};

module.exports = Post;
