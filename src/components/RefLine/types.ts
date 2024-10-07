export interface Rect {
    key: string | number;
    left: number;
    top: number;
    width: number;
    height: number;
    rotate?: number;
    [x: string]: any;
  }
  
  export interface BoundingRect {
    left: number;
    top: number;
    right: number;
    bottom: number;
    width: number;
    height: number;
  }
  
  export type LineType = "horizontal" | "vertical";
  
  // horizontal/vertical  top/center/bottom left/center/right
  export type VRefLinePosition = "vl" | "vc" | "vr";
  export type HRefLinePosition = "ht" | "hc" | "hb";
  export type RefLinePosition = VRefLinePosition | HRefLinePosition;
  export interface AdsorbLine {
    key: string;
    type: LineType;
    offset: number;
  }
  
  export type AdsorbVLine = Omit<AdsorbLine, "type">;
  export type AdsorbHLine = Omit<AdsorbLine, "type">;
  export interface RefLineMeta<T extends Rect = Rect> {
    type: LineType;
    position: RefLinePosition;
    offset: number;
    start: number;
    end: number;
    rect: T;
    adsorbOnly?: boolean;
    /**
     * 当匹配到的是自定义吸附线
     */
    line?: AdsorbVLine | AdsorbVLine;
  }
  
  export interface MatchedLine<T extends Rect = Rect> {
    type: LineType;
    left: number;
    top: number;
    size: number;
    refLineMetaList: RefLineMeta<T>[];
  }
  
  export interface LineGroup<T extends Rect = Rect> {
    min: number;
    max: number;
    offset: number;
    refLineMetaList: RefLineMeta<T>[];
  }
  
  export interface Delta {
    left: number;
    top: number;
  }
  
  export enum MOVE_DIR {
    MOVE_TOP,
    MOVE_RIGHT,
    MOVE_BOTTOM,
    MOVE_LEFT,
    NONE,
  }
  
  export interface Point {
    key?: string | number;
    x: number;
    y: number;
  }