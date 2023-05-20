import { Dispatch, createContext } from "react";

type TreeViewState = Map<string, boolean>;
export enum TreeViewActionTypes {
  OPEN = "OPEN",
  CLOSE = "CLOSE",
  OPEN_ALL = "OPEN_ALL",
  CLOSE_All = "CLOSE_All",
}

type TreeViewActions =
  | { type: TreeViewActionTypes.OPEN; id: string }
  | { type: TreeViewActionTypes.CLOSE; id: string }
  | { type: TreeViewActionTypes.OPEN_ALL; ids: string[] }
  | { type: TreeViewActionTypes.CLOSE_All };

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
    // case TreeViewActionTypes.OPEN_ALL:
    case TreeViewActionTypes.CLOSE_All:
      const newCloseAllState = new Map();
      return newCloseAllState;

    default:
      throw new Error("Tree Reducer received an unknown operation");
  }
};
