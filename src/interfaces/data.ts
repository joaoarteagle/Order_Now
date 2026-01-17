interface PizzaSales {
  G: number;    // Grande
  M: number;    // Média  
  B: number;    // Broto
  METRO: number; // Meio metro
}

interface SalesData {
  [date: string]: PizzaSales; // Data no formato dd/mm/YYYY
}

export type { PizzaSales, SalesData };


