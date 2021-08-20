import {AnyAction} from "redux";
import {Observable, ObservableInput} from "rxjs";
import {AjaxError, ajax} from 'rxjs/ajax';
import {RootState} from './rootReducer';
import {StateObservable, ofType} from 'redux-observable';
import {withLatestFrom, mergeMap, catchError, takeUntil} from 'rxjs/operators';

type Headers = { [key: string]: string };

interface EpicCreatorParams<A extends AnyAction, State, Dependencies> {
  triggerActions: string[];
  requestBuilder: (action: A, state: State, dependencies: Dependencies) => ({
    method: "GET" | "DELETE",
    url: string,
    headers?: Headers,
  }) | ({
    method: "POST" | "PUT",
    url: string,
    body?: any,
    headers?: Headers,
  });
  onSuccess: (value: any, action: A, state: State, dependencies: Dependencies) => ObservableInput<AnyAction>;
  onFailure?: (err: AjaxError, action: A, state: State, dependencies: Dependencies) => ObservableInput<AnyAction>;
  cancellationActionTypes?: string[];
}

const epicDependencies = {
  ajaxGet: (url: string, headers?: Headers) => ajax.get(url, headers),
  ajaxPost: (url: string, body?: any, headers?: Headers) => ajax.post(url, body, headers),
  ajaxPut: (url: string, body?: any, headers?: Headers) => ajax.put(url, body, headers),
  ajaxDelete: (url: string, headers?: Headers) => ajax.delete(url, headers),
}

const appendToken = (url: string, token?: string) => `${url}${url.includes("?") ? '&' : '?'}token=${token || ""}`;

const getAjaxMethod = <A extends AnyAction>(
  action: A,
  state: RootState,
  dependencies: typeof epicDependencies,
  epicCreatorParams: EpicCreatorParams<A, RootState, typeof epicDependencies>,
) => {
  const urlPayload = epicCreatorParams.requestBuilder(action, state, dependencies);
  /**
   * TODO: Think about pulling this utility out into a separate package?
   * How would this look like in a generic, configurable way?
   */
  const url = appendToken(urlPayload.url, state.session.token);
  switch (urlPayload.method) {
    case "GET":
      return dependencies.ajaxGet(url, urlPayload.headers);
    case "DELETE":
      return dependencies.ajaxDelete(url, urlPayload.headers);
    case "POST":
      return dependencies.ajaxPost(url, urlPayload.body, urlPayload.headers);
    case "PUT":
      return dependencies.ajaxPut(url, urlPayload.body, urlPayload.headers);
  }
}

export const ajaxEpicCreator = <A extends AnyAction>(
  params: EpicCreatorParams<A, RootState, typeof epicDependencies>,
) => (
  action$: Observable<A>,
  state$: StateObservable<RootState>,
  dependencies$ = epicDependencies,
) => action$.pipe(
  ofType(...params.triggerActions),
  withLatestFrom(state$),
  mergeMap(([action, state]) => {
    return getAjaxMethod(action, state, dependencies$, params).pipe(
      mergeMap((res) => params.onSuccess(res.response, action, state, dependencies$)),
      catchError((err: AjaxError) => params.onFailure?.(err, action, state, dependencies$) ?? []),
      takeUntil(action$.pipe(ofType(...(params.cancellationActionTypes ?? [])))),
    );
  }),
);
