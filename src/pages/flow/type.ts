import {
    Edge,
    OnNodesChange,
    OnEdgesChange,
    OnConnect,
  } from '@xyflow/react';
  
  export type AppNode = {
    id: string,
    type: string,
    position: { x: number, y: number },
    data: any,
    [name: string]: any
  };
  
  export type AppState = {
    data: {
      title: string,
      config?: any,
      nodes: AppNode[],
      edges: Edge[],
      used?: boolean,
    };
    viewport: {
      x: number,
      y: number,
      zoom: number
    };
    // @ts-ignore
    onNodesChange: OnNodesChange<AppNode>;
    onEdgesChange: OnEdgesChange;
    updateNode: (node: AppNode) => void;
    updateEdge: (edge: Edge) => void;
    onConnect: OnConnect;
    addNode: (node: AppNode) => void;
    setNodes: (nodes: AppNode[]) => void;
    setEdges: (edges: Edge[]) => void;
    setData: (data: AppState['data']) => void;
    clear: () => void;
    updateViewport: (viewport: { x: number, y: number, zoom: number }) => void;
  };