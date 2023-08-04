import styles from './Letter.module.css';
interface TProps {
    word: string[];
    lettersLeft: string;
}
const Letter = ({ word, lettersLeft }: TProps) => {
    return (
        <>
            {[...word[1]].map((letter: string, i: number) => (
                <span
                    className={styles.letter}
                    key={i}
                >
                    {lettersLeft.includes(letter) ? '⠀' : letter}{' '}
                </span>
            ))}
        </>
    );
};

export default Letter;
