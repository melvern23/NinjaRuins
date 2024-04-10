import { _decorator, Component, Node, RigidBody2D, Vec3 } from 'cc';
//import { Player_Control} from './Player_Control';
const { ccclass, property } = _decorator;

@ccclass('Game_Control')
export class Game_Control extends Component {
    @property({type: Node}) monster1 : Node;

    move_speed :number = 100;
    monster1_position = new Vec3(280,-140,0);
    monster1_rigid:RigidBody2D;
    start() {

    }

    onLoad(){
        this.monster1.setPosition(this.monster1_position);
        this.monster1_rigid = this.monster1.getComponent(RigidBody2D);
    }

    update(deltaTime: number) { // monster berjalan tapi rigid body tidak ikut
        this.monster1_position.x -= this.move_speed * deltaTime;
        this.monster1.setPosition(this.monster1_position);
    }
}


