import { Menu, Search, Sun, X } from 'lucide-react'
import { useContext, useState } from 'react'
import { FaMoon } from 'react-icons/fa'
import { ThemeContext } from '../context/ThemeContext'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Navbar({ setArticles }) {
    const links = ["Business", "Entertainment", "General", "Health", "Science", "Sports", "Technology"]

    const { theme, setTheme } = useContext(ThemeContext)
    const [open, setOpen] = useState(false)

    // Toggle
    function toggleTheme() {
        if (theme === 'light') {
            setTheme('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            setTheme('light');
            localStorage.setItem('theme', 'light');
        }
    }

    // handleSearch
    async function handleSearch(e) {
        const search = e.target.value;
        try {
            const response = await axios.get(`https://newsapi.org/v2/top-headlines?q=${search}&apiKey=f5c0422261a045fb980f49d58831649b`)
            setArticles(response.data.articles)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='fixed w-full bg-white dark:bg-blue-900 z-10 shadow-md '>
            <div className='mx-auto max-w-7xl px-4 py-3 flex items-center justify-between'>
                {/* Logo */}
                <Link to={'/'}>
                    <div className='md:text-2xl text-lg font-bold text-blue-600 cursor-pointer dark:text-gray-100'>
                        NewsApp
                    </div>
                </Link>

                {/* Desktop Links */}
                <div className='hidden md:flex space-x-6'>
                    {links.map((link) => {
                        return <Link to={`${link.toLowerCase()}`} key={link} className='text-gray-700 hover:text-blue-600 transition cursor-pointer dark:text-gray-200 dark:hover:text-white'>
                            {link}
                        </Link>
                    })}
                </div>

                {/* menu-search-mode */}
                <div className='flex items-center justify-center gap-4'>
                    {/* Search Icon */}
                    <div className='relative bg-gray-200 p-2 rounded-lg'>
                        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
                        <input onChange={handleSearch} type='text' placeholder='Search News..' className='md:pl-10 pl-7 w-30 md:w-64 outline-none focus:outline-none' />
                    </div>
                    {/* Mode Toggle */}
                    <button onClick={toggleTheme} className='bg-gray-200 px-3 py-2 rounded-lg cursor-pointer'>
                        {theme === 'light' ? <FaMoon /> : <Sun />}
                    </button>
                    {/* Menu button */}
                    <button onClick={() => setOpen(!open)} className='md:hidden dark:text-gray-100 cursor-pointer'>
                        {open ? <X size={30} /> : <Menu size={30} />}
                    </button>
                </div>
            </div>
            {/* in case mobile */}
            {open && (
                <div className='md:hidden px-4 pb-4'> 
                    {
                    links.map((link) => {
                        return <Link to={`/${link.toLowerCase()}`} key={link} onClick={()=>setOpen(false)} className='block py-2 text-gray-700 dark:text-gray-200 dark:hover:text-white hover:text-blue-600 transition'>  
                            {link} 
                        </Link>
                    })
                    } 
                </div>

            )} 
        </div>
    )
}
