
export type TipoDije = 'oro' | 'oro-rosado' | 'plata' | 'niquel'

export interface Dije {
    name: 'Martillo' | 'Ancla';
    status: 'disponible' | 'agotado'
    id: string
    tipo: TipoDije
}