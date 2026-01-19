import React, { useEffect, useRef, useState } from "@rbxts/react";
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

    const containerRef = useRef<Frame>();

    // DEBUG: Выводим текущий порядок элементов при каждом изменении state
    useEffect(() => {
        const currentOrder = items.map(i => i.id).join(", ");
        print(`[State Update] Current Order: [${currentOrder}]`);
    }, [items]);

    const moveItem = (targetId: number) => {
        if (draggingId === undefined || draggingId === targetId) return;

        setItems((prevItems) => {
            const oldIndex = prevItems.findIndex((i) => i.id === draggingId);
            const newIndex = prevItems.findIndex((i) => i.id === targetId);

            if (oldIndex === -1 || newIndex === -1) return prevItems;

            // Важно: создаем копию массива
            const newItems = [...prevItems];
            
            // Используем remove/insert (или splice, если есть полифил, но этот способ надежнее в roblox-ts без конфига)
            const removed = newItems.remove(oldIndex);
            if (removed) {
                newItems.insert(newIndex, removed);
            }
            
            return newItems;
        });
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

            <uipadding
                PaddingTop={new UDim(0, 12)}
                PaddingLeft={new UDim(0, 12)}
                PaddingRight={new UDim(0, 12)}
            />

            <uilistlayout
                FillDirection={Enum.FillDirection.Horizontal}
                Padding={new UDim(0, 8)}
                SortOrder={Enum.SortOrder.LayoutOrder} // Мы используем это, значит нужно задавать LayoutOrder детям
            />

            {items.map((item, index) => (
                <Item
                    key={item.id}
                    id={item.id}
                    layoutOrder={index} // <--- ВАЖНО: Передаем индекс как порядок сортировки
                    isDragging={draggingId === item.id}
                    onDragStart={() => {
                        print(`[Logic] Drag Start: ${item.id}`);
                        setDraggingId(item.id);
                    }}
                    onDragEnd={() => {
                        print(`[Logic] Drag End: ${item.id}`);
                        setDraggingId(undefined);
                    }}
                    onHover={() => {
                        if (draggingId !== undefined && draggingId !== item.id) {
                             moveItem(item.id);
                        }
                    }}
                    onPress={() => print(`Item ${item.id} set`)}
                    onRelease={() => print(`Item ${item.id} unSet`)}
                />
            ))}
        </frame>
    );
}
