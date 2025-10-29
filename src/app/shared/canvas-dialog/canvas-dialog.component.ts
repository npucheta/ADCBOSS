import {Component, OnInit, Input, OnDestroy} from '@angular/core';
// import OrgChart from '../../../assets-raw/libs/orgchart/orgchart-webcomponents';
import {MatDialogRef} from '@angular/material';
import {environment} from '../common';
import {isUndefined} from 'util';
import OrgChart from './orgchart';

@Component({
    selector: 'app-canvas-dialog',
    templateUrl: './canvas-dialog.component.html',
    styleUrls: ['./canvas-dialog.component.css']
})
export class CanvasDialogComponent implements OnInit, OnDestroy {
    @Input()
    options: object[] = null;
    @Input()
    type: string = null;
    // orgChart: OrgChart;
    private buffer: object;
    public dataSource: object = null;
    protected fast_rewind_disable:boolean;
    protected fast_forward_disable:boolean;
    protected element_index:number;

    constructor(public dialogRef: MatDialogRef<CanvasDialogComponent>) {
        Object.assign(this, this.dialogRef);
    }

    ngOnInit() {
        this.element_index=0;
        this.dialogRef.updateSize();
        this.drawingCanvas(this.selectType());
    }

    ngOnDestroy() {
        this.options = null;
        this.dataSource = null;
    }

    private prev(){
        if(this.element_index>0)
            this.element_index=this.element_index-1;
        console.log ('Prev clicked '+' Index is now '+this.element_index);
        this.drawingCanvas(this.selectType());

    }

    private next(){
        if(this.element_index+1<this.options.length) //check we dont go over array limit
            this.element_index=this.element_index+1;
        console.log ('Next clicked '+' Index is now '+this.element_index);
        this.drawingCanvas(this.selectType());
    }

    private selectType() {
        switch (this.type) {
            case ('v'):
                return this.fillVirtualChart(this.options[this.element_index]);
            case ('w'):
                return this.fillWideIPSChart(this.options[this.element_index]);
            default:
                break;
        }
    }

    // TODO improve, unify all
    private fillVirtualChart(virtual: any): OrgChart {
        if (!isUndefined(virtual)) {
            this.dataSource = null;
            if (environment.DEBUG) {
                console.log('virtual ==>', virtual);
            }
            const pools = virtual.pool;
            const pLen = pools.length;
            let pObj: object[] = [], mObj: object[] = [];
            const vObj: object[] = [];

            if (pools && pLen > 0 ) {
                for (let i = 0; i < pLen; i++) { // TODO rename pool to pools from backend
                    const pool = pools[i]; // virtual.pool now can contain several pools, not only one

                    if (pool['members']) {
                        const members = pool['members'];
                        const mLen = members.length; 
                        for (let j = 0; j < mLen; j++) {
                                if (members[j]) {
                                    //if (environment.DEBUG) {
                                    //    console.log('members[j] ==>', members[j]);
                                    //}
                                    mObj.push({
                                        'name': 'Members',
                                        'title': `${members[j]}`
                                    });
                                }
                            }
                            pObj = [
                                {
                                    'id': `2`,
                                    'name': `Pool`,
                                    'title': `<span title="${pool.pool_name}">${pool.pool_name}</span>`,
                                    'children': mObj
                                }
                            ];
                            vObj.push(pObj[0]);
                            pObj = []; // clean object
                            mObj = []; // clean object
                    }
                }
                // }
            }
            this.dataSource = {
                'id': '1',
                'name': `${virtual.hostname}`,
                'title': `<span title="${virtual.virtual}">${virtual.virtual}</span>`,
                'extra': `${virtual.ip}:${virtual.port}`,
                // 'relationship': '111',
                'children': vObj
            };

            this.buffer = {
                'data': this.dataSource,
                'depth': 1,
                'nodeID': 'id',
                'nodeContent': 'title',
                'toggleSiblingsResp': true,
                'parentNodeSymbol': 'fa-server',
                'createNode': function (node, d) {
                    const nodeExtra = document.createElement('div');
                    nodeExtra.setAttribute('class', 'dv-extra');
                    nodeExtra.innerHTML = `${d.extra}`;
                    // console.log('d.extra', d.extra);
                    if (undefined === d.extra) {
                        nodeExtra.setAttribute('style', 'display:none');
                    }
                    node.appendChild(nodeExtra);
                }
                /*'pan': true,
                 'zoom': true,
                 'chartContainer': `#${this.chartContainer}`*/
            };

            return new OrgChart(this.buffer);
        }
    }

    private fillWideIPSChart(wideips: any): OrgChart {
        this.dataSource = null;
        const wObj: object[] = [];
        let gpObj: object[] = [],
            vObj: object[] = [],
            mObj: object[] = [],
            pObj: object[] = [];

        const gPools: object[] = wideips['gslb_pools'];
        const gPLen: number = gPools.length;
        if (gPools && gPLen > 0 && gPools[0])
         if (gPools[0]['virtuals']) {
            for (let i = 0; i < gPLen; i++) {
                if (gPLen > 0) {
                    const virtual: object[] = gPools[i]['virtuals'];
                    const vLen: number = virtual.length;
                    if (environment.DEBUG) {
                        console.log('vLen ==>', vLen);
                    }
                    if (vLen > 0) {
                        for (let j = 0; j < vLen; j++) {
                            const pools = virtual[j]['pool'];
                            const pLen = pools.length;

                            for (let k = 0; k < pLen; k++) {
                                if (pools[k].members) {
                                    const members = pools[k].members;
                                    const mLen: number = members.length;

                                    if (mLen > 0) {
                                        for (let m = 0; m < mLen; m++) {
                                            if (members[m]) {
                                                mObj.push({
                                                    'id': `${m}`,
                                                    'name': 'Member',
                                                    'title': `${members[m]}`
                                                });
                                            }
                                        }
                                        pObj = [
                                            {
                                                'id': `${j}`,
                                                'name': 'Pool',
                                                'title': `<span title="${pools[k].pool_name}">${pools[k].pool_name}</span>`,
                                                'children': mObj
                                            }
                                        ];
                                        mObj = [];
                                    }
                                }
                                vObj.push(
                                    {
                                        'id': `${j}`,
                                        'name': `Virtual`,
                                        'title': `${virtual[j]['ip']}:${virtual[j]['port']}`,
                                        'children': pObj
                                    }
                                );
                                pObj = [];
                            }
                        }
                    }
                    gpObj = [
                        {
                            'id': `${i}`,
                            'name': `GSLB Pools`,
                            'title': `<span title="${wideips.wideip}">${wideips.wideip}</span>`,
                            'children': vObj
                        }
                    ];
                    wObj.push(gpObj[0]);
                    vObj = [];
                    gpObj = [];
                }
            }
        }

        this.dataSource = {
            'id': '1',
            'name': `${wideips.hostname}`,
            'title': `<span title="${wideips.wideip}">${wideips.wideip}</span>`,
            'children': wObj
        };

        this.buffer = {
            'data': this.dataSource,
            'depth': 1,
            'nodeID': 'id',
            'nodeContent': 'title',
            'toggleSiblingsResp': true,
            'parentNodeSymbol': 'fa-server'
        };

        return new OrgChart(this.buffer);
    }

    private drawingCanvas(orgChart: OrgChart) {
        const container = document.querySelector('#chart-container');
        container.innerHTML = '';
        if (!isUndefined(orgChart)) {
            if (orgChart instanceof Node) {
                container.appendChild(orgChart);
            }
             else
                container.innerHTML = 'Object not being used';    
        }
        else
                container.innerHTML = 'Object not being used';    
    }
}
