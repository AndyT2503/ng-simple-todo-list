import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TODO_STATUS } from 'src/app/shared/constants';
import { TabItem } from 'src/app/shared/models';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [NgFor, RouterLink, RouterLinkActive],
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent {
  tabList: TabItem[] = [
    {
      link: '',
      title: TODO_STATUS.all,
    },
    {
      link: 'planning',
      title: TODO_STATUS.planning,
    },
    {
      link: 'processing',
      title: TODO_STATUS.processing,
    },
    {
      link: 'complete',
      title: TODO_STATUS.complete,
    },
  ];
}
