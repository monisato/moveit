import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
    const { startNewChallenge } = useContext(ChallengesContext);

    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    
    // split vai tentar dividir o valor em duas strings, caso houver apenas um caracter, vai colocar '0' como default usando padStart
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    // ao clicar vai colocar como ativo
    function startCountdown() {
        setIsActive(true);
    }
    
    // pausa no useEffect()
    // altera o estado ativo ou inativo
    // reseta o tempo para 25min
    function  resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(0.1 * 60);
    }

    // iniciar cronometro quando tiver active=true e quando time foi alterado, 1000 = segundo
    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        } else if (isActive && time === 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time])

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>
            
            { hasFinished ? (
                <button 
                disabled
                className={styles.countdownButton}
            >
                Ciclo encerrado
            </button>
            ) : (
                <>
                { isActive ? (
                    <button 
                        type="button" 
                        className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                        onClick={resetCountdown}
                    >
                        Abandonar o ciclo
                    </button>
                ) : (
                    <button 
                        type="button" 
                        className={styles.countdownButton}
                        onClick={startCountdown}
                    >
                        Iniciar um ciclo
                    </button>
                ) }
                </>
            )}

        </div>
    );
}