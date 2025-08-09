import { ActionIcon } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import React from 'react';

interface ActionIconsInterface {
  deleteHandler: React.MouseEventHandler<HTMLButtonElement> | undefined;
  editHandler: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const ActionsIcons: React.FC<ActionIconsInterface> = ({ deleteHandler, editHandler }) => {
  return (
    <div className='flex flex-row gap-2.5'>
      <ActionIcon variant='light' color='red' aria-label='delete' size={'sm'} onClick={deleteHandler}>
        <IconTrash />
      </ActionIcon>
      <ActionIcon variant='light' color='indigo' aria-label='edit' size={'sm'} onClick={editHandler}>
        <IconEdit />
      </ActionIcon>
    </div>
  );
};

export default React.memo(ActionsIcons);
