import {useDroppable} from '@dnd-kit/core';

export default function Droppable(props : any) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });
  const style = {
    color: isOver ? 'green' : undefined,
    borderColor: isOver ? 'green' : "black"
  };
  
  
  return (
    <div ref={setNodeRef} className='relative w-1/3 p-5 border border-x-custom-gray-border rounded-lg' style={style} >
      {props.children}
    </div>
  );
}