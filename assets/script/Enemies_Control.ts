import { _decorator, Collider2D, Component, Node, RigidBody2D, Vec3, Animation, v2, Vec2 } from 'cc';
import { Player } from './Player';
const { ccclass, property } = _decorator;

@ccclass('Enemies_Control')
export class Enemies_Control extends Component {
    @property({type:Node}) monster : Node;
    @property({ type: Player }) PlayerBoy: Player;
    @property({ type: Player }) PlayerGirl: Player;


    enemy_speed :number = 500;
    direction = 0;
    position = new Vec3(280,-160,0);
    animation : Animation;
    rigid:RigidBody2D;
    isMoving: boolean;

    onLoad(){
        this.monster.setPosition(this.position);
        this.rigid = this.monster.getComponent(RigidBody2D);
        this.animation = this.monster.getComponent(Animation);
        this.isMoving = false;
    }
    start() {
        
    }

    update(deltaTime: number) {
        this.enemyMoves(deltaTime);
            if(this.isMoving){
                this.rigid.linearVelocity = v2(this.direction * this.enemy_speed * deltaTime, this.rigid.linearVelocity.y);
            }
            if(this.direction != 0){
                this.isMoving = true;
            }
    }

    enemyMoves(deltaTime : number) {
        if (this.PlayerBoy && this.PlayerGirl && this.monster) {
            let boyPos = this.PlayerBoy.node.getPosition();
            let girlPos = this.PlayerGirl.node.getPosition();
            let monsterPos = this.monster.getPosition();
    
            let boyDistanceX = Math.abs(boyPos.x - monsterPos.x);
            let girlDistanceX = Math.abs(girlPos.x - monsterPos.x);
    
            let threshold = 200; // Define a suitable distance threshold
    
            if (!this.isMoving) {
                if (boyDistanceX < threshold || girlDistanceX < threshold) {
                    if (boyPos.x < monsterPos.x || girlPos.x < monsterPos.x) {
                        this.direction = -1; // Move left
                    } 
                    if (boyPos.x > monsterPos.x || girlPos.x > monsterPos.x) {
                        this.direction = 1; // Move right
                    }
                    this.animation.play("enemies_run");
                    this.isMoving = true; // Set moving flag
                    console.log("Monster is now walking");
                }
            }
        } else {
            console.error("PlayerBoy, PlayerGirl, or monster is not assigned");
        }
    }
}


