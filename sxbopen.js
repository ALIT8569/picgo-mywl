const express = require('express');
const app = express();
const PORT = 3000;

// 全部激活码硬编码写在此处
const CODE_LIST = [
    "ABC001",
    "ABC002",
    "ABC003",
    "ABC004",
    "ABC005",
    "ABC006"
];

// 内存变量，记录已经分发出去的激活码，重启服务就清空
let usedInMemory = [];

// 跨域允许小程序请求
app.use((req, res, next) => {
    res.setHeader("Access‑Control‑Allow‑Origin", "*");
    next();
});

app.get('/getRandomCode', (req, res) => {
    // 过滤剩余未发放
    const remainCodes = CODE_LIST.filter(code => !usedInMemory.includes(code));

    if (remainCodes.length === 0) {
        return res.json({
            ok: false,
            msg: "激活码全部发放完毕"
        });
    }

    // 随机选一个
    const randomIdx = Math.floor(Math.random() * remainCodes.length);
    const pickCode = remainCodes[randomIdx];

    // 内存标记已发放，不写磁盘
    usedInMemory.push(pickCode);

    res.json({
        ok: true,
        code: pickCode
    });
});

app.listen(PORT, () => {
    console.log(`服务启动，端口 ${PORT}`);
});
