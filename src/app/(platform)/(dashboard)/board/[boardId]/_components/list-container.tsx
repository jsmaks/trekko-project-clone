'use client';

import { useEffect, useState } from 'react';
import { ListWithCards } from '@/types';
import ListForm from './list-form';
import ListItem from './list-item';

import { DragDropContext, Droppable } from '@hello-pangea/dnd';


interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}
//eslint-disable-next-line
const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data);

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;
    if (!destination) return;

    //if Dropped in the same position
    if (
      destination.draggableId === source.draggableId &&
      destination.index === source.index
    )
      return;

    //User moves a list
    if (type === 'list') {
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => {
          return {
            ...item,
            order: index,
          };
        }
      );
      setOrderedData(items);
      //TODO: Update the order of the list in the database

      return;
    }

    //User moves a card
    if (type === 'card') {
      let newOrderedData = [...orderedData];
      //Source and destination list
      const sourceList = newOrderedData.find(
        list => list.id === source.droppableId
      );
      const destinationList = newOrderedData.find(
        list => list.id === destination.droppableId
      );

      if (!sourceList || !destinationList) return;

      //check if cards existss on the sourceList
      if (!sourceList.cards) {
        sourceList.cards = [];
      }

      //Check if cards exists on the destinationList

      if (!destinationList.cards) {
        destinationList.cards = [];
      }

      //Moving the card in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );

        reorderedCards.forEach((card, index) => {
          card.order = index;
        });

        sourceList.cards = reorderedCards;

        setOrderedData(newOrderedData);

        //Todo: Triggger Server Actions
        //User moves a card to another list
      } else {
        //Remove card from the source list
        const [movedCard] = sourceList.cards.splice(source.index, 1);

        //Assign the new listId to hte moved card
        movedCard.listId = destination.droppableId;

        //Add card to the destination list
        destinationList.cards.splice(destination.index, 0, movedCard);

        sourceList.cards.forEach((card, index) => {
          card.order = index;
        });

        //Update the order of the destination list
        destinationList.cards.forEach((card, index) => {
          card.order = index;
        });

        setOrderedData(newOrderedData);
        //Todo: Triggger Server Actions
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {provided => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex h-full gap-x-3"
          >
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
            {provided.placeholder}
            <ListForm />
            <div className="w-1 flex-shrink-0"></div>
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ListContainer;
