import React from "@rbxts/react";

export function App() {
	return (
		<screengui ResetOnSpawn={false}>
			<textbutton
				Size={UDim2.fromScale(0.2, 0.1)}
				Position={UDim2.fromScale(0.4, 0.45)}
				Text="Нажми меня"
				Event={{
					Activated: () => {
						print("Кнопка нажата");
					},
				}}
			/>
		</screengui>
	);
}
