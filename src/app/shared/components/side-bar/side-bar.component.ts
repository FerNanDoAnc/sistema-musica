import { Component, ViewEncapsulation } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

const ICON_MENU =`
<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="100px" height="100px"><path fill="#a32ece" d="M43.992,24.02c0.08,3.82-1.01,7.44-2.94,10.53c-0.58-0.95-1.24-1.85-1.97-2.68 c1.23-2.34,1.93-5.02,1.92-7.89c-0.01-2.88-0.7-5.54-1.92-7.85c0.73-0.83,1.39-1.73,1.97-2.68 C43.002,16.56,44.092,20.21,43.992,24.02z"/><path fill="#a32ece" d="M8.882,31.92c-0.7,0.8-1.33,1.66-1.88,2.56c-1.91-3.06-3-6.66-3-10.5c0-3.83,1.1-7.41,2.99-10.46 c0.57,0.92,1.21,1.78,1.91,2.59c-1.3,2.4-2,5.12-1.89,7.93C6.912,26.82,7.602,29.52,8.882,31.92z"/><path fill="#a32ece" d="M20.002,22.59v2.82c-2.03,0.4-3.95,1.13-5.71,2.11c0.34-0.98,0.97-1.86,1.86-2.58 c0.27-0.28,0.63-0.5,0.83-0.96c-0.33-0.55-0.83-0.91-1.23-1.32c-0.65-0.65-1.14-1.38-1.43-2.16 C16.072,21.47,17.982,22.19,20.002,22.59z"/><path fill="#a32ece" d="M34.472,25.27c-0.25,0.61-0.77,0.82-1.46,0.69c-0.59-0.11-0.92-0.48-0.99-1.13 c-0.04-0.28,0-0.57,0-0.87c0-0.28-0.02-0.59,0-0.87c0.09-0.63,0.46-0.98,1.08-1.07c0.64-0.09,1.1,0.11,1.34,0.7 C34.802,23.54,34.802,24.42,34.472,25.27z"/><path fill="#a32ece" d="M25.002,22.97v2.06c-0.33-0.02-0.67-0.03-1-0.03c-0.68,0-1.34,0.03-2,0.1v-2.2 c0.66,0.07,1.32,0.1,2,0.1C24.332,23,24.672,22.99,25.002,22.97z"/><path fill="#a32ece" d="M30.002,22.08v3.84c-0.97-0.31-1.97-0.54-3-0.7v-2.44C28.032,22.62,29.032,22.39,30.002,22.08z"/><g><path fill="#606bda" d="M41.052,13.45c-0.58,0.95-1.24,1.85-1.97,2.68c-0.49-0.94-1.06-1.82-1.72-2.63 c0.66-0.82,1.24-1.71,1.72-2.66C39.822,11.66,40.472,12.52,41.052,13.45z"/><path fill="#606bda" d="M10.632,13.49c-0.66,0.82-1.24,1.7-1.73,2.62c-0.7-0.81-1.34-1.67-1.91-2.59 c0.58-0.93,1.23-1.81,1.95-2.63C9.422,11.81,9.992,12.68,10.632,13.49z"/><path fill="#606bda" d="M14.322,20.5v-0.01c-0.18-0.49-0.29-0.99-0.32-1.49c-0.04-0.69,0.07-1.39,0.31-2.04 c1.69,1.19,3.61,2.07,5.68,2.57c0.01,1.02,0.01,2.04,0.01,3.06C17.982,22.19,16.072,21.47,14.322,20.5z"/><path fill="#606bda" d="M25.002,19.97v3c-0.33,0.02-0.67,0.03-1,0.03c-0.68,0-1.34-0.03-2-0.1v-3.02 c0.65,0.08,1.32,0.12,2,0.12C24.332,20,24.672,19.99,25.002,19.97z"/><path fill="#606bda" d="M30.002,19.5v2.58c-0.97,0.31-1.97,0.54-3,0.7v-3.05c1-0.17,1.96-0.43,2.89-0.78 C29.962,19.12,30.002,19.31,30.002,19.5z"/></g><g><path fill="#0091ea" d="M39.082,10.83v0.01c-0.48,0.95-1.06,1.84-1.72,2.66c-3.18-4.02-8.13-6.49-13.42-6.5 c-5.34,0-10.18,2.6-13.31,6.49c-0.64-0.81-1.21-1.68-1.69-2.6c3.68-4.22,9.1-6.9,15.1-6.89C30.042,4,35.432,6.69,39.082,10.83z"/><path fill="#0091ea" d="M19.992,19.53c-2.07-0.5-3.99-1.38-5.68-2.57c0.5-1.38,1.59-2.59,3.14-3.26 c1.34-0.59,2.53,0.13,2.53,1.56S19.992,18.11,19.992,19.53z"/><path fill="#0091ea" d="M25.002,15.5v4.47c-0.33,0.02-0.67,0.03-1,0.03c-0.68,0-1.35-0.04-2-0.12V15.5 c0-0.83,0.67-1.5,1.5-1.5S25.002,14.67,25.002,15.5z"/><path fill="#0091ea" d="M29.892,18.95c-0.93,0.35-1.89,0.61-2.89,0.78V19.5c0-0.83,0.67-1.5,1.5-1.5 C29.142,18,29.682,18.39,29.892,18.95z"/></g><g><path fill="#c537aa" d="M41.052,34.55c-0.58,0.93-1.23,1.81-1.96,2.63c-0.48-0.95-1.06-1.84-1.72-2.67 c0.65-0.82,1.23-1.7,1.71-2.64C39.812,32.7,40.472,33.6,41.052,34.55z"/><path fill="#c537aa" d="M10.612,34.54c-0.64,0.8-1.19,1.66-1.67,2.57c-0.72-0.82-1.37-1.7-1.94-2.63 c0.55-0.9,1.18-1.76,1.88-2.56C9.372,32.84,9.952,33.72,10.612,34.54z"/><path fill="#c537aa" d="M20.002,25.41c0,1.02,0,2.04-0.01,3.06c-2.09,0.51-4.02,1.4-5.72,2.6 c-0.15-0.47-0.23-0.97-0.26-1.51c-0.04-0.71,0.06-1.4,0.28-2.04C16.052,26.54,17.972,25.81,20.002,25.41z"/><path fill="#c537aa" d="M25.002,25.03v3c-0.33-0.02-0.67-0.03-1-0.03c-0.68,0-1.35,0.04-2,0.12V25.1 c0.66-0.07,1.32-0.1,2-0.1C24.332,25,24.672,25.01,25.002,25.03z"/><path fill="#c537aa" d="M30.002,25.92v2.58c0,0.19-0.04,0.38-0.11,0.55c-0.93-0.35-1.89-0.61-2.89-0.78v-3.05 C28.032,25.38,29.032,25.61,30.002,25.92z"/></g><g><path fill="#d53e98" d="M19.992,28.47c0,1.39-0.01,2.77-0.01,4.15c0,1.67-1.16,2.33-2.71,1.65c-1.56-0.69-2.56-1.79-3-3.2 C15.972,29.87,17.902,28.98,19.992,28.47z"/><path fill="#d53e98" d="M25.002,28.03v4.47c0,0.83-0.67,1.5-1.5,1.5s-1.5-0.67-1.5-1.5v-4.38c0.65-0.08,1.32-0.12,2-0.12 C24.332,28,24.672,28.01,25.002,28.03z"/><path fill="#d53e98" d="M29.892,29.05c-0.21,0.56-0.75,0.95-1.39,0.95c-0.83,0-1.5-0.67-1.5-1.5v-0.23 C28.002,28.44,28.962,28.7,29.892,29.05z"/><path fill="#d53e98" d="M39.092,37.18c-3.65,4.15-9.05,6.83-15.07,6.82c-6.03-0.01-11.41-2.69-15.08-6.89 c0.48-0.91,1.03-1.77,1.67-2.57c3.08,3.85,7.83,6.43,13.15,6.46c5.49,0.02,10.44-2.49,13.61-6.49 C38.032,35.34,38.612,36.23,39.092,37.18z"/></g></svg>
`;

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SideBarComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private _matIcon: MatIconRegistry,
    private _domSanitizer: DomSanitizer,
    ) {
    this._matIcon.addSvgIconLiteral('iconMenu', this._domSanitizer.bypassSecurityTrustHtml(ICON_MENU));
  }

}
