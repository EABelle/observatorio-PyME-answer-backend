import graphqlHTTP from 'express-graphql';
import {UserModel} from '../core/model/user.model';
import {User} from '../core/domain/User';
import {makeExecutableSchema} from 'graphql-tools';

export const typeDefs = `
    type User {
        id: ID
        name: String
        avatar: String
    }

    type Query {
        getUsers: [User]
        getOneUser(id: ID!): User
    }
    input UserInput {
        name: String
        avatar: String
    }
    type Mutation {
        createUser(input: UserInput): User
    }
`;
export const resolvers = {
    Query: {
        getUsers: () => UserModel.find(),
        getOneUser: (_root: any, {id}: { id: string }) => new Promise((resolve, reject) => {
            UserModel.findById(id, (err: Error, user: User) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(user);
                }
            });
        })
    },
    Mutation: {
        createUser: (_root: any, {input}: { input: User }) => {
            const newUser = new UserModel({
                name: input.name,
                avatar: input.avatar
            });
            newUser.id = newUser._id;

            return new Promise((resolve, reject) => {
                newUser.save((err: Error) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(newUser);
                    }
                });
            });

        }
    },

};

export const graphqlUserSchema = makeExecutableSchema({typeDefs, resolvers});

export const graphqlMiddleware = graphqlHTTP({
    schema: graphqlUserSchema,
    graphiql: true
});
