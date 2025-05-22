"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link" 

const Menu = () => {
    const [open,setOpen] = useState(false)
    return (
        <div className=''>
            <Image 
                src="/menu.jpg" 
                alt="" width={28} 
                height={28} 
                className="curser-pointer" 
                onClick={()=>setOpen(prev=>!prev)}
            />
            {
                open && (
                    <div className="absolute text-white left-0 top-20 w-full h-[calc(100vh-80px)] bg-black flex flex-col items-center justify-center gap-8 text-xl z-30">
                        <Link href="/">Home</Link>
                        <Link href="/list">Shop</Link>
                        <Link href="/contact">Contact</Link>
                        <Link href="/profile">Profile</Link>
                        <Link href="/">Logout</Link>
                        <Link href="/">Cart(1)</Link>
                    </div>
                )
            }
        </div>
    )
}
export default Menu