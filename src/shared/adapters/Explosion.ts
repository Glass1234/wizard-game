import { Workspace } from "@rbxts/services";

export default class Explosion {
    private blastRadius = 5;
    private blastPressure = 5;
    private visible = true;
    private parent = Workspace;

    public position: Vector3;
    
    constructor(position: Vector3) {
        this.position = position;
    }

    toRaw() {
        return {
            Position: this.position,
            BlastRadius: this.blastRadius,
            BlastPressure: this.blastPressure,
            Visible: this.visible,
            Parent: this.parent,
        };
    }
}