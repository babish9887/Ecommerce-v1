import { getServerSession } from "next-auth";
import MyAuthOptions from "../../lib/authOptions";

export default async function getSession(){
      return await  getServerSession(MyAuthOptions);
}