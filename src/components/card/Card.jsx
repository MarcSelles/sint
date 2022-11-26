const Card = ({ front, back, active, setStep }) => {
  return (
    <>
      <div
        class="group bg-transparent w-full h-[150px] rounded-xl overflow-hidden border border-[#f1f1f1]"
        style={{ perspective: '1000px' }}
      >
        <div
          class="relative w-full h-full text-center transition-all duration-700"
          style={{
            transformStyle: 'preserve-3d',
            transform: active ? 'rotateY(180deg)' : 'none'
          }}
        >
          <div
            class="flex items-center justify-center font-goose absolute w-full h-full backface bg-blue-200 text-black"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {front}
          </div>
          <div
            class="absolute w-full h-full bg-blue-300 text-white"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default Card;
