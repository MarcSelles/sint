import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Confetti from 'react-confetti';
import Dice from 'react-dice-roll';
import { Toaster } from 'react-hot-toast';
import Card from '../card/Card';
import Modal from '../Modal';
import QuestionModal from '../modal/QuestionModal';

const content = [
  {
    title: 'We beginnen makkelijk!',
    description:
      'Assie en Matthies hebben een heerlijk busje om in mee te gaan op vakantie. Maar wat voor merk is het busje?',
    multipleChoice: [
      { title: 'Volvo', rightAnswer: false },
      { title: 'Volkswagen', rightAnswer: true },
      { title: 'Skoda', rightAnswer: false }
    ],
    image1: 'car-happy.jpeg',
    image2: 'car-sleep.jpeg'
  },
  {
    title: 'Snelle ronde!',
    description:
      'Wees snel! Je hebt een dyslexie voorsprong. Geef Noud een knuffel binnen 10 seconden! Je mag weg rennen Noud!',
    image1: 'hug-as-noud.jpeg',
    image2: 'dinner-noud-el.jpeg',
    timer: 10
  },
  {
    title: 'Feitjesronde',
    description:
      'Een echte Elise houdt van vakantie! Frankrijk, Italië, Spanje, het maakt allemaal niet uit. Dit jaar natuurlijk ook Mallorca, dus de vraag: Heeft Mallorca meer of minder dan 1 miljoen inwoners?',
    multipleChoice: [
      { title: '< 1.000.000', rightAnswer: true },
      { title: '> 1.000.000', rightAnswer: false }
    ],
    image1: 'friends.jpeg',
    image2: 'mallorca-do-lucia-am.jpeg'
  },
  {
    title: 'Familie is belangrijk!',
    description: 'Noem 15 familieleden in 20 seconden!',
    timer: 20,
    image1: 'family.jpeg',
    image2: 'escape-room.jpeg'
  },
  {
    title: 'Bierquizzz',
    description:
      "Bij het altijd bruisende Javaplein zijn veel barretjes en café's te vienden. Zo ook Oedipus in het badhuis tegenover je huis. Maaarrrrr... sinds wanneer zit Oedipus in het badhuis?",
    image1: 'pubquiz.jpeg',
    image2: undefined,
    multipleChoice: [
      { title: 'Altijd al', rightAnswer: false },
      { title: '2014', rightAnswer: false },
      { title: '2020', rightAnswer: true },
      { title: '2022', rightAnswer: false }
    ]
  },
  {
    title: 'Game master',
    description:
      'Laat je boomerang foo (of gil) skills zien! Speel 1 ronde tegen Assie en Matthies en win!',
    image1: undefined,
    image2: undefined
  }
];

const punishment = [
  {
    title: 'Aiii, dat was niet goed.',
    description: 'Haal het volgende rondje drinken voor iedereen!',
    image1: undefined,
    image2: undefined
  },
  {
    title: 'Oef, niet goed.',
    description: 'Laat iemand een straf verzinnen voor je. Roept u maar!',
    image1: undefined,
    image2: undefined
  },
  {
    title: 'Oeps, kan gebeuren',
    description: 'Sint en piet zien je fout door de vingers.',
    image1: undefined,
    image2: undefined
  },
  {
    title: 'Oeps, kan gebeuren',
    description: 'Sint en piet zien je fout door de vingers.',
    image1: undefined,
    image2: undefined
  },
  {
    title: 'Oeps, kan gebeuren',
    description: 'Sint en piet zien je fout door de vingers.',
    image1: undefined,
    image2: undefined
  },
  {
    title: 'Oeps, kan gebeuren',
    description: 'Sint en piet zien je fout door de vingers.',
    image1: undefined,
    image2: undefined
  },
  {
    title: 'Oeps, kan gebeuren',
    description: 'Sint en piet zien je fout door de vingers.',
    image1: undefined,
    image2: undefined
  },
  {
    title: 'Oeps, kan gebeuren',
    description: 'Sint en piet zien je fout door de vingers.',
    image1: undefined,
    image2: undefined
  },
  {
    title: 'Oeps, kan gebeuren',
    description: 'Sint en piet zien je fout door de vingers.',
    image1: undefined,
    image2: undefined
  }
];

const sixContent = {
  title: 'Kijk uit!',
  description: 'Je kent de regels, 3 keer 6 gooien is opnieuw beginnen!'
};

const Game = () => {
  const [step, setStep] = useState(0);
  const [nrOfThrows, setNrOfThrows] = useState(0);
  const [questionNr, setQuestionNr] = useState(-1);
  const [refPresent, setRefPresent] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showFinish, setShowFinish] = useState(false);
  const [showStart, setShowStart] = useState(true);
  const [showSix, setShowSix] = useState(false);
  const [isPunishment, setIsPunishment] = useState(false);
  const [punishmentNr, setPunishmentNr] = useState(-1);

  const card = useRef();
  const dice = useRef();
  const gridRef = useRef();

  const steps = [5, 1, 4, 2, 6, 6, 6, 5, 2, 4];

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
  const cardWidth = card.current?.offsetWidth;

  useEffect(() => {
    setRefPresent(true);
  }, []);

  const getTopAndLeft = (step) => {
    const left = (getColumn(step) - 1) * ((cardWidth ?? 192) + 16);
    const top = (getRow(step) - 1) * (150 + 16);
    return { transform: `translate(${left}px, ${top}px)` };
  };

  const rollTimeFunction = (nrOfThrows) => {
    if (nrOfThrows == 7) return 300;
    return nrOfThrows == 6 ? 5000 : 1000;
  };
  const rollTime = rollTimeFunction(nrOfThrows);

  return (
    <>
      <div className="absolute top-0 left-0 w-screen h-screen -z-20">
        <Image src="/img/ganzenbord.jpeg" layout="fill" objectFit="cover" />
      </div>
      <Toaster position="top-center" reverseOrder={false} />
      <div
        className="absolute w-screen top-[68px] right-5 bg-red p-20 pr-10 flex justify-end z-10"
        ref={dice}
      >
        <Dice
          onRoll={(value) => {
            if (step + value == 35) {
              setStep((old) => old + value);
              setShowFinish(true);
              return;
            }
            setNrOfThrows((old) => ++old);
            if (value !== 6) {
              setQuestionNr((old) => ++old);
              setShowModal(true);
            }

            if (nrOfThrows == 5) {
              setShowSix(true);
            }
            if (nrOfThrows == 6) {
              return setTimeout(() => dice.current.querySelector(':scope > *').click(), 1000);
            }
            setStep((old) => old + value);
          }}
          cheatValue={steps[nrOfThrows]}
          size={(gridRef.current?.offsetHeight / 7) * 2 ?? 284}
          rollingTime={rollTime}
          className="mt-1"
        />
      </div>
      <div className="min-h-screen flex flex-col justify-center z-40">
        <div className="p-10 relative grid grid-cols-8 gap-4" ref={gridRef}>
          <div
            className="absolute z-10 top-[115px] transition-transform duration-500"
            style={{
              ...getTopAndLeft(step),
              left: (cardWidth ?? 200) / 2 + 40
            }}
          >
            <div className="-translate-x-1/2 -translate-y-1/2 rounded-full border-[8px] overflow-hidden w-[120px] h-[120px]">
              <Image src="/img/mask.jpeg" layout="fill" objectFit="cover" />
            </div>
          </div>
          <div className="col-start-2 col-span-1" ref={card}>
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
          <div className="col-span-1 relative before:absolute before:top-1/2 before:-translate-y-1/2 before:h-4 before:w-4 before:bg-gray-400 before:-z-10 before:-translate-x-full before:left-0  ">
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

      <QuestionModal
        showModal={showModal}
        setShowModal={setShowModal}
        setIsPunishment={setIsPunishment}
        setPunishmentNr={setPunishmentNr}
        {...content[questionNr]}
      />
      <QuestionModal
        showModal={isPunishment}
        isPunishment
        setShowModal={setIsPunishment}
        setIsPunishment={setIsPunishment}
        setPunishmentNr={setPunishmentNr}
        {...punishment[punishmentNr]}
      />

      <Modal show={showStart}>
        <h2 className="text-3xl font-bold mb-5">Kort de spelregels</h2>
        <p className="text-2xl mb-2">
          Net als bij Ganzenbord is het de bedoeling dat je gooit en precies op finish eindigt. Elk
          vakje bevat een opdracht of vraag die moet worden uitgevoerd/beantwoord. Wanneer je een 6
          gooit mag je nog eens gooien, maar kijk uit! Als je 3 keer achter elkaar 6 gooit moet je
          opnieuw beginnen.
        </p>
        <p className="text-2xl mb-4">
          Nog een kleine tip: sommige vakjes bevatten opdrachten die gelijk uitgevoerd moeten
          worden. Leg dus de laptop gelijk weg als je hebt gegooid, dan kun je gelijk in actie
          komen.
        </p>
        <button onClick={() => setShowStart(false)} className="flex flex-col items-center">
          <Image
            src="/img/happy.jpeg"
            width={80}
            height={100}
            objectFit="cover"
            objectPosition="bottom"
            className="rounded-full overflow-hidden"
          />
          <span className="mt-1 block">Let's go!</span>
        </button>
      </Modal>

      <Modal show={showSix}>
        <h2 className="text-3xl font-bold mb-5">{sixContent.title}</h2>
        <p className="text-2xl mb-10">{sixContent.description}</p>
        <div className="flex justify-between w-full">
          <button
            onClick={() => {
              setShowSix(false);
            }}
            className="flex flex-col items-center"
          >
            <Image
              src="/img/happy.jpeg"
              width={80}
              height={100}
              objectFit="cover"
              objectPosition="bottom"
              className="rounded-full overflow-hidden"
            />
            <span className="mt-1 block">Ik kan dit!</span>
          </button>
        </div>
      </Modal>

      <Modal show={showFinish}>
        <h2 className="text-3xl font-bold mb-5">GEFELICITEERD</h2>
        <p className="text-2xl mb-4">
          Je kunt je cadeau vinden in de geneesmiddelen kist. Ga er gelijk heen, je hebt het
          verdiend!
        </p>
        <video autoPlay muted loop width={300} height={500}>
          <source src="/img/thumbs-up.mp4" type="video/mp4"></source>
        </video>
      </Modal>

      {showFinish && <Confetti />}
    </>
  );
};

// 7
// 1. Boomerang Foo
// 2. Knuffel Noud
// 3. Auto merk?

export default Game;
