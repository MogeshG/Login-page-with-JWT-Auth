import Fastify from "fastify";
import fastifyCookie from '@fastify/cookie';

const fastify = Fastify();

fastify.register(fastifyCookie);

fastify.get('/', (req, reply) => {
    const expiration = new Date(2024, 5, 5);
    reply.setCookie("name", "Mogesh", { expires: expiration, secure: true, path: '/', httpOnly: false, sameSite:false, partitioned: false });
    const cookies = req.cookies;
    console.log("Cookies received:", cookies);
    reply.send("Hiiii");
});


fastify.listen({port: 8080}, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening on ${address}`);
});
