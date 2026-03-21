// 红尘灵境 3D建筑模型数据
// 无需安装，直接浏览器运行

const buildingModels = {
    // 灵槎津渡 - 新手引导入口
    "lingcha_jindu": {
        name: "灵槎津渡",
        description: "《博物志》通天之筏，接引之地",
        function: "新手引导，初入灵境",
        geometry: {
            type: "gate",
            width: 4,
            height: 6,
            depth: 1,
            color: 0x4CAF50
        },
        position: { x: -15, y: 3, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
    },
    
    // 琅嬛福地 - 技能图书馆
    "langhuan_fudi": {
        name: "琅嬛福地",
        description: "《琅嬛记》天帝藏书，修行圣地",
        function: "技能图书馆，学习知识",
        geometry: {
            type: "library",
            width: 6,
            height: 4,
            depth: 8,
            color: 0x2196F3
        },
        position: { x: -10, y: 2, z: 12 },
        rotation: { x: 0, y: 0, z: 0 }
    },
    
    // 考工实训庐 - 技能实操练习场
    "kaogong_shixunlu": {
        name: "考工实训庐",
        description: "《考工记》工匠考核，研学之所",
        function: "技能实操练习场",
        geometry: {
            type: "workshop",
            radiusTop: 1.5,
            radiusBottom: 2,
            height: 4,
            color: 0xFF9800
        },
        position: { x: 10, y: 2, z: 12 },
        rotation: { x: 0, y: 0, z: 0 }
    },
    
    // 百炼鉴心台 - 技能考证中心
    "bailian_jianxintai": {
        name: "百炼鉴心台",
        description: "百炼成钢，明镜鉴心",
        function: "技能考证，官方证书",
        geometry: {
            type: "platform",
            width: 8,
            height: 1,
            depth: 8,
            color: 0xF44336
        },
        position: { x: 15, y: 0.5, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
    },
    
    // 天工开物坊 - AI创作工具
    "tiangong_kaiwufang": {
        name: "天工开物坊",
        description: "《天工开物》巧夺天工，创造万物",
        function: "上传原创技能，AI帮你成书",
        geometry: {
            type: "workshop",
            radiusTop: 2,
            radiusBottom: 2.5,
            height: 5,
            color: 0x9C27B0
        },
        position: { x: 10, y: 2.5, z: -12 },
        rotation: { x: 0, y: 0, z: 0 }
    },
    
    // 神机枢阁 - AI算法中心
    "shenji_shuge": {
        name: "神机枢阁",
        description: "《阴符经》神妙玄机，中枢之阁",
        function: "AI工具库，素材和算法中心",
        geometry: {
            type: "tower",
            radius: 1.2,
            height: 8,
            color: 0x00BCD4
        },
        position: { x: -5, y: 4, z: -15 },
        rotation: { x: 0, y: 0, z: 0 }
    },
    
    // 群贤毕至堂 - 社区治理
    "qunxian_bizhitang": {
        name: "群贤毕至堂",
        description: "《兰亭集序》贤士聚集，共商大事",
        function: "社区投票，提议案，定规则",
        geometry: {
            type: "hall",
            width: 8,
            height: 3,
            depth: 10,
            color: 0x8BC34A
        },
        position: { x: -15, y: 1.5, z: -10 },
        rotation: { x: 0, y: Math.PI/4, z: 0 }
    },
    
    // 荣光麟阁 - 荣誉殿堂
    "rongguang_linge": {
        name: "荣光麟阁",
        description: "《汉书》麒麟阁，荣光永驻",
        function: "牛人排行榜，荣誉徽章墙",
        geometry: {
            type: "tower",
            radius: 1.5,
            height: 10,
            color: 0xFFC107
        },
        position: { x: 0, y: 5, z: 15 },
        rotation: { x: 0, y: 0, z: 0 }
    },
    
    // 青鸟星驿 - 时空通信
    "qingniao_xingyi": {
        name: "青鸟星驿",
        description: "《山海经》青鸟信使，星际驿站",
        function: "给古人/未来写信，收集邮票",
        geometry: {
            type: "gate",
            width: 3,
            height: 5,
            depth: 1,
            color: 0x607D8B
        },
        position: { x: 15, y: 2.5, z: -5 },
        rotation: { x: 0, y: Math.PI/2, z: 0 }
    },
    
    // 两仪墟市 - 社交市场
    "liangyi_xushi": {
        name: "两仪墟市",
        description: "《周易》阴阳两仪，昼夜墟市",
        function: "白天聊技能，晚上玩异能",
        geometry: {
            type: "market",
            width: 6,
            height: 3,
            depth: 6,
            color: 0x795548
        },
        position: { x: -5, y: 1.5, z: 5 },
        rotation: { x: 0, y: 0, z: 0 }
    },
    
    // 万象璇玑阁 - 资源对接中心
    "wanxiang_xuanjige": {
        name: "万象璇玑阁",
        description: "北斗璇玑，包罗万象",
        function: "资源对接中心，找合作、拉赞助",
        geometry: {
            type: "tower",
            radius: 1.8,
            height: 12,
            color: 0x3F51B5
        },
        position: { x: 5, y: 6, z: -8 },
        rotation: { x: 0, y: Math.PI/6, z: 0 }
    },
    
    // 泉府通衢 - 经济交易
    "quanfu_tongqu": {
        name: "泉府通衢",
        description: "《周礼》泉府掌财，通衢流通",
        function: "技能作品买卖，虚拟资产交易",
        geometry: {
            type: "market",
            width: 7,
            height: 3.5,
            depth: 7,
            color: 0xE91E63
        },
        position: { x: 8, y: 1.75, z: 8 },
        rotation: { x: 0, y: Math.PI/8, z: 0 }
    },
    
    // 芥子藏虚 - 个人空间
    "jiezi_cangxu": {
        name: "芥子藏虚",
        description: "佛家“芥子纳须弥”",
        function: "我的个人主页，展示一切",
        geometry: {
            type: "house",
            width: 3,
            height: 4,
            depth: 3,
            color: 0x009688
        },
        position: { x: -12, y: 2, z: 5 },
        rotation: { x: 0, y: Math.PI/3, z: 0 }
    },
    
    // 星枢问道台 - 赛季挑战
    "xingshu_wendaotai": {
        name: "星枢问道台",
        description: "北斗星枢，问道精进",
        function: "赛季挑战，冲榜拿大奖",
        geometry: {
            type: "platform",
            width: 10,
            height: 0.8,
            depth: 10,
            color: 0xCDDC39
        },
        position: { x: -8, y: 0.4, z: -5 },
        rotation: { x: 0, y: Math.PI/4, z: 0 }
    }
};

// Three.js建筑创建函数
function createBuilding(scene, buildingData) {
    let geometry;
    let material;
    
    // 根据建筑类型创建不同的几何体
    switch(buildingData.geometry.type) {
        case 'gate':
            geometry = new THREE.BoxGeometry(
                buildingData.geometry.width,
                buildingData.geometry.height,
                buildingData.geometry.depth
            );
            break;
            
        case 'library':
            geometry = new THREE.BoxGeometry(
                buildingData.geometry.width,
                buildingData.geometry.height,
                buildingData.geometry.depth
            );
            break;
            
        case 'workshop':
            geometry = new THREE.CylinderGeometry(
                buildingData.geometry.radiusTop,
                buildingData.geometry.radiusBottom,
                buildingData.geometry.height,
                8
            );
            break;
            
        case 'platform':
            geometry = new THREE.BoxGeometry(
                buildingData.geometry.width,
                buildingData.geometry.height,
                buildingData.geometry.depth
            );
            break;
            
        case 'tower':
            geometry = new THREE.CylinderGeometry(
                buildingData.geometry.radius,
                buildingData.geometry.radius,
                buildingData.geometry.height,
                12
            );
            break;
            
        case 'hall':
            geometry = new THREE.BoxGeometry(
                buildingData.geometry.width,
                buildingData.geometry.height,
                buildingData.geometry.depth
            );
            break;
            
        case 'market':
            geometry = new THREE.BoxGeometry(
                buildingData.geometry.width,
                buildingData.geometry.height,
                buildingData.geometry.depth
            );
            break;
            
        case 'house':
            geometry = new THREE.BoxGeometry(
                buildingData.geometry.width,
                buildingData.geometry.height,
                buildingData.geometry.depth
            );
            break;
            
        default:
            geometry = new THREE.BoxGeometry(3, 3, 3);
    }
    
    // 创建材质
    material = new THREE.MeshStandardMaterial({
        color: buildingData.geometry.color,
        roughness: 0.7,
        metalness: 0.3,
        emissive: buildingData.geometry.color,
        emissiveIntensity: 0.1
    });
    
    // 创建网格
    const mesh = new THREE.Mesh(geometry, material);
    
    // 设置位置
    mesh.position.set(
        buildingData.position.x,
        buildingData.position.y,
        buildingData.position.z
    );
    
    // 设置旋转
    mesh.rotation.set(
        buildingData.rotation.x,
        buildingData.rotation.y,
        buildingData.rotation.z
    );
    
    // 添加用户数据
    mesh.userData = {
        buildingId: buildingData.geometry.type + "_" + Object.keys(buildingModels).indexOf(Object.keys(buildingModels).find(key => buildingModels[key] === buildingData)),
        name: buildingData.name,
        description: buildingData.description,
        function: buildingData.function
    };
    
    // 添加到场景
    scene.add(mesh);
    
    return mesh;
}

// 创建所有建筑
function createAllBuildings(scene) {
    const buildings = [];
    
    for (const key in buildingModels) {
        const buildingMesh = createBuilding(scene, buildingModels[key]);
        buildings.push(buildingMesh);
    }
    
    return buildings;
}

// 获取建筑信息HTML
function getBuildingInfoHTML(buildingData) {
    return `
        <div class="building-info-card">
            <h3>${buildingData.name}</h3>
            <p><strong>功能寓意：</strong>${buildingData.description}</p>
            <p><strong>用户功能：</strong>${buildingData.function}</p>
            <p><strong>建筑类型：</strong>${buildingData.geometry.type}</p>
            <p><strong>技术阶段：</strong>阶段1 - 轻量3D期</p>
        </div>
    `;
}

// 建筑交互处理
function handleBuildingClick(buildingMesh, camera, controls) {
    // 摄像机移动到建筑
    const targetPosition = buildingMesh.position.clone();
    targetPosition.y += 5;
    targetPosition.z += 8;
    
    // 平滑移动相机
    gsap.to(camera.position, {
        x: targetPosition.x,
        y: targetPosition.y,
        z: targetPosition.z,
        duration: 1,
        ease: "power2.out"
    });
    
    // 显示建筑信息
    showBuildingInfo(buildingMesh.userData);
}

// 显示建筑信息
function showBuildingInfo(buildingInfo) {
    // 创建信息面板
    const infoPanel = document.createElement('div');
    infoPanel.className = 'building-info-panel';
    infoPanel.innerHTML = `
        <div class="info-content">
            <button class="close-btn" onclick="this.parentElement.parentElement.remove()">×</button>
            <h2>${buildingInfo.name}</h2>
            <p><strong>建筑ID：</strong>${buildingInfo.buildingId}</p>
            <p><strong>功能描述：</strong>${buildingInfo.description}</p>
            <p><strong>用户功能：</strong>${buildingInfo.function}</p>
            <p><strong>技术阶段：</strong>阶段1 - 轻量3D期</p>
            <p><strong>状态：</strong>已实现3D预览</p>
        </div>
    `;
    
    // 添加到页面
    document.body.appendChild(infoPanel);
    
    // 3秒后自动关闭
    setTimeout(() => {
        if (infoPanel.parentElement) {
            infoPanel.remove();
        }
    }, 5000);
}

// 导出函数供外部使用
if (typeof window !== 'undefined') {
    window.buildingModels = buildingModels;
    window.createBuilding = createBuilding;
    window.createAllBuildings = createAllBuildings;
    window.getBuildingInfoHTML = getBuildingInfoHTML;
    window.handleBuildingClick = handleBuildingClick;
    window.showBuildingInfo = showBuildingInfo;
}

console.log('红尘灵境3D建筑模型数据已加载！');
console.log('共包含 ' + Object.keys(buildingModels).length + ' 座建筑模型');
console.log('直接使用 createAllBuildings(scene) 创建所有建筑');