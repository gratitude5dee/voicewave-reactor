import React from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

const ResizablePanel = ({ children, className }) => {
  return (
    <PanelGroup direction="horizontal" className={`${className} h-screen`}>
      <Panel minSize={30} defaultSize={100}>
        {children}
      </Panel>
      <PanelResizeHandle className="w-2 bg-gray-600 hover:bg-gray-500 transition-colors" />
      <Panel minSize={0} defaultSize={0}>
        <div className="h-full bg-gray-800 flex items-center justify-center text-gray-400">
          Resizable area
        </div>
      </Panel>
    </PanelGroup>
  );
};

export default ResizablePanel;