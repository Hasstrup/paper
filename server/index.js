import express from 'express';
import mongoose from 'mongoose';
import graphqlHTTP from 'express-graphql';
import { makeExecutableSchema } from 'graphql-tools';
import dotenv from 'dotenv';
import morgan from 'morgan';
import typeDefs from './graphql/base';
import { loaders } from './graphql/loaders';
import resolvers from './graphql';

const app = express();
dotenv.config();
app.use(morgan('dev'));


const schema = makeExecutableSchema({ typeDefs, resolvers })

const context = {
  currentuser: null,
  loaders,
}

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
  context,
  formatError: error => ({
    message: error.message,
    state: error.originalError && error.originalError.state,
    locations: error.locations,
    path: error.path,
  }),
}));


mongoose.connect('mongodb://localhost/paperstack-c', {
});

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on ${process.env.PORT}`)
})
