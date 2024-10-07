import {
    BaseEdge,
    EdgeLabelRenderer,
    getStraightPath,
    getSimpleBezierPath,
    getSmoothStepPath,
    getBezierPath,
    useReactFlow,
    Edge
  } from '@xyflow/react';

import { PlusCircleFilled } from '@ant-design/icons';

  import { Tag } from 'antd';

  const edgeStyle = {
    getStraightPath,
    getSimpleBezierPath,
    getSmoothStepPath,
    getBezierPath,
  }
  
 function CustomEdge({ id, sourceX, sourceY, targetX, targetY, data, selected }: any) {
    const { style } = data || {};
    const { setNodes, setEdges, getNode, getNodes, getEdges, getEdge } = useReactFlow();
    // @ts-ignore
    const [edgePath, labelX, labelY] = edgeStyle[style?.style || 'getBezierPath']({
      sourceX,
      sourceY,
      targetX,
      targetY,
    });

    const handleAddNode = () => {
      const edge = getEdge(id) as Edge;
      const new_id = `ne_${new Date().getTime()}`;
      // 默认边新建的节点是边右侧的节点
      const node = getNode(edge.target);
      const newNode:any = {
       ...node,
        id: new_id,
        selected: true
      }
      // 默认新建的边为新建的节点和原来边右侧节点的连线
      const newEdge = {
        id: new_id,
        source: edge.source,
        target: new_id,
        type: "fm-edge",
        selected: false,
        sourceHandle: `source-right-${edge.source}`,
        targetHandle: `target-left-${new_id}`,
      }

      const newNodes = [...getNodes(), newNode];
      const newEdges = [...getEdges(), newEdge];
      // 重新布局
      // 对节点根据横坐标排序, 并进行x重新计算
      const sortedNodes = newNodes
                            .sort((a: any, b: any) => a.position.x - b.position.x)
                              .map((n: any) => {
                                return {
                                ...n,
                                data: {
                                 ...n.data,
                                  order: n.id !== new_id && n.data.order >= newNode.data.order ? n.data.order + 1 : n.data.order,
                                },
                                position: {
                                  x: n.id !== new_id && n.position.x >= newNode.position.x ? n.position.x + newNode.width + 100 : n.position.x,
                                  y: n.position.y,
                                }}
                                }
                              );
      setNodes(sortedNodes);
      // 重新连线
      // 对边进行重新连线, 并将原来边连线进行替换
      setEdges(newEdges.map((e: any) => {
          if(e.id === id) {
            return {
             ...e,
            source: new_id,
            target: edge.target,
            selected: false,
            sourceHandle: `source-right-${new_id}`,
            targetHandle: `target-left-${edge.target}`,
            }
          }
          return e
        })
      );
    }
  
    return (
      <>
        <BaseEdge 
          id={id} 
          path={edgePath}
          style={{
            stroke: style ? style.color : '',
            strokeWidth: style ? style.width : 1,
          }} 
        />
          <EdgeLabelRenderer>
            {
              selected && 
              <span
                style={{
                  position: 'absolute',
                  transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                  fontSize: 18,
                  display: 'flex',
                  zIndex: 10,
                  borderRadius: 18,
                  backgroundColor: '#fff',
                  color: '#1677ff',
                  cursor: 'pointer',
                  pointerEvents: 'all',
                }}
                className="nodrag nopan"
                onClick={handleAddNode}
              >
                <PlusCircleFilled />
              </span>
            }
            {
              !!style?.text?.content && 
                <div
                  style={{
                    position: 'absolute',
                    transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                    pointerEvents: 'all',
                  }}
                  className="nodrag nopan"
                  onClick={() => {
                  // setEdges((es) => es.filter((e) => e.id !== id));
                  }}
                >
                  <Tag color={style.labelColor || 'blue'} bordered={style.labelBorder}>
                    <span
                      style={{
                        color: style.text.color || '',
                        fontSize: style.text?.fontSize,
                        fontWeight: style.text?.bold ? 'bold' : 'normal',
                        lineHeight: style.text?.lineHeight + 'em',
                        textAlign: style.text?.textAlign,
                        textDecoration: style.text?.underline && style.text?.through ? 'line-through underline' : 
                          style.text?.underline ? 'underline' : 
                              style.text?.through ? 'line-through' : 
                                'none',
                        fontStyle: style.text?.italic? 'italic' : 'normal',
                      }}
                    >
                      { style.text.content }
                    </span>
                  </Tag>
                </div>
            }
            
          </EdgeLabelRenderer> 
      </>
    );
  }

  const edgeTypes = {
    'fm-edge': CustomEdge,
  };

  export default edgeTypes;