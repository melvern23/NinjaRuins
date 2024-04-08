import { _decorator, CCInteger, Component, EventKeyboard, Input, input, KeyCode, Node, Vec3, Animation } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Game_Control')
export class Game_Control extends Component {
    @property({type:Node})boy_player:Node;
    @property({type:Node})girl_player:Node;
    @property({type:CCInteger})movement_speed;
    boy_movement_direction = 0;
    boy_position = new Vec3(-540,-140,0);
    boy_animation : Animation;
    girl_movement_direction = 0;
    girl_position = new Vec3(-470,-140,0);
    girl_animation : Animation;

    onLoad(){
        input.on(Input.EventType.KEY_DOWN,this.onKeyDown,this);
        input.on(Input.EventType.KEY_UP,this.onKeyUp,this);
        this.movement_speed = 500;
        this.boy_animation = this.boy_player.getComponent(Animation);
        this.girl_animation = this.girl_player.getComponent(Animation);

    }
    onKeyDown(event: EventKeyboard){
        switch(event.keyCode){
            case KeyCode.KEY_A:
                this.boy_movement_direction = -1;
            break;
            case KeyCode.KEY_D:
                this.boy_movement_direction = 1;
                this.boy_animation.play();
                break;
            case KeyCode.ARROW_LEFT:
                this.girl_movement_direction = -1;
            break;
            case KeyCode.ARROW_RIGHT:
                this.girl_movement_direction = 1;
                this.girl_animation.play();
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
        this.boy_position.x += this.boy_movement_direction * this.movement_speed * deltaTime;
        this.girl_position.x += this.girl_movement_direction * this.movement_speed * deltaTime;
        this.boy_player.position = this.boy_position;
        this.girl_player.position = this.girl_position;
    }
}


