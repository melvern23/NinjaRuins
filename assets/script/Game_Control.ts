import { _decorator, Component, Node, Vec3, Label, ParticleSystem2D } from 'cc';
let { ccclass, property } = _decorator;
import { Player } from './Player';
import { Enemies_Control } from './Enemies_Control';

@ccclass('Game_Control')
export class Game_Control extends Component {
    @property({ type: Player }) PlayerBoy: Player;
    @property({ type: Player }) PlayerGirl: Player;
    @property({ type: Enemies_Control }) monster: Enemies_Control;
    @property({ type: Label }) boy_label: Label ;
    @property({ type: Label }) girl_label: Label ;
    @property({ type: Node }) exit_gate: Node ;
    @property({ type: Node }) fences: Node ;

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
        if (this.PlayerBoy && this.PlayerGirl && this.fences) {
            let boyPos = this.PlayerBoy.node.getPosition();
            let girlPos = this.PlayerGirl.node.getPosition();
            let fencePos = this.fences.getPosition();
            let boydistance = boyPos.subtract(fencePos).length();
            let girldistance = girlPos.subtract(fencePos).length();
            let threshold = 100; // Define a suitable distance threshold
            if (boydistance < threshold || girldistance < threshold) {
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
