import { TipoDije } from "./dije.interface";


export type Monedas = 'usd' | 'cop'
export interface Precio {
    valor: number;
    moneda: Monedas
}
export interface Manilla {
    id: string;
    name: string;
    material: string;
    dije: string
    tipo: TipoDije
    precio: Precio,
    img: string
}


export type ManillaKeys = keyof Manilla;