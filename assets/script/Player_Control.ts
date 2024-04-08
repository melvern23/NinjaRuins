import { _decorator, CCInteger, Component, EventKeyboard, Input, input, KeyCode, Node, Vec3, Animation, RigidBody2D, v2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Game_Control')
export class Game_Control extends Component {
    @property({type:Node})boy_player:Node;
    @property({type:Node})girl_player:Node;
    @property({type:CCInteger})movement_speed;
    @property({type:CCInteger})jump_height;
    boy_movement_direction = 0;
    boy_position = new Vec3(-540,-140,0);
    boy_animation : Animation;
    boy_rigid : RigidBody2D;


    girl_movement_direction = 0;
    girl_position = new Vec3(-470,-140,0);
    girl_animation : Animation;
    girl_rigid : RigidBody2D;
    


    onLoad(){
        input.on(Input.EventType.KEY_DOWN,this.onKeyDown,this);
        input.on(Input.EventType.KEY_UP,this.onKeyUp,this);

        this.movement_speed = 500;
        this.jump_height = 10000;

        this.boy_animation = this.boy_player.getComponent(Animation);
        this.girl_animation = this.girl_player.getComponent(Animation);

        this.boy_rigid = this.boy_player.getComponent(RigidBody2D);
        this.girl_rigid = this.girl_player.getComponent(RigidBody2D);
    }
    onKeyDown(event: EventKeyboard){
        switch(event.keyCode){
            case KeyCode.KEY_A:
                this.boy_movement_direction = -1;
                this.boy_animation.play('boy_back');
                break;
            break;
            case KeyCode.KEY_D:
                this.boy_movement_direction = 1;
                this.boy_animation.play('boy_run');
                break;
            case KeyCode.KEY_W:
                if(this.boy_position.y<=-140){
                    this.boy_animation.play('boy_jump');
                    this.boy_rigid.applyForceToCenter(v2(0,this.jump_height),true);
                }

                break;

            case KeyCode.ARROW_LEFT:
                this.girl_movement_direction = -1;
                this.girl_animation.play('girl_back');
            break;
            case KeyCode.ARROW_RIGHT:
                this.girl_movement_direction = 1;
                this.girl_animation.play('girl_run');
                break;
            case KeyCode.ARROW_UP:
                this.girl_animation.play('girl_jump');
                this.girl_rigid.applyForceToCenter(v2(0,this.jump_height),true);
                break;            
        }
    }
    onKeyUp(event: EventKeyboard){
        switch(event.keyCode){
            case KeyCode.KEY_A:
            case KeyCode.KEY_D:                 
                this.boy_movement_direction = 0;
                this.boy_animation.stop();
                break;
            case KeyCode.KEY_W:

            case KeyCode.ARROW_LEFT:
            case KeyCode.ARROW_RIGHT: 
                this.girl_movement_direction = 0;
                this.boy_animation.stop();
                break;
        }
    }

    start() {

    }

    update(deltaTime: number) {
        this.boy_rigid.linearVelocity = v2(this.boy_movement_direction * this.movement_speed * deltaTime, this.boy_rigid.linearVelocity.y);
        this.girl_rigid.linearVelocity = v2(this.girl_movement_direction * this.movement_speed * deltaTime, this.girl_rigid.linearVelocity.y);
        this.boy_position.x += this.boy_movement_direction * this.movement_speed * deltaTime;
        this.girl_position.x += this.girl_movement_direction * this.movement_speed * deltaTime;
        this.boy_player.position = this.boy_position;
        this.girl_player.position = this.girl_position;
    }
}


