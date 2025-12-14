import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import connectDb from "./lib/db"
import User from "./app/models/user.model"
import bcrypt from "bcryptjs"
import Google from "next-auth/providers/google"
 

//1st user signin avvadaniki try chesthadi provider lo credentials use chesthadu sign in avuthadu 
//provider user ni return chestadi ante vadi details ni next-auth tokens generate chesthadi
//next callbacks ante user return avvagane (sign in avvagane) vadi info ni tokens catch chestayi and aa session lo store chestayi
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [ //credentials provider,google,github,facebook,twitter
    Credentials({
      credentials: { //frontend form nunchi ostundi store avuthadi
        email: { label: "email", type:"email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials,request){

          await connectDb()
          const email=credentials.email
          const password=credentials.password as string
          //user unda leda check chestunnam 
          const user=await User.findOne({email}) //email key and value same kabati okate sari rastuna
          //user dorakale 
          if(!user){
            throw new Error("User not found")
          }
          //user undu so check password
          //ikkade problem manam password ni hash chesi store chestham kabati aa bcrypt tho compare chesthe saripothadi
          const isMatch=await bcrypt.compare(password,user.password) 
          //match ayinda leda 
          if(!isMatch){
            throw new Error("Incorrect password")
          }
          //user return chestham ante session lo store avutadi
          return{
            id:user._id,
            email:user.email,
            name:user.name,
            role:user.role
          }
        }

    }),
    Google({
      clientId:process.env.GOOGLE_CLIENT_ID,
      clientSecret:process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks:{ //indulo provider nunchi login ayinaka user data token lo pedtham and token data session lo pettham
    //token lo user info store chestham
    //idi google di return values
    async signIn({user,account}){
      if(account?.provider=="google"){
        await connectDb()
        let dbUser=await User.findOne({email:user.email})
        if(!dbUser){
          dbUser =await User.create({
            name:user.name,
            email:user.email,
            image:user.image
          })
        }
        //google only name , email , image istadi migithadi maname ivali
        user.id=dbUser._id.toString()
        user.role=dbUser.role
      }
      return true
    },

    jwt({token,user}){ //token lo user info
      if(user){
        token.id=user.id,
        token.name=user.name,
        token.email=user.email,
        token.role=user.role //id,name,email default untayi but kothavi ante role lantivi raste next-auth ki velli role kuda pettali
        //itla declare cheyadaniki next-auth.d.ts ani oka d for declare file chesa src lo andulo kothavi emaina add cheyochu
      }
      //ikkada token ni return cheyyali token lo store chesamu danni pampinchali
      return token
    },
    //next session lo kuda user info store chestham adi tokens nunchi ostadi
    session({
      session,//session lo token info
      token
    }){
      if(session.user){
        session.user.id=token.id as string,
        session.user.name=token.name as string,
        session.user.email=token.email as string,
        session.user.role=token.role as string
      }
      return session
      //token ela rasamo anthey rayi session lo kuda
    }
  },
  pages:{
    signIn:"/login",
    error:"/login" //error vasthe kuda login page ki pampistadi
  },
  session:{ // indulo two types of strategies untayi 1. jwt 2.database
    strategy:"jwt", //session ni jwt lo store chestham
    maxAge: 10*24*60*60*1000 //1000 millisecs 60 secs 60 mins 24 hours 10 days --> 10 days ki signin avvali
  },
  secret:process.env.AUTH_SECRET //env lo set chesina secret key ivvali
})


//provider lo credentials use chesthunam ee steps
//connect dababase
//email exists? user exists : user dont exist
//password match? sign in : error
//return that user
