import { Injectable } from "@angular/core";

export interface Pokemon {
  value: string;
  viewValue: string;
}

export interface PokemonGroup {
  disabled?: boolean;
  name: string;
  pokemon: Pokemon[];
}
// const categoryList: CategoryList[] = [
//   {
//     name: "Clothing",
//     children: [
//       {
//         name: "Shirt"
//       },
//       {
//         name: "Pant"
//       },
//       {
//         name: "T-shirt"
//       }
//     ]
//   },
//   {
//     name: "Accessories",
//     children: [
//       {
//         name: "Eyeware"
//       },
//       {
//         name: "Bags and Backpacks",
//         children:[
//           {
//             name: "Travel Bags"
//           },
//           {
//             name: "Laptop Bags"
//           },
//           {
//             name: "Backpacks"
//           }
//         ]
//       }
//     ]
//   }
// ];

const pokemonGroups: PokemonGroup[] = [
  {
    name: 'Clothing',
    pokemon: [
      {value: 'Shirt-0', viewValue: 'Shirt'},
      {value: 'Pant-1', viewValue: 'Pant'},
      {value: 'T-shirt-2', viewValue: 'T-shirt'}
    ]
  },
  {
    name: 'Accessories',
    pokemon: [
      {value: 'BagsandBackpacks-3', viewValue: 'Bags and Backpacks'},
      {value: 'Eyeware-4', viewValue: 'Eyeware'},
      // {value: 'horsea-5', viewValue: 'Horsea'}
    ]
  },
  // {
  //   name: 'Fire',
  //   disabled: true,
  //   pokemon: [
  //     {value: 'charmander-6', viewValue: 'Charmander'},
  //     {value: 'vulpix-7', viewValue: 'Vulpix'},
  //     {value: 'flareon-8', viewValue: 'Flareon'}
  //   ]
  // },
  // {
  //   name: 'Psychic',
  //   pokemon: [
  //     {value: 'mew-9', viewValue: 'Mew'},
  //     {value: 'mewtwo-10', viewValue: 'Mewtwo'},
  //   ]
  // }
];

@Injectable({
  providedIn: "root"
})
export class CatergoryService {
  constructor() {}

  getCategories(){
    return pokemonGroups;
  }
}
