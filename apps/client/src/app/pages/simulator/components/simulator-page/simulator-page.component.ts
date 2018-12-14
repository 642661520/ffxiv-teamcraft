import { Component } from '@angular/core';
import { Craft } from '../../../../model/garland-tools/craft';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../../../../model/garland-tools/item';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { DataService } from '../../../../core/api/data.service';
import { RotationsFacade } from '../../../../modules/rotations/+state/rotations.facade';

@Component({
  selector: 'app-simulator-page',
  templateUrl: './simulator-page.component.html',
  styleUrls: ['./simulator-page.component.less']
})
export class SimulatorPageComponent {

  recipe$: Observable<Craft>;

  item$: Observable<Item>;

  thresholds$: Observable<number[]>;

  constructor(private route: ActivatedRoute, private dataService: DataService,
              private rotationsFacade: RotationsFacade, private router: Router) {

    this.route.paramMap.pipe(
      map(params => params.get('rotationId'))
    ).subscribe(id => {
      if (id === null) {
        this.rotationsFacade.createRotation();
        this.rotationsFacade.selectRotation(undefined);
      } else {
        this.rotationsFacade.getRotation(id);
        this.rotationsFacade.selectRotation(id);
      }
    });

    this.item$ = this.route.paramMap.pipe(
      switchMap(params => {
        return this.dataService.getItem(+params.get('itemId'));
      }),
      map(itemData => itemData.item),
      shareReplay(1)
    );

    this.thresholds$ = this.item$.pipe(
      map(item => {
        if (item.collectable === 1) {
          // If it's a delivery item
          if (item.satisfaction !== undefined) {
            // We want thresholds on quality, not collectable score.
            return item.satisfaction[0].rating.map(r => r * 10);
          } else if (item.masterpiece !== undefined) {
            return item.masterpiece.rating.map(r => r * 10);
          }
        }
        return [];
      })
    );

    this.recipe$ = this.route.paramMap.pipe(
      switchMap(params => {
        return this.item$.pipe(
          map(item => {
            if (params.get('recipeId') === null && item.craft.length > 0) {
              this.router.navigate([item.craft[0].id], { relativeTo: this.route });
            }
            return item.craft.find(c => c.id.toString() === params.get('recipeId'));
          })
        );
      })
    );
  }

}
