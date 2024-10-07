import { RefLine } from "./index";
import { Rect, Point } from "./types";

interface Props {
  current: Rect;
  nodes: Rect[];
  points?: Point[];
  scale?: number;
  offsetX?: number;
  offsetY?: number;
}
export default function Line({ 
  nodes, 
  points = [], 
  current, 
  scale = 1,
  offsetX = 0,
  offsetY = 0, 
}: Props) {
  if (!current) return null;

  const refline = new RefLine({
    rects: nodes,
    points,
    current
  });

  // 获取水平、垂直参考线
  const lines = refline.getAllRefLines();

  return (
    <>
      {lines.map((line, i) => {
        return line.type === "vertical" ? (
          <div
            key={i}
            className="line"
            style={{
              position: "absolute",
              left: line.left * scale + offsetX,
              top: line.top * scale + offsetY,
              width: 1,
              height: line.size * scale,
              borderLeft: "1px dashed blue"
            }}
          ></div>
        ) : (
          <div
            key={i}
            className="line"
            style={{
              position: "absolute",
              left: line.left * scale + offsetX,
              top: line.top * scale + offsetY,
              height: 1,
              width: line.size * scale,
              borderTop: "1px dashed blue"
            }}
          ></div>
        );
      })}
    </>
  );
}
