import { Dije, TipoDije } from "./dije.interface";

export interface Precio {
    valor: number;
    moneda: 'usd' | 'cop'
}
export interface Manilla {
    id: string;
    name: string;
    material: string;
    dije: string
    tipo:TipoDije
    precio: Precio,
    img: string
}


export type ManillaKeys = keyof Manilla;