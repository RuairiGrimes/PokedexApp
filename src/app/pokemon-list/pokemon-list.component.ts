import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PokemonDetailsComponent } from '../pokemon-details/pokemon-details.component';
import { DataService } from '../services/data.service';
import {  PaginationService, PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemon: any[] = [];
  page = 1;
  totalPokemon?: number;
  dialogOpen = false;
  pokemonHover: boolean = false; // Add this property
  itemsPerPage: number = 20; // set items per page to 20
  visiblePokemon: any[] = [];
  filteredPokemonList: any[] = [];
  allPokemon: any[] = [];
  searchTerm: string = '';
  config: PaginationInstance = {
    id:"px1",
    itemsPerPage: 20,
    currentPage: 1,
    totalItems: 1000
  };

  constructor(
    private dataService: DataService,
    private dialog: MatDialog,
    private paginationService: PaginationService
    ) {
      this.paginationService.register(this.config);
  }

  ngOnInit(): void {
    this.getPokemon();
    this.filteredPokemonList = this.pokemon;
  }

  uniqueNames = new Set();
  getPokemon() {
    this.dataService.getPokemon(1000, 0)
      .subscribe((response: any) => {
        this.totalPokemon = response.count;
        response.results.forEach((result: any) => {
          this.dataService.getMoreData(result.name)
            .subscribe((uniqueResponse: any) => {
              this.pokemon.push(uniqueResponse);
              this.config.totalItems = this.pokemon.length;
              this.updateVisiblePokemon();
            });
        });
      });
  }

  updateVisiblePokemon() {
    const startIndex = (this.config.currentPage - 1) * this.config.itemsPerPage;
    const endIndex = startIndex + this.config.itemsPerPage;
    this.visiblePokemon = this.pokemon.slice(startIndex, endIndex);
  }

  onPageChanged(event: any): void {
    console.log('Page changed:', event);
    this.config.currentPage = event;
    this.updateVisiblePokemon();
  }

  openDialog(pokemon: any) {
    this.dialogOpen = true;
    const dialogRef = this.dialog.open(PokemonDetailsComponent, {
      data: pokemon
    });
    dialogRef.afterClosed().subscribe(result => {
      this.dialogOpen = false;
    });
  }

}
