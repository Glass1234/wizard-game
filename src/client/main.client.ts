import { Players, UserInputService, Workspace } from "@rbxts/services";
import Ball from "shared/adapters/Ball";

UserInputService.InputBegan.Connect((input, gameProcessed) => {
	if (gameProcessed) return;
	if (input.UserInputType !== Enum.UserInputType.MouseButton2) return;
	const character = Players.LocalPlayer.Character;
	if (!character) return;
	const root = character.FindFirstChild("HumanoidRootPart") as BasePart;
	if (!root) return;

	const lookDir = Workspace.CurrentCamera!.CFrame.LookVector;

	const sphere = new Ball(root.CFrame, lookDir);
	sphere.spawn();
});
