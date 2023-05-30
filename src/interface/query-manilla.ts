import { WhereFilterOp } from "firebase/firestore";
import { ManillaKeys } from "./manilla.interface";

export interface QueryManilla {
    fieldPath: ManillaKeys;
    opStr: WhereFilterOp,
    value: unknown
}
