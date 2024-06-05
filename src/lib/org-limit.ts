import { auth } from '@clerk/nextjs/server';
import { db } from './db';
import { MAX_FREE_BOARDS } from '@/constants/board';

export const incrementAvailableCount = async (userId: string) => {
  const { orgId } = auth();
  if (!orgId) {
    throw new Error('Unauthorized');
  }

  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId: orgId },
  });

  if (orgLimit) {
    await db.orgLimit.update({
      where: { orgId: orgId },
      data: { count: orgLimit.count + 1 },
    });
  } else {
    await db.orgLimit.create({
      data: { orgId: orgId, count: 1 },
    });
  }
};
