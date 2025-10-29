import {Menu} from '../models/menu';

export class MenuService {
    private _ITEMS: Array<Menu> = [
        {
            id: 1, path: 'lbobjects', name: 'Local Load Balancing (LB)',
            sub: [
                {id: 1, name: 'Virtuals', slug: 'virtuals'},
                {id: 2, name: 'Pools', slug: 'pools'},
                {id: 3, name: 'Nodes', slug: 'nodes'}
                // {id: 4, name: 'Monitors', slug: 'monitors'},
                // {id: 5, name: 'SNAT objects ', slug: 'snatpools'}
            ]
        },
        {
            id: 2, path: 'gslbobjects', name: 'Global Load Balancing (GSLB)',
            sub: [
                {id: 1, name: 'WideIPs (GSLB Virtuals)', slug: 'wideips'},
                {id: 2, name: 'GSLB Pools', slug: 'pools'},
                {id: 3, name: 'Datacenters', slug: 'datacenters'},
                {id: 4, name: 'Servers', slug: 'servers'},
                {
                    id: 5, name: 'Example#1', path: 'example', sub:
                    [
                        {id: 1, name: 'SUB#1', path: 'lbmigration', slug: ''},
                        {id: 2, name: 'SUB#2', slug: 'arpmigration'}
                    ]
                },
                //   {id: 5, name: 'Monitors', slug: 'monitors'}
            ]
        },
        {
            id: 3, path: 'devices', name: 'Devices',
            sub: [
                {id: 1, name: 'Performance', path: 'performance', slug: ''},
                {id: 2, name: 'List Devices', slug: 'list'},
                {id: 3, name: 'Add Device', slug: 'add'}
            ]
        },
        {id: 4, path: 'stats', name: 'Statistics'},
        {id: 5, path: 'search', name: 'Search'},
        {id: 6, path: 'export', name: 'Export Data'},
        // {id: 7, path: 'performance', name: 'Performance'},
        {id: 8, path: 'archives', name: 'Archives'},
        {
            id: 9, path: '', name: 'DataCenter Migration', sub:
            [
                {id: 1, name: 'VIP Status Comparison', path: 'vipstatuscomparison', slug: ''}
            ]
        },
        {
            id: 10, name: 'Migration', path: '', sub:
            [
                {
                    id: 1, name: 'Example#2', path: 'example', sub:
                    [
                        {id: 1, name: 'SUB#3', path: 'lbmigration', slug: ''},
                        {id: 2, name: 'SUB#4', slug: 'arpmigration'}
                    ]
                },
                {id: 2, name: 'LB Migration', path: 'lbmigration', slug: ''},
                {id: 3, name: 'Object Clean-UP', slug: 'objectcleanup'},
                {id: 4, name: 'ARP Migration', slug: 'arpmigration'},
                
            ]
        }
    ];

    get ITEMS(): Array<Menu> {
        return this._ITEMS;
    }
}
