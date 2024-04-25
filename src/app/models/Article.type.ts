export type Article = {
    id?: number;
    nom: string;
    description: string;
    prix: number;
    image: string// si url mettre url
};

// the below code fragment it's possible but it's old :
// export interface Article {
//     nom: string;
//     description: string;
//     prix: number;
//     image: string;
// }