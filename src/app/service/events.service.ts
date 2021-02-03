import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/index';

@Injectable({
    providedIn: 'root'
})
export class EventsService {

    private event = {};

    on(eventName: string) {
        this.event[eventName] = this.event[eventName] ? this.event[eventName] : new Subject();
        return this.event[eventName];
    }

    unsubscribe(eventName) {
        this.event[eventName] ? this.event[eventName].complete() : '';
        delete this.event[eventName];
    }

    publish(eventName: string, data) {
        let event = this.event[eventName];
        if (event) {
            this.event[eventName].next(data);
        } else {
            console.log(`Nobody subscribed to ${eventName} event`);
        }
    }

}
