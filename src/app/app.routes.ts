import { Routes, UrlSegment } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((c) => c.HomeComponent),
    loadChildren: () => import('./home/home.routes').then((m) => m.homeRoutes),
  },
  {
    path: 'form',
    loadComponent: () =>
      import('./form/form.component').then((c) => c.FormComponent),
  },
  {
    matcher: (url) => {
      if (url.length === 1 && url[0].path.startsWith('@')) {
        return {
          consumed: url,
          posParams: {
            title: new UrlSegment(url[0].path.slice(1), {}),
          },
        };
      }
      return null;
    },
    loadComponent: () =>
      import('./detail/detail.component').then((c) => c.DetailComponent),
  },
];
