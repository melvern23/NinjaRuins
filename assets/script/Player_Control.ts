import { _decorator, CCInteger, Component, EventKeyboard, Input, input, KeyCode, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Game_Control')
export class Game_Control extends Component {
    @property({type:Node})BoyPlayer:Node;
    @property({type:Node})GirlPlayer:Node;
    @property({type:CCInteger})movement_speed;
    movement_direction = 0;
    boy_position = new Vec3;
    girl_position = new Vec3;

    onLoad(){
        input.on(Input.EventType.KEY_DOWN,this.onKeyDown,this);
        input.on(Input.EventType.KEY_DOWN,this.onKeyUp,this);
        this.movement_speed = 200;

    }
    onKeyDown(event: EventKeyboard){
        switch(event.keyCode){
            case KeyCode.KEY_A:
                this.movement_direction = -1;
            break;
            case KeyCode.KEY_D:
                this.movement_speed = 1;

        }
    }
    onKeyUp(event: EventKeyboard){
        switch(event.keyCode){
            case KeyCode.KEY_A||KeyCode.KEY_D:  
            this.movement_direction = 0;
        }
    }

    start() {

    }

    update(deltaTime: number) {
        this.boy_position.x += this.movement_direction * this.movement_speed *deltaTime;
        this.BoyPlayer.position = this.boy_position;
    }
}


