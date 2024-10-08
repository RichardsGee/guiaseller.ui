import { Link, useNavigate } from 'react-router-dom';
import styles from './RegisterForm.module.css';
import { FaUser, FaLock, FaPencilAlt } from 'react-icons/fa';
import handleGoogleSignIn from '../../hooks/handleGoogleSignIn';
import handleFacebookSignIn from '../../hooks/handleFacebookSignIn';
import handleSignUp from '../../hooks/handleSignUp';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && user) {
            navigate('/dashboard'); 
        }
    }, [user, loading, navigate]);

    const onSignUp = async (e) => {
        e.preventDefault();
        try{
            await handleSignUp({ firstName, lastName, email, password });
            navigate('/dashboard'); 
        }catch(error){
            console.error("Error during sign up", error);
        }
    };

    return (
        <main className={styles.mainContainer}>
            <div className={styles.wrapper}>
                <form onSubmit={onSignUp}>
                    <h1>Register</h1>
                    <div>
                        <div className={styles.inputBox}>
                            <input
                                type='text'
                                placeholder='First Name...'
                                required
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <FaPencilAlt className={styles.icon} />
                        </div>
                        <div className={styles.inputBox}>
                            <input
                                type='text'
                                placeholder='Last Name...'
                                required
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <FaPencilAlt className={styles.icon} />
                        </div>
                    </div>
                    
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
                    <button type='submit' className={styles.loginButton}>Register</button>
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
                        <p>Already have an account? <Link to='/'>Login</Link></p>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default RegisterForm;