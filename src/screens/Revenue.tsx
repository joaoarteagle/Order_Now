import { Link } from "react-router-dom";
import { useState } from "react";
import type { SalesData, PizzaSales } from "../interfaces/data";

// Constantes de preço - altere aqui conforme necessário
const PIZZA_PRICES = {
    G: 65.00,      // Pizza Grande
    M: 55.00,      // Pizza Média
    B: 39.00,      // Pizza Broto
    METRO: 110.00   // Pizza Metro
} as const;

export default function Revenue() {
    const [salesData] = useState<SalesData>(() => {
        return localStorage.getItem("salesData")
            ? JSON.parse(localStorage.getItem("salesData")!)
            : {};
    });

    const [editingPrices, setEditingPrices] = useState(false);
    const [tempPrices, setTempPrices] = useState(PIZZA_PRICES);

    // Converte objeto em array e ordena por data (mais recente primeiro)
    const salesEntries = Object.entries(salesData).sort((a, b) => {
        const dateA = new Date(a[0].split('/').reverse().join('-'));
        const dateB = new Date(b[0].split('/').reverse().join('-'));
        return dateB.getTime() - dateA.getTime();
    });

    // Calcula faturamento por registro
    const calculateRevenue = (sales: PizzaSales, prices = PIZZA_PRICES) => {
        return (
            sales.G * prices.G +
            sales.M * prices.M +
            sales.B * prices.B +
            sales.METRO * prices.METRO
        );
    };

    // Calcula quantidade total por registro
    const calculateQuantity = (sales: PizzaSales) => {
        return sales.G + sales.M + sales.B + sales.METRO;
    };

    // Calcula faturamento total
    const totalRevenue = salesEntries.reduce((total, [, sales]) => {
        return total + calculateRevenue(sales);
    }, 0);

    // Calcula quantidade total
    const totalQuantity = salesEntries.reduce((total, [, sales]) => {
        return total + calculateQuantity(sales);
    }, 0);

    // Função para atualizar preços temporários
    const updateTempPrice = (size: keyof typeof PIZZA_PRICES, value: string) => {
        const numValue = Math.max(0, parseFloat(value) || 0);
        setTempPrices(prev => ({ ...prev, [size]: numValue }));
    };

    // Função para salvar novos preços
    const savePrices = () => {
        Object.assign(PIZZA_PRICES, tempPrices);
        setEditingPrices(false);
    };

    // Função para cancelar edição de preços
    const cancelPriceEdit = () => {
        setTempPrices(PIZZA_PRICES);
        setEditingPrices(false);
    };

    return <>
        <div className="flex flex-col items-center min-h-screen w-screen bg-gray-900 text-white p-4">
            <Link to={'/'} className="flex w-full p-3 text-blue-400 hover:text-blue-300">
                ← Home
            </Link>
            
            <div className="text-center mb-8">
                <p className="text-[35px] font-extralight my-4">FATURAMENTO 💰</p>
                <div className="space-y-2">
                    <p className="text-xl text-green-400">
                        Faturamento Total: R$ {totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-lg text-gray-400">
                        Total de Pizzas: {totalQuantity}
                    </p>
                    {totalQuantity > 0 && (
                        <p className="text-md text-gray-500">
                            Ticket Médio: R$ {(totalRevenue / totalQuantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                    )}
                </div>
            </div>

            {/* Seção de preços */}
            <div className="bg-gray-800 rounded-lg p-4 mb-6 w-full max-w-4xl">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Preços Atuais</h3>
                    {!editingPrices ? (
                        <button 
                            onClick={() => setEditingPrices(true)}
                            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                        >
                            ⚙️
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <button 
                                onClick={savePrices}
                                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                            >
                                ✅ Salvar
                            </button>
                            <button 
                                onClick={cancelPriceEdit}
                                className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
                            >
                                ❌ Cancelar
                            </button>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(editingPrices ? tempPrices : PIZZA_PRICES).map(([size, price]) => (
                        <div key={size} className="text-center">
                            <p className="text-sm text-gray-400 mb-1">
                                {size === 'G' ? 'Grande' : 
                                 size === 'M' ? 'Média' : 
                                 size === 'B' ? 'Broto' : 'Metro'}
                            </p>
                            {editingPrices ? (
                                <input 
                                    type="number" 
                                    step="0.01"
                                    value={price}
                                    onChange={(e) => updateTempPrice(size as keyof typeof PIZZA_PRICES, e.target.value)}
                                    className="w-full p-2 bg-gray-700 text-white rounded text-center"
                                    min="0"
                                />
                            ) : (
                                <p className="text-lg font-bold text-green-400">
                                    R$ {price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Histórico de faturamento */}
            <div className="flex flex-col gap-4 w-full max-w-4xl">
                {salesEntries.length === 0 ? (
                    <p className="text-center text-gray-500 text-lg">Nenhum dado de vendas encontrado</p>
                ) : (
                    salesEntries.map(([date, sales]) => {
                        const dayRevenue = calculateRevenue(sales);
                        const dayQuantity = calculateQuantity(sales);
                        
                        return (
                            <div key={date} className="bg-gray-800 rounded-lg p-4 shadow-lg">
                                <h3 className="text-xl font-semibold mb-3 text-center border-b border-gray-600 pb-2">
                                    {date}
                                </h3>
                                
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                    <div className="text-center">
                                        <p className="text-sm text-gray-400">Grande ({sales.G}x)</p>
                                        <p className="text-lg font-bold text-green-400">
                                            R$ {(sales.G * PIZZA_PRICES.G).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                        </p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm text-gray-400">Média ({sales.M}x)</p>
                                        <p className="text-lg font-bold text-blue-400">
                                            R$ {(sales.M * PIZZA_PRICES.M).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                        </p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm text-gray-400">Broto ({sales.B}x)</p>
                                        <p className="text-lg font-bold text-yellow-400">
                                            R$ {(sales.B * PIZZA_PRICES.B).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                        </p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm text-gray-400">Metro ({sales.METRO}x)</p>
                                        <p className="text-lg font-bold text-red-400">
                                            R$ {(sales.METRO * PIZZA_PRICES.METRO).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="pt-3 border-t border-gray-600 text-center space-y-1">
                                    <p className="text-lg">
                                        <span className="text-gray-400">Faturamento do dia: </span>
                                        <span className="font-bold text-green-400">
                                            R$ {dayRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                        </span>
                                    </p>
                                    <p className="text-md text-gray-400">
                                        {dayQuantity} pizzas - Ticket médio: R$ {(dayRevenue / dayQuantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </p>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    </>;
}