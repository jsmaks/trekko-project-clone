'use client';

import { useEffect, useState } from 'react';
import { ListWithCards } from '@/types';
import ListForm from './list-form';
import ListItem from './list-item';

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}
//eslint-disable-next-line
const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data);

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  return (
    <div>
      <ol className="flex h-full gap-x-3">
        {orderedData.map((list, index) => {
          return (
            <ListItem
              key={list.id}
              data={list}
              index={index}
              // boardId={boardId}
            />
          );
        })}
        <ListForm />
        <div className="w-1 flex-shrink-0"></div>
      </ol>
    </div>
  );
};

export default ListContainer;
