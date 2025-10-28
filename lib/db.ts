import mongoose from "mongoose";
import { buffer } from "stream/consumers";

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  )
}

let cached = global.mongoose 

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

export async function dbConnect() {
    if(cached.conn) {    // if your connection is already established
        return cached.conn;

    }

    if(!cached.promise) { // if no connection is established and we are creating a new connection

        const opts = {
            bufferCommands : true,
            macpoolSize : 10,
        }
        mongoose.connect(MONGODB_URI,opts).then(()=>mongoose.connection)
    }
    try{
       cached.conn =  await cached.promise;
    }catch(err){
        cached.promise = null;
        throw err; 

    }
    return cached.conn;

}