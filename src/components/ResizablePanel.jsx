import React from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

const ResizablePanel = ({ children, className }) => {
  return (
    <PanelGroup direction="horizontal" className={className}>
      <Panel minSize={30} defaultSize={70}>
        {children}
      </Panel>
      <PanelResizeHandle className="w-2 bg-gray-300 hover:bg-gray-400 transition-colors" />
      <Panel minSize={30}>
        <div className="h-full bg-gray-100 flex items-center justify-center text-gray-500">
          Resizable area
        </div>
      </Panel>
    </PanelGroup>
  );
};

export default ResizablePanel;