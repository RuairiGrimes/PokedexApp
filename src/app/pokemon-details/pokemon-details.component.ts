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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<PokemonDetailsComponent>, private http: HttpClient) { }

  ngOnInit(): void {
    this.moves = [];
    this.pokemon = this.data; // <-- make sure this is receiving the pokemon object
    if (this.pokemon && this.pokemon.id) {
      this.fetchPokemonMoveset(this.pokemon.id);
    }
  }
  close(): void {
    this.dialogRef.close();
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
}