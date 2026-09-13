# rnadow.top · rnadow 的小站

rnadow 的个人博客 —— 纯手写 HTML / CSS / JS 的静态站点，**零依赖、零构建**，
可一键部署到 Cloudflare Pages 或 GitHub Pages。

线上地址：<https://rnadow.top>

## 目录结构

```
rnadow-blog/
├── index.html            # 首页（文章列表 + 关于）
├── style.css             # 全站样式（含深色 / 浅色主题变量）
├── script.js             # 主题切换、搜索、标签过滤、阅读进度条
├── 404.html              # 404 页面（自包含样式，任意路径下都能正常显示）
├── feed.xml              # RSS 订阅源（发新文章后手动加一条 <item>）
├── sitemap.xml           # 站点地图
├── robots.txt
├── og-image.png          # 社交分享预览图（1280×640，og:image / GitHub Social preview 共用）
├── og.html               # 预览图生成源文件：本地打开 → 视口设为 1280×640 → 截图即可重新生成
└── posts/                # 文章页，每篇文章一个目录（URL 干净）
    ├── deploy-blog-on-cloudflare-pages/index.html
    ├── css-container-queries-in-practice/index.html
    ├── 2026-h1-reading-list/index.html
    ├── build-home-nas-guide/index.html
    ├── javascript-memory-leaks/index.html
    └── hello-world-first-post/index.html
```

## 本地预览

浏览器出于安全策略对 `file://` 协议有诸多限制，建议起一个本地静态服务器：

```bash
# Python
python -m http.server 8080
# 或 Node
npx serve .
```

然后访问 <http://localhost:8080>。

## 如何发布新文章

1. 在 `posts/` 下新建目录（英文小写 kebab-case），如 `posts/my-new-post/index.html`；
2. 复制任意一篇现有文章页作为模板，替换标题、日期、标签和正文；
3. 更新 `index.html`：在文章列表最上方插入对应的 `<article class="post-card">` 卡片；
4. 在 `feed.xml` 与 `sitemap.xml` 里各加一条记录；
5. `git push`，平台自动重新部署。

## 部署方式一：Cloudflare Pages（推荐）

1. 把本目录推送到 GitHub（或 GitLab）仓库；
2. 登录 Cloudflare Dashboard → **Workers & Pages → Create → Pages → Connect to Git**，选择仓库；
3. 构建配置：Framework preset 选 **None**，Build command **留空**，输出目录填 **`/`**；
4. 部署完成后会得到 `xxx.pages.dev` 的临时域名；
5. 项目 → **Custom domains → Set up a custom domain**，输入 `rnadow.top`：
   - 域名 DNS 已托管在 Cloudflare：一键绑定，自动创建 CNAME；
   - 托管在别家：到注册商添加 CNAME 记录 `rnadow.top → xxx.pages.dev`（根域名需支持 CNAME 扁平化）；
6. HTTPS 证书自动签发，无需任何操作。

> 详细过程见站内文章《用 Cloudflare Pages 五分钟部署你的个人博客》。

## 部署方式二：GitHub Pages

1. 新建仓库：
   - 想用 `https://<用户名>.github.io` 作主域 → 仓库名必须是 `<用户名>.github.io`；
   - 只打算绑定 rnadow.top → 仓库名随意（如 `rnadow.top`）；
2. 推送本目录全部文件：

   ```bash
   git init
   git add .
   git commit -m "init: 博客第一版"
   git branch -M main
   git remote add origin https://github.com/<用户名>/<仓库名>.git
   git push -u origin main
   ```

3. 仓库 → **Settings → Pages → Build and deployment**，Source 选 **Deploy from a branch**，Branch 选 `main` / `(root)`；
4. 同页 **Custom domain** 填 `rnadow.top` 并保存，然后在仓库根目录创建 `CNAME` 文件（内容一行：`rnadow.top`）并提交；
5. 到域名注册商配置 DNS（二选一或都配）：
   - 裸域：添加 4 条 A 记录指向 GitHub Pages：
     `185.199.108.153`、`185.199.109.153`、`185.199.110.153`、`185.199.111.153`
   - www：添加 CNAME 记录指向 `<用户名>.github.io`
6. 回到 Pages 设置，等证书签发后勾选 **Enforce HTTPS**。

## 部署方式三：不经过 Git，直接上传

Cloudflare Pages 也支持 Direct Upload：`npx wrangler pages deploy .`，或把文件夹直接拖进
Dashboard 的 Upload assets 入口，适合不想碰 Git 的场景。

## 部署之后检查清单

- [ ] 访问 `https://rnadow.top/` 首页正常，深浅色切换正常
- [ ] 随机点开一篇文章，样式与上下篇导航正常
- [ ] `https://rnadow.top/feed.xml` 能输出 RSS XML
- [ ] 访问一个不存在的路径，能看到 404 页
- [ ] 手机打开检查移动端布局
- [ ] Google / Bing 站长平台提交 `sitemap.xml`
- [ ] GitHub 仓库 → Settings → General → Social preview → Edit → 上传 `og-image.png`
      （此图只能手动上传，不会随 git 推送生效；尺寸 1280×640，小于 1MB，符合要求）

---

© 2026 rnadow · rnadow.top · 由热爱驱动
