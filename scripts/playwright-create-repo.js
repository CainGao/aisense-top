const { chromium } = require('playwright');

(async () => {
  console.log('🚀 开始使用Playwright自动化创建GitHub仓库...');

  try {
    // 启动非无头Chrome（可以看到浏览器操作）
    console.log('🔧 启动Chrome浏览器...');
    const browser = await chromium.launch({
      headless: false,
      slowMo: 100 // 慢速操作，便于观察
    });

    console.log('✅ Chrome已启动');

    const context = await browser.newContext();
    const page = await context.newPage();

    // 访问GitHub新建仓库页面
    console.log('📖 访问GitHub新建仓库页面...');
    await page.goto('https://github.com/new', { waitUntil: 'networkidle' });

    // 填写仓库名称
    console.log('✏️ 填写仓库名称：aisense-top');
    await page.fill('input[name="repository[name]"]', 'aisense-top');

    // 选择公开（Public）
    console.log('👁 选择可见性：Public');
    await page.click('input[name="repository[public]"]');

    // 等待页面更新
    await page.waitForTimeout(1000);

    // 截图保存
    console.log('📸 保存截图...');
    await page.screenshot({ path: '/Users/caingao/aisense-top/screenshots/github-create-step1.png' });

    // 提交表单
    console.log('📤 提交表单...');
    await page.click('button[type="submit"]');

    // 等待跳转到仓库页面
    console.log('⏳ 等待仓库创建完成...');
    try {
      await page.waitForURL('**/CainGao/aisense-top', { timeout: 30000 });
      console.log('✅ 仓库创建成功！');
      console.log('🌐 仓库地址：https://github.com/CainGao/aisense-top');
    } catch (error) {
      console.log('⚠️ 仓库创建可能失败，请手动确认...');
    }

    // 最终截图
    console.log('📸 保存最终截图...');
    await page.screenshot({ path: '/Users/caingao/aisense-top/screenshots/github-create-final.png' });

    await context.close();
    await browser.close();

    console.log('');
    console.log('🎉 自动化操作完成！');
    console.log('📋 下一步操作：');
    console.log('1. 请检查仓库是否创建成功：https://github.com/CainGao/aisense-top');
    console.log('2. 如果创建成功，告诉我："仓库创建成功"');
    console.log('3. 我会立即推送代码并配置Vercel部署');

  } catch (error) {
    console.error('❌ 自动化操作失败:', error.message);
    console.log('');
    console.log('💡 请手动操作：');
    console.log('1. 访问：https://github.com/CainGao/new');
    console.log('2. 仓库名称：aisense-top');
    console.log('3. 可见性：Public');
    console.log('4. 不要勾选任何初始化选项');
    console.log('5. 点击"Create repository"');
    console.log('');
    console.log('创建完成后，告诉我："仓库创建成功"');
  }

})();
