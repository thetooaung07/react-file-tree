import { useState } from "react";
import "../App.css";
import { data as fileTree } from "../v2/data";

type TFileEntry = {
  name: string;
  children?: TFileEntry[];
};

export const Entry = ({
  entry,
  depth,
}: {
  entry: TFileEntry;
  depth: number;
}) => {
  const [isExpand, setIsExpand] = useState(false);
  return (
    <div className="">
      <button className="text-left flex" onClick={() => setIsExpand(!isExpand)}>
        {entry.children ? (
          <div className="w-2 mx-2">{isExpand ? "- " : "+ "}</div>
        ) : (
          <div className="w-2 mx-2"></div>
        )}
        {entry.name}
      </button>

      {isExpand && (
        <div className={`SubEl_${depth}`} style={{ paddingLeft: `24px` }}>
          {entry.children?.map((child, index) => (
            <Entry
              key={child.name + depth}
              entry={child}
              depth={depth + 1}
            ></Entry>
          ))}
        </div>
      )}
    </div>
  );
};

function AppV1() {
  const [data, setData] = useState(fileTree);

  function loadFileTree() {
    setData(fileTree);
  }

  return (
    <div className="m-4">
      <h2 className="text-center">V1</h2>
      <h2 className="text-center">No Animation</h2>
      <div className="App flex flex-col justify-start items-start text-slate-900 text-left w-72 h-full border-[1.5px] border-slate-200 m-4 font-mono font-medium">
        {data.map((entry, index) => (
          <Entry key={index} entry={entry} depth={1}></Entry>
        ))}
      </div>
    </div>
  );
}

export default AppV1;
