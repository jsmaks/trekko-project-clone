'use client';

import { cn } from '@/lib/utils';

import { forwardRef } from 'react';
import { useFormStatus } from 'react-dom';

import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { FormErrors } from './form-errors';

interface FormTextareaProps {
  id: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  onBlur?: () => void;
  onClick?: () => void;
  //   onKeyDown?: () => KeyboardEventHandler<HTMLTextAreaElement> | undefined;
  /*eslint-disable-next-line*/
  onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  defaultValue?: string;
}

export const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (
    {
      id,
      label,
      placeholder,
      required,
      disabled,
      errors,
      className,
      onBlur,
      onClick,
      onKeyDown,
      defaultValue,
    },
    ref
  ) => {
    const { pending } = useFormStatus();
    return (
      <div className="w-full space-y-2">
        <div className="w-full space-y-1">
          {label ? (
            <Label
              htmlFor={id}
              className="text-xs font-semibold text-neutral-700"
            >
              {label}
            </Label>
          ) : null}
          <Textarea
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            onClick={onClick}
            ref={ref}
            required={required}
            placeholder={placeholder}
            name={id}
            disabled={pending || disabled}
            className={cn(
              `resize-none shadow-sm outline-none ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0`,
              className
            )}
            aria-describedby={`${id}-error`}
            defaultValue={defaultValue}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    );
  }
);

FormTextArea.displayName = 'FormTextArea';
