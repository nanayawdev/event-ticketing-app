import { toast } from 'sonner'

export const showErrorToast = (title, description) => {
  toast.error(title, {
    description: description || 'Please try again later or contact support if the problem persists.',
    duration: 5000,
    style: {
      background: '#fee2e2',
      border: '1px solid #fecaca',
      color: '#dc2626',
    },
  });
}; 