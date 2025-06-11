import  { useState } from 'react';
import './Accordion.css'
function Accordion({ items }) {
   const [activeIndex, setActiveIndex] = useState(0);
   const handleClick = (index) => {
      setActiveIndex(index === activeIndex ? -1 : index);
   };
   return (
      <div className="mx-auto">
         {items.map((item, index) => (
            <div className="aDiv " key={item.title}>
               <button className={`aButton ${index===activeIndex?`b1`:`b2`} justify-between`} onClick={() =>handleClick(index)}>{item.title}<p className="ml-auto text-3xl font-bold">{index===activeIndex?'-':'+'}</p></button>
               {index === activeIndex && <p className="ap">{item.content}</p>}
            </div>
         ))}
      </div>
   );
}
export default Accordion;