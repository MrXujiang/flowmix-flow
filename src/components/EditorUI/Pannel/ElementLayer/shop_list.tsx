// 元素列表
const shop_list = [
    {
        label: '基础',
        id: 'base',
        children: [
            {
                label: '按钮',
                id: 'Button',
                pid: 'base',
                icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M4 18q-.825 0-1.412-.587T2 16V8q0-.825.588-1.412T4 6h16q.825 0 1.413.588T22 8v8q0 .825-.587 1.413T20 18zm3.25-5.25v1.5q0 .325.213.538T8 15t.538-.213t.212-.537v-1.5h1.5q.325 0 .538-.213T11 12t-.213-.537t-.537-.213h-1.5v-1.5q0-.325-.213-.537T8 9t-.537.213t-.213.537v1.5h-1.5q-.325 0-.537.213T5 12t.213.538t.537.212z"/></svg>
            },
        ]
    }
]

// 提取所有元素的id(名称列表)
function extractIds() {
    let ids = [];
    for (let item of shop_list) {
      for (let child of item.children) {
        ids.push(child.id);
      }
    }
    return ids;
  }

export {
    shop_list,
    extractIds
}