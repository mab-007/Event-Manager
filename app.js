const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');

const app = express();

app.use(bodyParser.json());


app.use('/graphql', 
graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
}));

mongoose.connect(`mongodb://${process.env.MONGO_USER}:${
    process.env.MONGO_PASSWORD}@test-project-shard-00-00-l0t1l.mongodb.net:27017,test-project-shard-00-01-l0t1l.mongodb.net:27017,test-project-shard-00-02-l0t1l.mongodb.net:27017/${process.env.MONGO_DB}?ssl=true&replicaSet=test-project-shard-0&authSource=admin&retryWrites=true&w=majority`
).then(() => {
    app.listen(3000);
})
.catch(err => {
    console.log(err);
});