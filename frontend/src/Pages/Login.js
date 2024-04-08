import '../components/login.css';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { isValidPhoneNumber } from 'react-phone-number-input'
import { useEffect, useState } from 'react';
import backSpace from '../images/num-pad/backspace.png';
import rightIcon from '../images/num-pad/arrow-right.png';
import OtpPage from '../components/OtpPage';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import auth from '../firebase.init';
import ContinueByName from '../components/ContinueByName';
import OtpInput from 'react18-input-otp';
import login from '../images/num-pad/checkmark-circle-2.png';
import { useNavigate } from 'react-router-dom';
import UserContext from '../store/userContext';
import { useContext } from 'react';
import axios from 'axios';
import Loading from '../components/Loader/Loading';

const Login = () => {
    const userCtx = useContext(UserContext);
    // login screen
    const [number, setNumber] = useState('');
    const [valid, setValid] = useState(false);
    const [hideFooter, setHideFooter] = useState(false);

    // otp screen
    const [hidden, setHidden] = useState(false);;
    const [otp, setOtp] = useState("");
    const [Error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleChange = (enteredOtp) => {
        setOtp(enteredOtp);
    };
    // const handleChange = (element, index) => {
    //     if (isNaN(element.value)) return false;

    //     setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    //     //Focus next input
    //     if (element.nextSibling) {
    //         element.nextSibling.focus();
    //     }
    // };

    useEffect(()=>{
        if(localStorage.getItem('loggedInUser')){
            navigate('/home')
        }
    },[])

    const generateRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
            }
        }, auth);
    }

    const handleLoginSubmit = (event) => {
        const isValid = isValidPhoneNumber(number);
        setValid(isValid);
        generateRecaptcha();
        const appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, number, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
            }).catch((error) => {
                console.log('error', error);
            });
    }

    const handleVerify = (e) => {
        e.preventDefault();
        const confirmationResult = window.confirmationResult;
        confirmationResult.confirm(otp).then(async (result) => {
            
            setLoading(true);
            const res = await fetch(`http://localhost:5000/api/user/getUsers/${number}`);
            const data = await res.json();
            // fetch(`http://localhost:5000/api/user/getUsers/${number}`)
                // .then(res => res.json())
               
            if (data.length === 0 || data[0]?.registered === false) {
                setLoading(false);
                setHidden(true);
            }
            else {
                try{
                    const res = await axios.post(`http://localhost:5000/api/user/loginByNumber`,{number:number});
                    const data1 = res.data;
                    userCtx.setLogin(data1.user);
                    localStorage.setItem('loggedInUser',data1.token)
                    setLoading(false);
                    navigate("/home");
                }catch(e){
                    setLoading(false);
                    setError('Could not Login, try again');
                }
            }
        }).catch((error) => {
            setLoading(false);
            setError('Could not verify OTP');
        });
       
    }

    const resendOtp = () => {
        const appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, number, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
            }).catch((error) => {
                console.log('error', error);
            });
    }

    return (
        <div>
            <div style={{ paddingTop: "10vh" }} className="h-screen bg-[#FFFFFF] font-poppins ">
                {!valid &&
                    <div className=''>
                        <div className="flex flex-col justify-center h-screen -mt-32">
                            <p className='font-semibold text-[25px] mx-8 mb-4'>Welcome to <br /> Sanchaar</p>
                            <p className='text-lg text-[#00386D] font-semibold ml-8 mb-[7px] '>Enter Your Number</p>
                            <form onSubmit={handleLoginSubmit} className="w-full mx-auto">
                                <PhoneInput onClick={() => setHideFooter(true)} onMouseOut={() => setHideFooter(false)} className='border-[2px] border-[#EBF1F4] rounded-[10px] mx-6 pl-3 h-12 space-x-1 mb-4 text-lg'
                                    defaultCountry='IN'
                                    placeholder="Enter phone number"
                                    value={number}
                                    onChange={setNumber} />

                                <div className=' w-full mx-auto px-6 '>
                                    <button type='submit' className='w-full bg-[#1363DF] flex space-x-2 items-center justify-center rounded-lg h-12'>
                                        <p className='text-white font-semibold text-lg'>Verify</p>
                                        <img src={rightIcon} alt="" />
                                    </button>
                                </div>
                            </form>
                            <div className='flex items-center justify-center'>
                                {
                                    !hideFooter && <div className='font-normal text-sm text-center text-[#1B2328] fixed bottom-4'>
                                        <p>By continuing you will agree</p>
                                        <p>to our <span className='text-[#1363DF] font-semibold underline'>Terms & Conditions</span></p>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                }
                {
                    valid &&
                    // <OtpPage setValid={setValid} number={number}></OtpPage>
                    <>
                        <div className='h-full  '>
                            {loading && <Loading/>}
                            {!loading && <>{
                                !hidden &&
                                <div className='flex flex-col justify-center h-screen -mt-32'>
                                    <p className='font-semibold text-[25px]  mx-8 mb-2 leading-tight'>OTP Sent</p>
                                    <p className='mx-8 mb-4'>Waiting to automatically detect SMS <br /> sent to <span className='font-semibold text-[#1B2328]'>{number}</span></p>
                                    <form onSubmit={handleVerify}>
                                        <div onClick={() => setHideFooter(true)} onMouseOut={() => setHideFooter(false)} className='mx-6 flex items-center justify-between mb-6'>
                                            <OtpInput inputStyle={{
                                                width: "40px",
                                                height: "40px",
                                                border: '2px solid #D3DBE3',
                                                borderRadius: '10px',
                                                marginRight: '12px',
                                                fontSize: '22px',
                                                fontWeight: '500'
                                            }} value={otp} onChange={handleChange} numInputs={6} isInputNum />

                                            {/* {otp.map((data, index) => {
                                                return (
                                                    <input 
                                                        className="rounded-[10px] border-2 border-[#D3DBE3] w-10 h-10 mr-3 flex items-center justify-center text-center text-[22px] font-medium"
                                                        type="number"
                                                        name="otp"
                                                        maxLength="1"
                                                        key={index}
                                                        value={data}
                                                        onChange={e => handleChange(e.target, index)}
                                                        onFocus={e => e.target.select()}
                                                    />
                                                );
                                            })} */}
                                        </div>
                                        <div className='mx-6'>{Error && <p className='text-red-600'>{Error}</p>}</div>
                                        <div className='flex items-center justify-center space-x-4 mx-6 mb-4'>
                                            <button onClick={resendOtp} className='w-[176px] h-[52px] bg-[#DFF6FF] rounded-lg font-semibold text-lg text-[#416C87]'>Resend OTP</button>
                                            <button type='submit' className='flex items-center justify-center w-[176px] h-[52px] bg-[#1363DF] text-white text-lg font-semibold space-x-2 rounded-lg'>
                                                <img src={login} alt="" />
                                                <p>Login</p>
                                            </button>
                                        </div>
                                    </form>
                                    <p className='ml-6 text-[13px]'>Entered Wrong Number? <span onClick={() => setValid(false)} className='text-[#0093ED] font-semibold hover:cursor-pointer'>Edit Number</span></p>

                                    <div className='flex items-center justify-center'>
                                        {
                                            !hideFooter && <div className='font-normal text-sm text-center text-[#1B2328] absolute bottom-4'>
                                                <p>By continuing you will agree</p>
                                                <p>to our <span className='text-[#1363DF] font-semibold underline'>Term & Condition</span></p>
                                            </div>
                                        }
                                    </div>
                                </div>
                            }</>}
                            {
                                hidden &&
                                <ContinueByName number={number}></ContinueByName>
                            }
                        </div>
                    </>
                }
                <div id="recaptcha-container" className='mx-6'></div>
            </div>
        </div>
    )
}
export default Login;