import { _decorator, AudioSource, Button, Component, director, Label, Node, } from 'cc';
import { Sound_Control } from './Sound_Control';
const { ccclass, property } = _decorator;

@ccclass('Home')
export class Home extends Component {
    @property({ type : Button }) startButton : Button;
    @property({ type : Node }) boy : Node ;
    @property({ type : Node }) girl : Node ;
    @property({ type : Button }) creditButton : Button;
    @property({ type : Node }) credit : Node;
    @property({ type : Label }) assetLabel : Label;
    @property({ type : Node }) monster1 : Node;
    @property({ type : Node }) monster2 : Node;
    @property({ type : Button }) backButton : Button;
    @property({ type: AudioSource }) homeMusic : AudioSource;
    

    onLoad(){
        this.credit.active = false;
        this.assetLabel.node.active = false;
        this.monster1.active = false;
        this.monster2.active = false;
        this.backButton.node.active = false;
        this.startButton.node.on(Button.EventType.CLICK,this.startClicked,this);
        this.creditButton.node.on(Button.EventType.CLICK,this.creditClicked,this);
        this.backButton.node.on(Button.EventType.CLICK,this.backClicked,this);
        this.setVolume(this.homeMusic, 0.6);
    }
    start() {
        this.homeMusic.play()
    }

    setVolume(audioSource: AudioSource, volume: number){
        if(audioSource){
            audioSource.volume = volume ;
        }
    }

    update(deltaTime: number) {
        
    }

    startClicked(button: Button){
        //director.resume();
        director.loadScene("Stage1");
    }

    creditClicked(button : Button){
        this.credit.active = true;
        this.assetLabel.node.active = true;
        this.monster1.active = true;
        this.monster2.active = true;
        this.backButton.node.active = true;
    }

    backClicked(button : Button){
        this.credit.active = false;
        this.assetLabel.node.active = false;
        this.monster1.active = false;
        this.monster2.active = false;
        this.backButton.node.active = false;
    }
}


