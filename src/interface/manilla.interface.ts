import { Dije } from "./dije.interface";

interface Precio {
    valor: number;
    moneda: 'usd' | 'cop'
}
export interface Manilla {
    id: string;
    name: string;
    material: string;
    dije: Dije
    precio: Precio
}