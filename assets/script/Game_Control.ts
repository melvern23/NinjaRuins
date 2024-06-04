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
    @property({ type: Node }) fences1: Node ;
    @property({ type: Node }) fences2: Node ;


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
        if (!this.fences1) {
            console.error("fences1 are not assigned in the inspector");
            return;
        }
        if (!this.fences2) {
            console.error("fences2 are not assigned in the inspector");
            return;
        }

        this.boy_label.node.active = false;
        this.girl_label.node.active = false;
        this.showLabel();
        this.fences1.active = false;
        this.fences2.active = false;
        this.exit_effect = new ParticleSystem2D();

        console.log("onLoad completed successfully");
    }

    start() {

    }

    update(deltaTime: number) {
        this.showfences();
    }

    showLabel() {
        this.boy_label.node.active = true;
        this.girl_label.node.active = true;
        this.scheduleOnce(() => {
            this.boy_label.node.active = false;
            this.girl_label.node.active = false;
        }, 3);
    }

    showfences() {
        let boyPos = this.PlayerBoy.node.getPosition();
        let girlPos = this.PlayerGirl.node.getPosition();
        let fencePos1 = this.fences1.getPosition();
        let fencePos2 = this.fences2.getPosition();
        if (this.PlayerBoy && this.PlayerGirl && this.fences1) {
            let boydistance = boyPos.subtract(fencePos1).length();
            let girldistance = girlPos.subtract(fencePos1).length();
            let threshold = 100; // Define a suitable distance threshold
            if (boydistance < threshold || girldistance < threshold) {
                this.fences1.active = true;
                console.log("Fence is now active");
            } else {
                this.fences1.active = false;
            }
        } else {
            console.error("PlayerBoy or fences1 is not assigned");
        }

        if (this.PlayerBoy && this.PlayerGirl && this.fences2) {
            let boydistance = boyPos.subtract(fencePos2).length();
            let girldistance = girlPos.subtract(fencePos2).length();
            let threshold = 100; // Define a suitable distance threshold
            if (boydistance < threshold || girldistance < threshold) {
                this.fences2.active = true;
                console.log("Fence is now active");
            } else {
                this.fences2.active = false;
            }
        } else {
            console.error("PlayerBoy or fences1 is not assigned");
        }
    }

    gameOver(){
        
    }
}
