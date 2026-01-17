import { Workspace } from "@rbxts/services";
import { getRandomArbitrary } from "shared/module";

export default class Ball {
    private speed = getRandomArbitrary(150, 400);
    private parent = Workspace;

    public shape = Enum.PartType.Ball;
    public size = new Vector3(1, 1, 1);
    public anchored = false;
    public canCollide = true;
    
    public CFrame: CFrame;
    public assemblyLinearVelocity: Vector3;

    constructor(position: CFrame, LookVector: Vector3) {
        const size = getRandomArbitrary(1, 4);

        this.CFrame = position.mul(new CFrame(0, 1, -4));
        this.assemblyLinearVelocity = LookVector.mul(this.speed);
        this.size = new Vector3(size, size, size);
    }

    toRaw() {
        return {
            Shape: this.shape,
            Size: this.size,
            Anchored: this.anchored,
            CanCollide: this.canCollide,
            CFrame: this.CFrame,
            AssemblyLinearVelocity: this.assemblyLinearVelocity,
            Parent: this.parent,
        };
    }
}