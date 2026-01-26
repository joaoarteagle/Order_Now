import { Link } from "react-router-dom";
import { useState } from "react";
import type { SalesData, PizzaSales } from "../interfaces/data";

export default function SalesHistory() {
    const [salesData, setSalesData] = useState<SalesData>(() => {
        return localStorage.getItem("salesData")
            ? JSON.parse(localStorage.getItem("salesData")!)
            : {};
    });
    
    const [editingDate, setEditingDate] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<PizzaSales>({
        G: 0, M: 0, B: 0, METRO: 0
    });

    // Estados para criação de novo lançamento
    const [creatingNew, setCreatingNew] = useState(false);
    const [newDate, setNewDate] = useState('');
    const [newForm, setNewForm] = useState<PizzaSales>({
        G: 0, M: 0, B: 0, METRO: 0
    });
    const [dateError, setDateError] = useState('');

    // Atualiza localStorage sempre que salesData mudar
    const updateLocalStorage = (newData: SalesData) => {
        localStorage.setItem("salesData", JSON.stringify(newData));
        setSalesData(newData);
    };

    // Converte objeto em array e ordena por data (mais recente primeiro)
    const salesEntries = Object.entries(salesData).sort((a, b) => {
        const dateA = new Date(a[0].split('/').reverse().join('-'));
        const dateB = new Date(b[0].split('/').reverse().join('-'));
        return dateB.getTime() - dateA.getTime();
    });

    // Calcula totais
    const calculateTotal = (sales: PizzaSales) => {
        return sales.G + sales.M + sales.B + sales.METRO;
    };

    const grandTotal = salesEntries.reduce((total, [, sales]) => {
        return total + calculateTotal(sales);
    }, 0);

    // Função para excluir registro
    const deleteRecord = (dateToDelete: string) => {
        if (confirm(`Tem certeza que deseja excluir o registro do dia ${dateToDelete}?`)) {
            const newData = { ...salesData };
            delete newData[dateToDelete];
            updateLocalStorage(newData);
        }
    };

    // Função para iniciar edição
    const startEdit = (date: string, sales: PizzaSales) => {
        setEditingDate(date);
        setEditForm({ ...sales });
    };

    // Função para cancelar edição
    const cancelEdit = () => {
        setEditingDate(null);
        setEditForm({ G: 0, M: 0, B: 0, METRO: 0 });
    };

    // Função para salvar edição
    const saveEdit = () => {
        if (editingDate) {
            const newData = {
                ...salesData,
                [editingDate]: editForm
            };
            updateLocalStorage(newData);
            cancelEdit();
        }
    };

    // Função para atualizar campo do formulário de edição
    const updateField = (field: keyof PizzaSales, value: string) => {
        const numValue = Math.max(0, parseInt(value) || 0);
        setEditForm(prev => ({ ...prev, [field]: numValue }));
    };

    // Função para formatar data do input para dd/mm/YYYY
    const formatDateForDisplay = (dateString: string) => {
        if (!dateString) return '';
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    };

    // Função para validar data
    const validateDate = (dateString: string) => {
        if (!dateString) {
            setDateError('Data é obrigatória');
            return false;
        }

        const formattedDate = formatDateForDisplay(dateString);
        
        if (salesData[formattedDate]) {
            setDateError('Já existe um lançamento para esta data');
            return false;
        }

        setDateError('');
        return true;
    };

    // Função para iniciar criação de novo lançamento
    const startNewEntry = () => {
        setCreatingNew(true);
        setNewDate('');
        setNewForm({ G: 0, M: 0, B: 0, METRO: 0 });
        setDateError('');
    };

    // Função para cancelar criação
    const cancelNewEntry = () => {
        setCreatingNew(false);
        setNewDate('');
        setNewForm({ G: 0, M: 0, B: 0, METRO: 0 });
        setDateError('');
    };

    // Função para salvar novo lançamento
    const saveNewEntry = () => {
        if (validateDate(newDate)) {
            const formattedDate = formatDateForDisplay(newDate);
            const newData = {
                ...salesData,
                [formattedDate]: newForm
            };
            updateLocalStorage(newData);
            cancelNewEntry();
        }
    };

    // Função para atualizar campo do formulário de novo lançamento
    const updateNewField = (field: keyof PizzaSales, value: string) => {
        const numValue = Math.max(0, parseInt(value) || 0);
        setNewForm(prev => ({ ...prev, [field]: numValue }));
    };

    return <>
        <div className="flex flex-col items-center min-h-screen w-screen bg-gray-900 text-white p-4">
            <Link to={'/'} className="flex w-full p-3 text-blue-400 hover:text-blue-300">
                ← Home
            </Link>
            
            <div className="text-center mb-8">
                <p className="text-[35px] font-extralight my-4">HISTÓRICO DE VENDAS</p>
                <p className="text-xl text-gray-400">Total Geral: {grandTotal} pizzas</p>
            </div>

            {/* Botão para novo lançamento */}
            <div className="mb-6 w-full max-w-4xl">
                {!creatingNew ? (
                    <button 
                        onClick={startNewEntry}
                        className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold text-lg"
                    >
                        ➕ Novo Lançamento
                    </button>
                ) : (
                    <div className="bg-gray-800 rounded-lg p-6 shadow-lg border-2 border-green-600">
                        <h3 className="text-xl font-semibold mb-4 text-center text-green-400">
                            Novo Lançamento
                        </h3>
                        
                        {/* Input de data */}
                        <div className="mb-4">
                            <label className="block text-sm text-gray-400 mb-2">
                                Data do Lançamento:
                            </label>
                            <input 
                                type="date" 
                                value={newDate}
                                onChange={(e) => {
                                    setNewDate(e.target.value);
                                    if (e.target.value) validateDate(e.target.value);
                                }}
                                className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-green-500"
                            />
                            {dateError && (
                                <p className="text-red-400 text-sm mt-1">{dateError}</p>
                            )}
                        </div>

                        {/* Inputs de quantidades */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="text-center">
                                <p className="text-sm text-gray-400 mb-1">Grande</p>
                                <input 
                                    type="number" 
                                    value={newForm.G}
                                    onChange={(e) => updateNewField('G', e.target.value)}
                                    className="w-full p-2 bg-gray-700 text-white rounded text-center"
                                    min="0"
                                    placeholder="0"
                                />
                            </div>
                            <div className="text-center">
                                <p className="text-sm text-gray-400 mb-1">Média</p>
                                <input 
                                    type="number" 
                                    value={newForm.M}
                                    onChange={(e) => updateNewField('M', e.target.value)}
                                    className="w-full p-2 bg-gray-700 text-white rounded text-center"
                                    min="0"
                                    placeholder="0"
                                />
                            </div>
                            <div className="text-center">
                                <p className="text-sm text-gray-400 mb-1">Broto</p>
                                <input 
                                    type="number" 
                                    value={newForm.B}
                                    onChange={(e) => updateNewField('B', e.target.value)}
                                    className="w-full p-2 bg-gray-700 text-white rounded text-center"
                                    min="0"
                                    placeholder="0"
                                />
                            </div>
                            <div className="text-center">
                                <p className="text-sm text-gray-400 mb-1">Metro</p>
                                <input 
                                    type="number" 
                                    value={newForm.METRO}
                                    onChange={(e) => updateNewField('METRO', e.target.value)}
                                    className="w-full p-2 bg-gray-700 text-white rounded text-center"
                                    min="0"
                                    placeholder="0"
                                />
                            </div>
                        </div>

                        {/* Preview do total */}
                        <div className="text-center mb-4 p-2 bg-gray-700 rounded">
                            <p className="text-gray-400">Total: {calculateTotal(newForm)} pizzas</p>
                        </div>

                        {/* Botões de ação */}
                        <div className="flex gap-2 justify-center">
                            <button 
                                onClick={saveNewEntry}
                                disabled={!!dateError || !newDate}
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
                            >
                                ✅ Salvar Lançamento
                            </button>
                            <button 
                                onClick={cancelNewEntry}
                                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                            >
                                ❌ Cancelar
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Lista de registros existentes */}
            <div className="flex flex-col gap-4 w-full max-w-4xl">
                {salesEntries.length === 0 ? (
                    <p className="text-center text-gray-500 text-lg">Nenhum dado de vendas encontrado</p>
                ) : (
                    salesEntries.map(([date, sales]) => (
                        <div key={date} className="bg-gray-800 rounded-lg p-4 shadow-lg">
                            <div className="flex justify-between items-center mb-3 border-b border-gray-600 pb-2">
                                <h3 className="text-xl font-semibold">{date}</h3>
                                
                                {editingDate !== date && !creatingNew && (
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => startEdit(date, sales)}
                                            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                                        >
                                            ✏️
                                        </button>
                                        <button 
                                            onClick={() => deleteRecord(date)}
                                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                                        >
                                           ❌
                                        </button>
                                    </div>
                                )}
                            </div>
                            
                            {editingDate === date ? (
                                // Modo de edição
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="text-center">
                                            <p className="text-sm text-gray-400 mb-1">Grande</p>
                                            <input 
                                                type="number" 
                                                value={editForm.G}
                                                onChange={(e) => updateField('G', e.target.value)}
                                                className="w-full p-2 bg-gray-700 text-white rounded text-center"
                                                min="0"
                                            />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm text-gray-400 mb-1">Média</p>
                                            <input 
                                                type="number" 
                                                value={editForm.M}
                                                onChange={(e) => updateField('M', e.target.value)}
                                                className="w-full p-2 bg-gray-700 text-white rounded text-center"
                                                min="0"
                                            />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm text-gray-400 mb-1">Broto</p>
                                            <input 
                                                type="number" 
                                                value={editForm.B}
                                                onChange={(e) => updateField('B', e.target.value)}
                                                className="w-full p-2 bg-gray-700 text-white rounded text-center"
                                                min="0"
                                            />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm text-gray-400 mb-1">Metro</p>
                                            <input 
                                                type="number" 
                                                value={editForm.METRO}
                                                onChange={(e) => updateField('METRO', e.target.value)}
                                                className="w-full p-2 bg-gray-700 text-white rounded text-center"
                                                min="0"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="flex gap-2 justify-center pt-3 border-t border-gray-600">
                                        <button 
                                            onClick={saveEdit}
                                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                        >
                                            ✅ Salvar
                                        </button>
                                        <button 
                                            onClick={cancelEdit}
                                            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                                        >
                                            ❌ Cancelar
                                        </button>
                                    </div>
                                    
                                    <div className="text-center text-gray-400">
                                        <p>Novo total: {calculateTotal(editForm)} pizzas</p>
                                    </div>
                                </div>
                            ) : (
                                // Modo de visualização
                                <>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="text-center">
                                            <p className="text-sm text-gray-400">Grande</p>
                                            <p className="text-2xl font-bold text-green-400">{sales.G}</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm text-gray-400">Média</p>
                                            <p className="text-2xl font-bold text-blue-400">{sales.M}</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm text-gray-400">Broto</p>
                                            <p className="text-2xl font-bold text-yellow-400">{sales.B}</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm text-gray-400">Metro</p>
                                            <p className="text-2xl font-bold text-red-400">{sales.METRO}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-3 pt-3 border-t border-gray-600 text-center">
                                        <p className="text-lg">
                                            <span className="text-gray-400">Total do dia: </span>
                                            <span className="font-bold text-white">{calculateTotal(sales)} pizzas</span>
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    </>;
}