import { ReactNode } from "react";

type SortableListProps<T> = {
  items: T[];
  getKey: (item: T, index: number) => string;
  renderItem: (item: T, index: number) => ReactNode;
  onMove: (from: number, to: number) => void;
  onRemove: (index: number) => void;
  title?: string;
};

export function SortableList<T>({
  items,
  getKey,
  renderItem,
  onMove,
  onRemove,
  title,
}: SortableListProps<T>) {
  return (
    <div className="space-y-3">
      {title ? <p className="text-sm text-gray-600">{title}</p> : null}
      {items.map((item, index) => (
        <div
          key={getKey(item, index)}
          className="rounded-xl border border-gray-200/80 bg-white/70 p-4 shadow-sm"
        >
          <div className="flex items-start gap-3">
            <div className="flex-1 space-y-3">{renderItem(item, index)}</div>
            <div className="flex flex-col gap-1 text-xs text-gray-600">
              <button
                className="rounded border border-gray-200 px-2 py-1 hover:border-gray-300"
                onClick={() => onMove(index, index - 1)}
                disabled={index === 0}
              >
                ↑
              </button>
              <button
                className="rounded border border-gray-200 px-2 py-1 hover:border-gray-300"
                onClick={() => onMove(index, index + 1)}
                disabled={index === items.length - 1}
              >
                ↓
              </button>
              <button
                className="rounded border border-red-200 px-2 py-1 text-red-600 hover:border-red-300"
                onClick={() => onRemove(index)}
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
