import * as react from 'react';
import { ReactNode, Dispatch, SetStateAction } from 'react';

type TreeNodeType = {
    id: string;
    name: string;
    dir: string;
    children?: TreeNodeType[];
};
type RootProps = {
    children: ReactNode | ReactNode[];
    className?: string;
};
type NodeProps = {
    node: TreeNodeType;
};
declare const TreeView: {
    Root: ({ children, className }: RootProps) => react.JSX.Element;
    Node: ({ node: { id, name, children } }: NodeProps) => react.JSX.Element;
};

declare const AppV4: () => react.JSX.Element;
declare const FileExplorer: ({ explorerData, setExplorerData, setRawFileList, }: {
    explorerData: TreeNodeType[];
    setExplorerData: Dispatch<SetStateAction<TreeNodeType[]>>;
    setRawFileList: Dispatch<SetStateAction<FileList | null | undefined>>;
}) => react.JSX.Element;

type TreeViewState = Map<string, boolean>;
declare enum TreeViewActionTypes {
    OPEN = "OPEN",
    CLOSE = "CLOSE",
    OPEN_ALL = "OPEN_ALL",
    CLOSE_All = "CLOSE_All"
}
type TreeViewActions = {
    type: TreeViewActionTypes.OPEN;
    id: string;
} | {
    type: TreeViewActionTypes.CLOSE;
    id: string;
} | {
    type: TreeViewActionTypes.OPEN_ALL;
    ids: string[];
} | {
    type: TreeViewActionTypes.CLOSE_All;
};
type TreeViewContextType = {
    open: TreeViewState;
    dispatch: Dispatch<TreeViewActions>;
    selectedId: string | null;
    selectId: (id: string) => void;
};
declare const TreeViewContext: react.Context<TreeViewContextType>;
declare const treeViewReducer: (state: TreeViewState, action: TreeViewActions) => TreeViewState;

declare function convertListFileToObjectParentTree(list: {
    name: string;
    webkitRelativePath: string;
}[]): {
    tree: TreeNodeType[];
    nodeIdsWithChildren: string[];
};

export { AppV4 as FileExplorer, FileExplorer as FileExplorerPanel, type TreeNodeType, TreeView, TreeViewActionTypes, TreeViewContext, convertListFileToObjectParentTree, treeViewReducer };
