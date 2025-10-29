import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ChannelService} from './channel.service';


@Injectable()
export class SharingDataService {
    data: ChannelService;

    constructor() {
    }

    public dataSource = new BehaviorSubject<ChannelService>({
        from: '',
        to: [''],
        info: ['']
    });
    dataSource$ = this.dataSource.asObservable();

    public setData(data: ChannelService) {
        this.data = data;
        this.dataSource.next(this.data);
    }
}
