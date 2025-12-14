import connectDb from "@/lib/db";
import Image from "next/image";
import User from "./models/user.model";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import EditRoleMobile from "./components/EditRoleMobile";

async function Home() {
  await connectDb()
  //session ni access chesi user details em em unnayi ani telusukoni phone number undelaga choodali
  const session = await auth()
  const user=await User.findById(session?.user?.id)
  if(!user){
    redirect("/login")
  }
const inComplete=!user.mobile || !user.role || (!user.mobile && user.role=="user")
if(inComplete){
  return <EditRoleMobile/>
}
  return (
    <div>
    </div>
  );
}
export default Home
