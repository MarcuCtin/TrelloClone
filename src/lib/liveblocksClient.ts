import { Liveblocks } from "@liveblocks/node";
export const liveblocksClient = new Liveblocks({
    secret: process.env.LIVEBLOCKS_API_KEY || '',  
});