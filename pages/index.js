import { useEffect, useState } from 'react';
import Image from 'next/image';
import Episode from '@/components/Episode';
import { db, analytics } from '../firebase';
import { query, collection, getDocs } from 'firebase/firestore';

export default function Home() {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (analytics !== null) {
      console.log(analytics);
    }
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    const q = query(collection(db, 'episodes'));
    const querySnapshot = await getDocs(q);
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log(documents);

    setEpisodes(documents);
    setLoading(false);
  };

  return (
    <div className='min-h-screen bg-gray-50 text-black'>
      <div className='w-full h-52 bg-sky-400 overflow-hidden border-b border-stone-200'>
        <img src='/sky.jpg' className='max-w-full md:-mt-96 -mt-8' />
      </div>
      <div className='max-w-3xl mx-auto flex justify-between md:flex-row flex-col'>
        <div>
          <div className='-mt-20 mb-10 md:-mt-28 ml-5 md:ml-0 md:h-64 md:w-64 h-40 w-40 rounded-xl overflow-hidden border-neutral-500 border shadow-2xl'>
            <div className='w-full h-full bg-orange-100'>
              <Image src='/sunshine.gif' width='300' height='80' />
            </div>
          </div>
          <div className='pl-5 md:pl-0'>
            <a
              href='https://www.producthunt.com/posts/senpai-ai?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-senpai&#0045;ai'
              target='_blank'
            >
              <img
                src='https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=391831&theme=light'
                alt='Senpai&#0032;AI - Let&#0032;our&#0032;AI&#0032;guide&#0032;you&#0032;through&#0032;meditation | Product Hunt'
                className='w-52 md:w-64'
                width='250'
                height='54'
              />
            </a>
            <a
              href='https://www.producthunt.com/posts/senpai-ai?utm_source=badge-top-post-topic-badge&utm_medium=badge&utm_souce=badge-senpai&#0045;ai'
              target='_blank'
            >
              <img
                src='https://api.producthunt.com/widgets/embed-image/v1/top-post-topic-badge.svg?post_id=391831&theme=light&period=weekly&topic_id=43'
                alt='Senpai&#0032;AI - Let&#0032;our&#0032;AI&#0032;guide&#0032;you&#0032;through&#0032;meditation | Product Hunt'
                className='w-52 md:w-64 mt-3'
                width='250'
                height='54'
              />
            </a>
          </div>
        </div>
        <div className='p-5 md:pt-16 pt-10 max-w-md'>
          <h1 className='text-4xl font-extrabold leading-tight'>senpai ai</h1>
          <p className='text-sm text-gray-400 leading-tight mt-2'>
            with senpai ai, you'll have access to a variety of meditation styles
            and techniques, all designed to help you achieve a state of deep
            relaxation and mental clarity, we offer a range of guided
            meditations designed to help you connect with your inner self and
            cultivate a sense of calm and clarity, breathing exercises and
            visualization techniques to body scans and loving-kindness
            meditations, we have something for everyone.
          </p>
        </div>
      </div>
      <div className='max-w-3xl mx-auto mt-10 md:mt-20 p-5 md:p-0'>
        <h2>Sessions</h2>
        <div className='flex flex-col items-center mt-2'>
          {loading && (
            <div className='mt-20 h-10 w-10 bg-sky-200 border-4 border-green-100 animate-pulse rounded-full'></div>
          )}
          {episodes.map((episode) => (
            <Episode
              name={episode.name}
              date={episode.date}
              emoji={episode.emoji}
              url={episode.url}
            />
          ))}
        </div>
      </div>
      <div className='text-center mt-32 pb-5 text-sm text-gray-400'>
        All content © 2023 Senpai AI
      </div>
    </div>
  );
}
