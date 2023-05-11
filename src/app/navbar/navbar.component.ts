import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() showHome = new EventEmitter<void>();
  @Output() showPokemonList = new EventEmitter<void>();
  @Output() searchClicked = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}