import { server } from "./server";

server.listen(process.env.PORT, () => { 
    console.log(`Server listener at port ${process.env.PORT}`) 
})