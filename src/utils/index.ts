const isDev = process.env.NODE_ENV === 'development';

const store = {
    get(key: string) {
        const data = localStorage.getItem(key);
        if(data) {
            try{
                return JSON.parse(data)
            }catch(err) {
                return data
            }
        }

        return null   
    },
    // 获取指定key的大小
    getSize(key: string, unit: 'B' | 'KB' | 'MB') {
        const data = this.get(key);
        if(data) {
            return calculateStringSize(data, unit)
        }
        return 0
    },
    set(key: string, value: any) {
        if(typeof value !== 'object') {
            localStorage.setItem(key, value)
            return
        }

        localStorage.setItem(key, JSON.stringify(value))
    },
    remove(key: string) {
        localStorage.removeItem(key)
    },
    clear() {
        localStorage.clear()
    }
}

interface IMemory {
    data: any,
    get: (key: string) => any,
    set: (key: string, value: any) => void,
    clear: () => void,
    remove: (key: string) => void
}

const memoryManage: IMemory = {
    data: null,
    get(key: string) {
        return this.data ? this.data[key] : null
    },
    set(key: string, value) {
        if(!this.data) {
            this.data = {};
        }
        this.data[key] = value;
    },
    clear() {
        this.data = null;
    },
    remove(key: string) {
        this.data[key] = null;
        delete this.data[key];
    }
}

/**
 * 时间格式化
 * @param time
 * @param format
 * @returns
 */
function formatDate(time: number, format = 'YY-MM-DD hh:mm:ss') {
    const date = new Date(time);
  
    const year = date.getFullYear(),
      month = date.getMonth() + 1, //月份是从0开始的
      day = date.getDate(),
      hour = date.getHours(),
      min = date.getMinutes(),
      sec = date.getSeconds();
  
    const preArr = [...Array(10)].map(function (elem, index) {
      return '0' + index;
    });
  
    const newTime = format
      .replace(/YY/g, String(year))
      .replace(/MM/g, String(preArr[month] || month))
      .replace(/DD/g, String(preArr[day] || day))
      .replace(/hh/g, String(preArr[hour] || hour))
      .replace(/mm/g, String(preArr[min] || min))
      .replace(/ss/g, String(preArr[sec] || sec));
  
    return newTime;
  }

const getSearchParams = (searchStr?: string) => {
    const search = new URL(searchStr || location.href);
    const obj:any = {};
    search.searchParams.forEach((v:string, key: string) => {
        obj[key] = v;
    })
    return obj
}

// 更新浏览器参数
function updateSorting(key: string, value: string, searchString: string = location.search) {
    const params = new URLSearchParams(searchString)
    params.set(key, value)
    window.history.pushState(null, '', `?${params.toString()}`)
}

const windowSizeGt = (size: number | 'mobile') => {
    if(size === 'mobile') {
        return !navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i)
    }
    return window.innerWidth > size
}

const isMobile = () => !!navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i)

function dataURLtoFile(dataurl: string = '', filename: string) {
    //将base64转换为文件
    let arr = dataurl.split(','), 
    // @ts-ignore
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
  }

function make(tagName: keyof HTMLElementTagNameMap, classNames?: string | null | string[], attributes: any = {}) {
    const el = document.createElement(tagName);
  
    if (Array.isArray(classNames)) {
      el.classList.add(...classNames as []);
    } else if (classNames) {
      el.classList.add(classNames);
    }
  
    for (const attrName in attributes) {
      // @ts-ignore
      el[attrName] = attributes[attrName];
    }
  
    return el;
  };

  function debounce(func: Function, delay: number) {
    let timer: any;
    return function (...args: any) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        // @ts-ignore
        func.apply(this, args);
      }, delay);
    };
  }

  function shallowCompare(obj1: any, obj2: any): boolean {
    if (typeof obj1!== typeof obj2) {
      return false;
    }
  
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
      if (obj1.length!== obj2.length) {
        return false;
      }
  
      for (let i = 0; i < obj1.length; i++) {
        if (obj1[i]!== obj2[i]) {
          return false;
        }
      }
    } else if (typeof obj1 === 'object' && typeof obj2 === 'object') {
      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);
  
      if (keys1.length!== keys2.length) {
        return false;
      }
  
      for (const key of keys1) {
        if (obj1[key]!== obj2[key]) {
          return false;
        }
      }
    }
  
    return true;
  }

  function deepClone<T>(obj: T): T {
    if (obj === null || typeof obj!== 'object') {
      return obj as T;
    }
  
    if (Array.isArray(obj)) {
      return obj.map((item) => deepClone(item)) as T;
    }
  
    const clonedObj: { [key: string]: any } = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
  
    return clonedObj as T;
  }

export {
    debounce,
    isDev,
    store,
    shallowCompare,
    isMobile,
    dataURLtoFile,
    getSearchParams,
    deepClone,
    formatDate,
    memoryManage,
    make,
    windowSizeGt,
    updateSorting
}