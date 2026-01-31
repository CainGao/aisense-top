const { chromium } = require('playwright');

(async () => {
  console.log('🚀 开始自动化创建GitHub仓库...');

  try {
    // 方案A：尝试连接到系统的Chrome（远程调试端口）
    // 需要先启动Chrome时启用远程调试：Chrome --remote-debugging-port=9222
    try {
      console.log('🔧 尝试连接到系统的Chrome...');
      const browser = await chromium.connectOverCDP('http://localhost:9222');
      console.log('✅ 已连接到系统的Chrome');

      const context = await browser.newContext();
      const page = await context.newPage();

      // 访问GitHub新建仓库页面
      console.log('📖 访问GitHub新建仓库页面...');
      await page.goto('https://github.com/new');

      // 等待页面加载
      await page.waitForLoadState('networkidle');

      // 截图
      await page.screenshot({ path: 'github-create-page.png' });
      console.log('✅ 页面已截图：github-create-page.png');

      await context.close();
      await browser.close();
      console.log('✅ 浏览器已关闭');

    } catch (error) {
      console.log('❌ 连接到系统的Chrome失败:', error.message);
      console.log('💡 尝试方案B：使用系统的浏览器...');

      // 方案B：使用系统的默认浏览器
      console.log('💡 请在已经打开的Chrome浏览器中手动创建仓库...');
      console.log('📋 操作步骤：');
      console.log('1. 仓库名称：aisense-top');
      console.log('2. 可见性：Public');
      console.log('3. 初始化：不要勾选任何选项（已初始化）');
      console.log('4. 点击"Create repository"');
      console.log('');
      console.log('🚀 创建完成后，请告诉我："仓库创建成功"');
    }

  } catch (error) {
    console.error('❌ 自动化操作失败:', error);
    console.log('💡 请手动在已打开的Chrome浏览器中创建仓库');
  }

})();
