import { useEffect, useState } from "react";
import PizzaSize from "../components/pizzaSize/pizzaSize";
import type { SalesData } from "../interfaces/data";


function PizzaCount() {
    const [started, setStarted] = useState(false);
    const pizzaSize = ["GRANDE", "MÉDIA", "BROTINHO", "METRO"];
    let salesData: SalesData = localStorage.getItem("salesData") ? JSON.parse(localStorage.getItem("salesData")!) : {};
   
    const stopCounting = () => {
        const today = new Date();
        const dateKey = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
        salesData[dateKey] = {
            G: parseInt(localStorage.getItem("GRANDE") || "0", 10), 
            M: parseInt(localStorage.getItem("MÉDIA") || "0", 10),
            B: parseInt(localStorage.getItem("BROTINHO") || "0", 10),
            METRO: parseInt(localStorage.getItem("METRO") || "0", 10)
        };
        
        localStorage.setItem("salesData", JSON.stringify(salesData));
        setStarted(false);
    }

  useEffect(() => {
        // Verifica se algum dos valores é diferente de 0
        const hasValues = pizzaSize.some(size => {
            const value = parseInt(localStorage.getItem(size) || "0", 10);
            return value > 0;
        });
        
        setStarted(hasValues);
    }, []); // Array vazio para executar apenas na montagem

    // Adicione este useEffect para monitorar mudanças no localStorage
    useEffect(() => {
        const checkValues = () => {
            const hasValues = pizzaSize.some(size => {
                const value = parseInt(localStorage.getItem(size) || "0", 10);
                return value > 0;
            });
            setStarted(hasValues);
        };

        // Listener para mudanças no localStorage
        window.addEventListener('storage', checkValues);
        
        // // Interval para verificar mudanças (para caso o storage mude na mesma aba)
        // const interval = setInterval(checkValues, 1000);

        return () => {
            window.removeEventListener('storage', checkValues);
            // clearInterval(interval);
        };
    }, []);

    const startCounting = () => {
        localStorage.setItem("GRANDE", "0");
        localStorage.setItem("MÉDIA", "0");
        localStorage.setItem("BROTINHO", "0");
        localStorage.setItem("METRO", "0");
        location.reload();
        setStarted(true);
    }
    return <>
     <div className="flex flex-col items-center h-screen"  > 
    <a href="/Order_Now/" className="flex w-full p-3">Home</a>
    <div>
    <p className="text-[35px] font-extralight my-20">PIZZA COUNT 🍕</p>
    </div>
    
    <div className="flex flex-col gap-5">
        {pizzaSize.map((size) => (<PizzaSize size={size} />))}
    </div>

    <div>
        { started && ( 
            <button onClick={stopCounting}>Finalizar Lançamentos</button>
        )}

       
    </div>
</div>
 
    </>;
}

export default PizzaCount;