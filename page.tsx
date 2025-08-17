'use client'

import { useState, useEffect } from 'react'
import { Montserrat, Open_Sans } from 'next/font/google'
import { Menu, Sun, Moon } from 'lucide-react'
import Link from 'next/link'

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })
const openSans = Open_Sans({ subsets: ['latin'], variable: '--font-open-sans' })

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(isDarkMode)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('darkMode', darkMode.toString())
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className={`${montserrat.variable} ${openSans.variable} font-sans min-h-screen bg-neutral-light dark:bg-neutral-dark text-neutral-dark dark:text-neutral-light`}>
      <header className="bg-primary-brand text-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold font-display">Aigency</Link>
          <nav className="hidden md:flex space-x-6">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#pricing">Pricing</NavLink>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </nav>
          <div className="flex items-center space-x-4">
            <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-primary-brand-alt transition-colors duration-200">
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <label htmlFor="menu-toggle" className="cursor-pointer md:hidden">
              <Menu className="h-6 w-6" />
            </label>
          </div>
        </div>
      </header>
      <input type="checkbox" id="menu-toggle" className="hidden" />
      <div className="hidden bg-primary-brand text-white w-full md:hidden">
        <nav className="container mx-auto px-4 py-2 flex flex-col space-y-2">
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#pricing">Pricing</NavLink>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </nav>
      </div>
      <main>
        <section className="py-20 md:py-32 text-center">
          <h1 className="text-5xl md:text-7xl font-bold font-display mb-4 text-primary-brand">Aigency</h1>
          <p className="text-2xl md:text-3xl text-secondary-gray dark:text-secondary-orange mb-8">10x Yourself.</p>
          <button className="bg-primary-brand-alt text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-primary-brand transition duration-300">
            Get Started
          </button>
        </section>
      </main>
    </div>
  )
}

function NavLink({ href, children }) {
  return (
    <Link href={href} className="hover:text-accent-blue transition duration-300">
      {children}
    </Link>
  )
}