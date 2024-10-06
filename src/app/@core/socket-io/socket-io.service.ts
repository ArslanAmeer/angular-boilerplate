import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

import * as io from 'socket.io-client';

import { SocketIoConfig } from './config/socket-io.config';

/* The `WrappedSocket` class provides a wrapper for socket.io functionality, allowing for
event handling and communication with a server. */
export class WrappedSocket {
  subscribersCounter: Record<string, number> = {};
  eventObservables$: Record<string, Observable<any>> = {};
  ioSocket: any;
  emptyConfig: SocketIoConfig = {
    rootUrl: '',
    options: {},
  };

  constructor(private readonly _config: SocketIoConfig) {
    if (this._config === undefined) {
      this._config = this.emptyConfig;
    }
    const rootUrl: string = this._config.rootUrl;
    const options: any = this._config.options;
    const ioFunc = (io as any).default ? (io as any).default : io;
    this.ioSocket = ioFunc(rootUrl, options);
  }

  /**
   * The `connect` function returns the connection status of the `ioSocket`.
   * @returns The `connect()` method is being called on the `ioSocket` object and the result of that
   * method call is being returned.
   */
  connect() {
    return this.ioSocket.connect();
  }

  /**
   * The function disconnects the socket connection with an optional parameter to close the connection.
   * @param {boolean} [close] - The `close` parameter in the `disconnect` method is a boolean value that
   * indicates whether the socket should be closed after disconnecting. If `close` is set to `true`, the
   * socket will be closed after disconnecting. If `close` is not provided or set to `false`, the
   * @returns The `disconnect` method is being called on `this.ioSocket` with the `close` parameter, and
   * the result of this method call is being returned.
   */
  disconnect(close?: boolean) {
    return this.ioSocket.disconnect(close);
  }

  /**
   * The function sets up a new namespace for socket.io communication.
   * @param {string} namespace - The `namespace` parameter is a string that represents the namespace for
   * which a new socket connection will be created.
   */
  of(namespace: string) {
    this.ioSocket.of(namespace);
  }

  /**
   * The function "on" sets up an event listener with a specified event name and callback
   * function.
   * @param {string} eventName - The `eventName` parameter is a string that represents the name of the
   * event that the callback function should listen for.
   * @param callback - The `callback` parameter is a function that takes any number of arguments of any
   * type and does not return any value (`void`). It is used to handle events when the specified
   * `eventName` occurs.
   */
  on(eventName: string, callback: (...args: any[]) => void) {
    this.ioSocket.on(eventName, callback);
  }

  /**
   * The `fromEvent` function in TypeScript creates an Observable for a specified event name, managing
   * event listeners and subscribers.
   * @param {string} eventName - The `eventName` parameter is a string that represents the name of the
   * event for which you want to create an Observable. This function sets up an Observable that listens
   * for events with the specified name and emits the data associated with those events.
   * @returns The `fromEvent` method returns an Observable of type `T` for the specified event name.
   */
  fromEvent<T>(eventName: string): Observable<T> {
    if (!this.subscribersCounter[eventName]) {
      this.subscribersCounter[eventName] = 0;
    }
    this.subscribersCounter[eventName]++;

    if (!this.eventObservables$[eventName]) {
      this.eventObservables$[eventName] = new Observable((observer: any) => {
        const listener = (data: T) => {
          observer.next(data);
        };
        this.ioSocket.on(eventName, listener);
        return () => {
          this.subscribersCounter[eventName]--;
          if (this.subscribersCounter[eventName] === 0) {
            this.ioSocket.removeListener(eventName, listener);
            delete this.eventObservables$[eventName];
          }
        };
      }).pipe(share());
    }
    return this.eventObservables$[eventName];
  }

  /**
   * The function `fromOneTimeEvent` returns a promise that resolves with the value emitted once for
   * the specified event name.
   * @param {string} eventName - The `eventName` parameter is a string that represents the name of the
   * event that you want to listen for and handle only once.
   * @returns A Promise of type T is being returned.
   */
  fromOneTimeEvent<T>(eventName: string): Promise<T> {
    return new Promise<T>((resolve) => this.once(eventName, resolve));
  }

  /**
   * The `once` function registers a callback to be executed once for a specific event.
   * @param {string} eventName - The `eventName` parameter is a string that represents the name of the
   * event that the callback function should listen for. When this event occurs, the callback function
   * will be executed.
   * @param callback - The `callback` parameter is a function that takes any number of arguments of any
   * type and does not return anything (`void`). It is a function that will be executed only once when
   * the specified `eventName` occurs.
   */
  once(eventName: string, callback: (...args: any[]) => void) {
    this.ioSocket.once(eventName, callback);
  }

  /**
   * The function `emit` in TypeScript emits an event with a specified name and arguments using
   * `ioSocket`.
   * @param {string} eventName - The `eventName` parameter is a string that represents the name of the
   * event that you want to emit using the `emit` method. This event name is used to identify the type
   * of event being triggered or emitted.
   * @param {any[]} args - The `args` parameter in the `emit` function represents a variable number of
   * arguments that can be passed to the event handler when the event is emitted. These arguments can
   * be of any type, as indicated by the `any[]` type annotation. When calling the `emit` function, you
   * can
   * @returns The `emit` method is returning the result of calling the `emit` method on `this.ioSocket`
   * with the provided `eventName` and `args`.
   */
  emit(eventName: string, ...args: any[]) {
    return this.ioSocket.emit(eventName, ...args);
  }

  /**
   * The function `removeListener` removes a callback function from the event listener for a specific
   * event name.
   * @param {string} eventName - The `eventName` parameter is a string that specifies the name of the
   * event for which the listener should be removed.
   * @param [callback] - The `callback` parameter is a function that will be removed as a listener for
   * the specified `eventName`. It is optional, meaning you can choose to provide a specific callback
   * function to remove, or if omitted, all listeners for the `eventName` will be removed.
   * @returns The `removeListener` method is returning the result of calling
   * `this.ioSocket.removeListener(eventName, callback)`.
   */
  removeListener(eventName: string, callback?: (...args: any[]) => void) {
    return this.ioSocket.removeListener(eventName, callback);
  }

  /**
   * The function `removeAllListeners` removes all event listeners for a specific event name.
   * @param {string} [eventName] - The `eventName` parameter is a string that represents the name of
   * the event for which all listeners should be removed.
   * @returns The `removeAllListeners` method is returning the result of calling `removeAllListeners`
   * on the `ioSocket` object with the provided `eventName` parameter.
   */
  removeAllListeners(eventName?: string) {
    return this.ioSocket.removeAllListeners(eventName);
  }
}
