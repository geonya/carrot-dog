import type { NextPage } from 'next';
import { useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';

interface DogResponses {
  url: string;
  isLiked: boolean;
}

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const { data, mutate: boundMutate } = useSWR<DogResponses>(
    'https://dogs-api.nomadcoders.workers.dev'
  );
  const toggleLiked = () => {
    if (!data) return;
    boundMutate((prev) => prev && { ...prev, isLiked: !prev.isLiked }, false);
  };
  const newDog = async () => {
    setLoading(true);
    await boundMutate();
    setLoading(false);
  };
  return (
    <div className='bg-black w-[100%] h-[100vh] flex flex-col items-center justify-center'>
      <h1 className='text-white text-4xl mb-5 font-bold'>Geony's Dog House</h1>
      <div className='w-[370px] min-h-[300px] rounded-lg overflow-hidden flex justify-center items-center'>
        {data && !loading ? (
          <video
            src={data.url}
            autoPlay
            loop
            playsInline
            className='w-[100%]'
          />
        ) : (
          <span className='text-white text-2xl font-bold'>Loading...</span>
        )}
      </div>
      <div className='space-x-8 mt-10'>
        <button
          className='bg-white p-3 px-16 text-black rounded-md'
          onClick={newDog}
        >
          New Dog!
        </button>
        <button
          className='bg-blue-500 p-3 px-16 text-white rounded-md'
          onClick={toggleLiked}
        >
          {data?.isLiked ? 'UnLike' : 'Like'}
        </button>
      </div>
    </div>
  );
};

export default Home;
