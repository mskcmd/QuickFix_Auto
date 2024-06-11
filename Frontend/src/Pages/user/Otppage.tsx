import React, { useEffect, useState } from 'react';
import { verifyOtp } from '../../Api/user';
import { useNavigate } from 'react-router-dom';

const OTPComponent: React.FC = () => {
  const navigate = useNavigate();

    const [otp, setOTP] = useState<string>('');
    const [seconds, setSeconds] = useState(5);

    useEffect(() => {
        if (seconds > 0) {
            const timer = setInterval(() => setSeconds(seconds - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [seconds]);

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setOTP(e.target.value);
    };

    const handleVerify = async () => {
      console.log(otp);
      const result = await verifyOtp(otp)
      console.log("Result:", result?.data.result);
      console.log("fjsdhfjkds",result?.status);
      
      if(result?.status===200){
        navigate("/user/login")
      }else{
        console.log("erroor");
        
      }
    }

    const resendOTP = async () => {
        // Resend OTP logic
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen w-full bg-white">
            <div className="w-full max-w-md px-8 py-10 bg-white rounded-lg shadow-2xl transition-transform transform hover:scale-105">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Enter OTP</h1>
                <p className="text-gray-600 text-center mb-4">Code sent to your Email</p>
                <div className="flex justify-center my-4">
                    <input
                        type="text"
                        value={otp}
                        onChange={handleOTPChange}
                        maxLength={6}
                        className="w-2/3 p-2 rounded-lg bg-gray-100 text-gray-700 text-center outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div className="flex flex-col items-center mb-6">
                    <p className="text-gray-600 text-sm mb-2">
                        Didn't receive the code?{' '}
                        <span onClick={resendOTP} className="text-blue-500 cursor-pointer hover:underline">
                            Click here
                        </span>
                    </p>
                    <div className="text-gray-600 text-sm">
                        {seconds <= 0 ? (
                            <div>
                                OTP Expired{' '}
                                <span onClick={resendOTP} className="text-blue-500 cursor-pointer hover:underline">
                                    Request another?
                                </span>
                            </div>
                        ) : (
                            <div>
                                OTP expires in {minutes} min {remainingSeconds} sec
                            </div>
                        )}
                    </div>
                </div>
                <button
                    onClick={handleVerify}
                    className="w-full px-4 py-2 text-lg font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-transform transform hover:scale-105"
                >
                    Verify
                </button>
            </div>
        </div>
    );
};

export default OTPComponent;
