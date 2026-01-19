import React, { useEffect, useState } from "@rbxts/react";
import { CustomResizableCursor } from "./CustomResizableCursor";

interface ItemProps {
    id: number;
    layoutOrder: number; // Новое свойство
    isDragging: boolean;
    onDragStart: () => void;
    onDragEnd: () => void;
    onHover: () => void;
    onPress?: () => void;
    onRelease?: () => void;
}

export function Item({ id, layoutOrder, isDragging, onDragStart, onDragEnd, onHover, onPress, onRelease }: ItemProps) {
    const [hovered, setHovered] = useState(false);
    const [pressed, setPressed] = useState(false);

    return (
        <frame
            Active={true}
            LayoutOrder={layoutOrder} // <--- Применяем порядок для UIListLayout
            Size={UDim2.fromOffset(40, 40)}
            BackgroundColor3={hovered ? Color3.fromRGB(255, 170, 0) : Color3.fromRGB(80, 80, 80)}
            Event={{
                MouseEnter: () => {
                    setHovered(true);
                    onHover();
                },
                MouseLeave: () => setHovered(false),
                InputBegan: (rbx, input) => {
                    if (input.UserInputType === Enum.UserInputType.MouseButton1) {
                        setPressed(true);
                        onPress?.();
                        onDragStart();
                    }
                },
                InputEnded: (rbx, input) => {
                    if (input.UserInputType === Enum.UserInputType.MouseButton1) {
                        setPressed(false);
                        onRelease?.();
                        onDragEnd();
                    }
                },
            }}
        >
            <uicorner CornerRadius={new UDim(0, hovered ? 0 : 6)} />
            {hovered && <CustomResizableCursor />} 

            <textlabel
                Text={`${id}`}
                Size={UDim2.fromScale(1, 1)}
                BackgroundTransparency={1}
                TextColor3={Color3.fromRGB(255, 255, 255)}
            />
        </frame>
    );
}
