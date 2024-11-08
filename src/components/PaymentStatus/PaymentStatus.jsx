import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

const PaymentStatus = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const status = searchParams.get('status');
  const reference = searchParams.get('reference');

  useEffect(() => {
    if (status === 'success') {
      toast.success('Payment successful!');
      // Handle successful payment (e.g., save ticket to database)
    } else {
      toast.error('Payment failed');
    }
    // Redirect back to event page after a delay
    setTimeout(() => {
      navigate(-1);
    }, 3000);
  }, [status, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {status === 'success' ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-600">Payment Successful!</h2>
          <p className="mt-2">Your ticket has been booked.</p>
          <p className="text-sm text-gray-500">Reference: {reference}</p>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Payment Failed</h2>
          <p className="mt-2">Please try again or contact support.</p>
        </div>
      )}
    </div>
  );
};

export default PaymentStatus; 