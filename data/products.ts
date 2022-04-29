import { Product, ProductGender } from ".prisma/client";

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
];

export default products;