import { toast, ToastOptions } from 'react-toastify';
import { TOAST_TYPES } from '../utils/constants';
import { ShowToastFunction } from '@/types/common';

export const useToast = () => {
    const showToast: ShowToastFunction = (type: 'success' | 'error' | 'warning' | 'info', message: string, options?: ToastOptions) => {
        switch (type) {
            case 'success':
                const _messageSuccess = `${TOAST_TYPES.SUCCESS} - ${message}`
                toast.success(_messageSuccess, { ...options, closeButton: false });
                break;
            case 'error':
                const _messageError = `${TOAST_TYPES.ERROR} - ${message}`
                toast.error(_messageError, { ...options, closeButton: false });
                break;
            case 'warning':
                const _messageWarn = `${TOAST_TYPES.WARN} - ${message}`
                toast.warning(_messageWarn, { ...options, closeButton: false });
                break;
            case 'info':
                const _messageInfo = `${TOAST_TYPES.INFO} - ${message}`
                toast.info(_messageInfo, { ...options, closeButton: false });
                break;
            default:
                toast(message, { ...options, closeButton: false });
                break;
        }
    };

    return showToast;
};