import { rootReducer, store } from "./store";

export type QueryError = {
  /**
   * * `number`:
   *   HTTP status code
   */
  status: number;
  data: {
    code: string;
    log_id: string;
    message: string;
  };
};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
