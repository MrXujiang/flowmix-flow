// @ts-nocheck
import Dagre from '@dagrejs/dagre';

/**
 * 节点布局算法
 * @param nodes 
 * @param edges 
 * @param options 
 * @returns 
 */
const getLayoutedElements = (nodes, edges, options) => {
    const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
    g.setGraph({ 
        rankdir: options.direction,
        ranker: options.ranker, 
    });
  
    edges.forEach((edge) => g.setEdge(edge.source, edge.target));
    nodes.forEach((node) =>
      g.setNode(node.id, {
        ...node,
        width: node.measured?.width ?? 0,
        height: node.measured?.height ?? 0,
      }),
    );
  
    Dagre.layout(g);
  
    return {
      nodes: nodes.map((node) => {
        const position = g.node(node.id);
        const x = position.x - (node.measured?.width ?? 0) / 2;
        const y = position.y - (node.measured?.height ?? 0) / 2;
  
        return { ...node, position: { x, y } };
      }),
      edges,
    };
  };

export {
    getLayoutedElements
}