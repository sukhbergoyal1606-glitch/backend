const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const typeDefs = `#graphql
  type Task {
    id: ID!
    title: String!
    completed: Boolean!
  }

  type Query {
    tasks: [Task!]!
  }

  type Mutation {
    createTask(title: String!): Task!
  }
`;

const tasks = [
  {
    id: "1",
    title: "Learn GraphQL",
    completed: false,
  },
  {
    id: "2",
    title: "Build React frontend",
    completed: false,
  },
  {
    id: "3",
    title: "Connect frontend to backend",
    completed: true,
  },
];

const resolvers = {
  Query: {
    tasks: () => tasks,
  },

  Mutation: {
    createTask: (_, args) => {
      const newTask = {
        id: String(tasks.length + 1),
        title: args.title,
        completed: false,
      };

      tasks.push(newTask);

      return newTask;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`GraphQL server running at ${url}`);
}

startServer();