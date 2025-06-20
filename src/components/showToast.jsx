import { toast } from 'react-toastify';

export const ShowToast = (type, message) => {
  toast[type](message, {
    position: "top-center",
    className: "font-light text-sm",
    autoClose: false,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
  })
}