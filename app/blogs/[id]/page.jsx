'use client'

import { assets, blog_data } from '@/Assets/assets';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Footer from '@/Components/Footer';
import Image from 'next/image';
import axios from 'axios';

const ReadBlog = () => {
    const params = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true); // 👈 Add loading state

    const fetchBlogData = async () => {
        try {
            const response = await axios.get("/api/blogs", {
                params: {
                    id: params.id,
                }
            });
            setData(response.data);
        } catch (error) {
            console.error("Error fetching blog:", error);
        } finally {
            setLoading(false); // 👈 Stop loading
        }
    };

    const fetchData = () => {
        for (let i = 0; i < blog_data.length; i++) {
            if (Number(params.id) === blog_data[i].id) {
                setData(blog_data[i]);
                setLoading(false); // 👈 Stop loading
                break;
            }
        }
    };

    useEffect(() => {
        if (params?.id) {
            fetchBlogData();
            fetchData(); // fallback or local fetch
        }
    }, [params]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin shadow-lg shadow-blue-300"></div>
                <p className="mt-4 text-black text-lg font-medium">Loading blog...</p>
            </div>
        );
    }

    return (
        <>
            {data ? (
                <div>
                    <div className='bg-gray-200 py-5 px-5 md:px-12 lg:px-28'>
                        <div className='flex justify-between items-center'>
                            <Link href="/">
                                <Image src={assets.logo} width={180} alt="" className="w-[130px] sm:w-auto" />
                            </Link>
                            <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000]'>
                                Get Started
                                <Image src={assets.arrow} alt="arrow_logo" />
                            </button>
                        </div>
                        <div className='text-center my-24'>
                            <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>{data.title}</h1>
                            {data.author_img && (
                                <Image
                                    src={data.author_img}
                                    width={60}
                                    height={60}
                                    alt='author image'
                                    className='mx-auto mt-6 border border-white rounded-full'
                                />
                            )}
                            <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto'>{data.author?.username}</p>
                        </div>
                    </div>

                    <div className='mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10'>
                        <Image className='border-4 border-white' src={data.image} width={1280} height={720} alt='blog image' />
                        <p>{data.description}</p>

                        <p className='text-black font font-semibold my-4'>Share this article on Social Media</p>
                        <div className='flex gap-3'>
                            <Image src={assets.facebook_icon} alt='facebook_icon' />
                            <Image src={assets.twitter_icon} alt='twitter_icon' />
                            <Image src={assets.googleplus_icon} alt='googleplus_icon' />
                        </div>
                    </div>
                    <Footer />
                </div>
            ) : null}
        </>
    );
};

export default ReadBlog;
