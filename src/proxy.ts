import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req:NextRequest){ //req etlantido telusukovadaniki ante manam ekkada unnam em access kavali ani

const {pathname}=req.nextUrl
//array of allowed routes 

const publicRoutes=["/login","/register","/api/auth"]

//ippudu ee publicRoutes ni annintiki server ki pampe laga cheyali

if(publicRoutes.some((path)=>pathname.startsWith(path))){
    return NextResponse.next()
}
//okavela token unte vadu authenticated kabati vadike ravali home page avvi
const token=await getToken({req,secret:process.env.AUTH_SECRET})
console.log(token)
console.log(req.url)
if(!token){
    const loginUrl=new URL("/login",req.url)
    loginUrl.searchParams.set("callbackUrl",req.url) //callback em chestadi searchParams lo okavela manam home page ki vellali anukunte frst login page lo ok ayi malli return home page ki veltham return
    return NextResponse.redirect(loginUrl) //output response ante 
}
return NextResponse.next()
}
export const config = {
  matcher: [
    //public folder and static assets or images ni exclude cheyu
    '/((?!api|_next/static|_next/images|favicon.ico).*)',
  ],
}
