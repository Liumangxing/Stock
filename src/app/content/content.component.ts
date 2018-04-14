import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  pageTitle = '';
  pageDesc = '';
  constructor(
    router: Router
  ) {
    router.events.filter(event => event instanceof NavigationEnd) // 过滤出路由事件（此处是过滤出路由结束事件）
      .subscribe((event: NavigationEnd) => {  // 订阅路由结束事件对象
        if (event.url === '/dashboard') {
          this.pageTitle = '这里是首页';
          this.pageDesc = '';
        } else if (event.url.startsWith('/stock')) { // startsWith()方法：截取以‘/stock’开头的路由url
          this.pageTitle = '股票信息管理';
          this.pageDesc = '进行股票信息基本增删改查';
        }
      });
  }

  ngOnInit() {

  }

}
