import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { AuthorizeMenuDialogComponent } from 'src/app/dialogs/authorize-menu-dialog/authorize-menu-dialog.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { ApplicationService } from 'src/app/services/common/models/application.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
})
export class AuthorizationComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private applicationService: ApplicationService,
    private dialogService: DialogService
  ) {
    super(spinner);
  }

  async ngOnInit() {
    this.dataSource.data = (
      await this.applicationService.getAuthorizeDefinitionEndpoints()
    ).map((m) => {
      const treeMenu: ITreeMenu = {
        name: m.name,
        actions: m.actions.map((a) => {
          const _treeMenu: ITreeMenu = {
            name: a.definition,
            code: a.code,
            menuName: m.name,
          };
          return _treeMenu;
        }),
      };
      return treeMenu;
    });
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    (menu: ITreeMenu, level: number) => {
      return {
        expandable: menu.actions?.length > 0,
        name: menu.name,
        code: menu.code,
        level: level,
        menuName: menu.menuName,
      };
    },
    (menu) => menu.level,
    (menu) => menu.expandable,
    (menu) => menu.actions
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  assignRole(code: string, name: string, menu: string) {
    this.dialogService.openDialog({
      componentType: AuthorizeMenuDialogComponent,
      data: { code: code, name: name, menuName: menu },
      options: {
        width: '750px',
      },
      afterClosed: () => {},
    });
  }
}

interface ITreeMenu {
  name?: string;
  actions?: ITreeMenu[];
  code?: string;
  menuName?: string;
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
