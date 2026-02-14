import {useDraggable} from '@dnd-kit/core';

export default function Draggable(props : any) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.id,
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  
  return (
    <button ref={setNodeRef} {...listeners} {...attributes} className='relative p-10 border border-custom-gray-border rounded-lg'  style={style}>
      {props.children}
    </button>
  );
}