import { _decorator, CCInteger, Component, EventKeyboard, Input, input, KeyCode, Node, Vec3, Animation, RigidBody2D, v2, director, Collider2D, Label, ParticleSystem2D, Collider, Contact2DType, IPhysics2DContact } from 'cc';
const { ccclass, property } = _decorator;
import { Player } from './Player';

@ccclass('Game_Control')
export class Game_Control extends Component {
    @property({type:Node})Player1:Player;
    @property({type:Node})Player2:Player;
    @property({type:Node}) monster1 : Node;
    @property({type:Label}) boy_label : Label;
    @property({type:Label}) girl_label : Label;
    @property({type:Node}) exit_gate : Node;
    @property({type:Node}) fences : Node;

    go_left : number = -1;
    go_right: number = 1;

    boy_player : Player;
    girl_player : Player;

    
    enemy_speed :number = 500;
    monster1_direction = 0;
    monster1_position = new Vec3(280,-140,0);
    monster1_collide:Collider2D;
    monster1_rigid:RigidBody2D;
    monster1_animation:Animation;

    exit_effect : ParticleSystem2D;
    exit_position = new Vec3(2970,-140,0);

    onLoad(){
        this.monster1.setPosition(this.monster1_position);
        this.monster1_animation = this.monster1.getComponent(Animation);
        this.monster1_collide = this.monster1.getComponent(Collider2D);
        this.monster1_rigid = this.monster1.getComponent(RigidBody2D);

        this.boy_label.node.active = false;
        this.girl_label.node.active = false;

        // this.exit_effect.active
        this.contactBoyPlayer();
        this.contactGirlPlayer();
        this.showLabel(this.boy_label,this.girl_label);
    }


    start() {
        this.goNextLevel();

        this.boy_player = this.Player1.getComponent(Player);
        this.girl_player = this.Player2.getComponent(Player);

    }

    update(deltaTime: number) {

        if((this.boy_player.node_position.x >= -250 && this.boy_player.node_position.y >=-140)||
        (this.girl_player.node_position.x >= -250 && this.girl_player.node_position.y >=-140)){
        this.monster1_animation.play('enemies_run');
        this.monster1_direction = this.go_left;
    }

        this.monster1_rigid.linearVelocity = v2(this.monster1_direction * this.enemy_speed * deltaTime, this.monster1_rigid.linearVelocity.y);
        this.monster1_position.x += this.monster1_direction * this.enemy_speed * deltaTime;
        this.monster1.setPosition(this.monster1_position);

    }

    showLabel(boy_text: Label,girl_text: Label){
        this.boy_label.node.active = true;
        this.girl_label.node.active = true;
        this.scheduleOnce(() => {
            this.boy_label.node.active = false;
            this.girl_label.node.active = false;
        }, 3);
    }

    goNextLevel(){
        if(this.boy_player.node_position.x >= this.exit_position.x && this.girl_player.node_position.x >= this.exit_position.x ){
            this.exit_effect.scheduleOnce(() =>{
                this.exit_effect.active;
            }, 3);
            director.loadScene('Stage2');
        }
    }

    contactBoyPlayer(){
        let collider = this.boy_player.node_collider;
        if(collider){
            collider.on(Contact2DType.BEGIN_CONTACT,this.onBeginContact,this);
        }
    }

    contactGirlPlayer(){
        let collider = this.girl_player.node_collider;
        if(collider){
            collider.on(Contact2DType.BEGIN_CONTACT,this.onBeginContact,this);
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D,contact: IPhysics2DContact): void{
        let otherObject = otherCollider.tag;
        if(otherObject === 1){
            if(selfCollider === this.boy_player.node_collider){
                this.boy_player.node_animation.play("boy_death");
            }else{
                this.girl_player.node_animation.play("girl_death");
            }
        }
    }

}
