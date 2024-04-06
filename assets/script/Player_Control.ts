import { _decorator, CCInteger, Component, EventKeyboard, Input, input, KeyCode, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Game_Control')
export class Game_Control extends Component {
    @property({type:Node})BoyPlayer:Node;
    @property({type:Node})GirlPlayer:Node;
    @property({type:CCInteger})movement_speed;
    boy_movement_direction = 0;
    girl_movement_direction = 0;
    boy_position = new Vec3(-540,-140,0);
    girl_position = new Vec3(-470,-140,0);

    onLoad(){
        input.on(Input.EventType.KEY_DOWN,this.onKeyDown,this);
        input.on(Input.EventType.KEY_UP,this.onKeyUp,this);
        this.movement_speed = 200;

    }
    onKeyDown(event: EventKeyboard){
        switch(event.keyCode){
            case KeyCode.KEY_A:
                this.boy_movement_direction = -1;
            break;
            case KeyCode.KEY_D:
                this.boy_movement_direction = 1;
                break;
            case KeyCode.ARROW_LEFT:
                this.girl_movement_direction = -1;
            break;
            case KeyCode.ARROW_RIGHT:
                this.girl_movement_direction = 1;
        }
    }
    onKeyUp(event: EventKeyboard){
        switch(event.keyCode){
            case KeyCode.KEY_A:
            case KeyCode.KEY_D:                 
                this.boy_movement_direction = 0;
                break;
            case KeyCode.ARROW_LEFT:
            case KeyCode.ARROW_RIGHT: 
                this.girl_movement_direction = 0;
                break;
        }
    }

    start() {

    }

    update(deltaTime: number) {
        this.boy_position.x += this.boy_movement_direction * this.movement_speed * deltaTime;
        this.girl_position.x += this.girl_movement_direction * this.movement_speed * deltaTime;
        this.BoyPlayer.position = this.boy_position;
        this.GirlPlayer.position = this.girl_position;
    }
}


