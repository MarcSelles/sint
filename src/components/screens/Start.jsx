import Image from 'next/image';

const Start = ({ onClick }) => {
  return (
    <>
      <div className="h-screen w-screen absolute -z-10 top-0">
        <Image src="/img/gent-beer.jpeg" layout="fill" objectFit="cover" objectPosition="50% 35%" />
      </div>
      <div className="h-screen flex flex-col justify-between">
        <div className="font-goose mt-10 flex flex-col pt-8 items-center text-blue-500 bg-lime-100 px-4 rounded-xl bg-opacity-70 w-fit ml-[120px]">
          <span className="text-6xl">Oudhollands</span>
          <h1 className="text-[120px] flex mt-4">
            <span className="block mr-2 -rotate-[20deg]">E</span>
            <span className="block mr-2 -translate-y-4 -rotate-[16deg]">L</span>
            <span className="block mr-2 -translate-y-8 -rotate-[12deg]">I</span>
            <span className="block mr-2 -translate-y-10 -rotate-[8deg]">S</span>
            <span className="block mr-2 -translate-y-12">E</span>
            <span className="block mr-2 -translate-y-10 rotate-[8deg]">B</span>
            <span className="block mr-2 -translate-y-8 rotate-[12deg]">O</span>
            <span className="block mr-2 -translate-y-4 rotate-[16deg]">R</span>
            <span className="block rotate-[20deg]">D</span>
          </h1>
        </div>
        <div className="self-center">
          <button
            className="rounded-[32px] mb-20 p-4 text-6xl font-bold bg-red-500 font-goose"
            onClick={onClick}
          >
            Begin!
          </button>
        </div>
      </div>
    </>
  );
};

export default Start;
