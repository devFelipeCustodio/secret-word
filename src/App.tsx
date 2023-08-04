import { useState } from 'react';
import './App.css';
import HomeScreen from './components/HomeScreen';
import PlayScreen from './components/PlayScreen';
import GameOverScreen from './components/GameOverScreen';

export enum EGameState {
    iddle,
    started,
    gameover,
}

function App() {
    const [gameState, setGameState] = useState(EGameState.iddle);
    const [globalScore, updateGlobalScore] = useState(0);

    return (
        <main className="container">
            {gameState === EGameState.iddle && (
                <HomeScreen setGameState={setGameState} />
            )}
            {gameState === EGameState.started && (
                <PlayScreen
                    setGameState={setGameState}
                    globalScore={globalScore}
                    updateGlobalScore={updateGlobalScore}
                />
            )}
            {gameState === EGameState.gameover && (
                <GameOverScreen
                    setGameState={setGameState}
                    updateGlobalScore={updateGlobalScore}
                    globalScore={globalScore}
                />
            )}
        </main>
    );
}

export default App;
