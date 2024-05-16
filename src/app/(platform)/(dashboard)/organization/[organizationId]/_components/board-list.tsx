import { Hint } from '@/components/hint';
import { FormPopover } from '@/components/form/form-popover';
import { HelpCircle, User2 } from 'lucide-react';

export const BoardList = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center text-lg font-semibold text-neutral-700">
        <User2 className="mr-2 h-6 w-6" />
        Your boards
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <FormPopover side='right' sideOffset={10}>
          <div
            className="roudded-sm relative flex aspect-video h-full w-full flex-col items-center justify-center gap-y-1 bg-muted transition hover:opacity-75"
            role="button"
          >
            Create new board
            <div className="text-sm">
              <span>5 remaining</span>
              <Hint
                sideOffset={40}
                description="Free Workspaces can have up to 5 open boards. For unlimited boards upgrade this workspaces"
              >
                <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
              </Hint>
            </div>
          </div>
        </FormPopover>
      </div>
    </div>
  );
};
