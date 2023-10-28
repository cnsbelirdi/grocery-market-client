import { Component, OnInit } from '@angular/core';
import { List_Category } from 'src/app/contracts/category/list_category';
import { CategoryService } from 'src/app/services/common/models/category.service';
import { ApiService } from 'src/app/store/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private apiService: ApiService
  ) {}
  categories: List_Category[] = [
    { id: '0', name: 'All', createdDate: new Date(2000) },
  ];

  async ngOnInit() {
    const _categories: List_Category[] = (
      await this.categoryService.getAllCategories(-1, -1)
    ).categories;
    this.categories = this.categories.concat(_categories);
  }

  setCategory(category: List_Category) {
    this.categoryService.setCurrentCategory(category);
  }
}
