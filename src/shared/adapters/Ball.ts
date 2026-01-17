import { RunService, Workspace } from "@rbxts/services";
import { applyInstance, getRandomArbitrary } from "shared/module";
import Explosion from "./Explosion";

export default class Ball {
    private part: BasePart;
    private direction: Vector3;
    private connection: RBXScriptConnection | undefined;
    private lastPosition: Vector3;
    private rayParams = new RaycastParams();


    protected speed = getRandomArbitrary(50, 100);
    protected size = getRandomArbitrary(1, 4);

    constructor(position: CFrame, lookVector: Vector3) {
        this.direction = lookVector.Unit;
        this.part = applyInstance(new Instance("Part"), {
            Shape: Enum.PartType.Ball,
            Size: new Vector3(this.size, this.size, this.size),
            Anchored: true,
            CanCollide: false,
            CFrame: position.mul(new CFrame(0, 1, -4)),
        });
        this.lastPosition = this.part.Position;
    }

    public spawn() {
        this.part.Parent = Workspace;

        this.rayParams.FilterType = Enum.RaycastFilterType.Blacklist; // список игнорируемых объектов
        this.rayParams.FilterDescendantsInstances = [this.part]; // игнорируем сам шар

        this.connection = RunService.Heartbeat.Connect((dt) => { // каждый физический кадр
            const nextPos = this.part.Position.add( // вычисляем следующую позицию в кадре
                this.direction.mul(this.speed * dt),
            );

            const result = Workspace.Raycast(
                this.lastPosition, // вылет из
                nextPos.sub(this.lastPosition), // направление вылета
                this.rayParams, // список игнорируемых объектов
            );

            if (result) { // если есть столкновение
                const position = result.Position;
                
                this.destroy();
                
                (new Explosion(position)).spawn();
                return;
            }

            this.part.Position = nextPos; // обновляем позицию
            this.lastPosition = nextPos; // обновляем последнюю позицию
        });
    }

    public touched(callback: (otherPart: BasePart) => void) {
        this.part.Touched.Connect(callback);
    }

    public destroy() {
        this.connection?.Disconnect();
        this.part.Destroy();
    }

    public getPosition(): Vector3 {
        return this.part.Position;
    }
}