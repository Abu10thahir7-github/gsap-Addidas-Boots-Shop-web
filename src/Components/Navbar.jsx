"use client"
import React from 'react'
import { navbarLinks } from '../../constants'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Navbar = () => {
  useGSAP(()=>{
    const navTween = gsap.timeline({
      scrollTrigger:{
        trigger:'nav',
        start:'bottom top'
      }
    })
    navTween.fromTo('nav',{backgroundColor:"transparent"},{backgroundColor:'#00000050',
      backgroundFilter:'blur(10px)',
      duration:1,
      ease:'power1.inOut'
    })
  })
  return (
    <nav className='bg-black'>
    <div className='flex flex-row  w-[80%] m-auto justify-between
     p-4 '>
      <a href="#home" className='flex items-center
       gap-2 text-2xl font-bold text-white'>
        Velvet Mojito
       </a>
    <ul  className='flex flex-row gap-6 text-white'>
      {navbarLinks.map((link) => (
        <li key={link.id}>
          <a href={`#${link.id}`}>{link.title}</a>
        </li>
      ))}
    </ul>
    </div>
    </nav>
  )
}

export default Navbar
