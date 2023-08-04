import { EGameState } from '../App';
import styles from './HomeScreen.module.css';

interface IProps {
    setGameState: (value: EGameState) => void;
}

const HomeScreen = ({ setGameState }: IProps) => {
    return (
        <>
            <h1 className={styles.title}>Secret word</h1>
            <p className={styles.instruction}>
                Clique no botão abaixo para começar a jogar
            </p>
            <button
                onClick={() => {
                    setGameState(EGameState.started);
                }}
            >
                Começar jogo
            </button>
        </>
    );
};

export default HomeScreen;
