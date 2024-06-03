import { ActivityItem } from '@/components/activity-item';
import { Skeleton } from '@/components/ui/skeleton';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const ActivityList = async () => {
  const { orgId } = auth();
  if (!orgId) {
    redirect('/select-org');
  }
  const auditLogs = await db.auditLog.findMany({
    where: {
      orgId: orgId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return (
    <ol className="mt-4 space-y-4">
      <p className="hidden text-center text-xs text-muted-foreground last:block">
        No activity found inside this organization.
      </p>
      {auditLogs.map(log => (
        <ActivityItem key={log.id} data={log} />
      ))}
    </ol>
  );
};

export default ActivityList;

ActivityList.Skeleton = function ActivityListSkeleton() {
  return (
    <ol className="mt-4 space-y-4">
      <Skeleton className="h-14 w-[80%]" />
      <Skeleton className="h-14 w-[50%]" />
      <Skeleton className="h-14 w-[70%]" />
      <Skeleton className="h-14 w-[80%]" />
      <Skeleton className="h-14 w-[75%]" />
    </ol>
  );
};
