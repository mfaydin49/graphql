const User = {
  posts: (parent, { db }) =>
    db.posts.filter((post) => post.user_id === parent.id),
  comments: (parent, { db }) =>
    db.comments.filter((comment) => comment.user_id === parent.id),
};
module.exports = User;
