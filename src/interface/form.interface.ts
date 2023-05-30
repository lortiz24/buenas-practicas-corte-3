import { Monedas } from "./manilla.interface";

export interface FormBuildManilla {
    cantidad: string,
    dije: string,
    typeDije: string,
    moneda: Monedas,
    material: string,
}