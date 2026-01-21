import React, { useEffect, useState } from "@rbxts/react";
import { CustomResizableCursor } from "./CustomResizableCursor";

interface ItemProps {
    id: number;
    layoutOrder: number;
    isDragging: boolean;
    showIndicator: boolean;
    onDragStart: () => void;
    onDragEnd: () => void;
    onHover: () => void;
    onLeave: () => void;
}

export function Item({ id, layoutOrder, isDragging, showIndicator, onDragStart, onDragEnd, onHover, onLeave }: ItemProps) {
    const [hovered, setHovered] = useState(false);

    return (
        <frame
            Active={true}
            LayoutOrder={layoutOrder}
            Size={UDim2.fromOffset(40, 40)}
            BackgroundColor3={isDragging ? Color3.fromRGB(20, 20, 20) : (hovered ? Color3.fromRGB(255, 170, 0) : Color3.fromRGB(80, 80, 80))}
            BackgroundTransparency={isDragging ? 0.6 : 0}
            Event={{
                MouseEnter: () => {
                    setHovered(true);
                    onHover();
                },
                MouseLeave: () => {
                    setHovered(false);
                    onLeave();
                },
                InputBegan: (rbx, input) => {
                    if (input.UserInputType === Enum.UserInputType.MouseButton1) {
                        onDragStart();
                    }
                },
                InputEnded: (rbx, input) => {
                    if (input.UserInputType === Enum.UserInputType.MouseButton1) {
                        onDragEnd();
                    }
                },
            }}
        >
            <uicorner CornerRadius={new UDim(0, hovered ? 0 : 6)} />
            
            {showIndicator && (
                <frame
                    key="DropIndicator"
                    Size={new UDim2(0, 4, 1, 0)}
                    Position={new UDim2(0, -6, 0, 0)}
                    BackgroundColor3={Color3.fromRGB(0, 255, 0)}
                    BorderSizePixel={0}
                    ZIndex={10}
                >
                    <uicorner CornerRadius={new UDim(0, 2)} />
                </frame>
            )}

            <textlabel
                Text={`${id}`}
                Size={UDim2.fromScale(1, 1)}
                BackgroundTransparency={1}
                TextColor3={isDragging ? Color3.fromRGB(100, 100, 100) : Color3.fromRGB(255, 255, 255)}
            />
        </frame>
    );
}
