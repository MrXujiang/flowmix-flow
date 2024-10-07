const defaultValue = {   
    type: 'Text',
    data: { 
        style: {
            text: {
                content: 'flowmix',
                color: '#000',
                fontSize: 16,
                bold: false,
                textAlign: 'center',
                lineHeight: 1.6,
                italic: false,
                underline: false,
                through: false
            },
            shadow: undefined,
            transform: undefined,
            handles: [
                {
                    direction: 'top',
                    type: 'target',
                },
                {
                    direction: 'bottom',
                    type: 'source',
                },
                {
                    direction: 'right',
                    type: 'source',
                },
                {
                    direction: 'left',
                    type: 'target',
                }
            ],
            mouse: 'default'
        },
        animation: {

        },
        interaction: {

        },
        info: {

        }
    },
    selected: false,
    isConnectable: true,
    zIndex: 1,
    deletable: true,
    width: null,
    height: null,
    parentId: ''
}

export default defaultValue