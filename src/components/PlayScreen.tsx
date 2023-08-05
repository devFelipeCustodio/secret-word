import { FormEvent, useEffect, useRef, useState } from 'react';
import Letter from './Letter';
import styles from './PlayScreen.module.css';
import { EGameState } from '../App';

interface IProps {
    setGameState: (value: EGameState) => void;
    globalScore: number;
    updateGlobalScore: (value: number) => void;
}

const PlayScreen = ({
    setGameState,
    globalScore,
    updateGlobalScore,
}: IProps) => {
    const words = [
        ['cítrico', 'laranja'],
        ['frio', 'neve'],
        ['quente', 'sol'],
        ['doce', 'açúcar'],
        ['salgado', 'sal'],
        ['amargo', 'limão'],
        ['azedo', 'vinagre'],
        ['picante', 'pimenta'],
        ['macio', 'algodão'],
        ['duro', 'pedra'],
        ['líquido', 'água'],
        ['sólido', 'gelo'],
        ['gasoso', 'ar'],
        ['transparente', 'vidro'],
        ['opaco', 'parede'],
        ['brilhante', 'ouro'],
        ['fosco', 'papel'],
        ['leve', 'pena'],
        ['pesado', 'chumbo'],
        ['grande', 'elefante'],
        ['pequeno', 'formiga'],
        ['alto', 'montanha'],
        ['baixo', 'vale'],
        ['comprido', 'cobra'],
        ['curto', 'caracol'],
        ['largo', 'rio'],
        ['estreito', 'córrego'],
        ['rápido', 'leopardo'],
        ['lento', 'tartaruga'],
        ['forte', 'urso'],
        ['fraco', 'coelho'],
        ['novo', 'bebê'],
        ['velho', 'avô'],
        ['jovem', 'adolescente'],
        ['maduro', 'adulto'],
        ['claro', 'dia'],
        ['escuro', 'noite'],
        ['quente', 'verão'],
        ['frio', 'inverno'],
        ['seco', 'deserto'],
        ['rico', 'ouro'],
        ['pobre', 'papelão'],
        ['feliz', 'sorriso'],
        ['triste', 'lágrima'],
        ['calmo', 'lago'],
        ['agitado', 'mar'],
        ['cheio', 'barriga'],
        ['vazio', 'estômago'],
        ['saudável', 'fruta'],
        ['doente', 'remédio'],
        ['limpo', 'sabão'],
        ['sujo', 'lama'],
        ['molhado', 'chuva'],
        ['seco', 'sol'],
        ['macio', 'travesseiro'],
        ['duro', 'colchão'],
        ['grosso', 'livro'],
        ['fino', 'papel'],
        ['redondo', 'bola'],
        ['quadrado', 'caixa'],
        ['retangular', 'livro'],
        ['triangular', 'pirâmide'],
        ['alto', 'prédio'],
        ['longo', 'estrada'],
        ['largo', 'avenida'],
        ['estreito', 'beco'],
        ['lento', 'carroça'],
        ['forte', 'músculo'],
    ];

    // util
    const randomWord = () => {
        return words[Math.floor(Math.random() * words.length)];
    };
    const emptyArray = (): string[] => [];
    const calcMaxTries = (word: string) => (word.length > 5 ? 5 : 3);
    // states
    const [word, setWord] = useState(randomWord());
    const [letter, setLetter] = useState('');
    const [lettersLeft, setLettersLeft] = useState(word[1]);
    const [tries, setTries] = useState(emptyArray);
    const [maxTries, setMaxTries] = useState(calcMaxTries(word[1]));
    // refs
    const inputRef = useRef<null | HTMLInputElement>(null);

    // logic
    console.log(word[1]);

    const checkLetter = (e: FormEvent) => {
        e.preventDefault();
        inputRef.current && inputRef.current.focus();
        if (lettersLeft.includes(letter)) {
            setLettersLeft((prevLettersLeft) =>
                prevLettersLeft.replaceAll(letter, '')
            );
            setLetter('');
            return;
        } else if (word[1].includes(letter) && !tries.includes(letter)) {
            setLetter('');
            return;
        }
        setTries((prevTries) => [...prevTries, letter]);
        tries.length === maxTries - 1 && setGameState(EGameState.gameover);
        setLetter('');
    };

    // win condition
    useEffect(() => {
        if (lettersLeft.length < 1) {
            updateGlobalScore(calcScore(word[1]));
            newGame();
        }
    }, [lettersLeft]);

    const calcScore = (word: string): number => {
        let roundScore = 1000 * word.length;
        const vowels = word.match(/[aeiou]/g);
        if (vowels) {
            roundScore = roundScore / vowels.length;
        }
        return globalScore + Math.floor(roundScore);
    };
    const newGame = () => {
        const newWord = randomWord();
        setWord(newWord);
        setTries(emptyArray);
        setMaxTries(calcMaxTries(word[1]));
        setLettersLeft(newWord[1]);
        setGameState(EGameState.started);
    };

    return (
        <>
            <div className={styles.game_info}>
                <p className="text-bold">
                    Pontuação:{' '}
                    <span className={styles.score_number}>{globalScore}</span>
                </p>
                <h2>Adivinhe a palavra:</h2>
                <p className="text-bold">
                    Dica sobre a palavra:
                    <span className={styles.hint}> {word[0]}</span>
                </p>
                <p>Você ainda tem {maxTries - tries.length} tentativa(s).</p>
            </div>
            <div className={styles.word_container}>
                <div className={styles.letters_container}>
                    {
                        <Letter
                            word={word}
                            lettersLeft={lettersLeft}
                        />
                    }
                </div>
            </div>
            <div className={styles.user_interaction}>
                <label htmlFor="letterInput">
                    Tente adivinhar uma letra da palavra.
                </label>
                <form
                    onSubmit={checkLetter}
                    className={styles.form}
                >
                    <input
                        className={styles.letter_input}
                        type="text"
                        name="letterInput"
                        maxLength={1}
                        pattern="[a-zçãáàâéèêíìîóòôõúùû]"
                        autoFocus
                        ref={inputRef}
                        value={letter}
                        required
                        onChange={(e) => {
                            setLetter(e.target.value.toLowerCase());
                        }}
                    />
                    <button type="submit">jogar!</button>
                </form>
                <p>Letras já utilizadas:</p>
                <div>
                    {tries.map((letter, i) => (
                        <span
                            className={styles.failed_attempts}
                            key={i}
                        >
                            {tries.length < 1 ? letter : letter + ', '}
                        </span>
                    ))}
                </div>
            </div>
        </>
    );
};

export default PlayScreen;
