import { deleteBoard } from '@/actions/delete-board';
import { Button } from '@/components/ui/button';

interface DeleteBoardProps {
  id: string;
  title: string;
}

export const DeleteBoard = ({ title, id }: DeleteBoardProps) => {
  const deleteBoardWithId = deleteBoard.bind(null, id);
  return (
    <form className="flex items-center border p-2" action={deleteBoardWithId}>
      <p> {title}</p>
      <Button type="submit" size={'sm'}>
        Delete
      </Button>
    </form>
  );
};
