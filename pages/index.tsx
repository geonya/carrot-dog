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
    <div className='bg-gray-800 w-[100%] h-[100vh] flex flex-col items-center justify-center'>
      <h1 className='text-white text-4xl mb-9 font-bold'>Woof Woof 🐕</h1>
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
      <div className='space-x-20 mt-10'>
        <button
          className='bg-yellow-200 p-4 text-5xl text-black rounded-full hover:bg-yellow-300 hover:scale-110 hover:animate-bounce focus:bg-yellow-400 focus:scale-110'
          onClick={newDog}
        >
          🐶
        </button>
        <button
          className='bg-red-300 p-4 text-5xl text-black rounded-full hover:bg-red-400 hover:scale-110 hover:animate-bounce focus:bg-red-500 focus:scale-110'
          onClick={toggleLiked}
        >
          {data?.isLiked ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  );
};

export default Home;
