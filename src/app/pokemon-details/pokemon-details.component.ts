import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PokemonDetailsComponent implements OnInit {
  pokemon: any;
  moves!: string[]; // Add this line to declare the 'moves' property
  showMoves = false;
  genderRate!: number;
  malePercentage!: number;
  femalePercentage!: number;
  habitat!: string;
  abilities!: string[];
  showAdditionalInfo = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<PokemonDetailsComponent>, private http: HttpClient) { }

  ngOnInit(): void {
    this.moves = [];
    this.pokemon = this.data; // <-- make sure this is receiving the pokemon object
    if (this.pokemon && this.pokemon.id) {
      this.fetchPokemonMoveset(this.pokemon.id);
      this.fetchPokemonExtraData(this.pokemon.id); 
    }
  }
  close(): void {
    this.dialogRef.close();
  }
  toggleAdditionalInfoVisibility(): void {
    this.showAdditionalInfo = !this.showAdditionalInfo;
  }
  toggleMovesVisibility(): void {
    this.showMoves = !this.showMoves;
  }
  fetchPokemonMoveset(pokemonId: number) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    this.http.get(url).subscribe((response: any) => {
      this.moves = response.moves.map((moveObj: any) => {
        return moveObj.move.name;
      });
    });
  }
  fetchPokemonExtraData(pokemonId: number) {
    const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`;
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
  
    this.http.get(speciesUrl).subscribe((speciesResponse: any) => {
      this.genderRate = speciesResponse.gender_rate;
      this.habitat = speciesResponse.habitat.name;
  
      // Calculate gender ratio
      this.malePercentage = this.genderRate >= 0 ? (this.genderRate / 8) * 100 : -1;
      this.femalePercentage = this.genderRate >= 0 ? 100 - this.malePercentage : -1;
  
      this.http.get(pokemonUrl).subscribe((pokemonResponse: any) => {
        this.abilities = pokemonResponse.abilities.map((abilityObj: any) => {
          return abilityObj.ability.name;
        });
      });
    });
  }
}