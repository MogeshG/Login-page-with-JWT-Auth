import Fastify from "fastify";
import jwt from 'jsonwebtoken';
import env from 'dotenv';

env.config();

const fastify = Fastify();

const posts = [
    {
        username: "mogesh",
        age : 21
    },
    {
        username: "test",
        age : 20  
    }
];

const authenticator = async (req, reply, next) => {
    const header = req.headers['authorization'];
    if (!header) {
        reply.status(401).send({ error: 'Unauthorized: Missing authorization header' });
        return;
    }
    const token = header.split(' ')[1];
    try {
        const data = jwt.verify(token, process.env.ACCESS_TOKEN);
        req.user = data;
        next();
    } catch (error) {
        reply.status(403).send({ error: 'Forbidden: Invalid token' });
    }
};

fastify.get('/posts', { preHandler: authenticator }, (req, reply) => {
    console.log(req.user);
    const data = posts.filter((data)=> req.user.name === data.username)
    reply.send(data);
});

fastify.post('/token', (req, reply) => {
    reply.status(501).send({ error: 'Not Implemented' });
});

fastify.post('/login', (req, reply) => {
    const username = req.body.username;
    const user = { name: username };
    const accessToken = generateAccessToken(user);
    if (!accessToken) {
        reply.status(500).send({ error: 'Internal Server Error: Failed to generate access token' });
        return;
    }
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN);
    reply.send({ accessToken: accessToken, refreshToken: refreshToken});
});

const generateAccessToken = (user) => {
    try {
        return jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: '25s' });
    } catch (error) {
        console.error('Error generating access token:', error);
        return null;
    }
};

fastify.listen({ port: 4000 }, (err, address) => {
    if (err) {
        console.error('Error starting server:', err);
    } else {
        console.log('Server running at', address);
    }
});
