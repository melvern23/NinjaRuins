import { _decorator, Component, misc, Node, Vec3 } from 'cc';
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
        let midpoint = new Vec3(
            (boy_position.x + girl_position.x) / 2,
            (boy_position.y + girl_position.y) / 2,
            0
        ); // membuat midpoint

        let cam_position = this.node.position.clone();
        cam_position.y = misc.clampf(midpoint.y,0,0); // memaksimalkan dan meminimumkan posisi kamera di sumbu y
        cam_position.x = misc.clampf(midpoint.x,0,2560) // memaksimalkan dan meminimumkan posisi kamera di sumbu x
        cam_position.lerp(midpoint, 0.1); // memperlambat pergerakan camera ketika memenuhi posisi midpoint 
        this.node.setPosition(cam_position);
    }
}
