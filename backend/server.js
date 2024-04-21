import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import env from 'dotenv';


env.config();

const fastify = Fastify();
const prisma  =new PrismaClient();

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

// fastify.register(fastifyCors, {
//     origin: 'http://localhost:5173'
// });

const authenticator = async (req, reply, next) => {
    const header  = req.headers['authorization'];
    const token = header && header.split(' ')[1];
    const data = jwt.verify(token, process.env.ACCESS_TOKEN);
    req.user = data;
    console.log(1);
    req.data = data;
    next();
};

fastify.post('/login', async (req, reply) => {
    try {
        const username = req.body.username;
        const data =await prisma.user.findFirst({
            where: {
                username: req.body.username,
                password: req.body.password
            }
        });
        if(data){
            const user = { name:username }
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN);
            reply.accessToken = accessToken;
            reply.send("Login Successful \n"+"AccessToken:"+reply.accessToken);
        }
        else    
            reply.send("Invalid Credentials");

    } catch(err) {
        console.log(err);
    } 
});

fastify.post('/user', async (req, reply) => {
    console.log(req.body.username);
    const data =await prisma.user.findFirst({
            where: {
                username: req.body.username
            }
    });
    if(data)
        reply.send("User already Exist!!!");
    else{
        await prisma.user.create({
            data:{
                username : req.body.username,
                password: (req.body.password).toString()
            }
        });
        reply.send("Registered Successfully");
    }
});

fastify.get('/posts', { preHandler: authenticator }, (req, reply, done) => {
    console.log(req.user);
    const data = posts.filter((data)=> req.user.name === data.username)
    reply.send(data);
    done();
});

fastify.listen( {port:3001}, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
