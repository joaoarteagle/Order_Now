import PizzaSize from "../components/pizzaSize/pizzaSize";

function PizzaCount() {
    const pizzaSize = ["GRANDE", "MÉDIA", "BROTINHO", "1/2 METRO"];
    return <>
     <div> 
    <p className="text-[35px] font-extralight">PIZZA COUNT 🍕</p>
    
    <div className="flex flex-col">
        {pizzaSize.map((size) => (<PizzaSize size={size} />))}
    </div>


</div>
 
    </>;
}

export default PizzaCount;