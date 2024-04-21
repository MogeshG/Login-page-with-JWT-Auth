import { PrismaClient } from "@prisma/client";

const prisma =new PrismaClient();

const main = async () => {
    // await prisma.user.create({
    //     data: {
    //         username : "Mogesh",
    //         password : "123",
    //     }
    // });
    const data =await prisma.user.findMany();
    console.log(data);

    // const del = await prisma.user.deleteMany({
    //     where: {
    //         username: {contains: ""}
    //     }
    // });
}
main().catch((err) => {
    console.log(err)
});
