'use client';

import { FormSubmit } from '@/components/form/form-submit';
import { FormTextArea } from '@/components/form/form-textarea';

import { forwardRef, useRef, ElementRef, KeyboardEventHandler } from 'react';

import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { createCard } from '@/actions/create-card';
import { useAction } from '@/hooks/use-action';
import { useParams } from 'next/navigation';
import { useOnClickOutside, useEventListener } from 'usehooks-ts';
import { toast } from 'sonner';

interface CardFormProps {
  listId: string;
  enableEditing: () => void;
  disableEditing: () => void;
  isEditing: boolean;
}

const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ listId, enableEditing, disableEditing, isEditing }, ref) => {
    const params = useParams();
    const formRef = useRef<ElementRef<'form'>>(null);
    const { execute, fieldErrors } = useAction(createCard, {
      onSuccess: data => {
        toast.success(`Card ${data.title} created`);
        formRef.current?.reset();
        disableEditing();
      },
      onError: error => {
        toast.error(error);
      },
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        disableEditing();
      }
    };

    useOnClickOutside(formRef, disableEditing);
    useEventListener('keydown', onKeyDown);

    const onTextareakeyDown: KeyboardEventHandler<HTMLTextAreaElement> = e => {
      if (e.key === 'Enter' && e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };

    const onSubmit = (formData: FormData) => {
      const title = formData.get('title') as string;
      const listId = formData.get('listId') as string;
      const boardId = params.boardId as string;

      execute({ title: title, listId: listId, boardId: boardId });
    };

    if (isEditing) {
      return (
        <form
          className="m-1 space-y-4 px-1 py-0.5"
          ref={formRef}
          action={onSubmit}
        >
          <FormTextArea
            id="title"
            onKeyDown={onTextareakeyDown}
            ref={ref}
            placeholder="Enter a title for this card..."
            errors={fieldErrors}
          />
          <input
            hidden
            id="listId"
            name={'listId'}
            value={listId}
            onChange={() => {}}
          />
          <div className="flex items-center gap-x-1">
            <FormSubmit> Add card</FormSubmit>
            <Button
              className=""
              onClick={disableEditing}
              variant={'ghost'}
              size={'sm'}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      );
    }
    return (
      <div className="px-2 pt-2">
        <Button
          onClick={enableEditing}
          className="h-auto w-full justify-start px-2 py-1.5 text-sm text-muted-foreground"
          size={'sm'}
          variant={'ghost'}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add a Card
        </Button>
      </div>
    );
  }
);

export default CardForm;

CardForm.displayName = 'CardForm';
