import { Players, UserInputService, Workspace } from "@rbxts/services";
import Ball from "shared/adapters/Ball";
import Explosion from "shared/adapters/Explosion";
import { applyInstance } from "shared/module";

UserInputService.InputBegan.Connect((input, gameProcessed) => {
	if (gameProcessed) return;
	if (input.UserInputType !== Enum.UserInputType.MouseButton2) return;
	const character = Players.LocalPlayer.Character;
	if (!character) return;
	const root = character.FindFirstChild("HumanoidRootPart") as BasePart;
	if (!root) return;

	const lookDir = Workspace.CurrentCamera!.CFrame.LookVector;

	const sphere = applyInstance(new Instance("Part"), new Ball(root.CFrame, lookDir).toRaw());

	sphere.Touched.Connect((otherPart) => {
		print(`Sphere touched: ${otherPart.Name}`);
		if (otherPart.Name !== "Handle") {
			const position = sphere.Position;
			sphere.Destroy(); 
			
			applyInstance(new Instance("Explosion"), new Explosion(position).toRaw());
		};
	});
});
