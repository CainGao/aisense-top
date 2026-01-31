#!/bin/bash

echo "🚀 开始自动化创建GitHub仓库..."

# 使用AppleScript自动化Chrome
osascript << 'EOFAPPLESCRIPT'
tell application "Google Chrome"
    activate
end tell

delay 1

tell application "System Events"
    keystroke "l" using {command down}
end tell

delay 2

tell application "System Events"
    keystroke "v" using {command down}
end tell

delay 3

tell application "System Events"
    keystroke "g" using {command down}
end tell

delay 4

tell application "System Events"
    keystroke "i" using {command down}
end tell

delay 5

tell application "System Events"
    keystroke "t" using {command down}
end tell

delay 6

tell application "System Events"
    keystroke "h" using {command down}
end tell

delay 7

tell application "System Events"
    keystroke "u" using {command down}
end tell

delay 8

tell application "System Events"
    keystroke "b" using {command down}
end tell

delay 9

tell application "System Events"
    keystroke "." using {command down}
end tell

delay 10

tell application "System Events"
    keystroke "c" using {command down}
end tell

delay 11

tell application "System Events"
    keystroke "o" using {command down}
end tell

delay 12

tell application "System Events"
    keystroke "m" using {command down}
end tell

delay 13

tell application "System Events"
    keystroke "/" using {command down}
end tell

delay 14

tell application "System Events"
    keystroke "n" using {command down}
end tell

delay 15

tell application "System Events"
    keystroke "e" using {command down}
end tell

delay 16

tell application "System Events"
    keystroke "w" using {command down}
end tell

delay 17

tell application "System Events"
    keystroke return
end tell

EOFAPPLESCRIPT

echo "✅ 已在Chrome中打开GitHub新建仓库页面"
echo "💡 请按照以下步骤操作："
echo ""
echo "📋 操作步骤："
echo "1. ✅ 仓库名称（Repository name）：aisense-top"
echo "2. ✅ 可见性（Visibility）：选择 Public（公开）"
echo "3. ✅ 初始化选项：不要勾选任何选项（已初始化）"
echo "4. ✅ 点击 'Create repository' 按钮"
echo ""
echo "🚀 创建完成后，请告诉我："
echo "   '仓库创建成功'"
echo ""
echo "我会立即执行："
echo "   - 推送代码到GitHub"
echo "   - 配置Vercel自动部署"
echo "   - 配置域名aisense.top"
echo ""
echo "⏰ 预计完成时间：5-10分钟"
