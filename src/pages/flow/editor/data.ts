import { store } from '@/utils';
import { nanoid } from 'nanoid';
import initData from '../../../utils/initData';
import initNode from '@/pages/flow/components/Flow/components/base/Button/defaultValue';


const NAME_SPACE = 'flowmix-flow';

// 获取页面列表
const getPageList = async () => {
  const data = store.get(`${NAME_SPACE}-list`);
  return data || [];
}

// 获取页面详情
const getPageDetail = async (id: string) => {
  const data = store.get(`${NAME_SPACE}-page-${id}`);
  return !data ? initData : Object.assign({
    title: '未命名',
    nodes: [
      {
        id: `fm_${Date.now()}`,
        pid: 'base',
        ...initNode
      }
    ],
    edges: []
  }, data);
}

// 添加页面
const addPage = async (data: any) => {
    const id = nanoid();
    const list = await getPageList();
    store.set(`${NAME_SPACE}-list`, [...list, {id, ...data}]);
    return id
}

// 更新页面
const updatePage = async (id: string, data: any) => {
    const detail = store.get(`${NAME_SPACE}-page-${id}`);
    store.set(`${NAME_SPACE}-page-${id}`, {...detail, ...data });
    // 更新页面列表的标题
    const list = await getPageList();
    store.set(`${NAME_SPACE}-list`, list.map((item: any) => item.id === id? {...item, title: data.title} : item));
}

// 删除页面
const deletePage = async (id: string) => {
    const list = await getPageList();
    const index = list.findIndex((item: any) => item.id === id);
    if (index!== -1) {
        list.splice(index, 1);
        store.set(`${NAME_SPACE}-list`, list);
        return list[index - 1]
    }
}

// 获取模版列表
const getTemplateList = async () => {
  const data = store.get(`${NAME_SPACE}-tpl`);
  return data || [];
}

// 获取模版详情
const getTemplateDetail = async (id: string) => {
  const data = store.get(`${NAME_SPACE}-tpl-${id}`);
  return data || {};
}
  
export {
    getPageList,
    getPageDetail,
    addPage,
    updatePage,
    deletePage,
    getTemplateList,
    getTemplateDetail,
}