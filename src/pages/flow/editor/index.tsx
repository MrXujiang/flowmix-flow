import { useState, memo, useMemo, useCallback, Suspense, useEffect } from 'react';
import Header from '../../../components/EditorUI/Header';
import Panel from '../../../components/EditorUI/Pannel';
import CanvasBox from '../../../components/EditorUI/Canvas';
import { extractIds } from '../../../components/EditorUI/Pannel/ElementLayer/shop_list';
import Flow from '../components/Flow';
import useStore from '../store';
import { useShallow } from 'zustand/react/shallow';
import { useSearchParams } from 'umi';
import GuideLine from '@/components/RefLine/RefLine';
import { debounce, deepClone } from '@/utils';
import { Modal, Input } from 'antd';
import update from 'immutability-helper';
import { 
  getPageList, 
  getPageDetail, 
  deletePage,
  updatePage,
  addPage
} from './data';
import { AppState } from '../type';

import styles from './index.less';

const accepts = extractIds();

const selector = (state: AppState) => ({
  data: state.data,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  setNodes: state.setNodes,
  setEdges: state.setEdges,
  onConnect: state.onConnect,
  clear: state.clear,
  setData: state.setData,
  viewport: state.viewport,
  addNode: state.addNode,
  updateNode: state.updateNode,
  updateEdge: state.updateEdge,
  updateViewport: state.updateViewport,
});

const EditorPage = memo(() => {
  const { 
    data, 
    onNodesChange, 
    onEdgesChange, 
    onConnect, 
    clear, 
    viewport,
    addNode,
    updateNode,
    setEdges,
    setNodes,
    setData,
    updateViewport,
  } = useStore(
    useShallow(selector),
  );

  // 编辑器主题
  const [theme, setTheme] = useState<'dark' | 'light'>('light');

  // 当前侧边栏面板激活类型
  const [curActive, setCurActive] = useState<string>();

  // 记录当前激活节点
  const [curNodeId, setCurNodeId] = useState<string>();
  // 记录当前激活的边
  const [curEdgeId, setCurEdgeId] = useState<string>();

  // 预览状态
  const [isPreview, setIsPreview] = useState(false);

  // 浏览器参数相关
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('id') || '';

  // 编辑器数据相关
  const [pageList, setPageList] = useState<any>([]);

  // 节点拖拽状态
  const [isNodeDragging, setIsNodeDragging] = useState(false);

  // 获取实时节点的数据, 用于设置参考线
  const speedNodeData = useMemo(() => {
    const curNode = data.nodes?.find((item: any) => item.id === curNodeId);
    if(curNode && isNodeDragging) {
      return {
        key: curNode.id,
        left: curNode.position?.x,
        top: curNode?.position?.y,
        width: curNode?.measured?.width,
        height: curNode?.measured?.height,
        rotate: 0
      }
    }else {
      return null
    }
  }, [curNodeId, data.nodes, isNodeDragging])

  // 点击左侧图层列表, 激活图层面板
  const onLayerClick = () => {
    setCurActive('layer');
  }

  // 标题更新之后的回调
  const handleTitleChange = (title: string) => {
    const newData = {
      ...data,
       title
     };
    setData(newData);
  }

  // 新建页面
  const handleNewPage = useCallback(() => {
    const title =  '未命名';
    addPage({title}).then((res: any) => {
      // 更新url
      setSearchParams({
        id: res
      });

      // 刷新页面列表
      fetchPageList();
    })
  }, [])

  // 删除页面
  const handleDelPage = useCallback((id: string) => {
    deletePage(id).then((res) => {
      if(res) {
        setSearchParams({
          id: res.id
        })
        // 更新页面列表
        fetchPageList();
      }else {
        clear();
      }
      
    })
  }, [])

  // 预览单机
  const handlePreviewClick = useCallback(() => {
    setSearchParams(isPreview ? { id } : {
      id,
      preview: isPreview ? '' : '1'
    })
    setIsPreview(!isPreview);
  }, [isPreview, id])

  // 导出json
  const handlePublishClick = () => {
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `flowmix_flow_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    a.remove();
  }

  // 导入json
  const handleImportClick = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'application/json';
    fileInput.click();
    fileInput.onchange = async (e: any) => {
      const file = e.target.files[0];
      if(file) {
        // 把文件内容转化为json对象
        const json = await file.text();
        const data = JSON.parse(json);
        if(data.nodes && data.edges) {
          setData(JSON.parse(json));
        }else {
          // 提示json格式不合法
          alert('json格式不合法')
        }
        
      }
    }
  }

  // 主题切换事件
  const handleThemeChange = useCallback((theme: 'light' | 'dark') => {
    setTheme(theme);
  }, [])

  // 画布点击事件
  const handleCanvasClick = () => {
    // 清除当前节点和边id数据
    setCurNodeId('');
    setCurEdgeId('');
  }

  // 节点点击事件
  const handleNodeClick = useCallback(async (node: any) => {
    setCurNodeId(node.id);
    setCurEdgeId('');
  }, [])

  const handleNodeDbblick = useCallback(async (node: any) => {
    if(isPreview) return
    setCurNodeId(node.id);
    setCurEdgeId('');
    // 打开节点编辑弹窗
    let text = node.data?.style?.text?.content;
    Modal.info({
      title: '节点编辑',
      content: (
        <div>
          <Input 
            placeholder='请输入节点名称' 
            defaultValue={text} 
            onChange={(e: any) => {
              text = e.target.value;
            }} />
        </div>
      ),
      onOk() {
        const newNode = update(node, {
          data: {style:{text:{content:{$set:text}}}}
        });
        updateNode(newNode);
      },
      okText: '保存',
    });
  }, [isPreview])

  // 图层面板的节点点击
  const handleLayerNodeClick = useCallback(async (node: any) => {
    handleNodeClick(node.id);
    updateNode({...node, selected: !node.selected});
  }, [])

  // 边点击事件
  const handleEdgeClick = useCallback(async (edge: any) => {
    setCurEdgeId(edge.id);
    setCurNodeId('');
  }, [])

  // 右键菜单逻辑
  const handleContextClick = useCallback((key: 'copy' | 'del', el: any) => {
    // 删除逻辑
    if(key === 'del') {
      if(el.type === 'fm-edge') {
        // 删除边点
        const edges = data.edges.filter((item: any) => item.id!== el.id);
        setEdges(edges);
        setCurEdgeId('');
        return
      }else {
        // 删除节点
        const nodes = data.nodes.filter((item: any) => item.id!== el.id);
        setNodes(nodes);
        setCurNodeId('');
        return
      }
    }

    // 复制逻辑
    if(key === 'copy') {
      if(el.type !== 'fm-edge') {
        // 复制节点, 并生成新id
        const node = data.nodes.find((item: any) => item.id === el.id);
        if(node) {
          const newNode = deepClone(node);
          newNode.id = `fm_${Date.now()}`;
          newNode.selected = false;
          newNode.zIndex++;
          newNode.position = {
            x: node.position.x + node.measured.width / 2,
            y: node.position.y + node.measured.height / 2,
          }
          // 重新生成handles的id
          
          addNode(newNode);
          setCurNodeId('');
          return
        }
      }
    }
  }, [data])

  // 节点开始拖拽的逻辑
  const handleNodeDragStart = useCallback((node: any) => {
    setIsNodeDragging(true);
  }, [])

  // 节点拖拽结束的逻辑
  const handleNodeDragStop = useCallback(async (node: any) => {
    handleNodeClick(node);
    setIsNodeDragging(false);
  }, [])

  // 节点更新逻辑
  const computedCurNodeChange = async(nodes: any, id: string) => {
    if(!id || !nodes) {
      return
    }

    const curNode = nodes.find((item: any) => item.id === id);
    if(curNode) {
      // 更新节点逻辑
      
    }else {
    }
  }

  const updateCurNodeConfig = useMemo(() => debounce(computedCurNodeChange, 100), []);

  // 边更新逻辑
  const computedCurEdgeChange = async(edges: any, id: string) => {
    if(!id || !edges) {
      return
    }

    const curEdge = edges.find((item: any) => item.id === id);
    if(curEdge) {
      // 更新边逻辑
      
    }else {
    }
  }

  const updateCurEdgeConfig = useMemo(() => debounce(computedCurEdgeChange, 100), []);

  // 自动保存
  const autoSave = useMemo(() => debounce((id: string, data: any) => {
    updatePage(id, data).then(() => {
      // 更新页面列表 ---- 此处更好的做法是前端更新pageList的标题即可
      // fetchPageList();
      setPageList((res: any) => res.map((item: any) => {
        return {
         ...item,
          title: item.id === id? data.title : item.title
        }
      }))

      console.log('自动保存成功');
    })
  }, 800), []);

  // 获取页面列表
  const fetchPageList = () => {
    getPageList().then((res: any) => {
      setPageList(res);
    })
  }

  // 页面加载时初始化页面数据
  useEffect(() => {
    // 获取页面列表
    if(!id) {
      handleNewPage()
    }else {
      fetchPageList()
    }
  }, [])

  // 页面切换时获取对应页面的数据
  useEffect(() => {
    if(id) {
      getPageDetail(id).then((res: any) => {
        res && setData(res);
      })
    } 
  }, [id])

  // 设置当前的点和边的数据
  useEffect(() => {
    if(!curEdgeId) {
      updateCurNodeConfig(data.nodes, curNodeId);
    }
    if(!curNodeId) {
      updateCurEdgeConfig(data.edges, curEdgeId);
    }
  }, [data, curNodeId, curEdgeId])

  // 根据内容变化自动保存
  useEffect(() => {
    if(!id) {
      return
    }
    autoSave(id, data);
  }, [data])

  return (
    <div className={styles.flowWrap}>
      <Header 
        title={data.title}
        onTitleChange={handleTitleChange}
        onLayerClick={onLayerClick}
        onPreviewClick={handlePreviewClick}
        onPublishClick={handlePublishClick}
        onImportClick={handleImportClick}
      ></Header>
      <main className={styles.flowContent}>
        <Panel 
          curActive={curActive} 
          pageData={pageList} 
          nodeData={data.nodes}
          onNodeClick={handleLayerNodeClick}
          onNewPage={handleNewPage}
          onDelPage={handleDelPage}
        >
        </Panel>
        <div 
          style={!isPreview ? {
            position: 'absolute', 
            top: 64, 
            left: 232, 
            width: 'calc(100vw - 232px)', 
            height: 'calc(100vh - 64px)',
            transition: 'all 0.3s ease-in-out',
          } : {
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100vw', 
            height: '100vh',
            transition: 'all 0.3s ease-in-out',
            zIndex: 1000
          }}
          onClick={handleCanvasClick}
        >
            <CanvasBox 
              accept={accepts}
              width="100%"
              height="100%"
            >
              <Suspense fallback={<div>loading...</div>}>
                <Flow 
                  data={data}
                  theme={theme}
                  onThemeChange={handleThemeChange}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  onConnect={onConnect}
                  clear={clear}
                  isPreview={isPreview}
                  setEdges={setEdges}
                  setNodes={setNodes}
                  updateViewport={updateViewport}
                  onNodeClick={handleNodeClick} 
                  onNodeDoubleClick={handleNodeDbblick}
                  onEdgeClick={handleEdgeClick}
                  onNodeDragStart={handleNodeDragStart}
                  onNodeDragStop={handleNodeDragStop}
                  onExitPreview={handlePreviewClick}
                  onContextClick={handleContextClick}
                />
              </Suspense>
            </CanvasBox>

            {/* 参考线 */}
            {
              !!data.nodes.length && !!speedNodeData &&
              <GuideLine 
                nodes={data.nodes.map(v => {
                  return {
                    key: v.id,
                    left: v.position.x,
                    top: v.position.y,
                    width: v.measured?.width,
                    height: v.measured?.height,
                  }
                })} 
                current={speedNodeData}
                scale={viewport.zoom}
                offsetX={viewport.x}
                offsetY={viewport.y}
              />
            }
        </div>
      </main>
    </div>
  );
});

const App = () => {
    return <EditorPage />
}

export default App