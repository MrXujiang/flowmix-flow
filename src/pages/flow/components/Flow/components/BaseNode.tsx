import {
  Handle, NodeResizer, useUpdateNodeInternals,
  useReactFlow, Position
} from '@xyflow/react';
import { PlusCircleFilled } from '@ant-design/icons';
import  IBaseSchema from './NodeType';
import { useEffect, useRef } from 'react';
import { Tooltip } from 'antd';

const DEFAULT_HANDLE_STYLE = {
  width: 5,
  height: 5,
  bottom: 0,
};


function withBaseNode(Component: any) {
  return function(props: IBaseSchema) {
    const { id, data, isConnectable, selected } = props;
    const updateNodeInternals = useUpdateNodeInternals();
    const { transform, handles, mouse } = data.style || {};
    const { animation } = data.animation || {};
    const ref = useRef<any>(null);
    const isPreview = location.search.includes('preview');

    const reactFlow = useReactFlow();

    const handleAddNode = () => {
      // @ts-ignore
      const x = props.positionAbsoluteX;
      // @ts-ignore
      const y = props.positionAbsoluteY + props.height + 100;
      const newNode = {
        ...props,
        id: `n_${new Date().getTime()}`,
        // @ts-ignore
        pid: props.pid || props.data.pid,
        position: {x, y},
        selected: false,
        data: {
         ...props.data,
         order: (props.data.order || 0) + 1,
        }
      };
      // @ts-ignore
      delete newNode.positionAbsoluteX;
      // @ts-ignore
      delete newNode.positionAbsoluteY;
      // @ts-ignore
      // 添加节点
      reactFlow.addNodes(newNode);
      // 添加边
      const edge = {
        id: `e_${new Date().getTime()}`,
        // @ts-ignore
        source: props.id,
        target: newNode.id,
        type: "fm-edge",
        sourceHandle: `source-bottom-${props.id}`,
        targetHandle: `target-top-${newNode.id}`,
      }
      // @ts-ignore
      reactFlow.addEdges(edge);
          
    }

    useEffect(() => {
      updateNodeInternals(id);
    }, [id, updateNodeInternals, handles])

    return (
      <Tooltip 
        title={!isPreview ? "双击节点编辑" : ""}
        getPopupContainer={() => ref.current}
      >
        <div 
          className={animation ? `animate__animated animate__${animation.name}` : ''}
          style={{
            position: 'relative',
            width: '100%', 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            cursor: mouse,
            transform,
          ...(animation && {
              animationDuration: `${animation.dur}s`,
              animationIterationCount: animation.times > 500 ? 'infinite' : animation.times,
              animationDelay: `${animation.delay}s`,
            })
          }}
          ref={ref}
        >
          <NodeResizer
            color="#1677ff"
            isVisible={selected || false}
            minWidth={30}
            minHeight={30}
          />
          {
              !handles ? null :
                handles.map((item: any, i: number) => {
                  const hid = `${item.type}-${item.direction}-${id}`
                  return <Handle
                            key={i}
                            id={hid}
                            type={item.type}
                            position={item.direction}
                            // style={handleStyle}
                            isConnectable={isConnectable}
                        />
                })
          }
          <Handle
            type="source"
            id={`handle-ct-${id}`}
            position={Position.Bottom}
            style={{ ...DEFAULT_HANDLE_STYLE, left: '35%' }}
            isConnectable={isConnectable}
          />
          {
            selected && <span
              style={{
                position: 'absolute',
                left: '50%',
                backgroundColor: '#fff',
                borderRadius: 18,
                display: 'flex',
                bottom: 0,
                transform: 'translate(-50%, 120%)',
                fontSize: 18,
                color: '#1677ff',
                cursor: 'pointer'
              }} onClick={handleAddNode} 
            >
              <PlusCircleFilled />
            </span>
          }
          <Component id={id} {...data} />
        </div>
      </Tooltip>
      
    );
  };
}


export default withBaseNode