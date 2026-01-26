import { Link } from "react-router-dom";

    export default function HomePage() {
    return (
        <div className="flex flex-col items-center h-screen bg-gray-900 text-white"  >
            <div className="flex flex-col gap-5 m-10">
                <h1 className="font-extralight">Seja Bem Vindo ao Order Now</h1>
                <p>Este é um aplicativo para o gerenciamento do seu comércio.</p>
            </div>

            <div className="w-full">

            
            
            <Link to="/SalesHistory">
            <div className="flex m-5 p-2 bg-gray-800 w-auto h-15 justify-center items-center rounded-lg hover:bg-gray-700">
                <h2>Histórico de Vendas</h2>
            </div>
            </Link>
            <Link to="/PizzaCount">
                <div className="flex m-5 p-2 bg-gray-800 w-auto h-15 justify-center items-center rounded-lg hover:bg-gray-700">
                <h2>Contabilizar</h2>
                </div>
            </Link>

            <Link to="/Revenue">
            <div className="flex m-5 p-2 bg-gray-800 w-auto h-15 justify-center items-center rounded-lg hover:bg-gray-700">
                <h2>Faturamento Atual</h2>
            </div>
            </Link>
        </div>
        </div>
    );
    }
