import { Dije } from "../../interface/dije.interface";
import { HttpAdapter } from "../../interface/service";
import { ResponseService } from "../../interface/statusResponse";
import { dijesCollectionRef } from "../providers";
import { query, orderBy, addDoc, getDocs, deleteDoc, doc, updateDoc, onSnapshot, getDoc, where, } from "firebase/firestore";

export class DijeService implements HttpAdapter<Dije>{
    constructor(
        private dijesCollections = dijesCollectionRef,
    ) { }

    async getAll(): Promise<ResponseService<Dije>> {
        try {
            const queryData = query<Omit<Dije, 'id'>>(this.dijesCollections);
            const querySnapshot = await getDocs<Omit<Dije, 'id'>>(queryData);
            const dijes: Dije[] = []

            querySnapshot.forEach((doc) => {
                const data: Omit<Dije, 'id'> = doc.data();
                dijes.push({ id: doc.id, ...data })
            });

            return { data: dijes, status: 'success' }
        } catch (error) {
            console.log(error)
            return { data: [], status: 'error' }
        }
    }

}

export const dijeService = new DijeService()