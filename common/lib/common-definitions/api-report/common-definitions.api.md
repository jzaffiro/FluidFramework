## API Report File for "@fluidframework/common-definitions"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

// @alpha @deprecated
export type ExtendEventProvider<TBaseEvent extends IEvent, TBase extends IEventProvider<TBaseEvent>, TEvent extends TBaseEvent> = Omit<Omit<Omit<TBase, "on">, "once">, "off"> & IEventProvider<TBaseEvent> & IEventProvider<TEvent>;

// @internal @deprecated
export interface IDisposable {
    dispose(error?: Error): void;
    readonly disposed: boolean;
}

// @alpha @deprecated
export interface IErrorEvent extends IEvent {
    // @eventProperty
    (event: "error", listener: (message: any) => void): any;
}

// @alpha @deprecated
export interface IEvent {
    // @eventProperty
    (event: string, listener: (...args: any[]) => void): any;
}

// @alpha @deprecated
export interface IEventProvider<TEvent extends IEvent> {
    readonly off: IEventTransformer<this, TEvent>;
    readonly on: IEventTransformer<this, TEvent>;
    readonly once: IEventTransformer<this, TEvent>;
}

// @alpha @deprecated
export type IEventThisPlaceHolder = {
    thisPlaceHolder: "thisPlaceHolder";
};

// @alpha @deprecated
export type IEventTransformer<TThis, TEvent extends IEvent> = TEvent extends {
    (event: infer E0, listener: (...args: infer A0) => void): any;
    (event: infer E1, listener: (...args: infer A1) => void): any;
    (event: infer E2, listener: (...args: infer A2) => void): any;
    (event: infer E3, listener: (...args: infer A3) => void): any;
    (event: infer E4, listener: (...args: infer A4) => void): any;
    (event: infer E5, listener: (...args: infer A5) => void): any;
    (event: infer E6, listener: (...args: infer A6) => void): any;
    (event: infer E7, listener: (...args: infer A7) => void): any;
    (event: infer E8, listener: (...args: infer A8) => void): any;
    (event: infer E9, listener: (...args: infer A9) => void): any;
    (event: infer E10, listener: (...args: infer A10) => void): any;
    (event: infer E11, listener: (...args: infer A11) => void): any;
    (event: infer E12, listener: (...args: infer A12) => void): any;
    (event: infer E13, listener: (...args: infer A13) => void): any;
    (event: infer E14, listener: (...args: infer A14) => void): any;
    (event: string, listener: (...args: any[]) => void): any;
} ? TransformedEvent<TThis, E0, A0> & TransformedEvent<TThis, E1, A1> & TransformedEvent<TThis, E2, A2> & TransformedEvent<TThis, E3, A3> & TransformedEvent<TThis, E4, A4> & TransformedEvent<TThis, E5, A5> & TransformedEvent<TThis, E6, A6> & TransformedEvent<TThis, E7, A7> & TransformedEvent<TThis, E8, A8> & TransformedEvent<TThis, E9, A9> & TransformedEvent<TThis, E10, A10> & TransformedEvent<TThis, E11, A11> & TransformedEvent<TThis, E12, A12> & TransformedEvent<TThis, E13, A13> & TransformedEvent<TThis, E14, A14> : TEvent extends {
    (event: infer E0, listener: (...args: infer A0) => void): any;
    (event: infer E1, listener: (...args: infer A1) => void): any;
    (event: infer E2, listener: (...args: infer A2) => void): any;
    (event: infer E3, listener: (...args: infer A3) => void): any;
    (event: infer E4, listener: (...args: infer A4) => void): any;
    (event: infer E5, listener: (...args: infer A5) => void): any;
    (event: infer E6, listener: (...args: infer A6) => void): any;
    (event: infer E7, listener: (...args: infer A7) => void): any;
    (event: infer E8, listener: (...args: infer A8) => void): any;
    (event: infer E9, listener: (...args: infer A9) => void): any;
    (event: infer E10, listener: (...args: infer A10) => void): any;
    (event: infer E11, listener: (...args: infer A11) => void): any;
    (event: infer E12, listener: (...args: infer A12) => void): any;
    (event: infer E13, listener: (...args: infer A13) => void): any;
    (event: string, listener: (...args: any[]) => void): any;
} ? TransformedEvent<TThis, E0, A0> & TransformedEvent<TThis, E1, A1> & TransformedEvent<TThis, E2, A2> & TransformedEvent<TThis, E3, A3> & TransformedEvent<TThis, E4, A4> & TransformedEvent<TThis, E5, A5> & TransformedEvent<TThis, E6, A6> & TransformedEvent<TThis, E7, A7> & TransformedEvent<TThis, E8, A8> & TransformedEvent<TThis, E9, A9> & TransformedEvent<TThis, E10, A10> & TransformedEvent<TThis, E11, A11> & TransformedEvent<TThis, E12, A12> & TransformedEvent<TThis, E13, A13> : TEvent extends {
    (event: infer E0, listener: (...args: infer A0) => void): any;
    (event: infer E1, listener: (...args: infer A1) => void): any;
    (event: infer E2, listener: (...args: infer A2) => void): any;
    (event: infer E3, listener: (...args: infer A3) => void): any;
    (event: infer E4, listener: (...args: infer A4) => void): any;
    (event: infer E5, listener: (...args: infer A5) => void): any;
    (event: infer E6, listener: (...args: infer A6) => void): any;
    (event: infer E7, listener: (...args: infer A7) => void): any;
    (event: infer E8, listener: (...args: infer A8) => void): any;
    (event: infer E9, listener: (...args: infer A9) => void): any;
    (event: infer E10, listener: (...args: infer A10) => void): any;
    (event: infer E11, listener: (...args: infer A11) => void): any;
    (event: infer E12, listener: (...args: infer A12) => void): any;
    (event: string, listener: (...args: any[]) => void): any;
} ? TransformedEvent<TThis, E0, A0> & TransformedEvent<TThis, E1, A1> & TransformedEvent<TThis, E2, A2> & TransformedEvent<TThis, E3, A3> & TransformedEvent<TThis, E4, A4> & TransformedEvent<TThis, E5, A5> & TransformedEvent<TThis, E6, A6> & TransformedEvent<TThis, E7, A7> & TransformedEvent<TThis, E8, A8> & TransformedEvent<TThis, E9, A9> & TransformedEvent<TThis, E10, A10> & TransformedEvent<TThis, E11, A11> & TransformedEvent<TThis, E12, A12> : TEvent extends {
    (event: infer E0, listener: (...args: infer A0) => void): any;
    (event: infer E1, listener: (...args: infer A1) => void): any;
    (event: infer E2, listener: (...args: infer A2) => void): any;
    (event: infer E3, listener: (...args: infer A3) => void): any;
    (event: infer E4, listener: (...args: infer A4) => void): any;
    (event: infer E5, listener: (...args: infer A5) => void): any;
    (event: infer E6, listener: (...args: infer A6) => void): any;
    (event: infer E7, listener: (...args: infer A7) => void): any;
    (event: infer E8, listener: (...args: infer A8) => void): any;
    (event: infer E9, listener: (...args: infer A9) => void): any;
    (event: infer E10, listener: (...args: infer A10) => void): any;
    (event: infer E11, listener: (...args: infer A11) => void): any;
    (event: string, listener: (...args: any[]) => void): any;
} ? TransformedEvent<TThis, E0, A0> & TransformedEvent<TThis, E1, A1> & TransformedEvent<TThis, E2, A2> & TransformedEvent<TThis, E3, A3> & TransformedEvent<TThis, E4, A4> & TransformedEvent<TThis, E5, A5> & TransformedEvent<TThis, E6, A6> & TransformedEvent<TThis, E7, A7> & TransformedEvent<TThis, E8, A8> & TransformedEvent<TThis, E9, A9> & TransformedEvent<TThis, E10, A10> & TransformedEvent<TThis, E11, A11> : TEvent extends {
    (event: infer E0, listener: (...args: infer A0) => void): any;
    (event: infer E1, listener: (...args: infer A1) => void): any;
    (event: infer E2, listener: (...args: infer A2) => void): any;
    (event: infer E3, listener: (...args: infer A3) => void): any;
    (event: infer E4, listener: (...args: infer A4) => void): any;
    (event: infer E5, listener: (...args: infer A5) => void): any;
    (event: infer E6, listener: (...args: infer A6) => void): any;
    (event: infer E7, listener: (...args: infer A7) => void): any;
    (event: infer E8, listener: (...args: infer A8) => void): any;
    (event: infer E9, listener: (...args: infer A9) => void): any;
    (event: infer E10, listener: (...args: infer A10) => void): any;
    (event: string, listener: (...args: any[]) => void): any;
} ? TransformedEvent<TThis, E0, A0> & TransformedEvent<TThis, E1, A1> & TransformedEvent<TThis, E2, A2> & TransformedEvent<TThis, E3, A3> & TransformedEvent<TThis, E4, A4> & TransformedEvent<TThis, E5, A5> & TransformedEvent<TThis, E6, A6> & TransformedEvent<TThis, E7, A7> & TransformedEvent<TThis, E8, A8> & TransformedEvent<TThis, E9, A9> & TransformedEvent<TThis, E10, A10> : TEvent extends {
    (event: infer E0, listener: (...args: infer A0) => void): any;
    (event: infer E1, listener: (...args: infer A1) => void): any;
    (event: infer E2, listener: (...args: infer A2) => void): any;
    (event: infer E3, listener: (...args: infer A3) => void): any;
    (event: infer E4, listener: (...args: infer A4) => void): any;
    (event: infer E5, listener: (...args: infer A5) => void): any;
    (event: infer E6, listener: (...args: infer A6) => void): any;
    (event: infer E7, listener: (...args: infer A7) => void): any;
    (event: infer E8, listener: (...args: infer A8) => void): any;
    (event: infer E9, listener: (...args: infer A9) => void): any;
    (event: string, listener: (...args: any[]) => void): any;
} ? TransformedEvent<TThis, E0, A0> & TransformedEvent<TThis, E1, A1> & TransformedEvent<TThis, E2, A2> & TransformedEvent<TThis, E3, A3> & TransformedEvent<TThis, E4, A4> & TransformedEvent<TThis, E5, A5> & TransformedEvent<TThis, E6, A6> & TransformedEvent<TThis, E7, A7> & TransformedEvent<TThis, E8, A8> & TransformedEvent<TThis, E9, A9> : TEvent extends {
    (event: infer E0, listener: (...args: infer A0) => void): any;
    (event: infer E1, listener: (...args: infer A1) => void): any;
    (event: infer E2, listener: (...args: infer A2) => void): any;
    (event: infer E3, listener: (...args: infer A3) => void): any;
    (event: infer E4, listener: (...args: infer A4) => void): any;
    (event: infer E5, listener: (...args: infer A5) => void): any;
    (event: infer E6, listener: (...args: infer A6) => void): any;
    (event: infer E7, listener: (...args: infer A7) => void): any;
    (event: infer E8, listener: (...args: infer A8) => void): any;
    (event: string, listener: (...args: any[]) => void): any;
} ? TransformedEvent<TThis, E0, A0> & TransformedEvent<TThis, E1, A1> & TransformedEvent<TThis, E2, A2> & TransformedEvent<TThis, E3, A3> & TransformedEvent<TThis, E4, A4> & TransformedEvent<TThis, E5, A5> & TransformedEvent<TThis, E6, A6> & TransformedEvent<TThis, E7, A7> & TransformedEvent<TThis, E8, A8> : TEvent extends {
    (event: infer E0, listener: (...args: infer A0) => void): any;
    (event: infer E1, listener: (...args: infer A1) => void): any;
    (event: infer E2, listener: (...args: infer A2) => void): any;
    (event: infer E3, listener: (...args: infer A3) => void): any;
    (event: infer E4, listener: (...args: infer A4) => void): any;
    (event: infer E5, listener: (...args: infer A5) => void): any;
    (event: infer E6, listener: (...args: infer A6) => void): any;
    (event: infer E7, listener: (...args: infer A7) => void): any;
    (event: string, listener: (...args: any[]) => void): any;
} ? TransformedEvent<TThis, E0, A0> & TransformedEvent<TThis, E1, A1> & TransformedEvent<TThis, E2, A2> & TransformedEvent<TThis, E3, A3> & TransformedEvent<TThis, E4, A4> & TransformedEvent<TThis, E5, A5> & TransformedEvent<TThis, E6, A6> & TransformedEvent<TThis, E7, A7> : TEvent extends {
    (event: infer E0, listener: (...args: infer A0) => void): any;
    (event: infer E1, listener: (...args: infer A1) => void): any;
    (event: infer E2, listener: (...args: infer A2) => void): any;
    (event: infer E3, listener: (...args: infer A3) => void): any;
    (event: infer E4, listener: (...args: infer A4) => void): any;
    (event: infer E5, listener: (...args: infer A5) => void): any;
    (event: infer E6, listener: (...args: infer A6) => void): any;
    (event: string, listener: (...args: any[]) => void): any;
} ? TransformedEvent<TThis, E0, A0> & TransformedEvent<TThis, E1, A1> & TransformedEvent<TThis, E2, A2> & TransformedEvent<TThis, E3, A3> & TransformedEvent<TThis, E4, A4> & TransformedEvent<TThis, E5, A5> & TransformedEvent<TThis, E6, A6> : TEvent extends {
    (event: infer E0, listener: (...args: infer A0) => void): any;
    (event: infer E1, listener: (...args: infer A1) => void): any;
    (event: infer E2, listener: (...args: infer A2) => void): any;
    (event: infer E3, listener: (...args: infer A3) => void): any;
    (event: infer E4, listener: (...args: infer A4) => void): any;
    (event: infer E5, listener: (...args: infer A5) => void): any;
    (event: string, listener: (...args: any[]) => void): any;
} ? TransformedEvent<TThis, E0, A0> & TransformedEvent<TThis, E1, A1> & TransformedEvent<TThis, E2, A2> & TransformedEvent<TThis, E3, A3> & TransformedEvent<TThis, E4, A4> & TransformedEvent<TThis, E5, A5> : TEvent extends {
    (event: infer E0, listener: (...args: infer A0) => void): any;
    (event: infer E1, listener: (...args: infer A1) => void): any;
    (event: infer E2, listener: (...args: infer A2) => void): any;
    (event: infer E3, listener: (...args: infer A3) => void): any;
    (event: infer E4, listener: (...args: infer A4) => void): any;
    (event: string, listener: (...args: any[]) => void): any;
} ? TransformedEvent<TThis, E0, A0> & TransformedEvent<TThis, E1, A1> & TransformedEvent<TThis, E2, A2> & TransformedEvent<TThis, E3, A3> & TransformedEvent<TThis, E4, A4> : TEvent extends {
    (event: infer E0, listener: (...args: infer A0) => void): any;
    (event: infer E1, listener: (...args: infer A1) => void): any;
    (event: infer E2, listener: (...args: infer A2) => void): any;
    (event: infer E3, listener: (...args: infer A3) => void): any;
    (event: string, listener: (...args: any[]) => void): any;
} ? TransformedEvent<TThis, E0, A0> & TransformedEvent<TThis, E1, A1> & TransformedEvent<TThis, E2, A2> & TransformedEvent<TThis, E3, A3> : TEvent extends {
    (event: infer E0, listener: (...args: infer A0) => void): any;
    (event: infer E1, listener: (...args: infer A1) => void): any;
    (event: infer E2, listener: (...args: infer A2) => void): any;
    (event: string, listener: (...args: any[]) => void): any;
} ? TransformedEvent<TThis, E0, A0> & TransformedEvent<TThis, E1, A1> & TransformedEvent<TThis, E2, A2> : TEvent extends {
    (event: infer E0, listener: (...args: infer A0) => void): any;
    (event: infer E1, listener: (...args: infer A1) => void): any;
    (event: string, listener: (...args: any[]) => void): any;
} ? TransformedEvent<TThis, E0, A0> & TransformedEvent<TThis, E1, A1> : TEvent extends {
    (event: infer E0, listener: (...args: infer A0) => void): any;
    (event: string, listener: (...args: any[]) => void): any;
} ? TransformedEvent<TThis, E0, A0> : TransformedEvent<TThis, string, any[]>;

// @internal @deprecated
export interface ILoggingError extends Error {
    getTelemetryProperties(): ITelemetryProperties;
}

// @alpha @deprecated
export interface ITaggedTelemetryPropertyType {
    // (undocumented)
    tag: string;
    // (undocumented)
    value: TelemetryEventPropertyType;
}

// @internal @deprecated
export interface ITelemetryBaseEvent extends ITelemetryProperties {
    // (undocumented)
    category: string;
    // (undocumented)
    eventName: string;
}

// @internal @deprecated
export interface ITelemetryBaseLogger {
    // (undocumented)
    send(event: ITelemetryBaseEvent): void;
}

// @internal @deprecated
export interface ITelemetryErrorEvent extends ITelemetryProperties {
    // (undocumented)
    eventName: string;
}

// @internal @deprecated
export interface ITelemetryGenericEvent extends ITelemetryProperties {
    // (undocumented)
    category?: TelemetryEventCategory;
    // (undocumented)
    eventName: string;
}

// @internal @deprecated
export interface ITelemetryLogger extends ITelemetryBaseLogger {
    send(event: ITelemetryBaseEvent): void;
    sendErrorEvent(event: ITelemetryErrorEvent, error?: any): void;
    sendPerformanceEvent(event: ITelemetryPerformanceEvent, error?: any): void;
    sendTelemetryEvent(event: ITelemetryGenericEvent, error?: any): void;
}

// @internal @deprecated
export interface ITelemetryPerformanceEvent extends ITelemetryGenericEvent {
    // (undocumented)
    duration?: number;
}

// @alpha @deprecated
export interface ITelemetryProperties {
    // (undocumented)
    [index: string]: TelemetryEventPropertyType | ITaggedTelemetryPropertyType;
}

// @alpha @deprecated
export type ReplaceIEventThisPlaceHolder<L extends any[], TThis> = L extends any[] ? {
    [K in keyof L]: L[K] extends IEventThisPlaceHolder ? TThis : L[K];
} : L;

// @internal @deprecated
export type TelemetryEventCategory = "generic" | "error" | "performance";

// @alpha @deprecated
export type TelemetryEventPropertyType = string | number | boolean | undefined;

// @alpha @deprecated
export type TransformedEvent<TThis, E, A extends any[]> = (event: E, listener: (...args: ReplaceIEventThisPlaceHolder<A, TThis>) => void) => TThis;

```