import { useState } from 'react';
import Game from '../components/screens/Game';
import Start from '../components/screens/Start';

const Index = () => {
  const [screen, setScreen] = useState('start');
  return <>{screen !== 'start' ? <Start onClick={() => setScreen('game')} /> : <Game />}</>;
};

export default Index;
