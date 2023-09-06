import Menu from "@/app/components/Menu";
import Top from "@/app/components/Top";
import AllPost from "@/app/components/allposts";

export default function Home() {
  return (
        <div>
            <Top/>
            <AllPost/>

        <h1 className='text-4xl font-semibold'>NextAuth Tutorial</h1>
            <Menu/>
        </div>
  )
}