import { _decorator, Collider2D, Component, Node, RigidBody2D, Vec3, Animation, v2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Enemies_Control')
export class Enemies_Control extends Component {
    @property({type:Node}) monster : Node;

    enemy_speed :number = 500;
    direction = 0;
    position = new Vec3(280,-40,0);
    collide:Collider2D;
    rigid:RigidBody2D;
    animation:Animation;

    onLoad(){
        this.monster.setPosition(this.position);
        this.animation = this.monster.getComponent(Animation);
        this.collide = this.monster.getComponent(Collider2D);
        this.rigid = this.monster.getComponent(RigidBody2D);
    }
    start() {

    }

    update(deltaTime: number) {
        this.rigid.linearVelocity = v2(this.direction * this.enemy_speed * deltaTime, this.rigid.linearVelocity.y);
        this.position.x += this.direction * this.enemy_speed * deltaTime;
    }

    
}


