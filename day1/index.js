const { ApolloServer, gql } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
let { users, posts, comments } = require("./data");
const { nanoid } = require("nanoid");

const typeDefs = gql`
  # User
  type User {
    id: ID!
    age: Int!
    fullName: String!
    posts: [Post!]!
    comments: [Comment!]!
  }

  input CreateUserInput {
    fullName: String!
    age: Int!
  }

  input UpdateUserInput {
    fullName: String
    age: Int
  }

  # Post
  type Post {
    id: ID!
    title: String!
    user_id: ID!
    user: User!
    comments: [Comment!]!
  }

  input CreatePostInput {
    title: String!
    user_id: ID!
  }

  input UpdatePostInput {
    title: String
    user_id: ID
  }

  # Comment
  type Comment {
    id: ID!
    text: String!
    post_id: ID!
    user: User!
    post: Post!
  }

  input CreateCommentInput {
    text: String!
    post_id: ID!
    user_id: ID!
  }

  input UpdateCommentInput {
    text: String
    post_id: ID
    user_id: ID
  }

  type Query {
    # User
    users: [User!]!
    user(id: ID!): User!

    # Post
    posts: [Post!]!
    post(id: ID!): Post!

    # Comment
    comments: [Comment!]!
    comment(id: ID!): Comment!
  }

  type DeleteAll {
    count: Int!
  }

  type Mutation {
    # User
    createUser(data: CreateUserInput!): User!
    updateUser(id: ID!, data: UpdateUserInput!): User!
    deleteUser(id: ID!): User!
    deleteAllUsers: DeleteAll!

    # Post
    createPost(data: CreatePostInput!): Post!
    updatePost(id: ID!, data: UpdatePostInput!): Post!
    deletePost(id: ID!): Post!
    deleteAllPosts: DeleteAll!

    # Comment
    createComment(data: CreateCommentInput!): Comment!
    updateComment(id: ID!, data: UpdateCommentInput!): Comment!
    deleteComment(id: ID!): Comment!
    deleteAllComments: DeleteAll!
  }
`;

const resolvers = {
  Query: {
    // User
    users: () => users,
    user: (parent, args) => users.find((user) => user.id === args.id),

    // Post
    posts: () => posts,
    post: (parent, args) => posts.find((post) => post.id === args.id),

    // Comment
    comments: () => comments,
    comment: (parent, args) =>
      comments.find((comment) => comment.id === args.id),
  },

  Mutation: {
    // User
    createUser: (parent, args) => {
      const user = {
        id: nanoid(),
        fullName: args.data.fullName,
        age: args.data.age,
      };
      users.push(user);
      return user;
    },

    updateUser: (parent, { id, data }) => {
      let userIndex = users.findIndex((user) => user.id === id);
      if (userIndex === -1) {
        throw new Error("User not found");
      }
      const updatedUser = (users[userIndex] = { ...users[userIndex], ...data });

      return updatedUser;
    },

    deleteUser: (parent, { id }) => {
      const userIndex = users.findIndex((user) => user.id === id);
      if (userIndex === -1) {
        throw new Error("User not found");
      }
      const deletedUser = users[userIndex];
      users.splice(userIndex, 1);
      return deletedUser;
    },

    deleteAllUsers: () => {
      const countOfDeletedUser = users.length;
      users = [];
      return { count: countOfDeletedUser };
    },

    // Post
    createPost: (parent, { data: { title, user_id } }) => {
      const post = { id: nanoid(), title, user_id };
      posts.push(post);
      return post;
    },

    updatePost: (parent, { id, data }) => {
      let postIndex = posts.findIndex((post) => post.id === id);
      if (postIndex === -1) {
        throw new Error("Post not found");
      }
      const updatedPost = (posts[postIndex] = { ...posts[postIndex], ...data });

      return updatedPost;
    },

    deletePost: (parent, { id }) => {
      const postIndex = posts.findIndex((post) => post.id === id);
      if (postIndex === -1) {
        throw new Error("Post not found");
      }
      const deletedPost = posts[postIndex];
      posts.splice(postIndex, 1);
      return deletedPost;
    },

    deleteAllPosts: () => {
      const countOfDeletedPost = posts.length;
      posts = [];
      return { count: countOfDeletedPost };
    },

    // Comment
    createComment: (parent, { data: { text, post_id, user_id } }) => {
      const comment = { id: nanoid(), text, post_id, user_id };
      comments.push(comment);
      return comment;
    },

    updateComment: (parent, { id, data }) => {
      let commentIndex = comments.findIndex((comment) => comment.id === id);
      if (commentIndex === -1) {
        throw new Error("Comment not found");
      }
      const updatedComment = (comments[commentIndex] = {
        ...comments[commentIndex],
        ...data,
      });

      return updatedComment;
    },

    deleteComment: (parent, { id }) => {
      const commentIndex = comments.findIndex((comment) => comment.id === id);
      if (commentIndex === -1) {
        throw new Error("comment not found");
      }
      const deletedComment = comments[commentIndex];
      comments.splice(commentIndex, 1);
      return deletedComment;
    },

    deleteAllComments: () => {
      const countOfDeletedComment = comments.length;
      comments = [];
      return { count: countOfDeletedComment };
    },
  },

  User: {
    posts: (parent) => posts.filter((post) => post.user_id === parent.id),
    comments: (parent) =>
      comments.filter((comment) => comment.user_id === parent.id),
  },
  Post: {
    user: (parent) => users.find((user) => user.id === parent.id),
    comments: (parent) =>
      comments.filter((comment) => comment.post_id === parent.id),
  },
  Comment: {
    user: (parent) => users.find((user) => user.id === parent.user_id),
    post: (parent) => posts.find((post) => post.id === parent.post_id),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(({ url }) => console.log(`Apollo server is up at ${url}`));
