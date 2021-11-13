import * as THREE from './modules/three.module.js'

class App {
    // field와 method를 밑줄로 시작하는 이유는, private로 사용하기 위함이다.
    constructor() {
        const divContainer = document.querySelector("#webgl-container");
        this._divContainer = divContainer;

        const renderer = new THREE.WebGLRenderer({ antialias: true })

        // 보통은 1(100%), 노트북같은 경우에는 1.5(150%)로 설정되어있는 경우가 있음
        renderer.setPixelRatio(window.devicePixelRatio);
        divContainer?.appendChild(renderer.domElement);
        this._renderer = renderer;

        const scene = new THREE.Scene();
        this._scene = scene;

        this._setupCamera();
        this._setupLight();
        this._setupModel();

        window.onresize = this.resize.bind(this);
        this.resize();

        // window.requestAnimationFrame()은 브라우저에게 수행하기를 원하는 애니메이션을 알리고 
        // 다음 리페인트가 진행되기 전에 해당 애니메이션을 업데이트하는 함수를 호출하게 합니다. 
        // 이 메소드는 리페인트 이전에 실행할 콜백을 인자로 받습니다.
        requestAnimationFrame(this.render.bind(this))
    }

    _setupCamera() {
        const width = this._divContainer?.clientWidth;
        const height = this._divContainer?.clientHeight;
        const camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            100
        )
        camera.position.z = 2;
        this._camera = camera;
    }

    _setupLight() {
        const color = 0xffffff;
        const intensity = 1;
        // 광원 생성
        const light = new THREE.DirectionalLight(color, intensity);
        // 광원 위치 설정
        light.position.set(-1, 2, 4)
        this._scene.add(light)
    }

    _setupModel() {
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshPhongMaterial({ color: 0x44a88 })

        const cube = new THREE.Mesh(geometry, material);

        this._scene.add(cube);
        this._cube = cube;
    }

    resize() {
        const width = this._divContainer?.clientWidth;
        const height = this._divContainer?.clientHeight;

        this._camera.aspect = width / height;
        this._camera?.updateProjectionMatrix();

        this._renderer.setSize(width, height)
    }

    render(time) {
        this._renderer.render(this._scene, this._camera);
        this.update(time);
        requestAnimationFrame(this.render.bind(this))
    }

    update(time) {
        time *= 0.001;
        this._cube.rotation.x = time;
        this._cube.rotation.y = time;
    }
}

window.onload = function () {
    new App();
}