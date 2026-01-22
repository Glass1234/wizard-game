import { Workspace } from "@rbxts/services";
import { applyInstance } from "shared/module";

export default class Explosion {
	private part: Instance;

	constructor(position: Vector3) {
		this.part = applyInstance(new Instance("Explosion"), {
			Position: position,
			BlastRadius: 5,
			BlastPressure: 5,
			Visible: true,
		});
	}

	public spawn() {
		this.part.Parent = Workspace;
	}
}
