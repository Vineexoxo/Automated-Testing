import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";

const QrScanner = ({ setScanMessage, onClose }) => {
    const [scanResult, setScanResult] = useState(null);
    const scannerRef = useRef(null); // Ref to hold the scanner instance

    useEffect(() => {
        // Create the scanner instance only if it's not already created
        if (!scannerRef.current) {
            scannerRef.current = new Html5QrcodeScanner('reader', {
                qrbox: {
                    width: 250,
                    height: 250,
                },
                fps: 5,
            });
        }

        const success = (result) => {
            // Stop scanning after a successful scan
            if (scannerRef.current) {
                scannerRef.current.clear(); // Clear the scanner instance
            }
            setScanResult(result);
            setScanMessage("Scan successful: " + result);
            onClose(); // Close the popup after a successful scan
        };

        const error = (err) => {
            console.warn(err);
            setScanMessage("Incorrect QR code.");
        };

        // Start rendering the scanner
        scannerRef.current.render(success, error);

        // Cleanup function to stop the scanner and clear the DOM when the component unmounts
        return () => {
            if (scannerRef.current) {
                scannerRef.current.clear(); // This will stop the camera and clear the DOM
                scannerRef.current = null; // Clear the reference to prevent multiple instances
            }
        };
    }, [onClose]);

    return (
        <div>
            {scanResult ? (
                <div>
                    Success: {scanResult}
                    {/* Optionally add a button to reset the scanner */}
                    <button onClick={() => setScanResult(null)}>Scan Again</button>
                </div>
            ) : (
                <div id="reader"></div>
            )}
        </div>
    );
};

export default QrScanner;
