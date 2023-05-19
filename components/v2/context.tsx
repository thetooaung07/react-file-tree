import { Dispatch, createContext } from "react";

type TreeViewState = Map<string, boolean>;
export enum TreeViewActionTypes {
  OPEN = "OPEN",
  CLOSE = "CLOSE",
}

type TreeViewActions =
  | { type: TreeViewActionTypes.OPEN; id: string }
  | { type: TreeViewActionTypes.CLOSE; id: string };

type TreeViewContextType = {
  open: TreeViewState;
  dispatch: Dispatch<TreeViewActions>;
  selectedId: string | null;
  selectId: (id: string) => void;
};

export const TreeViewContext = createContext<TreeViewContextType>({
  open: new Map<string, boolean>(),
  dispatch: () => {},
  selectedId: null,
  selectId: () => {},
});

export const treeViewReducer = (
  state: TreeViewState,
  action: TreeViewActions
): TreeViewState => {
  switch (action.type) {
    case TreeViewActionTypes.OPEN:
      return new Map(state).set(action.id, true);
    case TreeViewActionTypes.CLOSE:
      const newState = new Map(state);
      newState.delete(action.id);
      return newState;
    default:
      throw new Error("Tree Reducer received an unknown operation");
  }
};
