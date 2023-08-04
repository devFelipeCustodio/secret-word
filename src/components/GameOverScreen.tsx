import { EGameState } from '../App';
import styles from './GameOverScreen.module.css';

interface IProps {
    setGameState: (value: EGameState) => void;
    globalScore: number;
    updateGlobalScore: (value: number) => void;
}

const GameOverScreen = ({
    setGameState,
    globalScore,
    updateGlobalScore,
}: IProps) => {
    return (
        <>
            <div className={styles.flex_group}>
                <h2>Fim de jogo!</h2>
                <h3>
                    A sua pontuação foi:{' '}
                    <span className={styles.score_number}>{globalScore}</span>!
                </h3>
                <button
                    onClick={() => {
                        setGameState(EGameState.started);
                        updateGlobalScore(0);
                    }}
                >
                    Reiniciar
                </button>
            </div>
        </>
    );
};

export default GameOverScreen;
