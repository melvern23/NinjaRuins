import { _decorator, Component, Node, Vec3, Label, ParticleSystem2D, Button, director, AudioSource } from 'cc';
let { ccclass, property } = _decorator;
import { Player } from './Player';
import { Enemies_Control } from './Enemies_Control';

@ccclass('Game_Control')
export class Game_Control extends Component {
    @property({ type: Player }) PlayerBoy: Player;
    @property({ type: Player }) PlayerGirl: Player;
    @property({ type: Enemies_Control }) monster: Enemies_Control;
    @property({ type: Label }) boy_label: Label ;
    @property({ type: Label }) girl_label: Label ;
    @property({ type: Node }) exit_gate: Node ;
    @property({ type: Node }) fences1: Node ;
    @property({ type: Node }) fences2: Node ;
    @property({ type: Node }) popUpGameOver: Node;
    @property({ type: Button }) RetryButton: Button;
    @property({ type: Label }) boy_win: Label ;
    @property({ type: Label }) girl_win: Label ;
    @property({ type: AudioSource }) gameMusic : AudioSource;

    exit_effect: ParticleSystem2D;
    exit_position = new Vec3(2970, -140, 0);

    onLoad() {
        if (!this.PlayerBoy) {
            console.error("Boy is not assigned in the inspector");
            return;
        }
        if (!this.PlayerGirl) {
            console.error("Girl is not assigned in the inspector");
            return;
        }
        if (!this.monster) {
            console.error("Monster is not assigned in the inspector");
            return;
        }
        if (!this.exit_gate) {
            console.error("Gate is not assigned in the inspector");
            return;
        }
        if (!this.fences1) {
            console.error("Fences1 is not assigned in the inspector");
            return;
        }
        if (!this.fences2) {
            console.error("Fences2 is not assigned in the inspector");
            return;
        }

        this.boy_label.node.active = false;
        this.girl_label.node.active = false;
        this.girl_win.node.active = false;
        this.boy_win.node.active = false;
        this.showLabel();
        this.fences1.active = false;
        this.fences2.active = false;
        this.popUpGameOver.active = false;
        this.exit_effect = new ParticleSystem2D();
        this.setVolume(this.gameMusic, 0.6);
        console.log("onLoad completed successfully");
    }
    setVolume(gameMusic: AudioSource, arg1: number) {
        this.gameMusic.volume = arg1;
    }

    start() {
        this.gameMusic.play();
    }

    update(deltaTime: number) {
        this.showfences();
        this.gameOver();
        this.checkWinCondition();
    }

    showLabel() {
        this.boy_label.node.active = true;
        this.girl_label.node.active = true;
        this.scheduleOnce(() => {
            this.boy_label.node.active = false;
            this.girl_label.node.active = false;
        }, 3);
    }

    showfences() {
        let boyPos = this.PlayerBoy.node.getPosition();
        let girlPos = this.PlayerGirl.node.getPosition();
        let fencePos1 = this.fences1.getPosition();
        let fencePos2 = this.fences2.getPosition();
        let threshold = 100; // Define a suitable distance threshold

        if (this.PlayerBoy && this.PlayerGirl && this.fences1) {
            let boydistance = boyPos.subtract(fencePos1).length();
            let girldistance = girlPos.subtract(fencePos1).length();
            if (boydistance < threshold || girldistance < threshold) {
                this.fences1.active = true;
                console.log("Fence1 is now active");
            } else {
                this.fences1.active = false;
            }
        } else {
            console.error("PlayerBoy or fences1 is not assigned");
        }

        if (this.PlayerBoy && this.PlayerGirl && this.fences2) {
            let boydistance = boyPos.subtract(fencePos2).length();
            let girldistance = girlPos.subtract(fencePos2).length();
            if (boydistance < threshold || girldistance < threshold) {
                this.fences2.active = true;
                console.log("Fence2 is now active");
            } else {
                this.fences2.active = false;
            }
        } else {
            console.error("PlayerBoy or fences2 is not assigned");
        }
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
        // director.resume();
        director.loadScene("Stage1");
    }

    checkWinCondition() {
        let boyPos = this.PlayerBoy.node.getPosition();
        let girlPos = this.PlayerGirl.node.getPosition();

        if (boyPos.x > 1700) {
            this.boy_win.node.active = true;
            this.scheduleOnce(() => {
                this.boy_win.node.active = false;
                director.loadScene("Stage2");
            }, 3);
        }

        if (girlPos.x > 1700) {
            this.girl_win.node.active = true;
            this.scheduleOnce(() => {
                this.girl_win.node.active = false;
                director.loadScene("Stage2");
            }, 3);
        }
    }
}
