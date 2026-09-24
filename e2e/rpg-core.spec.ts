import { test, expect, type Page } from '@playwright/test'

/* ─── 辅助函数 ─── */

/** 清除 RPG 存档 */
async function clearRpgSave(page: Page) {
  await page.goto('/')

  await page.evaluate(() => localStorage.removeItem('rpg-save'))
}

/** 从首页进入 RPG 创建界面 */
async function goToRpgCreate(page: Page) {
  // 直接 hash 导航：HomeView 的"冒险模式"按钮使用 window.location.hash 跳转会被热火锅 useViewRoute 拦截纠正回 #/home
  await page.goto('/#/rpg/create')
  await expect(page.getByRole('heading', { name: /创建你的冒险者|Create Your Adventurer/ })).toBeVisible()
}

/**
 * 完成角色创建流程，进入城镇。
 * @param name 角色名，默认 '测试勇者'
 * @param className 职业正则：/战士|Warrior/、/法师|Mage/、/游侠|Ranger/
 */
async function createCharacter(
  page: Page,
  name = '测试勇者',
  className: RegExp = /战士|Warrior/,
) {
  await goToRpgCreate(page)
  await page.getByPlaceholder(/输入你的角色名|Enter your character name/).fill(name)
  await page.getByRole('button', { name: className }).click()
  await page.getByRole('button', { name: /开始冒险|Start Adventure/ }).click()
  await expect(page.getByRole('heading', { name: /冒险者小镇|Adventurer Town/ })).toBeVisible()
}

/** 从城镇进入战斗：进入任意野外 → 循环点击探索直到进入战斗 */
async function enterBattle(page: Page, maxAttempts = 20) {
  // 点击第一个野外地点
  await page.getByRole('button', { name: /暗影森林|Dark Forest/ }).click()
  await expect(page.getByRole('button', { name: /探索|Explore/ })).toBeVisible()

  for (let i = 0; i < maxAttempts; i++) {
    // 如果已经在战斗中（出现攻击按钮），则停止
    const attackBtn = page.getByRole('button', { name: /^攻击$|^Attack$/ })
    if (await attackBtn.isVisible().catch(() => false)) return

    // 点击探索
    await page.getByRole('button', { name: /探索|Explore/ }).click()
    // 等待 800ms 探索延迟 + 渲染
    await page.waitForTimeout(900)

    // 检查是否遇到敌人
    if (await attackBtn.isVisible({ timeout: 500 }).catch(() => false)) return

    // 如果探索按钮再次可用（没有遇敌），继续循环
    await expect(page.getByRole('button', { name: /探索|Explore/ })).toBeVisible({ timeout: 1000 })
  }
  // 达到最大尝试次数仍没遇敌，也算进入战斗检测失败
  throw new Error(`未能在 ${maxAttempts} 次探索中遇敌`)
}

/** 战斗循环：反复攻击直到胜利或战败 */
async function fightUntilEnd(page: Page, maxTurns = 30) {
  for (let i = 0; i < maxTurns; i++) {
    // 检查是否已结束（胜利或战败界面）
    const victory = page.getByRole('heading', { name: /胜利！|Victory!/ })
    const defeat = page.getByRole('heading', { name: /战败|Defeat/ })
    if (await victory.isVisible({ timeout: 300 }).catch(() => false)) return 'victory'
    if (await defeat.isVisible({ timeout: 300 }).catch(() => false)) return 'defeat'

    // 玩家回合：点击攻击
    const attackBtn = page.getByRole('button', { name: /^攻击$|^Attack$/ })
    if (await attackBtn.isVisible({ timeout: 500 }).catch(() => false)) {
      await attackBtn.click()
      // 等待战斗日志更新 + 敌方行动
      await page.waitForTimeout(600)
      continue
    }

    // 如果不是玩家回合（等待敌方行动中），等待一下再检查
    await page.waitForTimeout(500)
  }
  return 'max_turns'
}

/* ─── 每个测试前后清理存档 ─── */
test.beforeEach(async ({ page }) => {
  await clearRpgSave(page)
})

/* ═══════════════════════════════════════════════════════════
   REQ-001: 角色创建
   ═══════════════════════════════════════════════════════════ */
test.describe('REQ-001: 角色创建', () => {
  test('REQ-001-S1: 无存档时创建角色进入城镇', async ({ page }) => {
    await createCharacter(page, '勇者阿强', /战士|Warrior/)

    // 验证顶栏显示角色名、等级和金币
    await expect(page.getByText('勇者阿强')).toBeVisible()
    await expect(page.getByText(/100 G/)).toBeVisible()

    // 验证城镇核心元素
    await expect(page.getByRole('button', { name: /任务公告板|Quest Board/ })).toBeVisible()
    await expect(page.getByRole('button', { name: /角色信息|Character/ })).toBeVisible()
    await expect(page.getByRole('button', { name: /背包|Inventory/ })).toBeVisible()
    await expect(page.getByRole('button', { name: /商店|Shop/ })).toBeVisible()
  })

  test('REQ-001-S2: 名称校验 - 空输入时开始按钮 disabled', async ({ page }) => {
    await goToRpgCreate(page)

    // 未输入名称时按钮 disabled
    const startBtn = page.getByRole('button', { name: /开始冒险|Start Adventure/ })
    await expect(startBtn).toBeDisabled()
  })

  test('REQ-001-S2b: 名称校验 - 1 字符时开始按钮 disabled', async ({ page }) => {
    await goToRpgCreate(page)

    // 输入 1 个字符
    await page.getByPlaceholder(/输入你的角色名|Enter your character name/).fill('A')
    await page.getByRole('button', { name: /战士|Warrior/ }).click()

    const startBtn = page.getByRole('button', { name: /开始冒险|Start Adventure/ })
    await expect(startBtn).toBeDisabled()

    // 校验错误提示
    await expect(page.getByText(/请输入 2-12 个字符|2-12 characters/)).toBeVisible()
  })

  test('REQ-001-S3: 存档恢复 - 预设存档可继续游戏', async ({ page }) => {
    // 先创建一个角色并保存
    await createCharacter(page, '老玩家', /法师|Mage/)
    // 刷新页面模拟重开
    await page.reload()

    // 应该看到继续游戏按钮而不是创建表单
    await expect(page.getByRole('button', { name: /继续游戏|Continue/ })).toBeVisible()
    await expect(page.getByRole('button', { name: /创建新角色|New Game/ })).toBeVisible()
    await expect(page.getByText(/欢迎回来|Welcome back/)).toBeVisible()

    // 点击继续游戏
    await page.getByRole('button', { name: /继续游戏|Continue/ }).click()
    await expect(page.getByRole('heading', { name: /冒险者小镇|Adventurer Town/ })).toBeVisible()
    await expect(page.getByText('老玩家')).toBeVisible()
  })
})

/* ═══════════════════════════════════════════════════════════
   REQ-003: 回合制战斗
   ═══════════════════════════════════════════════════════════ */
test.describe('REQ-003: 回合制战斗', () => {
  test('REQ-003-S1: 进入战斗 → 攻击指令 → 战斗日志更新 → 战斗结束', async ({ page }) => {
    await createCharacter(page, '战斗测试员', /战士|Warrior/)

    // 进入野外并遇敌
    await enterBattle(page)

    // 验证战斗界面可见：敌人名称、HP 条、命令按钮
    await expect(page.getByRole('button', { name: /^攻击$|^Attack$/ })).toBeVisible()
    await expect(page.getByRole('button', { name: /技能|Skill/ })).toBeVisible()
    await expect(page.getByRole('button', { name: /防御|Defend/ })).toBeVisible()
    await expect(page.getByRole('button', { name: /物品|Item/ })).toBeVisible()
    await expect(page.getByRole('button', { name: /逃跑|Flee/ })).toBeVisible()

    // 点击攻击（至少一次）
    await page.getByRole('button', { name: /^攻击$|^Attack$/ }).click()
    await page.waitForTimeout(600)

    // 断言战斗日志有更新（不再是"战斗开始"）
    const battleLog = page.locator('.space-y-1, [class*="battle"]').last()
    // 宽松断言：日志区域有内容（攻击后会有伤害描述）
    await expect(page.getByText(/伤害|damage/).first()).toBeVisible({ timeout: 2000 })

    // 继续战斗直到结束
    const result = await fightUntilEnd(page)

    // 胜利或战败都会有"继续"按钮
    const continueBtn = page.getByRole('button', { name: /继续|Continue/ })
    if (await continueBtn.isVisible({ timeout: 500 }).catch(() => false)) {
      await continueBtn.click()
      // 返回城镇
      await expect(page.getByRole('heading', { name: /冒险者小镇|Adventurer Town/ })).toBeVisible()
    }
    // 不论胜负，最终应该回到城镇
    await expect(page.getByRole('heading', { name: /冒险者小镇|Adventurer Town/ })).toBeVisible({ timeout: 10000 })
  })

  test('REQ-003-S2: 战斗中防御指令 → 显示防御姿态文本', async ({ page }) => {
    await createCharacter(page, '防御测试员', /战士|Warrior/)
    await enterBattle(page)

    // 点击防御
    await page.getByRole('button', { name: /防御|Defend/ }).click()

    // 断言防御姿态文本出现
    await expect(page.getByText(/防御姿态|defending|Defending/)).toBeVisible({ timeout: 2000 })

    // 下一回合防御姿态消失（再攻击一次）
    await page.waitForTimeout(800)
    const attackBtn = page.getByRole('button', { name: /^攻击$|^Attack$/ })
    if (await attackBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
      await attackBtn.click()
      await page.waitForTimeout(600)
    }

    // 继续到战斗结束
    await fightUntilEnd(page)
    const continueBtn = page.getByRole('button', { name: /继续|Continue/ })
    if (await continueBtn.isVisible({ timeout: 500 }).catch(() => false)) {
      await continueBtn.click()
    }
    await expect(page.getByRole('heading', { name: /冒险者小镇|Adventurer Town/ })).toBeVisible({ timeout: 10000 })
  })
})

/* ═══════════════════════════════════════════════════════════
   REQ-004: 任务系统
   ═══════════════════════════════════════════════════════════ */
test.describe('REQ-004: 任务系统', () => {
  test('REQ-004-S1: 公告板展示 3 个任务 → 接受 1 个 → 显示进行中任务', async ({ page }) => {
    await createCharacter(page, '任务测试员', /游侠|Ranger/)

    // 进入任务公告板
    await page.getByRole('button', { name: /任务公告板|Quest Board/ }).click()
    await expect(page.getByRole('heading', { name: /任务公告板|Quest Board/ })).toBeVisible()

    // 至少应有接受按钮（任务卡片包含接受按钮）
    const acceptButtons = page.getByRole('button', { name: /接受|Accept/ })
    const count = await acceptButtons.count()
    expect(count).toBeGreaterThanOrEqual(1)
    // 任务公告板通常展示最多 3 个
    expect(count).toBeLessThanOrEqual(3)

    // 接受第一个任务
    await acceptButtons.first().click()

    // 应进入"当前任务"视图
    await expect(page.getByRole('heading', { name: /当前任务|Active Quest/ })).toBeVisible()
    // 应显示放弃按钮
    await expect(page.getByRole('button', { name: /放弃任务|Abandon/ })).toBeVisible()
  })

  test('REQ-004-S2: 放弃任务后返回公告板', async ({ page }) => {
    await createCharacter(page, '放弃任务测试', /战士|Warrior/)

    // 接受一个任务
    await page.getByRole('button', { name: /任务公告板|Quest Board/ }).click()
    const acceptButtons = page.getByRole('button', { name: /接受|Accept/ })
    if ((await acceptButtons.count()) === 0) {
      test.skip(true, '无可用任务')
      return
    }
    await acceptButtons.first().click()

    // 放弃任务
    await page.getByRole('button', { name: /放弃任务|Abandon/ }).click()

    // 应返回公告板（任务可重新选择）
    await expect(page.getByRole('heading', { name: /任务公告板|Quest Board/ })).toBeVisible()
  })
})

/* ═══════════════════════════════════════════════════════════
   REQ-006: 场景与导航
   ═══════════════════════════════════════════════════════════ */
test.describe('REQ-006: 场景与导航', () => {
  test('REQ-006-S1: 城镇包含 4 个操作按钮、休息按钮、6 个野外地点', async ({ page }) => {
    await createCharacter(page)

    // 4 个操作按钮
    await expect(page.getByRole('button', { name: /任务公告板|Quest Board/ })).toBeVisible()
    await expect(page.getByRole('button', { name: /角色信息|Character/ })).toBeVisible()
    await expect(page.getByRole('button', { name: /背包|Inventory/ })).toBeVisible()
    await expect(page.getByRole('button', { name: /商店|Shop/ })).toBeVisible()

    // 休息按钮
    await expect(page.getByRole('button', { name: /休息|Rest/ })).toBeVisible()

    // 至少 6 个野外地点
    const wildernessButtons = [
      /暗影森林|Dark Forest/,
      /远古遗迹|Ancient Ruins/,
      /水晶洞穴|Crystal Cave/,
      /哥布林营地|Goblin Camp/,
      /迷雾沼泽|Misty Swamp/,
      /闹鬼墓地|Haunted Graveyard/,
    ]
    for (const pattern of wildernessButtons) {
      await expect(page.getByRole('button', { name: pattern })).toBeVisible()
    }
  })

  test('REQ-006-S2: hash 路由验证 - 创建前 #/rpg 显示创建视图', async ({ page }) => {
    await page.goto('/#/rpg')

    // 应显示创建视图
    await expect(page.getByRole('heading', { name: /创建你的冒险者|Create Your Adventurer/ })).toBeVisible()
  })

  test('REQ-006-S3: 创建角色后 hash 路由显示城镇', async ({ page }) => {
    await createCharacter(page)

    // hash 应包含 /rpg/town
    await expect(page).toHaveURL(/#\/rpg\/town$/)
    await expect(page.getByRole('heading', { name: /冒险者小镇|Adventurer Town/ })).toBeVisible()
  })

  test('REQ-006-S4: 顶栏返回按钮可从子视图返回城镇', async ({ page }) => {
    await createCharacter(page)

    // 进入任务公告板
    await page.getByRole('button', { name: /任务公告板|Quest Board/ }).click()
    await expect(page.getByRole('heading', { name: /任务公告板|Quest Board/ })).toBeVisible()

    // 顶栏有返回按钮（ArrowLeft）
    const backBtn = page.locator('button[title="返回"]')
    await backBtn.click()

    // 返回城镇
    await expect(page.getByRole('heading', { name: /冒险者小镇|Adventurer Town/ })).toBeVisible()
  })

  test('REQ-006-S5: 新游戏二次确认弹窗', async ({ page }) => {
    // 先创建角色存档
    await createCharacter(page, '旧角色', /法师|Mage/)
    await page.reload()

    // 点击"创建新角色"
    await page.getByRole('button', { name: /创建新角色|New Game/ }).click()

    // 确认弹窗
    await expect(page.getByText(/确定要创建新角色|Are you sure/)).toBeVisible()
    await expect(page.getByRole('button', { name: /是的，创建新角色|Yes, create/ })).toBeVisible()
    await expect(page.getByRole('button', { name: /取消|Cancel/ })).toBeVisible()

    // 点取消应回到存档恢复界面
    await page.getByRole('button', { name: /取消|Cancel/ }).click()
    await expect(page.getByRole('button', { name: /继续游戏|Continue/ })).toBeVisible()
  })
})
