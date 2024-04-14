import { _decorator, Animation, CCInteger, CCString, Collider2D, Component, EventKeyboard, Input, input, KeyCode, Node, RigidBody2D, v2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {
    @property({type:Node})player: Node;
    @property({type:CCInteger})movement_speed: number;
    @property({type:CCInteger})jump_height : number;
    @property({type:CCString})genre: String;

    go_left : number = -1;
    go_right: number = 1;

    node_movement_direction = 0;
    node_position = new Vec3;
    node_animation : Animation;
    node_rigid : RigidBody2D;
    node_collider : Collider2D;

    onLoad(){
        input.on(Input.EventType.KEY_DOWN,this.onKeyDown,this);
        input.on(Input.EventType.KEY_UP,this.onKeyUp,this);

        this.movement_speed = 500;
        this.jump_height = 15000;

        if(this.genre === "boy"){
            this.node_position.set(-540,-140,0);
        } else {
            this.node_position.set(-380,-140,0);
        }
        this.player.setPosition(this.node_position);
        this.node_animation = this.node.getComponent(Animation);
        this.node_rigid = this.node.getComponent(RigidBody2D);
        this.node_collider = this.node.getComponent(Collider2D);
        //this.node_jumped = false;

        // this.exit_effect.active

    }
    onKeyDown(event: EventKeyboard){
        if(this.genre === "boy"){
            switch(event.keyCode){
                //node movement
                case KeyCode.KEY_A:
                    this.node_movement_direction = this.go_left;
                    this.node_animation.play('boy_back');
                    break;
                case KeyCode.KEY_D:
                    this.node_movement_direction = this.go_right;
                    this.node_animation.play('boy_run');
                    break;
                case KeyCode.KEY_W:
                    if(this.node_position.y <= -140){
                        this.node_animation.play('boy_jump');
                        this.node_rigid.applyForceToCenter(v2(0,this.jump_height),true); // membuat player bisa lompat dengan parameter y = this.jump_height
                        //this.node_jumped = true;
                    }
                    break;
                }
        }else {
             // node movement
            switch(event.keyCode){
                case KeyCode.ARROW_LEFT:
                    this.node_movement_direction = this.go_left;
                    this.node_animation.play('girl_back');
                    break;
                case KeyCode.ARROW_RIGHT:
                    this.node_movement_direction = this.go_right;
                    this.node_animation.play('girl_run');
                    break;
                case KeyCode.ARROW_UP:
                    if(this.node_position.y <= -140){
                        this.node_animation.play('girl_jump');
                        this.node_rigid.applyForceToCenter(v2(0,this.jump_height),true); // membuat player bisa lompat dengan parameter y = this.jump_height
                    }
                    break;     
                }
            }      
        }

    onKeyUp(event: EventKeyboard){
        switch(event.keyCode){
            //node movement
            case KeyCode.KEY_A:
            case KeyCode.KEY_D:                 
                this.node_movement_direction = 0;
                this.node_animation.stop();
                break;
            // case KeyCode.KEY_W:
            //     this.node_animation.stop();
            //     this.node_jumped = false;

            // stop node movement
            case KeyCode.ARROW_LEFT:
            case KeyCode.ARROW_RIGHT: 
                this.node_movement_direction = 0;
                this.node_animation.stop();
                break;
            // case KeyCode.ARROW_UP:
            //         this.node_animation.stop();
        }
    }

    start() {
    }

    update(deltaTime: number) {
        this.node_rigid.linearVelocity = v2(this.node_movement_direction * this.movement_speed * deltaTime, this.node_rigid.linearVelocity.y);
        this.node_position.x += this.node_movement_direction * this.movement_speed * deltaTime;

    }

}


