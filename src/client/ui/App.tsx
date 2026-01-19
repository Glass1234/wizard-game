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

	const containerRef = useRef<Frame>(); 

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
			/>

			{items.map((item) => (
				<Item
					key={item.id}
					id={item.id}
					onPress={() => {
						print(`Item ${item.id} set`);
					}}
					onRelease={() => {
						print(`Item ${item.id} unSet`);
					}}
				/>
			))}
		</frame>
    );
}
