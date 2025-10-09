import { useCallback } from 'react';

export const useWssp = () => {
  const openWhatsApp = useCallback((phoneNumber = '+573012345678', message = '¡Hola! Me interesa conocer más sobre sus servicios de desarrollo web.') => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    
    // Abrir en nueva ventana/pestaña
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  }, []);

  return {
    openWhatsApp
  };
};