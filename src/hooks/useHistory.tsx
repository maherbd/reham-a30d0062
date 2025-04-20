
import { useState, useCallback } from 'react';

export interface HistoryState<T> {
  past: T[];
  present: T;
  future: T[];
}

export interface HistoryActions<T> {
  state: HistoryState<T>;
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
  set: (newPresent: T) => void;
  reset: (newPresent: T) => void;
}

export const useHistory = <T,>(initialPresent: T): HistoryActions<T> => {
  const [state, setState] = useState<HistoryState<T>>({
    past: [],
    present: initialPresent,
    future: [],
  });

  const canUndo = state.past.length > 0;
  const canRedo = state.future.length > 0;

  const undo = useCallback(() => {
    if (!canUndo) return;

    const previous = state.past[state.past.length - 1];
    const newPast = state.past.slice(0, state.past.length - 1);

    setState({
      past: newPast,
      present: previous,
      future: [state.present, ...state.future],
    });
  }, [canUndo, state]);

  const redo = useCallback(() => {
    if (!canRedo) return;

    const next = state.future[0];
    const newFuture = state.future.slice(1);

    setState({
      past: [...state.past, state.present],
      present: next,
      future: newFuture,
    });
  }, [canRedo, state]);

  const set = useCallback((newPresent: T) => {
    if (newPresent === state.present) return;

    setState({
      past: [...state.past, state.present],
      present: newPresent,
      future: [],
    });
  }, [state]);

  const reset = useCallback((newPresent: T) => {
    setState({
      past: [],
      present: newPresent,
      future: [],
    });
  }, []);

  return { state, canUndo, canRedo, undo, redo, set, reset };
};
