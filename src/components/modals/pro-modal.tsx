'use client';

import { useProModal } from '@/hooks/use-pro-modal';
import { Dialog, DialogContent } from '../ui/dialog';
import Image from 'next/image';
import { Button } from '../ui/button';
import { useAction } from '@/hooks/use-action';
import { stripeRedirect } from '@/actions/stripe-redirect';
import { toast } from 'sonner';

export const ProModal = () => {
  const proModal = useProModal();

  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: data => {
      window.location.href = data;
    },
    onError: error => {
      toast.error(error);
    },
  });
  const onClick = () => {
    execute({});
  };
  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent className="max-w-md overflow-hidden p-0">
        <div className="relative flex aspect-video items-center justify-center">
          <Image src={'/bg.svg'} alt="Hero" className="object-cover" fill />
        </div>
        <div className="mx-auto space-y-6 p-6 text-neutral-700">
          <h2 className="text-xl font-semibold">
            Upgrade to Tasskify Pro Today!
          </h2>
          <p className="text-sx font-semibold text-neutral-600">
            Explore the best of Taskify
          </p>
          <div className="pl-3">
            <ul className="list-disc text-sm">
              <li>Unlimited boards</li>
              <li>Advanced checklists</li>
              <li>Admin and security features</li>
              <li>And more!</li>
            </ul>
          </div>
          <Button
            disabled={isLoading}
            onClick={onClick}
            className="w-full"
            variant={'primary'}
          >
            Upgrade to Pro
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
