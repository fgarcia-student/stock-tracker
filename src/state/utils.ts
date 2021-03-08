import { AnyAction } from "redux";
import { Observable, ObservableInput } from "rxjs";
import { AjaxError, ajax } from 'rxjs/ajax';
import { RootState } from './rootReducer';
import { StateObservable, ofType } from 'redux-observable';
import { withLatestFrom, mergeMap, catchError, takeUntil } from 'rxjs/operators';

interface EpicCreatorParams<A extends AnyAction, State> {
  triggerActions: string[];
  urlBuilder: (action: A, state: State) => ({
    method: "GET" | "DELETE",
    url: string,
    headers?: Object,
  }) | ({
    method: "POST" | "PUT",
    url: string,
    body?: any,
    headers?: Object,
  });
  onSuccess: (value: any, action: A, state: State) => ObservableInput<AnyAction>;
  onFailure?: (err: AjaxError) => ObservableInput<AnyAction>;
  cancellationActionTypes?: string[];
}

const epicDependencies = {
  ajaxGet: (url: string, headers?: Object) => ajax.get(url, headers),
  ajaxPost: (url: string, body?: any, headers?: Object) => ajax.post(url, body, headers),
  ajaxPut: (url: string, body?: any, headers?: Object) => ajax.put(url, body, headers),
  ajaxDelete: (url: string, headers?: Object) => ajax.delete(url, headers),
}

const getAjaxMethod = <A extends AnyAction>(
  action: A,
  state: RootState,
  dependencies: typeof epicDependencies,
  epicCreatorParams: EpicCreatorParams<A, RootState>,
) => {
  const urlPayload = epicCreatorParams.urlBuilder(action, state);
  const url = new URL(`${window.location.href}${urlPayload.url}`);
  url.searchParams.append("token", state.session.token ?? "");
  switch (urlPayload.method) {
    case "GET":
    case "DELETE":
      return dependencies.ajaxGet(url.toString(), urlPayload.headers);
    case "POST":
    case "PUT":
      return dependencies.ajaxPost(url.toString(), urlPayload.body, urlPayload.headers);
  }
}

export const ajaxEpicCreator = <A extends AnyAction>(
  params: EpicCreatorParams<A, RootState>,
) => (
  action$: Observable<A>,
  state$: StateObservable<RootState>,
  dependencies$ = epicDependencies,
) => action$.pipe(
  ofType(...params.triggerActions),
  withLatestFrom(state$),
  mergeMap(([action, state]) => {
    return getAjaxMethod(action, state, dependencies$, params).pipe(
      mergeMap((res) => params.onSuccess(res.response, action, state)),
      catchError((err: AjaxError) => params.onFailure?.(err) ?? []),
      takeUntil(action$.pipe(ofType(params.cancellationActionTypes))),
    );
  }),
);
