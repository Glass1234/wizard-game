import React, { useRef, useState } from "@rbxts/react";
import { Item } from "./components/Item";

interface ItemData {
    id: number;
}

const INITIAL_ITEMS: ItemData[] = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
];

export function App() {
    const [items, setItems] = useState<ItemData[]>(INITIAL_ITEMS);
    const [draggingId, setDraggingId] = useState<number | undefined>(undefined);
    const [targetId, setTargetId] = useState<number | undefined>(undefined);

    const containerRef = useRef<Frame>();

    const finalizeMove = () => {
        if (draggingId === undefined || targetId === undefined || draggingId === targetId) {
            setDraggingId(undefined);
            setTargetId(undefined);
            return;
        }

        print(`[Logic] Finalizing move: Dragged ${draggingId} to position of ${targetId}`);

        setItems((prevItems) => {
            const oldIndex = prevItems.findIndex((i) => i.id === draggingId);
            let newIndex = prevItems.findIndex((i) => i.id === targetId);
            
            if (oldIndex < newIndex) newIndex -= 1;
            if (oldIndex === -1 || newIndex === -1) return prevItems;

            const newItems = [...prevItems];
            const removed = newItems.remove(oldIndex);
            if (removed) {
                newItems.insert(newIndex, removed);
            }
            return newItems;
        });

        setDraggingId(undefined);
        setTargetId(undefined);
    };

    return (
        <frame
            ref={containerRef}
            Size={UDim2.fromOffset(300, 200)}
            AnchorPoint={new Vector2(1, 0)}
            Position={UDim2.fromScale(1, 0)}
            BackgroundColor3={Color3.fromRGB(30, 30, 30)}
            BackgroundTransparency={0.15}
            BorderSizePixel={0}
            ClipsDescendants={true}
        >
            <uicorner CornerRadius={new UDim(0, 8)} />
            <uipadding PaddingTop={new UDim(0, 12)} PaddingLeft={new UDim(0, 12)} PaddingRight={new UDim(0, 12)} />
            <uilistlayout FillDirection={Enum.FillDirection.Horizontal} Padding={new UDim(0, 8)} SortOrder={Enum.SortOrder.LayoutOrder} />

            {items.map((item, index) => (
                <Item
                    key={item.id}
                    id={item.id}
                    layoutOrder={index}
                    isDragging={draggingId === item.id}
                    showIndicator={targetId === item.id && draggingId !== item.id && draggingId !== undefined}
                    onDragStart={() => setDraggingId(item.id)}
                    onDragEnd={() => finalizeMove()}
                    onHover={() => {
                        if (draggingId !== undefined) {
                            setTargetId(item.id);
                        }
                    }}
                    onLeave={() => setTargetId(prev => prev === item.id ? undefined : prev)}
                />
            ))}
        </frame>
    );
}