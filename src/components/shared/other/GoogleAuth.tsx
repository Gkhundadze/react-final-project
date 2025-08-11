import { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import './google-auth.scss'
import { useOutsideClick } from '../../../hooks/useOutsideClick';
import { GoogleProfile } from '../../../interfaces/GoogleAuth';

export const GoogleAuth = () => {
    const [ user, setUser ] = useState(() => {
        const storedUser = sessionStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [ profile, setProfile ] = useState<GoogleProfile | null>(null);
    const [expanded, setExpanded ] = useState(false)

    const ref = useOutsideClick(() => {
        setExpanded(false)
      });

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setUser(codeResponse)
            
            sessionStorage.setItem('user', JSON.stringify(codeResponse))
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(() => {
        
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json',
                        },
                        
                    })
                    .then((res) => {
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
                    
                    
            }
        },[ user ]);
        const logOut = () => {
            googleLogout();
            setProfile(null);
            sessionStorage.removeItem('user')
        };
    
        return (
            <div className='auth-wrapper'>
                {profile ? (
                    <>
                        <img className='user-picture' onClick={() => {
                            setExpanded(!expanded)
                        }} src={profile.picture} alt="user image" />
                        <div ref={ref} className={`user-settings ${expanded ? 'expanded' : ''}`}>
                            <p>Hi: {profile.given_name + '. ' + profile.family_name[0] }</p>
                            <p>{profile.email}</p>
                            <button className='log-out' onClick={() => {
                                logOut()
                                setExpanded(false)
                            }}>Log out</button>
                        </div>
                    </>
                ) : 
                    <button className='log-in' onClick={() => {
                        login()
                    }}>Sign in </button>
                }
            </div>
        );
}