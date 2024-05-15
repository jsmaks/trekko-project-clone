'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { z } from 'zod';

export type State = {
  errors?: {
    title?: string[];
  };
  message?: string | null;
};

const CreateBoard = z.object({
  title: z.string().min(3, {
    message: 'Minimum length of 3 characters required',
  }),
});

export async function create(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFileds = CreateBoard.safeParse({
    title: formData.get('title'),
  });

  if (!validatedFileds.success) {
    return {
      errors: validatedFileds.error.flatten().fieldErrors,
      message: 'Missing fields',
    };
  }

  const { title } = validatedFileds.data;

  try {
    await db.board.create({
      data: {
        title,
      },
    });
  } catch (error) {
    return {
      errors: undefined,
      message: 'Database error',
    };
  }

  revalidatePath('/organization/org_2gEObvwliJwtDhv5Zkb9WpRce7t');
  redirect('/organization/org_2gEObvwliJwtDhv5Zkb9WpRce7t');
}
