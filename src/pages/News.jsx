import axios from 'axios'
import { useEffect, useState } from 'react'
import NewsCard from '../components/NewsCard';
import { Loader2 } from 'lucide-react';

export default function News({ country, category, articles, setArticles }) {
    // https://newsapi.org/v2/top-headlines?country=de&category=business&apiKey=API_KEY 

    const [loading, setLoading] = useState(false)
    async function fetchAllNews() {
        try {
            setLoading(true) 
            const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=f5c0422261a045fb980f49d58831649b`)

            setArticles(response.data.articles);
            
            console.log(response.data.articles)
        } catch (error) {
            console.log('error')
        }finally{
            setLoading(false) 
        }
    }

    useEffect(() => {
        fetchAllNews();
    }, [category])
    return <>
        {loading ? <div className='bg-gray-200 dark:bg-gray-800 h-screen flex flex-col gap-3 items-center justify-center'>  
            <Loader2 className='h-12 w-12 animate-spin dark:text-gray-200' />
            <h1 className='text-gray-800 text-xl font-semibold dark:text-gray-200'>Loading...</h1>
        </div>
            :
            <div className='min-h-screen bg-gray-200 dark:bg-gray-900 py-24 px-4 md:px-0'>
                <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-7'>
                    {
                        articles.map((article, index) => {
                            return <NewsCard key={index} article={article} />
                        })
                    }
                </div>
            </div>
        }

    </>
}

