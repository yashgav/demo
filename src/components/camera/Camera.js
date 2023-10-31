import React, { useRef } from 'react';

function Camera() {
  const videoRef = useRef(null);
  let mediaStream = null;

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      mediaStream = stream;

      // Listen for the "ended" event on the video element
      videoRef.current.addEventListener('ended', handleCameraClosed);
    } catch (error) {
      console.error('Error accessing the camera:', error);
    }
  };

  const stopCamera = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => {
        track.stop();
        handleCameraClosed();
      });
      videoRef.current.srcObject = null;
      mediaStream = null;
    }
  };

  const handleCameraClosed = () => {
    alert('Camera is closing');
  };

  return (
    <div>
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={stopCamera}>Stop Camera</button>
      <video ref={videoRef} autoPlay playsInline />
    </div>
  );
}

export default Camera;
