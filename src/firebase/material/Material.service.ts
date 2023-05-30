import { Dije } from "../../interface/dije.interface";
import { Material } from "../../interface/materiales.interface";
import { HttpAdapter } from "../../interface/service";
import { ResponseService } from "../../interface/statusResponse";
import { materialesCollectionRef } from "../providers";
import { query, getDocs } from "firebase/firestore";

export class MaterialService implements HttpAdapter<Material>{
    constructor(
        private materialCollections = materialesCollectionRef,
    ) { }

    async getAll(): Promise<ResponseService<Material>> {
        try {
            const queryData = query<Omit<Material, 'id'>>(this.materialCollections);
            const querySnapshot = await getDocs<Omit<Material, 'id'>>(queryData);
            const Materials: Material[] = []

            querySnapshot.forEach((doc) => {
                const data: Omit<Material, 'id'> = doc.data();
                Materials.push({ id: doc.id, ...data })
            });

            return { data: Materials, status: 'success' }
        } catch (error) {
            console.log(error)
            return { data: [], status: 'error' }
        }
    }

}

export const materialService = new MaterialService()