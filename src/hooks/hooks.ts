import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { AppDispatch, RootState } from "../store/store"; // Import from your store file

// Use throughout the app instead of `useDispatch`
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Typed useSelector to get correct state types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
