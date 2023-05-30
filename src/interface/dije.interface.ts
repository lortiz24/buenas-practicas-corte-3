import { MateriaPrima } from "./materia-prima.interface";

export type TipoDije = 'oro' | ' baño-oro' | 'oro-rosado' | 'plata' | 'niquel'

export interface Dije extends MateriaPrima {
    id:string
    tipo: TipoDije
}