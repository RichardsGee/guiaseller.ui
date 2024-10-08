import { Link, useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.css';
import { FaUser, FaLock } from 'react-icons/fa';
import handleGoogleSignIn from '../../hooks/handleGoogleSignIn';
import handleFacebookSignIn from '../../hooks/handleFacebookSignIn';
import handleSignIn from '../../hooks/handleSignIn';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && user) {
            navigate('/dashboard'); 
        }
    }, [user, loading, navigate]);

    const onSignIn = async (e) => {
        e.preventDefault();
        try {
            await handleSignIn({ email, password });
            navigate('/dashboard'); 
        } catch (error) {
            console.error("Error during sign in", error);
        }
    };

    return (
        <main className={styles.mainContainer}>
            <div className={styles.wrapper}>
                <form onSubmit={onSignIn}>
                    <h1>Login</h1>
                    
                    <div className={styles.inputBox}>
                        <input
                            type='text'
                            placeholder='Email...'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <FaUser className={styles.icon} />
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
                        Login
                    </button>
                    
                    <div className={styles.firebaseLogin}>
                        <button
                            type='button'
                            className={styles.facebook}
                            onClick={handleFacebookSignIn}
                        >
                            <img src="https://firebasestorage.googleapis.com/v0/b/travel-app-d9bdb.appspot.com/o/facebook_login.png?alt=media&token=276b0dc3-32d2-49a6-8a7b-9ae1daf37f6c" alt='Facebook logo' />
                            Login with Facebook
                        </button>
                        
                        <button
                            type='button'
                            className={styles.google}
                            onClick={handleGoogleSignIn}
                        >
                            <img src="https://firebasestorage.googleapis.com/v0/b/travel-app-d9bdb.appspot.com/o/google_login.png?alt=media&token=79cbb9cf-af16-4840-83e8-b6463317510e" alt='Google logo' />
                            Login with Google
                        </button>
                    </div>
                    
                    <div className={styles.registerLink}>
                        <p>
                            Don't have an account? <Link to='/sign-up'>Register</Link>
                        </p>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default LoginForm;