import { cookies as getCookies } from "next/headers"


interface Props{
    prefix: string;
    value: string;
}

export const generateAuthCookies = async ({
    prefix,
    value,
}:Props) =>{
    const cookies = await getCookies();
            cookies.set({
            name: `${prefix}-token`, // "Payload token" mặc định
            value: value,
            httpOnly:true,
            path: "/",
        });
}