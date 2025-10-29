import {Component, Injectable, Input, OnInit} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable()
@Component({
    selector: 'app-icon-svg',
    templateUrl: './icon-svg.component.html',
    styleUrls: ['./icon-svg.component.css']
})
export class IconSVGComponent implements OnInit {

    @Input() icon: string;
    @Input() size: number;
    exist = true;
    sizes = [24, 32, 36, 48, 100];

    constructor(private _iconRegistry: MatIconRegistry, private _sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.size = (is.inArray(this.size, this.sizes)) ? (this.size) : (24);
        switch (this.icon) {
            case 'settings':
                this._iconRegistry.addSvgIcon(
                    `${this.icon}`,
                    this._sanitizer.bypassSecurityTrustResourceUrl('assets/img/icon/settings.svg'));
                break;
            case 'radware':
            case 'radware-alteon':
                this._iconRegistry.addSvgIcon(
                    `${this.icon}`,
                    this._sanitizer.bypassSecurityTrustResourceUrl('assets/img/icon/radware.svg'));
                break;
            case 'citrix':
            case 'citrix-netscaler':
            case 'Netscaler':
                this._iconRegistry.addSvgIcon(
                    `${this.icon}`,
                    this._sanitizer.bypassSecurityTrustResourceUrl('assets/img/icon/citrix.svg'));
                break;
            case 'cisco':
            case 'cisco-css':
                this._iconRegistry.addSvgIcon(
                    `${this.icon}`,
                    this._sanitizer.bypassSecurityTrustResourceUrl('assets/img/icon/cisco.svg'));
                break;
            case 'a-10':
            case 'a10':
                this._iconRegistry.addSvgIcon(
                    `${this.icon}`,
                    this._sanitizer.bypassSecurityTrustResourceUrl('assets/img/icon/a-10.svg'));
                break;
            case 'f5':
            case 'F5':
                this._iconRegistry.addSvgIcon(
                    `${this.icon}`,
                    this._sanitizer.bypassSecurityTrustResourceUrl('assets/img/icon/f5.svg'));
                break;
            case 'aws':
            case 'aws-elb':
                this._iconRegistry.addSvgIcon(
                    `${this.icon}`,
                    this._sanitizer.bypassSecurityTrustResourceUrl('assets/img/icon/aws.svg'));
                break;
            default:
                this.exist = false;
                break;
        }
    }
}
