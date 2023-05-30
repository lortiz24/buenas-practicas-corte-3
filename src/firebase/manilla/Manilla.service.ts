import { Dije } from "../../interface/dije.interface";
import { Manilla } from "../../interface/manilla.interface";
import { HttpAdapter } from "../../interface/service";
import { ResponseService } from "../../interface/statusResponse";
import { manillasCollectionRef } from "../providers";
import { query, orderBy, addDoc, getDocs, deleteDoc, doc, updateDoc, onSnapshot, getDoc, where, } from "firebase/firestore";

export class ManillaService implements HttpAdapter<Manilla>{
    constructor(
        private manillaCollections = manillasCollectionRef,
    ) { }

    async getAll(): Promise<ResponseService<Manilla>> {
        try {
            const queryData = query<Omit<Manilla, 'id'>>(this.manillaCollections);
            const querySnapshot = await getDocs<Omit<Manilla, 'id'>>(queryData);
            const manillas: Manilla[] = []

            querySnapshot.forEach((doc) => {
                const data: Omit<Manilla, 'id'> = doc.data();
                manillas.push({ id: doc.id, ...data })
            });

            return { data: manillas, status: 'success' }
        } catch (error) {
            console.log(error)
            return { data: [], status: 'error' }
        }
    }

}

export const manillaService = new ManillaService()