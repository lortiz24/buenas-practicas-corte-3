import { Dije } from "../../interface/dije.interface";
import { Manilla } from "../../interface/manilla.interface";
import { QueryManilla } from "../../interface/query-manilla";
import { HttpAdapter } from "../../interface/service";
import { ResponseService } from "../../interface/statusResponse";
import { manillasCollectionRef } from "../providers";
import { query, orderBy, addDoc, getDocs, deleteDoc, doc, updateDoc, onSnapshot, getDoc, where, QueryFieldFilterConstraint, } from "firebase/firestore";

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
    async getManilla(manillaId: string): Promise<ResponseService<Manilla>> {
        try {
            const documentRef = doc(this.manillaCollections, manillaId);

            const querySnapshot = await getDoc<Omit<Manilla, 'id'>>(documentRef);
            const manilla = { id: querySnapshot.id, ...querySnapshot.data() } as Manilla


            return { data: manilla, status: 'success' }
        } catch (error) {
            console.log(error)
            return { data: [], status: 'error' }
        }
    }


    async create(newManilla: Omit<Manilla, 'id'>): Promise<ResponseService<Manilla>> {
        try {
            const documentRef = await addDoc(this.manillaCollections, newManilla);

            const { data: manilla } = await this.getManilla(documentRef.id)


            return { data: manilla, status: 'success' }
        } catch (error) {
            console.log(error)
            return { data: [], status: 'error' }
        }
    }
    async getWhere(...queryConstraints: QueryManilla[]): Promise<ResponseService<Manilla>> {
        try {
            console.log('queryConstraints',queryConstraints)
            const wheres: QueryFieldFilterConstraint[] = []
            if (queryConstraints.length > 0) {
                queryConstraints.map(query => {
                    wheres.push(where(query.fieldPath, query.opStr, query.value))
                })
            }
            console.log('wheres',wheres)
            const queryData = query<Omit<Manilla, 'id'>>(this.manillaCollections, ...wheres);
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