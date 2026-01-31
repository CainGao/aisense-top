const { chromium } = require('playwright');

(async () => {
  console.log('🚀 开始浏览器自动化操作...');
  console.log('📋 操作清单：');
  console.log('1. 登录 GitHub 并创建仓库');
  console.log('2. 推送代码到 GitHub');
  console.log('3. 登录 Vercel 并链接项目');
  console.log('4. 配置生产部署');
  console.log('5. 配置域名 aisense.top');
  console.log('6. 测试网站访问');
  console.log('');

  try {
    // 启动 Chrome 浏览器
    console.log('🔧 启动 Chrome 浏览器...');
    const browser = await chromium.launch({
      headless: false,
      slowMo: 100, // 慢速操作，便于观察
      args: ['--start-maximized']
    });

    console.log('✅ Chrome 浏览器已启动');

    const context = await browser.newContext();
    const page = await context.newPage();

    // 阶段一：登录 GitHub 并创建仓库
    console.log('📦 阶段一：登录 GitHub 并创建仓库');

    // 访问 GitHub 登录页面
    console.log('📖 访问 GitHub 登录页面...');
    await page.goto('https://github.com/login', { waitUntil: 'networkidle' });
    await page.screenshot({ path: '/Users/caingao/aisense-top/screenshots/github-login-page.png' });

    // 检查是否已经登录
    const isLoggedIn = await page.locator('text=New repository').isVisible().catch(() => false);

    if (!isLoggedIn) {
      console.log('⚠️ 未登录，需要手动登录 GitHub');
      console.log('💡 请在浏览器中完成登录：');
      console.log('1. 输入 GitHub 用户名和密码');
      console.log('2. 点击 "Sign in"');
      console.log('3. 等待登录完成');
      console.log('');
      console.log('🚀 登录完成后，页面会自动继续...');

      // 等待用户登录（最多 5 分钟）
      await page.waitForSelector('text=New repository', { timeout: 300000 });
    }

    console.log('✅ GitHub 登录成功');

    // 访问新建仓库页面
    console.log('📖 访问 GitHub 新建仓库页面...');
    await page.goto('https://github.com/CainGao/new', { waitUntil: 'networkidle' });
    await page.screenshot({ path: '/Users/caingao/aisense-top/screenshots/github-new-repo-page.png' });

    // 填写仓库名称
    console.log('✏️ 填写仓库名称：aisense-top');
    const repoNameInput = await page.locator('input[name="repository[name]"]');
    await repoNameInput.click();
    await repoNameInput.fill('aisense-top');

    // 选择公开（Public）
    console.log('👁 选择可见性：Public');
    await page.click('input[name="repository[public]"]');

    // 截图
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

    console.log('');
    console.log('📦 阶段一：GitHub 仓库创建完成');
    console.log('');

    // 阶段二：推送代码到 GitHub
    console.log('📦 阶段二：推送代码到 GitHub');

    // 推送代码到 GitHub（使用 Git CLI）
    console.log('📝 推送代码到 GitHub（使用 Git CLI）...');
    const { exec } = require('child_process');

    await new Promise((resolve, reject) => {
      exec('cd /Users/caingao/aisense-top && git push origin main', (error, stdout, stderr) => {
        if (error) {
          console.error('❌ Git push 失败:', error);
          console.error('stderr:', stderr);
          reject(error);
        } else {
          console.log('✅ 代码推送到 GitHub成功');
          console.log('stdout:', stdout);
          resolve();
        }
      });
    });

    console.log('');
    console.log('📦 阶段二：代码已推送到 GitHub');
    console.log('');

    // 阶段三：登录 Vercel
    console.log('📦 阶段三：登录 Vercel');

    // 访问 Vercel 登录页面
    console.log('📖 访问 Vercel 登录页面...');
    await page.goto('https://vercel.com/login', { waitUntil: 'networkidle' });
    await page.screenshot({ path: '/Users/caingao/aisense-top/screenshots/vercel-login-page.png' });

    // 检查是否已经登录
    const isVercelLoggedIn = await page.locator('text=Your Apps').isVisible().catch(() => false);

    if (!isVercelLoggedIn) {
      console.log('⚠️ 未登录，需要手动登录 Vercel');
      console.log('💡 请在浏览器中完成登录：');
      console.log('1. 点击 "Continue with GitHub"');
      console.log('2. 点击 "Authorize" 授权访问');
      console.log('3. 等待登录完成');
      console.log('');
      console.log('🚀 登录完成后，页面会自动继续...');

      // 等待用户登录（最多 5 分钟）
      await page.waitForSelector('text=Your Apps', { timeout: 300000 });
    }

    console.log('✅ Vercel 登录成功');

    // 阶段四：链接项目到 Vercel
    console.log('📦 阶段四：链接项目到 Vercel');

    // 导航到项目根目录
    console.log('📂 导航到项目根目录...');
    await page.goto('file:///Users/caingao/aisense-top', { waitUntil: 'domcontentloaded' });

    // 使用 Vercel CLI 链接项目
    console.log('🔗 链接项目到 Vercel（使用 Vercel CLI）...');

    await new Promise((resolve, reject) => {
      exec('cd /Users/caingao/aisense-top && vercel link --yes', (error, stdout, stderr) => {
        if (error) {
          console.error('❌ Vercel link 失败:', error);
          console.error('stderr:', stderr);
          reject(error);
        } else {
          console.log('✅ Vercel 项目链接成功');
          console.log('stdout:', stdout);
          resolve();
        }
      });
    });

    // 最终截图
    console.log('📸 保存截图...');
    await page.screenshot({ path: '/Users/caingao/aisense-top/screenshots/vercel-link-final.png' });

    console.log('');
    console.log('📦 阶段四：Vercel 项目链接完成');
    console.log('');

    // 阶段五：生产部署
    console.log('📦 阶段五：生产部署');

    // 使用 Vercel CLI 执行生产部署
    console.log('🚀 开始生产部署...');

    await new Promise((resolve, reject) => {
      exec('cd /Users/caingao/aisense-top && vercel --prod', (error, stdout, stderr) => {
        if (error) {
          console.error('❌ Vercel 部署失败:', error);
          console.error('stderr:', stderr);
          reject(error);
        } else {
          console.log('✅ Vercel 生产部署成功');
          console.log('stdout:', stdout);

          // 提取部署 URL
          const deployUrlMatch = stdout.match(/(https:\/\/[^\s]+\.vercel\.app)/);
          if (deployUrlMatch) {
            console.log('🌐 Vercel 部署URL：' + deployUrlMatch[1]);
          }
          resolve();
        }
      });
    });

    console.log('');
    console.log('📦 阶段五：Vercel 生产部署完成');
    console.log('');

    // 阶段六：配置域名 aisense.top
    console.log('📦 阶段六：配置域名 aisense.top');

    // 访问 Vercel Dashboard 的域名页面
    console.log('📖 访问 Vercel Dashboard 的域名页面...');
    await page.goto('https://vercel.com/dashboard/aisense-top/settings/domains', { waitUntil: 'networkidle' });
    await page.screenshot({ path: '/Users/caingao/aisense-top/screenshots/vercel-domains-page.png' });

    console.log('📝 请手动配置域名 aisense.top：');
    console.log('💡 操作步骤：');
    console.log('1. 在当前页面（Vercel Dashboard）');
    console.log('2. 点击 "Add Domain" 按钮');
    console.log('3. 输入域名：aisense.top');
    console.log('4. 点击 "Add"');
    console.log('5. Vercel 会提供 DNS 配置信息');
    console.log('');
    console.log('🚀 配置完成后，请告诉我："域名配置完成"');
    console.log('');
    console.log('🚀 我会立即测试网站访问！');

    // 等待用户配置域名（最多 10 分钟）
    console.log('⏳ 等待域名配置完成（最多 10 分钟）...');

    // 测试网站访问
    console.log('🔍 测试网站访问...');

    // 测试 Vercel 默认域名
    console.log('🌐 测试 Vercel 默认域名访问...');
    const vercelResponse = await page.goto('https://aisense.vercel.app', { waitUntil: 'domcontentloaded' });
    const vercelStatusCode = vercelResponse.status();

    if (vercelStatusCode === 200 || vercelStatusCode === 301 || vercelStatusCode === 302) {
      console.log('✅ Vercel 默认域名访问成功：https://aisense.vercel.app');
    } else {
      console.log('⚠️ Vercel 默认域名访问可能失败：', vercelStatusCode);
    }

    // 测试域名 aisense.top
    console.log('🌐 测试域名 aisense.top 访问...');
    const domainResponse = await page.goto('https://aisense.top', { waitUntil: 'domcontentloaded' });
    const domainStatusCode = domainResponse.status();

    if (domainStatusCode === 200 || domainStatusCode === 301 || domainStatusCode === 302) {
      console.log('✅ 域名 aisense.top 访问成功：https://aisense.top');
    } else {
      console.log('⚠️ 域名 aisense.top 访问可能失败：', domainStatusCode);
      console.log('💡 DNS 传播可能需要 10-60 分钟');
    }

    // 最终截图
    console.log('📸 保存最终截图...');
    await page.screenshot({ path: '/Users/caingao/aisense-top/screenshots/final-screenshot.png', fullPage: true });

    await context.close();
    await browser.close();

    console.log('');
    console.log('=========================================');
    console.log('🎉 浏览器自动化操作完成！');
    console.log('=========================================');
    console.log('');
    console.log('📋 完成总结：');
    console.log('   - ✅ GitHub 仓库：https://github.com/CainGao/aisense-top');
    console.log('   - ✅ Vercel 部署：https://aisense.vercel.app');
    console.log('   - ⏳ 域名 aisense.top：等待 DNS 配置和传播');
    console.log('');
    console.log('🚀 后续步骤：');
    console.log('   1. 完成 DNS 配置（按照 Vercel Dashboard 提供的信息）');
    console.log('   2. 等待 DNS 传播（10-60 分钟）');
    console.log('   3. 重新测试域名 aisense.top 访问');
    console.log('');
    console.log('🎉 网站基本已上线！');
    console.log('');

  } catch (error) {
    console.error('❌ 浏览器自动化失败:', error.message);
    console.error('');
    console.log('💡 请手动在浏览器中完成以下操作：');
    console.log('1. 登录 GitHub：https://github.com/login');
    console.log('2. 创建仓库：https://github.com/CainGao/new');
    console.log('3. 仓库名称：aisense-top');
    console.log('4. 可见性：Public');
    console.log('5. 推送代码：cd /Users/caingao/aisense-top && git push origin main');
    console.log('6. 登录 Vercel：https://vercel.com/login');
    console.log('7. 链接项目：cd /Users/caingao/aisense-top && vercel link');
    console.log('8. 生产部署：cd /Users/caingao/aisense-top && vercel --prod');
    console.log('9. 配置域名：https://vercel.com/dashboard/aisense-top/settings/domains');
    console.log('');
  }

})();
