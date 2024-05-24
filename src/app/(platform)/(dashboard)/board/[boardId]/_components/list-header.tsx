'use client';

import { updateList } from '@/actions/update-list';
import { FormInput } from '@/components/form/form-input';
import { useAction } from '@/hooks/use-action';
import { List } from '@prisma/client';

import { useState, useRef, ElementRef } from 'react';
import { toast } from 'sonner';
import { useEventListener } from 'usehooks-ts';
import ListOptions from './list-options';

interface ListHeaderProps {
  data: List;
  onAddCard: () => void;
}

const ListHeader = ({ data, onAddCard }: ListHeaderProps) => {
  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<'form'>>(null);
  const inputRef = useRef<ElementRef<'input'>>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const { execute } = useAction(updateList, {
    onSuccess: data => {
      toast.success(`Renamed to "${data.title}"`);
      setTitle(data.title);
      disableEditing();
    },
    onError: error => {
      toast.error(error);
    },
  });

  const handleSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    const id = formData.get('id') as string;
    const boardId = formData.get('boardId') as string;

    if (title === data.title) {
      return disableEditing();
    }

    execute({ title: title, id: id, boardId: boardId });
  };

  const handleBlur = () => {
    formRef.current?.requestSubmit();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      disableEditing();
    }
  };
  useEventListener('keydown', onKeyDown);

  return (
    <div className="flex items-start justify-between gap-x-2 px-2 pt-2 text-sm font-semibold hover:cursor-pointer">
      {isEditing ? (
        <form className="flex-1 px-[2px]" action={handleSubmit} ref={formRef}>
          <input
            hidden
            id="id"
            name={'id'}
            value={data.id}
            onChange={() => {}}
          />
          <input
            hidden
            id="boardId"
            name={'boardId'}
            value={data.boardId}
            onChange={() => {}}
          />
          <FormInput
            ref={inputRef}
            onBlur={handleBlur}
            id="title"
            placeholder="Enter list title.."
            defaultValue={title}
            className="h-7 truncate border-transparent bg-transparent px-[7px] py-2 text-sm font-medium transition hover:cursor-pointer hover:border-input focus:border-input focus:bg-white"
          />
          <button type="submit" hidden></button>
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="h-7 w-full border-transparent px-2.5 text-sm font-semibold"
        >
          {title}
        </div>
      )}
      <ListOptions data={data} onAddCard={onAddCard} />
    </div>
  );
};

export default ListHeader;
