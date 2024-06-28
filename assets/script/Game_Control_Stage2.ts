import { _decorator, Button, Collider2D, Component, Contact2DType, director, instantiate, IPhysics2DContact, Label, Node, Prefab, randomRangeInt } from 'cc';
import { Player } from './Player';
import { GroupKunai } from './GroupKunai';
const { ccclass, property } = _decorator;

@ccclass('Game_Control_Stage2')
export class Game_Control_Stage2 extends Component {
    @property({ type: Player }) PlayerBoy: Player;
    @property({ type: Player }) PlayerGirl: Player;
    @property({ type: Node }) popUpGameOver: Node;
    @property({ type: Button }) RetryButton: Button;
    @property({ type: Label }) boy_win : Label;
    @property({ type: Label }) girl_win : Label;
    @property({ type: Prefab }) groupKunai : Prefab;

    private listKunaiActive:Node[] =[];
    private poolObstacle:Node[] = [];
    private baseY:number = 0;

    onLoad(){
        this.popUpGameOver.active = false;
        this.boy_win.node.active = false;
        this.girl_win.node.active = false;
    }

    start() { 
        this.baseY = this.PlayerBoy.node_position.y+40;
        setInterval(()=>{
            this.generateKunai();
        },3000);
    }

    gameOver() {
        if (this.PlayerBoy.isCollide || this.PlayerGirl.isCollide) {
            if (this.PlayerBoy.node.getPosition().x > 640 || this.PlayerGirl.node.getPosition().x > 640) {
                this.popUpGameOver.setPosition(this.popUpGameOver.getPosition().x + 1280, 0, 0);
                this.popUpGameOver.active = true;
            }
            this.popUpGameOver.active = true;
            // director.pause();
            console.log("Gameover");
            this.RetryButton.node.on(Button.EventType.CLICK, this.retryClicked, this);
        }
    }

    retryClicked(button: Button) {
        director.loadScene("Stage2");
    }

    setStartPosition(){
        this.PlayerBoy.node_position.set()
        this.PlayerGirl.node_position.set();
    }

    getKunai():Node{
        if(this.poolObstacle.length > 0){
            return this.poolObstacle.shift();
        }else{
            instantiate(this.groupKunai);
        }
    }

    generateKunai(){
        let kunai1 = this.getKunai();
        kunai1.setParent(this.node);
        kunai1.getComponent(GroupKunai).setHeight(randomRangeInt(2,4),this.baseY);
        this.listKunaiActive.push(kunai1);
    }

    
    update(deltaTime: number) {
        
    }

}

