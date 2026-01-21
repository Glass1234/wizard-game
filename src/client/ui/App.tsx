import React, { useRef, useState } from "@rbxts/react";
import { Item } from "./components/Item";

interface ItemData {
    id: number;
}

type DropTarget = {
    id: number;
    side: "left" | "right";
};

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
    
    const [dropTarget, setDropTarget] = useState<DropTarget | undefined>(undefined);

    const finalizeMove = () => {
        if (draggingId === undefined || dropTarget === undefined || draggingId === dropTarget.id) {
            setDraggingId(undefined);
            setDropTarget(undefined);
            return;
        }

        setItems((prevItems) => {
            const oldIndex = prevItems.findIndex((i) => i.id === draggingId);
            let targetIndex = prevItems.findIndex((i) => i.id === dropTarget.id);

            if (oldIndex === -1 || targetIndex === -1) return prevItems;

            if (dropTarget.side === "right") {
                targetIndex += 1;
            }

            const newItems = [...prevItems];
            
            if (targetIndex > oldIndex) {
                 targetIndex -= 1;
            }

            const removed = newItems.remove(oldIndex); 

            if (removed !== undefined) {
                newItems.insert(targetIndex, removed);
            }
            return newItems;
        });

        setDraggingId(undefined);
        setDropTarget(undefined);
    };

    return (
        <frame
            Size={UDim2.fromOffset(300, 200)}
            AnchorPoint={new Vector2(1, 0)}
            Position={UDim2.fromScale(1, 0)}
            BackgroundColor3={Color3.fromRGB(30, 30, 30)}
            BackgroundTransparency={0.15}
            BorderSizePixel={0}
			ClipsDescendants={true}
        >
            <uilistlayout FillDirection={Enum.FillDirection.Horizontal} Padding={new UDim(0, 0)} SortOrder={Enum.SortOrder.LayoutOrder} />
            
            {items.map((item, index) => (
                <Item
                    key={item.id}
                    id={item.id}
                    layoutOrder={index}
                    isDragging={draggingId === item.id}
                    indicatorSide={
                        (dropTarget?.id === item.id && draggingId !== item.id) 
                        ? dropTarget.side 
                        : undefined
                    }
                    onDragStart={() => setDraggingId(item.id)}
                    onDragEnd={() => finalizeMove()}
                    onHover={(side) => {
                        if (draggingId !== undefined && draggingId !== item.id) {
                            setDropTarget({ id: item.id, side: side });
                        }
                    }}
                    onLeave={() => setDropTarget(undefined)}
                />
            ))}
        </frame>
    );
}