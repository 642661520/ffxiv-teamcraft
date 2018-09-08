import { Component, Input } from '@angular/core';
import { Vector2 } from '../../../core/tools/vector2';
import { LocalizedDataService } from '../../../core/data/localized-data.service';
import { I18nToolsService } from '../../../core/tools/i18n-tools.service';
import { MapComponent } from '../map/map.component';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-map-position',
  templateUrl: './map-position.component.html',
  styleUrls: ['./map-position.component.less']
})
export class MapPositionComponent {

  @Input()
  marker: Vector2;

  @Input()
  zoneId: number;

  constructor(private dialog: NzModalService, private l12n: LocalizedDataService,
              private i18n: I18nToolsService) {
  }

  getMarker(): Vector2 {
    return {
      x: Math.round(this.marker.x),
      y: Math.round(this.marker.y)
    };
  }

  openMap(): void {
    this.dialog.create({
      nzTitle: this.i18n.getName(this.l12n.getPlace(this.zoneId)),
      nzContent: MapComponent,
      nzComponentParams: {
        mapId: this.zoneId,
        markers: [this.marker]
      },
      nzFooter: null
    });
  }

}
