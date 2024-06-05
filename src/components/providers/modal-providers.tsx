'use client';

import { useEffect, useState } from 'react';
import { CardModal } from '../modals/card-modal';
import { ProModal } from '../modals/pro-modal';

const ModalProviders = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CardModal />
      <ProModal />
    </>
  );
};

export default ModalProviders;
