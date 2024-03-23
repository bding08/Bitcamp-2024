import Link from 'next/link'
import { buttonVariants } from './ui/button'
import {Users} from 'lucide-react'

const navbar = () => {
  return (
    //' py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0'
    <div className='py-2 bg-zinc-100 border-b border-s-zinc-200 fixed w-full z-10 top-0'>
        <div className='container flex items-center justify-between'>
            <Link href='/'>
                <Users />
            </Link>
            <Link className={buttonVariants()} href='/sign-in'>
                Sign In
            </Link>
        </div>

    </div>
  )
}

export default navbar