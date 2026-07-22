import styles from '@/components/Footer.module.css';
import { faFacebook, faGithub, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Handbag } from 'lucide-react';
export const Footer = () => {

    const dataAtual = new Date();

    return (
        <footer className={styles.footer}>
            <div className={styles.logo}>
                <Handbag size={20} className={styles.bag} />
                <div>Shop<span style={{ color: '#2D6DE6' }}>Hub</span></div>
            </div>

            <div className={styles.copy}>
                &copy; {dataAtual.getFullYear()} ShopHub Todos os direitos reservados
            </div>

            <div className={styles.social}>
                <FontAwesomeIcon icon={faInstagram} />
                <FontAwesomeIcon icon={faFacebook} />
                <FontAwesomeIcon icon={faXTwitter} />
                <FontAwesomeIcon icon={faGithub} />

            </div>


        </footer>
    )
}