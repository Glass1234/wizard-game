import React, { useEffect, useState } from "@rbxts/react";
import { CustomResizableCursor } from "./CustomResizableCursor";

interface ItemProps {
    id: number;
    layoutOrder: number;
    isDragging: boolean;
    indicatorSide?: "left" | "right";
    onDragStart: () => void;
    onDragEnd: () => void;
    onHover: (side: "left" | "right") => void;
    onLeave: () => void;
}

export function Item({ id, layoutOrder, isDragging, indicatorSide, onDragStart, onDragEnd, onHover, onLeave }: ItemProps) {
    const [hovered, setHovered] = useState(false);
    
    const ITEM_SIZE = 40;
    const GAP_SIZE = 8;
    const CONTAINER_WIDTH = ITEM_SIZE + GAP_SIZE;

    const calculateSide = (rbx: GuiObject, input: InputObject): "left" | "right" => {
        const absolutePos = rbx.AbsolutePosition;
        const mouseX = input.Position.X;
        const relativeX = mouseX - absolutePos.X;
        
        return relativeX > (ITEM_SIZE / 2) ? "right" : "left";
    };

    return (
        <frame
            Active={true}
            LayoutOrder={layoutOrder}
            Size={UDim2.fromOffset(CONTAINER_WIDTH, ITEM_SIZE)}
            BackgroundTransparency={1}
            Event={{
                MouseEnter: () => setHovered(true),
                MouseLeave: () => {
                    setHovered(false);
                    onLeave();
                },
                InputChanged: (rbx, input) => {
                    if (input.UserInputType === Enum.UserInputType.MouseMovement) {
                        onHover(calculateSide(rbx, input)); 
                    }
                },
                InputBegan: (rbx, input) => {
                    if (input.UserInputType === Enum.UserInputType.MouseButton1) onDragStart()
                },
                InputEnded: (rbx, input) => {
                    if (input.UserInputType === Enum.UserInputType.MouseButton1) onDragEnd()
                },
            }}
        >
            <frame
                Size={UDim2.fromOffset(ITEM_SIZE, ITEM_SIZE)}
                BackgroundColor3={isDragging ? Color3.fromRGB(20, 20, 20) : (hovered ? Color3.fromRGB(255, 170, 0) : Color3.fromRGB(80, 80, 80))}
                BackgroundTransparency={isDragging ? 0.6 : 0}
            >
                <uicorner CornerRadius={new UDim(0, hovered ? 0 : 6)} />
                <textlabel
                    Text={`${id}`}
                    Size={UDim2.fromScale(1, 1)}
                    BackgroundTransparency={1}
                    TextColor3={Color3.fromRGB(255, 255, 255)}
                />
            </frame>

            {indicatorSide && (
                <frame
                    key="DropIndicator"
                    Size={new UDim2(0, 4, 1, 0)}
                    Position={indicatorSide === "left"
                        ? new UDim2(0, -6, 0, 0)
                        : new UDim2(0, ITEM_SIZE + 2, 0, 0)
                    }
                    BackgroundColor3={Color3.fromRGB(0, 255, 0)}
                    BorderSizePixel={0}
                    ZIndex={10}
                >
                    <uicorner CornerRadius={new UDim(0, 2)} />
                </frame>
            )}

            {hovered && <CustomResizableCursor />}
        </frame>
    );
}
