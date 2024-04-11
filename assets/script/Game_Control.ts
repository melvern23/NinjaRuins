import { _decorator, CCInteger, Component, EventKeyboard, Input, input, KeyCode, Node, Vec3, Animation, RigidBody2D, v2, director, Collider2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Game_Control')
export class Game_Control extends Component {
    @property({type:Node})boy_player:Node;
    @property({type:Node})girl_player:Node;
    @property({type: Node}) monster1 : Node;
    @property({type:CCInteger})movement_speed;
    @property({type:CCInteger})jump_height;

    go_left : number = -1;
    go_right: number = 1;

    boy_movement_direction = 0;
    boy_position = new Vec3(-540,-140,0);
    boy_animation : Animation;
    boy_rigid : RigidBody2D;
    boy_collider : Collider2D;
    boy_jumped : boolean;

    girl_movement_direction = 0;
    girl_position = new Vec3(-470,-140,0);
    girl_animation : Animation;
    girl_rigid : RigidBody2D;
    girl_collider : Collider2D;
    
    enemy_speed :number = 500;
    monster1_direction = 0;
    monster1_position = new Vec3(280,-140,0);
    monster1_collide:Collider2D;
    monster1_rigid:RigidBody2D;
    monster1_animation:Animation;

    onLoad(){
        input.on(Input.EventType.KEY_DOWN,this.onKeyDown,this);
        input.on(Input.EventType.KEY_UP,this.onKeyUp,this);

        this.movement_speed = 500;
        this.jump_height = 15000;

        this.boy_animation = this.boy_player.getComponent(Animation);
        this.boy_rigid = this.boy_player.getComponent(RigidBody2D);
        this.boy_collider = this.boy_player.getComponent(Collider2D);
        //this.boy_jumped = false;

        this.girl_animation = this.girl_player.getComponent(Animation);
        this.girl_rigid = this.girl_player.getComponent(RigidBody2D);
        this.girl_collider = this.girl_player.getComponent(Collider2D);

        this.monster1.setPosition(this.monster1_position);
        this.monster1_animation = this.monster1.getComponent(Animation);
        this.monster1_collide = this.monster1.getComponent(Collider2D);
        this.monster1_rigid = this.monster1.getComponent(RigidBody2D);
    }
    onKeyDown(event: EventKeyboard){
        switch(event.keyCode){
            //boy movement
            case KeyCode.KEY_A:
                this.boy_movement_direction = this.go_left;
                this.boy_animation.play('boy_back');
                break;
            case KeyCode.KEY_D:
                //this.checkCollision();
                // if(this.boy_movement_direction === 0 ){
                //     this.boy_animation.stop;
                //     return;
                // }
                this.boy_movement_direction = this.go_right;
                this.boy_animation.play('boy_run');
                break;
            case KeyCode.KEY_W:
                if(this.boy_position.y <= -140){
                    this.boy_animation.play('boy_jump');
                    this.boy_rigid.applyForceToCenter(v2(0,this.jump_height),true); // membuat player bisa lompat dengan parameter y = this.jump_height
                    //this.boy_jumped = true;
                }
                break;

            // girl movement
            case KeyCode.ARROW_LEFT:
                this.girl_movement_direction = this.go_left;
                this.girl_animation.play('girl_back');
            break;
            case KeyCode.ARROW_RIGHT:
                this.girl_movement_direction = this.go_right;
                this.girl_animation.play('girl_run');
                break;
            case KeyCode.ARROW_UP:
                if(this.girl_position.y <= -140){
                    this.girl_animation.play('girl_jump');
                    this.girl_rigid.applyForceToCenter(v2(0,this.jump_height),true); // membuat player bisa lompat dengan parameter y = this.jump_height
                }
                break;            
        }
    }
    onKeyUp(event: EventKeyboard){
        switch(event.keyCode){
            //boy movement
            case KeyCode.KEY_A:
            case KeyCode.KEY_D:                 
                this.boy_movement_direction = 0;
                this.boy_animation.stop();
                break;
            // case KeyCode.KEY_W:
            //     this.boy_animation.stop();
            //     this.boy_jumped = false;

            //girl movement
            case KeyCode.ARROW_LEFT:
            case KeyCode.ARROW_RIGHT: 
                this.girl_movement_direction = 0;
                this.boy_animation.stop();
                break;
            // case KeyCode.ARROW_UP:
            //         this.boy_animation.stop();
        }
    }

    // checkCollision(){ // collision agar sesama player tidak menabrak
    //     if(this.boy_collider && this.girl_collider){
    //         let boyBox = this.boy_collider.worldAABB;
    //         let girlBox = this.boy_collider.worldAABB;
    //         if(boyBox.intersects(girlBox)) {
    //             this.boy_movement_direction = 0;
    //         }
    //     }
    // }

    start() {

    }

    update(deltaTime: number) {

        this.boy_rigid.linearVelocity = v2(this.boy_movement_direction * this.movement_speed * deltaTime, this.boy_rigid.linearVelocity.y);
        this.boy_position.x += this.boy_movement_direction * this.movement_speed * deltaTime;

        this.girl_rigid.linearVelocity = v2(this.girl_movement_direction * this.movement_speed * deltaTime, this.girl_rigid.linearVelocity.y);
        this.girl_position.x += this.girl_movement_direction * this.movement_speed * deltaTime;

        this.monster1_rigid.linearVelocity = v2(this.monster1_direction * this.enemy_speed * deltaTime, this.monster1_rigid.linearVelocity.y);
        this.monster1_position.x += this.monster1_direction * this.enemy_speed * deltaTime;

        if((this.boy_position.x >= -250 && this.boy_position.y <=-140)||(this.girl_position.x >= -250 && this.girl_position.y <=-140)){
            this.monster1_direction = this.go_left;
        }

    }

    enemyTrigger(){
        
    }
}


