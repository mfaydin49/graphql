const { nanoid } = require("nanoid");

const Mutation = {
  // User
  createUser: (parent, args, { pubsub, db }) => {
    const user = {
      id: nanoid(),
      fullName: args.data.fullName,
      age: args.data.age,
    };
    db.users.push(user);
    pubsub.publish("userCreated", { userCreated: user });
    return user;
  },

  updateUser: (parent, { id, data, db }) => {
    let userIndex = db.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new Error("User not found");
    }
    const updatedUser = (db.users[userIndex] = {
      ...db.users[userIndex],
      ...data,
    });

    return updatedUser;
  },

  deleteUser: (parent, { id }, { db }) => {
    const userIndex = db.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new Error("User not found");
    }
    const deletedUser = db.users[userIndex];
    db.users.splice(userIndex, 1);
    return deletedUser;
  },

  deleteAllUsers: ({ db }) => {
    const countOfDeletedUser = db.users.length;
    db.users = [];
    return { count: countOfDeletedUser };
  },

  // Post
  createPost: (parent, { data: { title, user_id } }, { db }) => {
    const post = { id: nanoid(), title, user_id };
    db.posts.push(post);
    return post;
  },

  updatePost: (parent, { id, data }, { db }) => {
    let postIndex = db.posts.findIndex((post) => post.id === id);
    if (postIndex === -1) {
      throw new Error("Post not found");
    }
    const updatedPost = (db.posts[postIndex] = {
      ...db.posts[postIndex],
      ...data,
    });

    return updatedPost;
  },

  deletePost: (parent, { id }, { db }) => {
    const postIndex = db.posts.findIndex((post) => post.id === id);
    if (postIndex === -1) {
      throw new Error("Post not found");
    }
    const deletedPost = db.posts[postIndex];
    db.posts.splice(postIndex, 1);
    return deletedPost;
  },

  deleteAllPosts: ({ db }) => {
    const countOfDeletedPost = db.posts.length;
    db.posts = [];
    return { count: countOfDeletedPost };
  },

  // Comment
  createComment: (parent, { data: { text, post_id, user_id } }, { db }) => {
    const comment = { id: nanoid(), text, post_id, user_id };
    db.comments.push(comment);
    return comment;
  },

  updateComment: (parent, { id, data }, { db }) => {
    let commentIndex = db.comments.findIndex((comment) => comment.id === id);
    if (commentIndex === -1) {
      throw new Error("Comment not found");
    }
    const updatedComment = (db.comments[commentIndex] = {
      ...db.comments[commentIndex],
      ...data,
    });

    return updatedComment;
  },

  deleteComment: (parent, { id }, { db }) => {
    const commentIndex = db.comments.findIndex((comment) => comment.id === id);
    if (commentIndex === -1) {
      throw new Error("comment not found");
    }
    const deletedComment = db.comments[commentIndex];
    db.comments.splice(commentIndex, 1);
    return deletedComment;
  },

  deleteAllComments: ({ db }) => {
    const countOfDeletedComment = db.comments.length;
    db.comments = [];
    return { count: countOfDeletedComment };
  },
};

module.exports = Mutation;
