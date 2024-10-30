"use client";

import React from 'react';
import { IKUpload, ImageKitProvider } from 'imagekitio-next';

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

const authenticator = async () => {
    try {
        const res = await fetch("/api/upload-auth");
        if (!res.ok) {
            throw new Error("Authentication failed");
        }
        const data = await res.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        throw new Error("Authentication failed");
    }
}

interface UploadProps {
    onSuccess: (imageUrl: string) => void;
    onError: (error: any) => void;
    triggerUpload: boolean;
}

const Upload: React.FC<UploadProps> = ({ onSuccess, onError, triggerUpload }) => {
    const uploadRef = React.useRef<any>(null);

    React.useEffect(() => {
        if (triggerUpload && uploadRef.current) {
            uploadRef.current.click();
        }
    }, [triggerUpload]);

    const handleSuccess = (file: any) => {
        console.log("File uploaded successfully:", file);
        onSuccess(file.url);
    }

    const handleError = (error: any) => {
        console.log("Error uploading file:", error);
        onError(error);
    }

    return (
        <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
            <IKUpload
                useUniqueFileName
                onError={handleError}
                onSuccess={handleSuccess}
                style={{ display: 'none' }}
                ref={uploadRef}
            />
        </ImageKitProvider>
    )
}

export default Upload;