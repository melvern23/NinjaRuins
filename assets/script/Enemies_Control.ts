import { _decorator, Collider2D, Component, Node, RigidBody2D, Vec3, Animation, v2, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Enemies_Control')
export class Enemies_Control extends Component {
    @property({type:Node}) monster : Node;

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
            this.rigid.linearVelocity = v2(this.direction * this.enemy_speed * deltaTime, this.rigid.linearVelocity.y);
            if(this.direction != 0){
                this.isMoving = true;
            }
    }

    
}


