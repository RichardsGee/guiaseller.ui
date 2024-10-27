import { Link, useNavigate } from 'react-router-dom';
import styles from './RegisterForm.module.css';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import handleSignUp from '../../hooks/handleSignUp';
import { useState } from 'react';
import logo from '../../assets/logo.png'; // Importação do logo

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const onSignUp = async (e) => {
        e.preventDefault();
        try {
            await handleSignUp({ email, password, username });
            navigate('/dashboard'); 
        } catch (error) {
            console.error("Error during sign up", error);
        }
    };

    return (
        <main className={styles.mainContainer}>
            {/* Logo acima do contêiner de registro */}
            <img src={logo} alt="Logo" className={styles.logo} />

            <div className={styles.wrapper}>
                <form onSubmit={onSignUp}>
                    <h1>Register</h1>

                    <div className={styles.inputBox}>
                        <input
                            type='text'
                            placeholder='Username...'
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <FaUser className={styles.icon} />
                    </div>
                    
                    <div className={styles.inputBox}>
                        <input
                            type='email'
                            placeholder='Email...'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <FaEnvelope className={styles.icon} />
                    </div>

                    <div className={styles.inputBox}>
                        <input
                            type='password'
                            placeholder='Password...'
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FaLock className={styles.icon} />
                    </div>
                    
                    <button type='submit' className={styles.loginButton}>
                        Register
                    </button>

                    <div className={styles.registerLink}>
                        <p>
                            Already have an account? <Link to='/'>Sign In</Link>
                        </p>
                    </div>
                </form>
            </div>
            {/* Texto Guia Seller - Alpha Version */}
            <div className={styles.footerText}>
                Guia Seller - Alpha Version
            </div>
        </main>
    );
};

export default SignUp;
