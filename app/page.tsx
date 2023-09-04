import Menu from "@/app/components/Menu";
import Top from "@/app/components/Top";


export default function Home() {
  return (
      <main className='flex min-h-screen flex-col items-center justify-between p-24'>
            <Top/>
        <h1 className='text-4xl font-semibold'>NextAuth Tutorial</h1>
              <Menu/>
      </main>
  )
}