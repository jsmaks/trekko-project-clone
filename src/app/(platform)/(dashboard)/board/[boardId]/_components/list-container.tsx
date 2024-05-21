'use client';

import { ListWithCards } from '@/types';
import ListForm from './list-form';

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}
//eslint-disable-next-line
const ListContainer = ({ data, boardId }: ListContainerProps) => {
  return (
    <div>
      <ol>
        <ListForm />
        <div className="w-1 flex-shrink-0"></div>
      </ol>
    </div>
  );
};

export default ListContainer;
