import { _decorator, CCInteger, Component, EventKeyboard, Input, input, KeyCode, Node, Vec3, Animation, RigidBody2D, v2, director, Collider2D, Label, ParticleSystem2D, Collider, Contact2DType, IPhysics2DContact } from 'cc';
const { ccclass, property } = _decorator;
import { Player } from './Player';
import { Enemies_Control } from './Enemies_Control';

@ccclass('Game_Control')
export class Game_Control extends Component {
    @property({type:Player})PlayerBoy:Player;
    @property({type:Player})PlayerGirl:Player;
    @property({type:Enemies_Control})monster:Enemies_Control;
    @property({type:Label}) boy_label : Label;
    @property({type:Label}) girl_label : Label;
    @property({type:Node}) exit_gate : Node;
    @property({type:Node}) fences : Node;

    go_left : number = -1;
    go_right: number = 1;

    exit_effect : ParticleSystem2D;
    exit_position = new Vec3(2970,-140,0);

    onLoad(){
        this.boy_label.node.active = false;
        this.girl_label.node.active = false;
        this.showLabel();
        this.fences.active = false;
        this.exit_effect = new ParticleSystem2D;

    }


    start() {
        
    }

    update(deltaTime: number) {
        let distanceXBoy = Math.abs(this.PlayerBoy.node_position.x - this.monster.position.x)
        let distanceXGirl = Math.abs(this.PlayerGirl.node_position.x - this.monster.position.x)

        if(distanceXBoy < 150 || distanceXGirl < 150){
            this.monster.direction = -1 ;
        }
    }

    showLabel(){
        this.boy_label.node.active = true;
        this.girl_label.node.active = true;
        this.scheduleOnce(() => {
            this.boy_label.node.active = false;
            this.girl_label.node.active = false;
        }, 3);
    }

}