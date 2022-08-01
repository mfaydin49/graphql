const Query = {
  // User
  users: ({ db }) => db.users,
  user: (parent, args, { db }) => db.users.find((user) => user.id === args.id),

  // Post
  posts: ({ db }) => db.posts,
  post: (parent, args, { db }) => db.posts.find((post) => post.id === args.id),

  // Comment
  comments: ({ db }) => db.comments,
  comment: (parent, args, { db }) =>
    db.comments.find((comment) => comment.id === args.id),
};

module.exports = Query;
