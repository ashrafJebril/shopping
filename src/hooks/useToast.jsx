import toast from 'react-hot-toast';

const defaultStyle = {
  fontSize: '1rem',
  marginTop: '40px',
  background: '#22c55e',
  color: '#fff',
  padding: '20px 32px',
  borderRadius: '12px',
  fontWeight: 700,
};

const defaultIconTheme = {
  primary: '#22c55e',
  secondary: '#fff',
};

export function useToast() {
  function showToast(message, options = {}) {
    toast.success(message, {
      style: defaultStyle,
      iconTheme: defaultIconTheme,
      ...options,
    });
  }
  return showToast;
}
