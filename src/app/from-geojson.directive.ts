import { Directive, ElementRef, Input, OnChanges, SimpleChanges, ViewChild, Renderer2 } from '@angular/core';
import { AllGeoJSON, bbox as tBbox, projection } from '@turf/turf';

declare var geojson2svg: any;

@Directive({
  selector: '[fromGeoJson]'
})
export class FromGeojsonDirective implements OnChanges {

  @Input('fromGeoJson') geojson: AllGeoJSON;

  private path: SVGPathElement;

  constructor(private renderer: Renderer2, private el: ElementRef) {
    this.path = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );

    this.renderer.appendChild(this.el.nativeElement, this.path);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const mercator = projection.toMercator(this.geojson);
    const bbox = tBbox(mercator);
    const converter = geojson2svg({
      mapExtent: bboxToExtent(bbox),
      output: 'path',
      viewportSize: {
        width: 20,
        height: 20,
      }
    });

    this.renderer.setAttribute(this.path, 'd', converter.convert(mercator));
    console.log(bboxToViewBox(this.path.getBBox()));

    const pbbox = this.path.getBBox();

    this.renderer.setAttribute(this.path, 'transform', `translate(${50 - pbbox.width}, ${50 - pbbox.height})`);

    // this.renderer.setAttribute(this.el.nativeElement, 'viewBox', bboxToViewBox(this.path.getBBox()));
  }

}

function bboxToExtent(bbox) {
  return {
    left: bbox[0],
    bottom: bbox[1],
    right: bbox[2],
    top: bbox[3]
  };
}

function bboxToViewBox(bbox) {
  return `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`;
}