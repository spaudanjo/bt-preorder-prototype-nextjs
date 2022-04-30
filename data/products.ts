import { Product, ProductGender } from ".prisma/client";
import { v4 as uuidv4 } from "uuid";

const products = [
    {
        name: "Long Skirt",
        gender: ProductGender.FEMALE
    },
    {
        name: "Jeans",
        gender: ProductGender.MALE
    },
    {
        name: "Beanie",
        gender: ProductGender.KIDS
    }
].map(p => ({
    ...p, 
    id: uuidv4()

}));

export default products;