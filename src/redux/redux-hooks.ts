// import { useDispatch, useSelector } from 'react-redux';
// import type { TypedUseSelectorHook } from 'react-redux';
// import type { RootState, AppDispatch } from './store';

// export const useAppDispatch: () => AppDispatch = useDispatch;
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Create custom hooks for accessing Redux state and dispatch
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store'; // Update the path to your Redux store configuration file

// Custom hooks for Redux state and dispatch
export function useAppSelector<T>(selector: (state: RootState) => T): T {
  return useSelector<RootState, T>(selector);
}

export function useAppDispatch(): AppDispatch {
  return useDispatch<AppDispatch>();
}
