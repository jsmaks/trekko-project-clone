'use client';

import { toast } from 'sonner';
import { ElementRef, useRef } from 'react';

import { List } from '@prisma/client';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from '@/components/ui/popover';

import { Button } from '@/components/ui/button';
import { MoreHorizontal, X } from 'lucide-react';
import { FormSubmit } from '@/components/form/form-submit';
import { Separator } from '@/components/ui/separator';

import { useAction } from '@/hooks/use-action';

import { deleteList } from '@/actions/delete-list';
import { copyList } from '@/actions/copy-list';

interface ListOptionsProps {
  data: List;
  onAddCard: () => void;
}

const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
  const closeRef = useRef<ElementRef<'button'>>(null);

  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: () => {
      toast.success(`List ${data.title} deleted`);
      closeRef.current?.click();
    },
    onError: error => {
      toast.error(error);
    },
  });
    const { execute: executeCopy } = useAction(copyList, {
      onSuccess: () => {
          console.log('121212');
        toast.success(`List ${data.title} copied`);
        closeRef.current?.click();
      },
      onError: error => {
        console.log('121212');
        toast.error(error);
      },
    });

  const onDelete = (formData: FormData) => {
    const id = formData.get('id') as string;
    const boardId = formData.get('boardId') as string;

    executeDelete({ id: id, boardId: boardId });
  };

  const onCopy = (formData: FormData) => {
    const id = formData.get('id') as string;
    const boardId = formData.get('boardId') as string;

 

    executeCopy({ id: id, boardId: boardId });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto" variant={'ghost'}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pb-3 pt-3" side="bottom" align="start">
        <div className="pb-4 text-center text-sm font-medium text-neutral-600">
          List Actions
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="absolute right-2 top-2 h-4 w-auto p-2"
            variant={'ghost'}
          >
            {' '}
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          variant={'ghost'}
          className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
          onClick={onAddCard}
        >
          Add card...
        </Button>
        <form action={onCopy}>
          <input hidden name="id" id="id" value={data.id} onChange={() => {}} />
          <input
            hidden
            name="boardId"
            id="boardId"
            value={data.boardId}
            onChange={() => {}}
          />
          <FormSubmit
            className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
            variant="ghost"
          >
            Copy List...
          </FormSubmit>
        </form>
        <Separator />
        <form action={onDelete}>
          <input hidden name="id" id="id" value={data.id} onChange={() => {}} />
          <input
            hidden
            name="boardId"
            id="boardId"
            value={data.boardId}
            onChange={() => {}}
          />
          <FormSubmit
            className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
            variant="ghost"
          >
            Delete List
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default ListOptions;
