import { _decorator, Component, misc, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CameraMovement')
export class CameraMovement extends Component {

    @property({type:Node})BoyPlayer:Node;
    @property({type:Node})GirlPlayer:Node;

    start() {

    }

    update(deltaTime: number) {
        let boy_position = this.BoyPlayer.getPosition();
        let girl_position = this.GirlPlayer.getPosition();
        let cam_position = this.node.getPosition();
        cam_position.lerp(boy_position, 0.1);
        cam_position.y = misc.clampf(boy_position.y,0,220);
        this.node.setPosition(cam_position);
    }
}


