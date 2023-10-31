import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPhoneNumber, PhoneAuthProvider } from 'firebase/auth';

// Replace with your Firebase config
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const PhoneVerification = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSendCode = async () => {
    try {
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber);
      setVerificationId(confirmation.verificationId);
    } catch (error) {
      console.error('Error sending verification code:', error);
    }
  };

  const handleVerifyCode = async () => {
    try {
      const credential = PhoneAuthProvider.credential(
        verificationId,
        code
      );
      await auth.signInWithCredential(credential);
      console.log('Phone number verified successfully!');
    } catch (error) {
      console.error('Error verifying code:', error);
    }
  };

  return (
    <div>
      <h2>Phone Number Verification</h2>
      <div>
        <input
          type="text"
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
        <button onClick={handleSendCode}>Send Verification Code</button>
      </div>
      {verificationId && (
        <div>
          <input
            type="text"
            placeholder="Enter verification code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button onClick={handleVerifyCode}>Verify Code</button>
        </div>
      )}
    </div>
  );
};

export default PhoneVerification;
