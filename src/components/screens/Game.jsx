import Image from 'next/image';
import { useState } from 'react';
import Dice from 'react-dice-roll';
import Card from '../card/Card';

const Game = () => {
  const [step, setStep] = useState(0);
  const [nrOfThrows, setNrOfThrows] = useState(0);

  const steps = [5, 1, 4, 2, 6, 6, 5];

  const getColumn = (step) => {
    if (step == 0) return 1;
    if (step < 6) return step + 1;
    if (step < 12 || (step > 19 && step < 28)) {
      switch (step) {
        case 20:
          return 8;
        case 21:
          return 7;
        case 6:
        case 22:
          return 6;
        case 7:
        case 23:
          return 5;
        case 8:
        case 24:
          return 4;
        case 9:
        case 25:
          return 3;
        case 10:
        case 26:
          return 2;
        case 11:
        case 27:
          return 1;
      }
    }
    if (step > 11 && step < 20) return step - 11;
    return step - 27;
  };
  const getRow = (step) => {
    if (step < 6) return 1;
    if (step < 12) return 2;
    if (step < 20) return 3;
    if (step < 28) return 4;
    return 5;
  };
  const getTopAndLeft = (step) => {
    const left = (getColumn(step) - 1) * 208;
    const top = (getRow(step) - 1) * (150 + 16);
    return { transform: `translate(${left}px, ${top}px)` };
  };

  return (
    <>
      <div className="absolute top-0 left-0 w-screen h-screen">
        <Image src="/img/ganzenbord.jpeg" layout="fill" objectFit="cover" />
      </div>
      <div className="absolute w-screen top-1 bg-red p-20 pr-10 flex justify-end z-10">
        <Dice
          onRoll={(value) => {
            setNrOfThrows((old) => ++old);
            setStep((old) => old + value);
          }}
          cheatValue={steps[nrOfThrows]}
          size={284}
          rollingTime={nrOfThrows == 6 ? 5000 : 1000}
          className="mt-1"
        />
      </div>
      <div className="min-h-screen flex flex-col justify-center">
        <div className="p-10 relative grid grid-cols-8 gap-4">
          <div
            className="absolute z-10 left-[135px] top-[115px] transition-transform duration-500"
            style={getTopAndLeft(step)}
          >
            <div className="-translate-x-1/2 -translate-y-1/2 rounded-full border-[8px] overflow-hidden w-[120px] h-[120px]">
              <Image src="/img/mask.jpeg" layout="fill" objectFit="cover" />
            </div>
          </div>
          <div className="col-start-2 col-span-1">
            <Card active={step == 1} setStep={setStep} front={1} />
          </div>
          <div className="col-span-1 relative before:absolute before:top-1/2 before:-translate-y-1/2 before:h-4 before:w-4 before:bg-gray-400 before:-z-10 before:-translate-x-full before:left-0">
            <Card active={step == 2} setStep={setStep} front={2} />
          </div>
          <div className="col-span-1 relative before:absolute before:top-1/2 before:-translate-y-1/2 before:h-4 before:w-4 before:bg-gray-400 before:-z-10 before:-translate-x-full before:left-0">
            <Card active={step == 3} setStep={setStep} front={3} />
          </div>
          <div className="col-span-1 relative before:absolute before:top-1/2 before:-translate-y-1/2 before:h-4 before:w-4 before:bg-gray-400 before:-z-10 before:-translate-x-full before:left-0">
            <Card active={step == 4} setStep={setStep} front={4} />
          </div>
          <div className="col-span-1 relative after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:h-4 after:w-4 after:bg-gray-400 after:-z-10 before:absolute before:top-1/2 before:-translate-y-1/2 before:h-4 before:w-4 before:bg-gray-400 before:-z-10 before:-translate-x-full before:left-0">
            <Card active={step == 5} setStep={setStep} front={5} />
          </div>
          <div className="col-span-1 col-start-1 after:absolute after:top-full relative after:left-1/2 after:-translate-x-1/2 after:h-4 after:w-4 after:bg-gray-400 after:-z-10">
            <Card active={step == 11} setStep={setStep} front={11} />
          </div>
          <div className="col-span-1 relative before:absolute before:top-1/2 before:-translate-y-1/2 before:h-4 before:w-4 before:bg-gray-400 before:-z-10 before:-translate-x-full before:left-0">
            <Card active={step == 10} setStep={setStep} front={10} />
          </div>
          <div className="col-span-1 relative before:absolute before:top-1/2 before:-translate-y-1/2 before:h-4 before:w-4 before:bg-gray-400 before:-z-10 before:-translate-x-full before:left-0">
            <Card active={step == 9} setStep={setStep} front={9} />
          </div>
          <div className="col-span-1 relative before:absolute before:top-1/2 before:-translate-y-1/2 before:h-4 before:w-4 before:bg-gray-400 before:-z-10 before:-translate-x-full before:left-0">
            <Card active={step == 8} setStep={setStep} front={8} />
          </div>
          <div className="col-span-1 relative before:absolute before:top-1/2 before:-translate-y-1/2 before:h-4 before:w-4 before:bg-gray-400 before:-z-10 before:-translate-x-full before:left-0">
            <Card active={step == 7} setStep={setStep} front={7} />
          </div>
          <div className="col-span-1 relative before:absolute before:top-1/2 before:-translate-y-1/2 before:h-4 before:w-4 before:bg-gray-400 before:-z-10 before:-translate-x-full before:left-0">
            <Card active={step == 6} setStep={setStep} front={6} />
          </div>
          <div className="col-span-1 col-start-1">
            <Card active={step == 12} setStep={setStep} front={12} />
          </div>
          <div className="col-span-1 relative before:absolute before:top-1/2 before:-translate-y-1/2 before:h-4 before:w-4 before:bg-gray-400 before:-z-10 before:-translate-x-full before:left-0">
            <Card active={step == 26} setStep={setStep} front={13} />
          </div>
          <div className="col-span-1 relative before:absolute before:top-1/2 before:-translate-y-1/2 before:h-4 before:w-4 before:bg-gray-400 before:-z-10 before:-translate-x-full before:left-0">
            <Card active={step == 14} setStep={setStep} front={14} />
          </div>
          <div className="col-span-1 relative before:absolute before:top-1/2 before:-translate-y-1/2 before:h-4 before:w-4 before:bg-gray-400 before:-z-10 before:-translate-x-full before:left-0">
            <Card active={step == 15} setStep={setStep} front={15} />
          </div>
          <div className="col-span-1 relative before:absolute before:top-1/2 before:-translate-y-1/2 before:h-4 before:w-4 before:bg-gray-400 before:-z-10 before:-translate-x-full before:left-0">
            <Card active={step == 16} setStep={setStep} front={16} />
          </div>
          <div className="col-span-1 relative before:absolute before:top-1/2 before:-translate-y-1/2 before:h-4 before:w-4 before:bg-gray-400 before:-z-10 before:-translate-x-full before:left-0">
            <Card active={step == 17} setStep={setStep} front={17} />
          </div>
          <div className="col-span-1 relative before:absolute before:top-1/2 before:-translate-y-1/2 before:h-4 before:w-4 before:bg-gray-400 before:-z-10 before:-translate-x-full before:left-0">
            <Card active={step == 18} setStep={setStep} front={18} />
          </div>
          <div className="col-span-1 relative after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:h-4 after:w-4 after:bg-gray-400 after:-z-10 before:absolute before:top-1/2 before:-translate-y-1/2 before:h-4 before:w-4 before:bg-gray-400 before:-z-10 before:-translate-x-full before:left-0">
            <Card active={step == 19} setStep={setStep} front={19} />
          </div>
          <div className="col-span-1 col-start-1 relative after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:h-4 after:w-4 after:bg-gray-400 after:-z-10 ">
            <Card active={step == 27} setStep={setStep} front={27} />
          </div>
          <div className="col-span-1 relative before:absolute before:top-1/2 before:-translate-y-1/2 before:h-4 before:w-4 before:bg-gray-400 before:-z-10 before:-translate-x-full before:left-0">
            <Card active={step == 26} setStep={setStep} front={26} />
          </div>
          <div className="col-span-1 relative before:absolute before:top-1/2 before:-translate-y-1/2 before:h-4 before:w-4 before:bg-gray-400 before:-z-10 before:-translate-x-full before:left-0">
            <Card active={step == 25} setStep={setStep} front={25} />
          </div>
          <div className="col-span-1 relative before:absolute before:top-1/2 before:-translate-y-1/2 before:h-4 before:w-4 before:bg-gray-400 before:-z-10 before:-translate-x-full before:left-0">
            <Card active={step == 24} setStep={setStep} front={24} />
          </div>
          <div className="col-span-1 relative before:absolute before:top-1/2 before:-translate-y-1/2 before:h-4 before:w-4 before:bg-gray-400 before:-z-10 before:-translate-x-full before:left-0">
            <Card active={step == 23} setStep={setStep} front={23} />
          </div>
          <div className="col-span-1 relative before:absolute before:top-1/2 before:-translate-y-1/2 before:h-4 before:w-4 before:bg-gray-400 before:-z-10 before:-translate-x-full before:left-0">
            <Card active={step == 22} setStep={setStep} front={22} />
          </div>
          <div className="col-span-1 relative before:absolute before:top-1/2 before:-translate-y-1/2 before:h-4 before:w-4 before:bg-gray-400 before:-z-10 before:-translate-x-full before:left-0">
            <Card active={step == 21} setStep={setStep} front={21} />
          </div>
          <div className="col-span-1 relative before:absolute before:top-1/2 before:-translate-y-1/2 before:h-4 before:w-4 before:bg-gray-400 before:-z-10 before:-translate-x-full before:left-0">
            <Card active={step == 20} setStep={setStep} front={20} />
          </div>
          <div className="col-span-1 col-start-1">
            <Card active={step == 28} setStep={setStep} front={28} />
          </div>
          <div className="col-span-1 relative before:absolute before:top-1/2 before:-translate-y-1/2 before:h-4 before:w-4 before:bg-gray-400 before:-z-10 before:-translate-x-full before:left-0">
            <Card active={step == 29} setStep={setStep} front={29} />
          </div>
          <div className="col-span-1 relative before:absolute before:top-1/2 before:-translate-y-1/2 before:h-4 before:w-4 before:bg-gray-400 before:-z-10 before:-translate-x-full before:left-0">
            <Card active={step == 30} setStep={setStep} front={30} />
          </div>
          <div className="col-span-1 relative before:absolute before:top-1/2 before:-translate-y-1/2 before:h-4 before:w-4 before:bg-gray-400 before:-z-10 before:-translate-x-full before:left-0">
            <Card active={step == 31} setStep={setStep} front={31} />
          </div>
          <div className="col-span-1 relative before:absolute before:top-1/2 before:-translate-y-1/2 before:h-4 before:w-4 before:bg-gray-400 before:-z-10 before:-translate-x-full before:left-0">
            <Card active={step == 32} setStep={setStep} front={32} />
          </div>
          <div className="col-span-1 relative before:absolute before:top-1/2 before:-translate-y-1/2 before:h-4 before:w-4 before:bg-gray-400 before:-z-10 before:-translate-x-full before:left-0">
            <Card active={step == 33} setStep={setStep} front={33} />
          </div>
          <div className="col-span-1 relative before:absolute before:top-1/2 before:-translate-y-1/2 before:h-4 before:w-4 before:bg-gray-400 before:-z-10 before:-translate-x-full before:left-0">
            <Card active={step == 34} setStep={setStep} front={34} />
          </div>
          <div className="col-span-1 relative before:absolute before:top-1/2 before:-translate-y-1/2 before:h-4 before:w-4 before:bg-gray-400 before:-z-10 before:-translate-x-full before:left-0">
            <Card active={step == 35} setStep={setStep} front={'Finish'} />
          </div>
        </div>
      </div>
      {
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-white z-50">
          <button onClick={() => setStep((step) => step - 1)}>KLIK</button>
        </div>
      }
    </>
  );
};

export default Game;
