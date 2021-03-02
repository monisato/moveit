import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';

import styles from '../styles/components/Profile.module.css';

export function Profile() {
    const { level } = useContext(ChallengesContext);

    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/monisato.png" alt="Monica Sato" />
            <div>
                <strong>Monica Sato</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level {level}
                </p>
            </div>         
        </div>
    ); 
}
// icons/level.svg aruqivos na pasta public não precisa do caminho completo