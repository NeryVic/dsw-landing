import { useCallback } from 'react';
import { SITE_CONFIG } from '../lib/constants';
  
export const useWssp = () => {
  const openWhatsApp = useCallback((phoneNumber = SITE_CONFIG.links.whatsapp, message = '¡Hola! Me interesa conocer más sobre sus servicios de desarrollo web.') => {
    const encodedMessage = encodeURIComponent(message);
    // Si phoneNumber ya incluye https://wa.me/, usarlo directamente, sino construir la URL
    const whatsappUrl = phoneNumber.startsWith('https://wa.me/') 
      ? `${phoneNumber}?text=${encodedMessage}`
      : `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    
    // Abrir en nueva ventana/pestaña
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  }, []);

  return {
    openWhatsApp
  };
};