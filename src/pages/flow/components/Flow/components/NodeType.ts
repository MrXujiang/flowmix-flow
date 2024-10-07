interface IBaseSchema {
    id: string;
    type: string;
    position: { x: number, y: number };
    data: { 
        style: any;
        animation: any;
        interaction: any;
        info: any;
        order?: number;
    };
    selected?: boolean | null;
    isConnectable?: boolean;
    zIndex?: number;
    deletable?: boolean;
    width?: number | null;
    height?: number | null;
    parentId: string;
}

export default IBaseSchema