# zxy-space

个人简历展示站：zxy.vvlab.xyz

## 功能

- **六栏结构**：基本信息（带照片）、求职意向、教育经历、自我评价、工作经历、项目经历；横向按钮切换栏目，默认展示基本信息。
- **内容与样式分离**：文案在 `data/content.json` 维护，照片路径在 `data/photos.json` 维护。
- **多主题**：默认 / 深色 / 暖色 / 蓝色，右上角下拉切换，选择会持久化到本地。

## 目录结构

```
zxy/
├── index.html
├── css/
│   ├── main.css      # 布局与默认样式
│   └── themes.css    # 主题变量
├── js/
│   └── app.js        # 加载内容、栏目切换、主题切换
├── data/
│   ├── content.json  # 所有栏目文案（在此维护）
│   └── photos.json   # 照片路径（在此维护）
└── assets/
    └── photos/       # 照片文件放这里（如 avatar.jpg）
```

## 如何维护内容

1. **文案**：编辑 `data/content.json`，按现有字段增删改即可；各栏目结构见文件内注释或示例。
2. **照片**：
   - 把图片文件放到 `assets/photos/`（例如 `avatar.jpg`）。
   - 在 `data/photos.json` 里配置 key 与路径，例如 `"avatar": "assets/photos/avatar.jpg"`。
   - 在 `content.json` 的 `basicInfo.photo` 里填写 key（如 `"avatar"`），即使用该照片作为头像。

## 本地预览

因页面通过 `fetch` 加载 JSON，需用本地服务器打开，不能直接双击 `index.html`。在项目根目录执行：

```bash
# Python 3
python -m http.server 8080

# 或 npx
npx serve -l 8080
```

浏览器访问 `http://localhost:8080`。

## 部署

构建产物即当前静态文件，用任意静态服务器或 Nginx 托管根目录即可；K3s 部署时可将本目录打包为镜像（如 Nginx 镜像挂载静态文件）按 zxy.vvlab.xyz 对外提供。
