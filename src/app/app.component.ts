import {AfterViewInit, Component, ViewChild} from '@angular/core'
import {HelloComponent} from "./hello.component"
import {WorldComponent} from "./world.component"

import {ArrowOverlay, Edge, DEFAULT, Vertex, Surface, EVENT_TAP } from "@jsplumbtoolkit/browser-ui"
import {BrowserUIAngular, SurfaceComponent} from "@jsplumbtoolkit/browser-ui-angular"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {

  @ViewChild(SurfaceComponent) surfaceComponent!:SurfaceComponent;

  toolkit!:BrowserUIAngular
  surface!:Surface

  view = {
    nodes:{
      clickable:{
        events:{
          [EVENT_TAP]:(p:{obj:Vertex}) => alert(`You clicked on node ${p.obj.id}`)
        }
      },
      hello:{
        parent:"clickable",
        component:HelloComponent
      },
      world:{
        parent:"clickable",
        component:WorldComponent
      }
    },
    edges:{
      // a default edge definition. Declares an arrow overlay at its tip and extracts 'label' from
      // edge data and displays it as a label overlay (by default at location 0.5)
      [DEFAULT]:{
        overlays:[
          {
            type:ArrowOverlay.type,
            options:{
              location: 1
            }
          }
        ],
        label:"{{label}}",
        events:{
          [EVENT_TAP]:(p:{edge:Edge}) => alert(`You clicked on the edge from ${p.edge.source.id} to ${p.edge.target.id}`)
        }
      }
    }
  }

  renderParams = {

  }

  ngAfterViewInit(): void {

    this.surface = this.surfaceComponent.surface
    this.toolkit = this.surfaceComponent.toolkit

    this.toolkit.load({
      data:{
        nodes:[
          { id:"1", type:"hello", label:"Hello", left:50, top:50 },
          { id:"2", type:"world", label:"World", left:350, top:50 }
        ],
        edges:[
          { source:"1", target:"2", data:{label:"a label", color:"purple"} }
        ]
      }
    })
  }


}
