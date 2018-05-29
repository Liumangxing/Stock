import { Component, OnInit } from '@angular/core';
import { Stock, StockService } from '../stock.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';



@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.scss']
})
export class StockFormComponent implements OnInit {
  formModel: FormGroup;
  stock: Stock = new Stock(0,'',0,0,'',[]);
  categories = ['IT', '互联网', '金融'];

  constructor(
    private routeInfo: ActivatedRoute,
    private stockService: StockService,
    private router: Router
  ) {
  }

  ngOnInit() {
    let fb;
    fb = new FormBuilder();
    this.formModel = fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', Validators.required],
      desc: [''],
      categories: fb.array([
        new FormControl(false),
        new FormControl(false),
        new FormControl(false)
      ], this.categoriesValid)
    });
    let stockId;
    stockId = this.routeInfo.snapshot.params['id'];
    this.stockService.getStock(stockId)
      .subscribe(
        data => {
          this.stock = data
          this.formModel.reset({
            name:data.name,
            price:data.price,
            desc:data.desc,
            categories:[
              data.categories.indexOf(this.categories[0])!=-1,
              data.categories.indexOf(this.categories[1])!=-1,
              data.categories.indexOf(this.categories[2])!=-1,
            ]
          });
        } 
      );

  }

  categoriesValid(event: FormArray) {
    let valid: boolean;
    valid = false;

    event.controls.forEach(element => {
      if (element.value) {
        valid = true;
      }
    });
    if (valid) {
      return null;
    } else {
      return { categoriesLength: true };
    }
  }

  cancel() {
    this.router.navigateByUrl('/stock');
  }

  save() {
    let chineseCategories;
    let index;
    chineseCategories = [];
    index = 0;
    for (let i = 0; i < 3; i++) {
      if (this.formModel.value.categories[i]) {
        chineseCategories[index++] = this.categories[i];
      }
    }
    this.formModel.value.categories = chineseCategories;
    this.formModel.value.rating = this.stock.rating;
    // this.router.navigateByUrl('/stock');
    console.log(this.formModel.value);
  }
}
