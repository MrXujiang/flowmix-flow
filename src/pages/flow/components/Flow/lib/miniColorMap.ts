const colorMap = {
    Button: '#5356FF',
    // 其他节点类型的颜色
    //...
}

const nodeColor = (node: any) => {
    return colorMap[node.type as keyof typeof colorMap] || '#5356FF';
};

export default nodeColor;

