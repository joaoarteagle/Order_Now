    export default function HomePage() {
    // const salesData = localStorage.getItem("salesData")
    //     ? JSON.parse(localStorage.getItem("salesData")!)
    //     : {};
    // const data = JSON.stringify(salesData);
    return (
        <div className="flex flex-col items-center h-screen bg-gray-900 text-white"  >
        <div className="flex flex-col gap-5 m-10">
        <h1 className="font-extralight">Seja Bem Vindo ao Order Now</h1>
        <p>Este é um aplicativo para o gerenciamento do seu comércio.</p>
        </div>

        <div className="w-full">

        
        <div className="flex m-5 p-2 bg-gray-800 w-auto h-15 justify-center items-center rounded-lg hover:bg-gray-700">
            <h2>Vendas Totais</h2>
        </div>

        <div className="flex m-5 p-2 bg-gray-800 w-auto h-15 justify-center items-center rounded-lg hover:bg-gray-700">
            <h2>Histórico de Vendas</h2>
        </div>
        <a href="PizzaCount">
            <div className="flex m-5 p-2 bg-gray-800 w-auto h-15 justify-center items-center rounded-lg hover:bg-gray-700">
            <h2>Contabilizar Vendas de Hoje</h2>
            </div>
        </a>
        </div>
        <ul>
            <li></li>
        </ul>
        </div>
    );
    }
