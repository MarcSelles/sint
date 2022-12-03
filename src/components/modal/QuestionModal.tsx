import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Modal from '../Modal';

const QuestionModal = ({
  title,
  description,
  image1,
  image2,
  multipleChoice,
  timer,
  showModal,
  isPunishment,
  setShowModal,
  setIsPunishment,
  setPunishmentNr
}) => {
  const [useTimer, setUseTimer] = useState(0);
  const [timerEnded, setEnded] = useState(true);
  const onSuccess = () => {
    setShowModal(false);
    setIsPunishment(false);
    multipleChoice && toast.success('Helemaal goed, gooi nog een keer!');
  };

  const onFailed = () => {
    setIsPunishment(true);
    setShowModal(false);
    setPunishmentNr((nr) => ++nr);
  };

  useEffect(() => {
    if (timer) {
      setEnded(false);
      setTimeout(() => {
        setUseTimer(timer);
        let count = timer;
        const inter = setInterval(() => {
          count = count - 1;
          if (count > 0) {
            setUseTimer((seconds) => seconds - 1);
          } else {
            setUseTimer((seconds) => seconds - 1);
            setEnded(true);
            clearInterval(inter);
          }
        }, 1000);
      }, 3000);
    }
  }, [timer]);

  return (
    <Modal show={showModal}>
      <h2 className="text-3xl font-bold mb-5">{title}</h2>
      <p className="text-2xl mb-5">{description}</p>
      {multipleChoice && (
        <ul className="mb-4 flex justify-between">
          {multipleChoice.map((option, i) => (
            <li key={i}>
              <button
                className="p-2 bg-lime-600 rounded-2xl text-2xl min-w-[140px]"
                onClick={option.rightAnswer ? onSuccess : onFailed}
              >
                {option.title}
              </button>
            </li>
          ))}
        </ul>
      )}
      {useTimer !== 0 && <p className="text-4xl">{useTimer}</p>}
      {(image1 || image2) && (
        <div className="flex !space-x-1 items-center mb-4">
          <Image src={`/img/${image1}`} objectFit="cover" width={500} height={300} />
          <Image src={`/img/${image2}`} objectFit="cover" width={500} height={300} />
        </div>
      )}
      {!multipleChoice && !isPunishment && timerEnded && (
        <div className="flex justify-between w-full">
          <button onClick={onFailed} className="flex flex-col items-center">
            <Image
              src="/img/sad.png"
              width={80}
              height={100}
              objectFit="cover"
              objectPosition="bottom"
              className="rounded-full overflow-hidden"
            />
            <span className="mt-1 block">Helaas, niet gelukt</span>
          </button>
          <button onClick={onSuccess} className="flex flex-col items-center">
            <Image
              src="/img/happy.jpeg"
              width={80}
              height={100}
              objectFit="cover"
              objectPosition="bottom"
              className="rounded-full overflow-hidden"
            />
            <span className="mt-1 block">Topper, gelukt!</span>
          </button>
        </div>
      )}
      {isPunishment && (
        <button onClick={onSuccess} className="flex flex-col items-center">
          <Image
            src="/img/happy.jpeg"
            width={80}
            height={100}
            objectFit="cover"
            objectPosition="bottom"
            className="rounded-full overflow-hidden"
          />
          <span className="mt-1 block">Deal!</span>
        </button>
      )}
    </Modal>
  );
};

export default QuestionModal;
