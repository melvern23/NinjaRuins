import { _decorator, Component, Node, Vec3, Label, ParticleSystem2D } from 'cc';
let { ccclass, property } = _decorator;
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

    }

    update(deltaTime: number) {
        this.showFences();
        this.enemyMoves(deltaTime);
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

    enemyMoves(deltaTime : number) {
        if (this.PlayerBoy && this.PlayerGirl && this.monster) {
            let boyPos = this.PlayerBoy.node.getPosition();
            let girlPos = this.PlayerGirl.node.getPosition();
            let monsterPos = this.monster.node.getPosition();
    
            let boyDistanceX = Math.abs(boyPos.x - monsterPos.x);
            let girlDistanceX = Math.abs(girlPos.x - monsterPos.x);
    
            let threshold = 200; // Define a suitable distance threshold
    
            if (!this.monster.isMoving) {
                if (boyDistanceX < threshold || girlDistanceX < threshold) {
                    if (boyPos.x < monsterPos.x || girlPos.x < monsterPos.x) {
                        this.monster.direction = -1; // Move left
                    } 
                    if (boyPos.x > monsterPos.x || girlPos.x > monsterPos.x) {
                        this.monster.direction = 1; // Move right
                    }
                    this.monster.animation.play("enemies_run");
                    this.monster.isMoving = true; // Set moving flag
                    console.log("Monster is now walking");
                }
            }
    
            // Update monster position based on direction
            if (this.monster.isMoving) {
                const moveSpeed = 100 * this.monster.direction * deltaTime;
                this.monster.node.setPosition(monsterPos.x + moveSpeed, monsterPos.y, monsterPos.z);
            }
        } else {
            console.error("PlayerBoy, PlayerGirl, or monster is not assigned");
        }
    }
    
}
