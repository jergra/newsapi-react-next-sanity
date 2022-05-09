import React, {useState, useEffect} from 'react'
import Head from 'next/head'
//import type { NextPage } from 'next'
import {client} from '../lib/client'

// const Home: NextPage = (articles, terms, query) => {
    const Home = ({...props}) => {
    const [showTop, setShowTop] = useState(false);


    useEffect(() => {
        const onScroll = () => {
            //console.log('window.pageYOffset:', window.pageYOffset)
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

    
    //console.log('articles:', articles)
    //console.log('articles.articles:', articles.articles)
    
    
    

    //console.log('terms in slug:', terms)

    return (
    <>
      <Head>
        <title>NewsAPI Articles</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        
      <div className="flex flex-col items-center justify-center bg-gray-200">
          <div className='flex w-[900px] mt-5'>
            <div className='w-[200px]'>
                <div className='bg-white p-2 w-[160px]'>Search erms:</div>
                <button
                    type="button" 
                    className='bg-white p-1 w-[60px] mt-8'
                >
                    <a  href='https://news-api.sanity.studio/desk' target="_blank">
                        Edit
                    </a>
                </button>
            </div>
            <div className='flex flex-wrap w-[700px] bg-white px-3 py-2'>
                {
                    props.terms.map((term: any, index: any) => (
                        <div 
                            key={index}
                            className=''
                        >
                            <div className="pr-2">{term}</div>
                        </div>
                    ))
                }
            </div>
        </div>
        <div className='flex w-[900px] mt-5'>
            <div className='w-[200px]'>
                <div className='bg-white p-2 w-[160px]'>This search:</div>
            </div>
            <div className='px-3 py-2 bg-white'>
                {props.query}
            </div>
        </div>
        
            
        <div className="flex flex-col justify-center w-2/3 m-auto mt-10">
             {
                props.articles.articles.map((newsItem: any, index: any) => (
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

    const termsFromSanity = '*[_type == "terms"]'
    const termsFetched = await client.fetch(termsFromSanity)

    console.log('termsFetched:', termsFetched)
    console.log('termsFetched[0].current:', termsFetched[0].current)
        
    // const apiResponseTerms = await fetch(
    //     'https://my-json-server.typicode.com/jergra/news-api-app-next/terms'
    // )
    
    // const termsJSON = await apiResponseTerms.json()
    // console.log('termsJSON fetched from db.json at github:', termsJSON)

    // const termsString = termsJSON[0]
    // console.log('termsString from termsJSON[0]:', termsString)

    const termsString = termsFetched[0].current
    console.log('termsString from termsFetched[0].current:', termsString )

    // const terms = termsString.split(',')
    // console.log("terms array from termsString.split(','):", terms)

    const terms = termsString.split(' ')
    console.log("terms array from termsString.split(' '):", terms)
    
    console.log('terms.length:', terms.length)

    let oneOrTwo = Math.floor(Math.random() * 2 + 1)
    console.log('one or two:', oneOrTwo)
    
    if (oneOrTwo === 1) {
        let randomPosition = Math.floor(Math.random() * terms.length)
        var selected = terms[randomPosition]
        console.log('one query term chosen in NewsList:', selected)
    }
    if (oneOrTwo === 2) {
        var randomPosition1 = Math.floor(Math.random() * terms.length)
        var randomPosition2 = Math.floor(Math.random() * terms.length)
        selected = terms[randomPosition1] + ' ' + terms[randomPosition2]
        console.log('two query terms chosen in NewsList:', selected)
    }

    const query = selected

    console.log('query in getServerSideProps:', query)
    
    const apiResponse = await fetch(
        `https://newsapi.org/v2/everything?q=${query}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`
            }
        }
    )

    const articles = await apiResponse.json()
    //console.log('articles in getServerSideProps:', articles)

    return {
        props: {
            articles,
            terms, 
            query
        }
    }
}

export default Home
