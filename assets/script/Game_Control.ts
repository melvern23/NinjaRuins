import { _decorator, Component, Node, Vec3, Label, ParticleSystem2D } from 'cc';
const { ccclass, property } = _decorator;
import { Player } from './Player';
import { Enemies_Control } from './Enemies_Control';

@ccclass('Game_Control')
export class Game_Control extends Component {
    @property({ type: Player }) PlayerBoy: Player = null;
    @property({ type: Player }) PlayerGirl: Player = null;
    @property({ type: Enemies_Control }) monster: Enemies_Control = null;
    @property({ type: Label }) boy_label: Label = null;
    @property({ type: Label }) girl_label: Label = null;
    @property({ type: Node }) exit_gate: Node = null;
    @property({ type: Node }) fences: Node = null;

    exit_effect: ParticleSystem2D;
    exit_position = new Vec3(2970, -140, 0);

    onLoad() {
        if (!this.PlayerBoy) {
            console.error("Boy are not assigned in the inspector");
            return;
        }
        if (!this.PlayerGirl) {
            console.error("Girl are not assigned in the inspector");
            return;
        }
        if (!this.monster) {
            console.error("Monster are not assigned in the inspector");
            return;
        }
        if (!this.exit_gate) {
            console.error("gate are not assigned in the inspector");
            return;
        }
        if (!this.fences) {
            console.error("fences are not assigned in the inspector");
            return;
        }

        this.boy_label.node.active = false;
        this.girl_label.node.active = false;
        this.showLabel();
        this.fences.active = false;
        this.exit_effect = new ParticleSystem2D();

        console.log("onLoad completed successfully");
    }

    start() {
        // Add any start logic if needed
    }

    update(deltaTime: number) {
        this.showFences();
    }

    showLabel() {
        this.boy_label.node.active = true;
        this.girl_label.node.active = true;
        this.scheduleOnce(() => {
            this.boy_label.node.active = false;
            this.girl_label.node.active = false;
        }, 3);
    }

    showFences() {
        if (this.PlayerBoy && this.fences) {
            const playerPos = this.PlayerBoy.node.getPosition();
            const fencePos = this.fences.getPosition();
            const distance = playerPos.subtract(fencePos).length();
            const threshold = 100; // Define a suitable distance threshold

            console.log(`Player Position: ${playerPos.toString()}`);
            console.log(`Fence Position: ${fencePos.toString()}`);
            console.log(`Distance: ${distance}`);

            if (distance < threshold) {
                this.fences.active = true;
                console.log("Fence is now active");
            } else {
                this.fences.active = false;
            }
        } else {
            console.error("PlayerBoy or fences is not assigned");
        }
    }
}
