import { db } from '@/lib/db';
import { DeleteBoard } from './board';
import { Form } from './form';

const OrganizationIdPage = async () => {
  const boards = await db.board.findMany();

  return (
    <div className="flex flex-col space-y-4">
      <Form />
      <div className="space-y">
        {boards.map(board => (
          <div key={board.id} className="border p-2">
            <DeleteBoard key={board.id} title={board.title} id={board.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrganizationIdPage;
