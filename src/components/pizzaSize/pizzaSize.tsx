import { useEffect, useState } from "react";
import MinusButton from "../buttons/minusButton";
import PlusButton from "../buttons/plusButton";

function PizzaSize({size}: {size: string}) {
    const [count, setCount] = useState(() =>{
        const saved = localStorage.getItem(size);
        return saved ? parseInt(saved, 10) : 0;
    });

    useEffect(()=>
    {
        localStorage.setItem(size, count.toString());
    }, [count, size]);


     const incrementCount = () => setCount(count + 1);
    const decrementCount = () => setCount(Math.max(0, count - 1)); // Evita valores negativos

    return <div className="flex flex-row justify-between items-center mx-1 gap-1">
       <h2 className="font-semibold flex align-center justify-center text-[25px]">{size.toUpperCase()}:</h2>
       <div className="flex items-center">
        <MinusButton onClick={decrementCount} /> 
            <p className="text-[60px] w-20">{count}</p>
        <PlusButton onClick={incrementCount} /> </div>
        </div>;
}
export default PizzaSize;