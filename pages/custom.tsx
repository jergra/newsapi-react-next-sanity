import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import {client} from '../lib/client'


const Custom = ({...props}) => {

    const [showTop, setShowTop] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            if (window.pageYOffset > 10) {
                setShowTop(true)
            } else {
                setShowTop(false)
            }
        };
    
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const goToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
    };

    return (
    <>
      <Head>
        <title>NewsAPI Articles</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        
      <div className="flex flex-col items-center justify-center bg-gray-200">
        <div className='flex mt-10'>
            <button 
                className="absolute self-start pt-1 pb-1 pl-3 pr-3 text-sm font-bold text-white bg-teal-500 rounded left-4 top-4"
            >
                <Link href="/">RANDOM</Link>
            </button>
            <button 
                className="absolute self-start pt-1 pb-1 pl-3 pr-3 text-sm font-bold text-white bg-teal-700 rounded right-4 top-4"
            >
                <Link href="/custom">CUSTOM</Link>
            </button>
            <div className='bg-white p-2 w-[160px] mr-5'>Custom term:</div>
            <div className="bg-white p-2 w-[220px] mr-5">{props.customString}</div>
            <button
                type="button" 
                className='bg-white p-1 w-[60px]'
            >
                <a  href='https://newsapi.sanity.studio/desk' target="_blank">
                    Edit
                </a>
            </button>
        </div>
        
        <div className="flex flex-col justify-center w-2/3 m-auto mt-10">
             {
                props.customArticles.articles.map((newsItem: any, index: any) => (
                    <div 
                        key={index}
                        className='mb-8 bg-white'
                    >
                        <div className="mb-2"><a href={newsItem.url} target='_blank' rel='noreferrer'><img src={newsItem.urlToImage} alt="" /></a></div>
                        <div className="px-4 mb-2 font-semibold"><a href={newsItem.url} target='_blank' rel='noreferrer'>{newsItem.title}</a></div>
                        <div className="px-4 mb-2 text-sm">{newsItem.description}</div>
                        <div className="px-4 mb-3 text-gray-500">{newsItem.source.name}</div>
                    </div>
                ))
            }
        </div>
        
        {showTop ? (
            <div className='fixed bottom-5 right-5'>
                <button 
                    className="pt-1 pb-1 pl-3 pr-3 text-sm font-bold text-white bg-teal-700 rounded"
                    onClick={goToTop}
                >
                    TOP
                </button>
            </div>
        ) : (
            <div></div>
        )}
      </div>
    </>
  )
}

export const getServerSideProps = async () => {

    const choicesFromSanity = '*[_type == "choices"]'
    const choicesFetched = await client.fetch(choicesFromSanity)

    // console.log('choicesFetched:', choicesFetched)
    // console.log('choicesFetched[0].custom:', choicesFetched[0].custom)
        
    const customString = choicesFetched[0].custom
    //console.log('customString:', customString)
    
    const customApiResponse = await fetch(
        `https://newsapi.org/v2/everything?q=${customString}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`
            }
        }
    )

    const customArticles = await customApiResponse.json()

    return {
        props: {
            customString,
            customArticles
        }
    }
}

export default Custom
