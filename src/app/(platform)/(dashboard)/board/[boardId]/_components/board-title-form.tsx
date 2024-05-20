'use client';
import { toast } from 'sonner';

import { FormInput } from '@/components/form/form-input';
import { Button } from '@/components/ui/button';
import { Board } from '@prisma/client';

import { ElementRef, useRef, useState } from 'react';
import { updateBoard } from '@/actions/update-board';
import { useAction } from '@/hooks/use-action';

interface BoardTitleFormProps {
  data: Board;
}

const BoardTitleForm = ({ data }: BoardTitleFormProps) => {
  const { execute } = useAction(updateBoard, {
    onSuccess: successData => {
      toast.success(`Board "${successData.title}" updated successfully!`);
      setTitle(successData.title);
      disableEdditing();
    },
    onError(error) {
      toast.error(error);
    },
  });

  const formRef = useRef<ElementRef<'form'>>(null);
  const inputRef = useRef<ElementRef<'input'>>(null);

  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);
  const enableEditing = () => {
    //Todo : Fosuc on input
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEdditing = () => {
    setIsEditing(false);
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    execute({ title, id: data.id });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  if (isEditing) {
    return (
      <form
        action={onSubmit}
        ref={formRef}
        className="flex items-center gap-x-2"
      >
        <FormInput
          ref={inputRef}
          id="title"
          onBlur={onBlur}
          defaultValue={title}
          className="h-7 border-none bg-transparent px-[7px] py-2 text-lg font-bold hover:cursor-pointer focus:cursor-pointer focus-visible:outline-none forced-colors:ring-transparent"
        />
      </form>
    );
  }

  return (
    <div>
      <Button
        onClick={enableEditing}
        variant={'transparent'}
        className="h-auto w-auto p-1 px-2 text-lg font-bold"
      >
        {title}
      </Button>
    </div>
  );
};

export default BoardTitleForm;
