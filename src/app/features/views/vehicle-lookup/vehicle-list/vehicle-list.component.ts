
import { Component, OnInit, OnDestroy, ViewChild, forwardRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar as MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../../../../shared/models/product.model';
import { UntypedFormBuilder, UntypedFormGroup, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule, FormsModule, NgModel } from '@angular/forms'
import { Subscription, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { allMaterialModules } from '../../../../shared/material-imports';
import { egretAnimations } from '../../../../shared/animations/egret-animations';
import { AsyncPipe, CurrencyPipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { EgretSidebarComponent } from '../../../../shared/components/egret-sidebar/egret-sidebar.component';
import { MatDialog as MatDialog } from '@angular/material/dialog';
import { LookupHistoryComponent } from '../../lookup-history/lookup-history.component';
import { VehicleDetailsComponent } from '../vehicle-details/vehicle-details.component';
import { FilterOverviewComponent } from './modals/filter-overview/filter-overview.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-vehicle-list',
  imports: [...allMaterialModules, NgClass, ReactiveFormsModule, NgStyle, NgIf, CurrencyPipe,AsyncPipe, RouterModule, NgFor, AsyncPipe, EgretSidebarComponent],
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.scss',
  animations: [egretAnimations],
  providers: [
 
    ],
})
export class VehicleListComponent implements OnInit, OnDestroy {
  public isSideNavOpen: boolean;
  public viewMode: string = 'grid-view';
  public currentPage: any;
  @ViewChild(MatSidenav) private sideNav: MatSidenav;

  public products$: Observable<Product[]>;
  public categories$: Observable<any>;
  public activeCategory: string = 'all';
  public filterForm: UntypedFormGroup;
  public cartData: any;
  panelOpenState = false;
  view: string;

  events: string[] = [];
  opened: boolean;


  constructor(
    //private shopService: ShopService,
    private fb: UntypedFormBuilder,
    public dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) { }




  ngOnInit() {
    const routeData = this.route.snapshot.data;
    this.view = routeData['view'];

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
   // this.categories$ = this.shopService.getCategories();
   // this.buildFilterForm(this.shopService.initialFilters);
    
    setTimeout(() => {
     // this.loader.open();
    });
   
    this.getCart();
    //this.cartData = this.shopService.cartData;
  }
  ngOnDestroy() {

  }
  getCart() {
    
  }
  openFilterDialog() {
    const dialogRef = this.dialog.open(FilterOverviewComponent, {
      width: '80%',
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }
  addToCart(product) {
  }

  buildFilterForm(filterData:any = {}) {
    this.filterForm = this.fb.group({
      search: [''],
      category: ['all'],
      minPrice: [filterData.minPrice],
      maxPrice: [filterData.maxPrice],
      minRating: [filterData.minRating],
      maxRating: [filterData.maxRating]
    })
  }
  setActiveCategory(category) {
    this.activeCategory = category;
    this.filterForm.controls['category'].setValue(category)
  }

  toggleSideNav() {
    this.sideNav.opened = !this.sideNav.opened;
  }

  updateSearchTerm(term: string) {
    // This method can be used to update the search term in the component.
    // For example, you might want to filter a list of vehicles based on the search term.
    console.log('Search term updated:', term);
    // Implement your logic here, such as calling a service to fetch filtered results.
  }

  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}


