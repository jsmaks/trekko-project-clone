import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import ListContainer from './_components/list-container';

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

const BoardIdPage = async ({ params }: BoardIdPageProps) => {
  const { orgId } = auth();
  if (!orgId) {
    redirect('/select-org');
  }

  const lists = await db.list.findMany({
    // Вызывает метод findMany на модели list в вашем Prisma клиенте. Это вернет все списки, которые соответствуют условиям в объекте запроса.
    where: {
      // Определяет условия, которым должны соответствовать возвращаемые списки.
      boardId: params.boardId, // Списки должны быть связаны с доской, идентификатор которой равен params.boardId.
      board: {
        // Дополнительные условия для связанной доски.
        orgId, // Доска должна быть связана с организацией, идентификатор которой равен orgId.
      },
    },
    include: {
      // Определяет связанные модели, которые должны быть включены в результат.
      cards: {
        // Включает в результат все карточки, связанные с каждым списком.
        orderBy: {
          // Определяет порядок, в котором должны быть возвращены карточки.
          order: 'asc', // Карточки должны быть отсортированы по полю order в порядке возрастания.
        },
      },
    },
    orderBy: {
      // Определяет порядок, в котором должны быть возвращены списки.
      order: 'asc', // Списки должны быть отсортированы по полю order в порядке возрастания.
    },
  });

  return (
    <div className="h-full overflow-x-auto p-4">
      <ListContainer data={lists} boardId={params.boardId} />
    </div>
  );
};

export default BoardIdPage;
