import { collection, CollectionReference } from "firebase/firestore";
import { FirebaseDB } from "./ConfigFirebase";
import { Material } from "../interface/materiales.interface";
import { Dije } from "../interface/dije.interface";

export const materialesCollectionRef = collection(FirebaseDB, "materiales") as CollectionReference<Omit<Material, 'id'>>;
export const dijesCollectionRef = collection(FirebaseDB, "dijes") as CollectionReference<Omit<Dije, 'id'>>;




