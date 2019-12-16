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
      {value: 'T-shirt-2', viewValue: 'T-shirt'},
      {value: 'Jacket-0', viewValue: 'Jacket'},
      {value: 'Polo-1', viewValue: 'Polo Shirt'},
      {value: 'jeans-2', viewValue: 'Others'}
    ]
  },
  {
    name: 'Accessories',
    pokemon: [
      {value: 'BagsandBackpacks-3', viewValue: 'Bags and Backpacks'},
      {value: 'Eyeware-4', viewValue: 'Eyeware'},
      {value: 'Money-3', viewValue: 'Money Bag'},
      {value: 'watch-4', viewValue: 'watch'},
      {value: 'Glass-3', viewValue: 'Glass'},
      {value: 'Germents-4', viewValue: 'Shoe'},
      {value: 'other-4', viewValue: 'Others'}

    ]
  },
  {
    name: 'Computer',
    pokemon: [
      {value: 'pc-1', viewValue: 'Computer Component'},
      {value: 'pc-2', viewValue: 'Laptop'},
      {value: 'pc-3', viewValue: 'Phone'},
      {value: 'pc-4', viewValue: 'Printer'},
      {value: 'pc-5', viewValue: 'Tablet'},
      {value: 'pc-6', viewValue: 'Others'}
    ]
  },
  {
    name: 'Transport',
    pokemon: [
      {value: 'tc-1', viewValue: 'Bike'},
      {value: 'tc-2', viewValue: 'Car'},
      {value: 'tc-3', viewValue: 'Motorcycle'},
      {value: 'tc-4', viewValue: 'Scooter'},
      {value: 'tc-5', viewValue: 'Skate Board'},
      {value: 'tc-6', viewValue: 'Others'}
    ]
  },
  {
    name: 'Others',
    pokemon: [
      {value: 'o-6', viewValue: 'Others'}
    ]
  }

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
