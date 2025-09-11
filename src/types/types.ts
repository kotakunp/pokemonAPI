export interface PokemonListItem {
    name: string;
    url: string;
}

export interface PokemonListResponse {
    results: PokemonListItem[]
}

export interface PokemonDetail {
    name: string;
    height: number;
    weight: number;
    sprites: {
        front_default: string;
    };

    types: {
        type: { name: string };
    }[];
}