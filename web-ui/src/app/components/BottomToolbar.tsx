import React from "react";
import { SessionStatus } from "@/app/types";

interface BottomToolbarProps {
  sessionStatus: SessionStatus;
  isEventsPaneExpanded: boolean;
  setIsEventsPaneExpanded: (val: boolean) => void;
}

function BottomToolbar({
  sessionStatus,
  isEventsPaneExpanded,
  setIsEventsPaneExpanded
}: BottomToolbarProps) {

  return (
    <div className="p-4 flex flex-row items-center justify-center gap-x-8">
      <div className="flex flex-row items-center gap-2">
        <input
          id="logs"
          type="checkbox"
          checked={isEventsPaneExpanded}
          onChange={e => setIsEventsPaneExpanded(e.target.checked)}
          className="w-4 h-4"
        />
        <label htmlFor="logs" className="flex items-center cursor-pointer">
          Logs
        </label>
      </div>
    </div>
  );
}

export default BottomToolbar;
