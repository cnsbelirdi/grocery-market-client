import { Inject, Injectable } from '@angular/core';
import { HubConnection } from '@microsoft/signalr';
import { HubConnectionState } from '@microsoft/signalr/dist/esm/HubConnection';
import { HubConnectionBuilder } from '@microsoft/signalr/dist/esm/HubConnectionBuilder';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  constructor(@Inject('baseSignalRUrl') private baseSignalUrl: string) {}

  start(hubUrl: string) {
    hubUrl = this.baseSignalUrl + hubUrl;
    const builder: HubConnectionBuilder = new HubConnectionBuilder();

    const hubConnection: HubConnection = builder
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .build();

    hubConnection
      .start()
      .then(() => {
        console.log('Hub connection started!');
      })
      .catch((error) => setTimeout(() => this.start(hubUrl), 2000));

    hubConnection.onreconnected((connectionId) => console.log('Reconnected!'));
    hubConnection.onreconnecting((error) => console.log('Reconnecting!'));
    hubConnection.onclose((error) => console.log('Closed!'));
    return hubConnection;
  }

  invoke(
    hubUrl: string,
    procedureName: string,
    message: any,
    successCallback?: (value) => void,
    errorCallback?: (error) => void
  ) {
    this.start(hubUrl)
      .invoke(procedureName, message)
      .then(successCallback)
      .catch(errorCallback);
  }

  on(
    hubUrl: string,
    procedureName: string,
    callBack: (...message: any) => void
  ) {
    this.start(hubUrl).on(procedureName, callBack);
  }
}
