'use client';

import { useEffect, useState } from 'react';
import { CardModal } from '../modals/card-modal';

const ModalProviders = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CardModal></CardModal>
    </>
  );
};

export default ModalProviders;
