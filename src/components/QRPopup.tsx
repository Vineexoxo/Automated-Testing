import React from 'react';
import QRCode from 'qrcode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faShare, faTimes } from '@fortawesome/free-solid-svg-icons';

interface QRPopupProps {
  isOpen: boolean;
  onClose: () => void;
  inviteLink: string;
  activeIndex: number;
}

const QRPopup: React.FC<QRPopupProps> = ({ isOpen, onClose, inviteLink, activeIndex }) => {
  const [qrCodeUrl, setQrCodeUrl] = React.useState<string>('');

  React.useEffect(() => {
    if (isOpen && inviteLink) {
      generateQRCode();
    }
  }, [isOpen, inviteLink]);

  const generateQRCode = async () => {
    try {
      const url = await QRCode.toDataURL(inviteLink, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      });
      setQrCodeUrl(url);
    } catch (err) {
      console.error('Error generating QR code:', err);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.download = 'striide-qr.png';
    link.href = qrCodeUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        const blob = await (await fetch(qrCodeUrl)).blob();
        const file = new File([blob], 'striide-qr.png', { type: 'image/png' });
        
        await navigator.share({
          title: 'Join me on Striide',
          text: 'Scan this QR code to join me on Striide!',
          files: [file],
          url: inviteLink
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#292732] p-6 rounded-lg max-w-sm w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Share QR Code</h2>
          <button onClick={onClose} className="text-white">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        
        {qrCodeUrl && (
          <div className="flex flex-col items-center gap-4">
            <div className="bg-white p-4 rounded-lg">
              <img src={qrCodeUrl} alt="QR Code" className="w-64 h-64" />
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 bg-[#00A886] text-white px-4 py-2 rounded-lg"
              >
                <FontAwesomeIcon icon={faDownload} />
                Download
              </button>
              
              {typeof navigator.share === 'function' && (
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 bg-[#00A886] text-white px-4 py-2 rounded-lg"
                >
                  <FontAwesomeIcon icon={faShare} />
                  Share
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRPopup;