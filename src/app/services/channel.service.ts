import {ChannelInterface} from '../interfaces/channel.interface';

export class ChannelService implements ChannelInterface {
    from: string;
    to: Array<string>;
    info: Array<any>;

    constructor() {
    }
}
