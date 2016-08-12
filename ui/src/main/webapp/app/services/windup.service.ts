import {Inject, Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {Constants} from "../constants";
import {ProgressStatusModel} from "../models/progressstatus.model";
import {RegisteredApplication} from "windup-services";

@Injectable()
export class WindupService {
    private GET_STATUS_PATH = "/windup/status";
    private EXECUTE_PATH = "/windup/execute";

    constructor (private _http: Http, private _constants: Constants) {}

    public getStatus(application:RegisteredApplication) {
        var headers = new Headers();
        var options = new RequestOptions({ headers: headers });
        headers.append('Content-Type', 'application/json');
        var body = JSON.stringify(application);

        return this._http.post(this._constants.REST_BASE + this.GET_STATUS_PATH, body, options)
            .map(res => <ProgressStatusModel> res.json())
            .catch(this.handleError);
    }

    public executeWindup(application:RegisteredApplication) {
        var headers = new Headers();
        var options = new RequestOptions({ headers: headers });
        headers.append('Content-Type', 'application/json');
        var body = JSON.stringify(application);

        return this._http.post(this._constants.REST_BASE + this.EXECUTE_PATH, body, options)
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}