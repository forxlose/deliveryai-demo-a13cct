import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  zh: {
    translation: {
      common: {
        title: '沸点 · 火锅点单概念演示',
        meta_desc: '沸点火锅点单与门店履约概念演示，非官方产品',
        banner: '概念演示 / 非官方 · 仅用于服务流程原型展示',
        brand: '沸',
        brand_name: '沸点',
        subtitle: '火锅点单',
        concept_badge: '概念演示 / 非官方',
        concept_en: 'BOILING MOMENT · 沸点',
        open: '营业中',
        simulated_store: '模拟门店',
        store_name: '沸点 · 星河里店',
        back: '返回订单',
        member_title: '会员与排号',
        member_badge: '模拟会员',
        member_name: '金焰会员 · 姚乾',
        growth_value: '成长值',
        queue: '当前排号',
        queue_ahead: '前方 3 桌 · 约 18 分钟',
        benefits: '可用权益',
        tickets: '张',
        coupon: '含 ¥30 菜品券',
        collab_title: '多人协同提示',
        collab_desc: '同桌伙伴点过的菜会显示"本桌已点"，帮助减少重复下单。',
        view_cart: '查看购物车',
        nav_menu: '点餐',
        nav_order: '订单',
        nav_service: '服务',
        nav_demo: '演示',
        aria_service: '呼叫服务',
        aria_member: '会员与排号',
        aria_console: '演示控制台',
        aria_lang: '切换语言',
        aria_close: '关闭',
        aria_reduce: '减少',
        aria_increase: '增加',
        preview_message: '预览模式 · 已绑定 A08 桌',
        welcome_message: '欢迎进入概念演示',
        unknown_area: '',
      },
      bind: {
        title_l1: '热气升腾，',
        title_l2: '好味即刻开场。',
        desc: '从桌台绑定、多人协同点餐，到后厨履约与结账，一次完整走通火锅门店数字服务。',
        feature1: '多人同步点餐',
        feature2: '履约状态可视',
        feature3: '桌边服务呼叫',
        qr_title: '已识别桌台二维码',
        qr_desc: '请选择桌台，模拟扫码绑定',
        seats: '可坐 {{count}} 人',
        quick_enter: '快速进入 A08 桌',
        img_alt: '热气腾腾的火锅菜品',
        area: {
          hall: '大厅',
          booth: '卡座',
          room: '包间',
          window: '窗边',
        },
      },
      home: {
        rpg_entry: '冒险模式',
      },

      welcome: {
        badge: '欢迎光临',
        title: '欢迎光临沸点！',
        you_at: '您在',
        enter: '进入点餐',
        img_alt: '热气腾腾的火锅',
      },
      menu: {
        hero_badge: '今日好味已备齐',
        hero_title: '想吃什么，一起点。',
        hero_diners: '本桌已有 {{count}} 位朋友加入协同点餐',
        search_placeholder: '搜索锅底、菜品或饮品',
        sold_out: '今日售罄',
        ordered_table: '本桌已点 {{count}}',
        from: '起',
        standard: '标准份',
        select_portion: '选择份量',
        select_flavor: '选择口味',
        select_spicy: '选择辣度',
        who_ordered: '谁点了',
        add_to_cart: '加入本桌购物车',
        super_spicy_warning_title: '风险提示',
        super_spicy_warning: '您选择的「超级辣」辣度极高，可能对您的肠胃造成明显不适。请确认您能接受此辣度后再继续下单。',
        super_spicy_confirm: '我已了解，继续下单',
        super_spicy_cancel: '重新选择',
        cat: {
          recommend: '推荐',
          broth: '锅底',
          meat: '牛羊肉',
          seafood: '海鲜河鲜',
          veggie: '蔬菜豆品',
          staple: '主食饮品',
        },
        badge: {
          popular: '人气 No.1',
          signature: '招牌',
          chef: '主厨推荐',
          new: '新品',
        },
        option: {
          half: '半份',
          full: '整份',
          original: '原味',
          spicy_marinate: '香辣腌制',
          tomato_beef: '番茄 + 牛油',
          mushroom_beef: '菌汤 + 牛油',
          mild: '微辣',
          medium: '中辣',
          heavy: '重辣',
          super_spicy: '超级辣',
          less_ice: '少冰',
          normal_ice: '正常冰',
          no_ice: '去冰',
        },
        p1: { name: '鎏金番茄鸳鸯锅', desc: '慢熬番茄与醇香牛油，一锅双味' },
        p2: { name: '牛油麻辣锅', desc: '醇厚牛油，花椒与辣椒层层释香' },
        p3: { name: '琥珀嫩牛肉', desc: '鲜切嫩牛肉，涮煮约 30 秒' },
        p4: { name: '雪花肥牛卷', desc: '脂香均匀，鲜嫩不腻' },
        p5: { name: '鲜虾滑', desc: '虾肉含量充足，弹嫩鲜甜' },
        p6: { name: '脆嫩毛肚', desc: '七上八下，爽脆入味' },
        p7: { name: '田园蔬菜拼盘', desc: '时令鲜蔬，清甜爽口' },
        p8: { name: '山野菌菇拼盘', desc: '多种菌菇，鲜香层次丰富' },
        p9: { name: '手工宽粉', desc: '久煮不烂，筋道挂汁' },
        p10: { name: '柠檬青桔饮', desc: '清爽解辣，冰镇更佳' },
      },
      cart: {
        empty_title: '这一锅，还差点心动',
        empty_desc: '挑选锅底和喜欢的菜品，\n一起点更有趣。',
        title: '本桌购物车',
        item_count: '共 {{count}} 份菜品',
        people: '{{count}} 人参与',
        subtotal: '菜品小计',
        estimated: '预估合计',
        submit_new: '提交加菜',
        submit: '确认并提交订单',
        submit_hint: '提交后，菜品将发送至后厨',
        dialog_title: '本桌购物车',
        ordered_by: '{{name}} 点了',
        confirmed_risk: '客户已确认风险',
      },
      order: {
        empty_title: '还没有已提交订单',
        empty_desc: '先去挑几样喜欢的菜吧。',
        start: '开始点餐',
        badge: 'TABLE ORDER · 桌台订单',
        title: '这一锅，正在抵达',
        add_more: '继续加菜',
        progress: '履约进度',
        realtime: '实时同步',
        waiting: '等待前序完成',
        items_title: '已点菜品',
        order_no: '订单号 #FD20260817018',
        item_count: '{{count}} 项',
        cancel_pending: '退菜申请审核中',
        cancel: '退菜 / 取消',
        total: '菜品合计',
        view_detail: '查看明细',
        checkout: '去结账',
        ordered_by: '{{name}} 点了',
        stage: {
          submitted: { label: '订单已提交', note: '19:28' },
          accepted: { label: '后厨已接单', note: '预计 2 分钟' },
          cooking: { label: '正在制作', note: '预计 8–12 分钟' },
          served: { label: '菜品已上桌', note: '请趁热享用' },
        },
      },
      console: {
        title: '演示控制台',
        desc: '无需等待真实时间，快速切换顾客端与门店履约状态。',
        table_fulfillment: '桌台与履约',
        service_response: '服务响应',
        waiting_count: '{{count}} 个待响应',
        response_desc: '模拟服务员接收桌边呼叫，将"等待响应"批量更新为"已响应"。',
        respond_btn: '模拟服务员响应',
        soldout_title: '菜品售罄开关',
        soldout_hint: '实时影响菜单',
        reset: '一键重置演示',
        done: '完成设置',
        stage: {
          submitted: '已提交',
          accepted: '后厨接单',
          cooking: '制作中',
          served: '已上菜',
        },
      },
      checkout: {
        success_badge: 'PAYMENT SUCCESSFUL',
        success_title: '付款完成',
        success_desc: '感谢来到沸点，愿这一锅热气\n留住今晚的好心情。',
        paid: '本次实付',
        back: '返回订单',
        badge: 'CHECKOUT',
        title: '核对本桌账单',
        subtotal: '菜品小计',
        discount: '会员菜品券',
        payable: '应付合计',
        select_method: '选择支付方式',
        method_mobile: '移动支付',
        method_mobile_note: '微信 / 支付宝',
        method_pos: '桌边 POS',
        method_pos_note: '服务员到桌协助',
        confirm_pay: '确认支付 {{amount}}',
        question: '对账单有疑问？查看智能解答',
      },
      service: {
        title: '桌边服务',
        desc: '选择需要的服务，我们会立即通知附近服务员。',
        broth: { name: '加汤', desc: '补充当前锅底汤底' },
        drinks: { name: '加饮料', desc: '呼叫服务员添饮品' },
        utensils: { name: '加餐具', desc: '补充碗筷或围裙' },
        bill: { name: '买单', desc: '服务员协助核对账单' },
        record: '呼叫记录',
        empty: '暂无呼叫，服务员正在附近巡台。',
        responded: '已响应',
        waiting: '等待响应',
        one_click_broth: '一键呼叫加汤',
      },
      message: {
        bind_table: '已绑定 {{table}}，欢迎光临',
        add_cart: '{{name}} 点了 {{dish}}',
        order_submitted: '订单提交成功',
        order_additional: '加菜已提交后厨',
        stage_submitted: '订单已提交',
        stage_accepted: '后厨已接单',
        stage_cooking: '菜品制作中',
        stage_served: '菜品已上桌',
        soldout_updated: '售罄状态已更新',
        service_called: '已呼叫：{{service}}',
        service_responded: '服务员已响应呼叫',
        cancel_requested: '退菜申请已提交，请等待服务员确认',
        paid: '支付完成，感谢用餐',
        reset: '演示已重置',
        welcome: '欢迎进入概念演示',
        preview: '预览模式 · 已绑定 A08 桌',
      },
      rpg:       {
        "common": {
          "back": "返回",
          "gold": "金币",
          "level": "等级",
          "exp": "经验"
        },
        "create": {
          "title": "创建你的冒险者",
          "subtitle": "选择一个职业，踏上奇幻旅程",
          "name_label": "角色名称",
          "name_placeholder": "输入你的角色名...",
          "name_error": "请输入 2-12 个字符",
          "select_class": "选择职业",
          "start_btn": "开始冒险",
          "save_found": "欢迎回来，{{name}}！(等级 {{level}})",
          "continue_btn": "继续游戏",
          "new_game_btn": "创建新角色",
          "confirm_new_title": "确定要创建新角色吗？",
          "confirm_new_desc": "新角色将覆盖现有存档，此操作不可撤销。",
          "confirm_yes": "是的，创建新角色",
          "confirm_no": "取消"
        },
        "town": {
          "title": "冒险者小镇",
          "environment_desc": "这里是冒险者的聚集地。准备出发去打怪升级吧！",
          "quest_active": "当前任务",
          "quest_btn": "任务公告板",
          "character_btn": "角色信息",
          "inventory_btn": "背包",
          "shop_btn": "商店",
          "rest_btn": "休息 (恢复 HP/MP)",
          "wilderness_title": "探索野外",
          "wilderness_enter": "进入"
        },
        "character": {
          "title": "角色信息",
          "attributes": "属性",
          "equipment_slots": "装备",
          "weapon": "武器",
          "armor": "防具",
          "accessory": "饰品",
          "no_equipment": "无装备",
          "base_value": "基础",
          "bonus": "装备加成"
        },
        "inventory": {
          "title": "背包",
          "tab_equipment": "装备",
          "tab_consumable": "消耗品",
          "empty": "背包空空如也，去冒险吧！",
          "equip": "装备",
          "unequip": "卸下",
          "sell": "出售",
          "use": "使用",
          "sell_price": "售价"
        },
        "shop": {
          "title": "冒险商店",
          "buy": "购买",
          "not_enough_gold": "金币不足！",
          "tab_equipment": "装备",
          "tab_consumable": "消耗品"
        },
        "battle": {
          "title": "战斗",
          "log_empty": "战斗开始...",
          "command_attack": "攻击",
          "command_skill": "技能",
          "command_defend": "防御",
          "command_item": "物品",
          "command_flee": "逃跑",
          "skill_mp": "MP",
          "no_items": "无可使用物品",
          "flee_fail": "逃跑失败！",
          "enemy_turn": "敌人正在行动...",
          "victory_title": "胜利！",
          "defeat_title": "战败...",
          "continue": "继续",
          "drops": "获得物品"
        },
        "battle_log": {
          "player_attack": "你对敌人造成了 {{damage}} 点伤害",
          "player_skill": "你使用了 {{skill}}，造成 {{damage}} 点伤害",
          "player_defend": "你进入防御姿态",
          "player_flee_success": "你成功逃离了战斗！",
          "player_flee_fail": "逃跑失败！",
          "player_item": "你使用了物品",
          "enemy_attack": "敌人对你造成了 {{damage}} 点伤害",
          "enemy_skill": "敌人使用了技能，造成 {{damage}} 点伤害",
          "victory": "你赢得了战斗！",
          "defeat": "你被击败了..."
        },
        "wild": {
          "unknown": "未知区域",
          "return": "返回小镇",
          "quest_hint": "任务目标区域！",
          "exploring": "探索中...",
          "explore": "探索",
          "dark_forest": {
            "name": "暗影森林",
            "desc": "古老的树木遮蔽了天空，黑暗中传来窸窣声响"
          },
          "ancient_ruins": {
            "name": "远古遗迹",
            "desc": "被遗忘的文明留下的残垣断壁"
          },
          "crystal_cave": {
            "name": "水晶洞穴",
            "desc": "洞壁上闪烁着神秘的蓝色微光"
          },
          "misty_swamp": {
            "name": "迷雾沼泽",
            "desc": "浓雾笼罩着湿软的地面，每一步都充满未知"
          },
          "goblin_camp": {
            "name": "哥布林营地",
            "desc": "破烂的帐篷和篝火残骸，哥布林在此扎营"
          },
          "haunted_graveyard": {
            "name": "闹鬼墓地",
            "desc": "阴风阵阵，墓碑间似乎有黑影飘动"
          },
          "wolf_ridge": {
            "name": "狼牙山脊",
            "desc": "陡峭的山脊上回荡着狼嚎"
          },
          "orc_stronghold": {
            "name": "兽人要塞",
            "desc": "粗犷的岩石城墙，兽人们在此盘踞"
          },
          "spider_lair": {
            "name": "蜘蛛巢穴",
            "desc": "厚重的蛛网覆盖着洞口，空气中弥漫着腥味"
          },
          "frost_peak": {
            "name": "冰霜山峰",
            "desc": "寒风刺骨，山顶覆盖着终年不化的冰雪"
          },
          "dragon_valley": {
            "name": "龙谷",
            "desc": "巨大的爪痕遍布谷地，空气中弥漫着焦灼气息"
          },
          "shadow_realm": {
            "name": "暗影界",
            "desc": "现实与暗影交错之地，令人不安的寂静"
          }
        },
        "quest": {
          "title": "任务公告板",
          "active_title": "当前任务",
          "complete_title": "任务完成",
          "accept": "接受",
          "abandon": "放弃任务",
          "claim": "领取奖励",
          "empty": "暂无可用任务，请先完成其他类型的任务",
          "target_kill": "击杀",
          "target_collect": "收集",
          "target_reach": "到达",
          "target_battle": "战斗",
          "slay_slime": {
            "name": "消灭史莱姆",
            "desc": "小镇附近的史莱姆最近变得异常活跃"
          },
          "slay_goblin": {
            "name": "讨伐哥布林",
            "desc": "哥布林劫掠了商队，必须教训它们"
          },
          "slay_wolf": {
            "name": "猎杀野狼",
            "desc": "狼群威胁着农夫的家畜"
          },
          "slay_skeleton": {
            "name": "净化骷髅",
            "desc": "远古墓地的亡灵开始苏醒"
          },
          "slay_giant_spider": {
            "name": "清除巨蛛",
            "desc": "巨型蜘蛛在洞穴中繁殖"
          },
          "slay_orc": {
            "name": "兽人猎手",
            "desc": "兽人巡逻队越来越嚣张"
          },
          "slay_dark_mage": {
            "name": "暗黑法师",
            "desc": "邪恶的黑魔法正在侵蚀这片土地"
          },
          "slay_ogre_chief": {
            "name": "食人魔首领",
            "desc": "食人魔首领在号召部落"
          },
          "slay_dragon_whelp": {
            "name": "龙崽之灾",
            "desc": "幼龙在村庄上空盘旋"
          },
          "slay_shadow_warrior": {
            "name": "暗影战士",
            "desc": "暗影界的武士入侵了现实"
          },
          "collect_slime": {
            "name": "史莱姆凝胶",
            "desc": "收集史莱姆的凝胶用于炼金"
          },
          "collect_goblin": {
            "name": "哥布林匕首",
            "desc": "缴获哥布林的武器作为战利品"
          },
          "collect_wolf": {
            "name": "狼皮收集",
            "desc": "收集狼皮制作防寒装备"
          },
          "collect_skeleton": {
            "name": "亡灵骨片",
            "desc": "收集骷髅的骨片用于研究"
          },
          "collect_giant_spider": {
            "name": "蛛丝采集",
            "desc": "蜘蛛丝是制作绳索的上好材料"
          },
          "collect_orc": {
            "name": "兽人徽章",
            "desc": "兽人的徽章可以作为击败它们的证明"
          },
          "collect_dark_mage": {
            "name": "魔法残片",
            "desc": "黑暗法师身上残留的魔法碎片"
          },
          "explore_dark_forest": {
            "name": "探索暗影森林",
            "desc": "深入暗影森林，绘制新的地图"
          },
          "explore_ancient_ruins": {
            "name": "考察远古遗迹",
            "desc": "探索远古遗迹，寻找失落的文明"
          },
          "explore_crystal_cave": {
            "name": "调查水晶洞穴",
            "desc": "调查水晶洞穴中的神秘光芒"
          },
          "explore_misty_swamp": {
            "name": "穿越迷雾沼泽",
            "desc": "安全穿越迷雾沼泽"
          },
          "explore_goblin_camp": {
            "name": "侦察哥布林营地",
            "desc": "侦察哥布林营地的规模和动向"
          },
          "elite_ogre_chief": {
            "name": "全员狩猎：食人魔",
            "desc": "公会发布了食人魔首领的高额悬赏"
          },
          "elite_dragon_whelp": {
            "name": "猎龙行动",
            "desc": "国王悬赏幼龙的首级"
          },
          "elite_shadow_warrior": {
            "name": "光影之战",
            "desc": "暗影战士的威胁必须被铲除"
          },
          "escort_slime": {
            "name": "护送商队",
            "desc": "保护穿越危险区域的商队"
          },
          "escort_goblin": {
            "name": "护送村民",
            "desc": "护送村民安全通过哥布林出没区"
          },
          "escort_wolf": {
            "name": "护送物资",
            "desc": "押送补给物资穿越狼群领地"
          },
          "escort_skeleton": {
            "name": "夜间护送",
            "desc": "夜间护送传教士通过亡灵之地"
          },
          "escort_giant_spider": {
            "name": "矿工护送",
            "desc": "护送矿工通过蜘蛛出没的山道"
          },
          "escort_orc": {
            "name": "紧急护送",
            "desc": "紧急护伤员逃离兽人防线"
          },
          "escort_dark_mage": {
            "name": "学者护送",
            "desc": "护送研究黑暗魔法的学者"
          }
        },
        "message": {
          "heal": "休息后恢复了全部 HP 和 MP！",
          "victory": "战斗胜利！",
          "defeat": "你被击败了，损失了部分金币...",
          "level_up": "升级了！属性得到提升！",
          "not_enough_mp": "MP 不足！",
          "not_enough_gold": "金币不足！",
          "item_used": "使用了物品",
          "item_bought": "购买成功！",
          "flee_success": "成功逃离了战斗！"
        },
        "class": {
          "warrior": {
            "name": "战士",
            "desc": "高生命值与防御力，擅长近战。技能：重击——消耗 15 MP，对敌人造成 1.5 倍伤害"
          },
          "mage": {
            "name": "法师",
            "desc": "强大的魔法攻击，但生存能力较弱。技能：火球术——消耗 20 MP，对敌人造成 2 倍伤害"
          },
          "ranger": {
            "name": "游侠",
            "desc": "高敏捷与暴击率，灵巧的猎手。技能：双重射击——消耗 12 MP，二连击每击 0.8 倍伤害"
          }
        },
        "skill": {
          "heavy_strike": {
            "name": "重击",
            "desc": "集中力量造成强力一击"
          },
          "fireball": {
            "name": "火球术",
            "desc": "释放灼热的火球攻击敌人"
          },
          "double_shot": {
            "name": "双重射击",
            "desc": "快速射出两箭"
          },
          "bite": {
            "name": "猛咬",
            "desc": "用锋利的牙齿撕咬"
          },
          "claw_swipe": {
            "name": "利爪横扫",
            "desc": "挥舞利爪攻击"
          },
          "shadow_strike": {
            "name": "暗影打击",
            "desc": "从暗影中发起突袭"
          },
          "fire_breath": {
            "name": "火焰吐息",
            "desc": "喷吐烈焰灼烧敌人"
          }
        },
        "monster": {
          "slime": "史莱姆",
          "goblin": "哥布林",
          "wolf": "灰狼",
          "skeleton": "骷髅兵",
          "giant_spider": "巨型蜘蛛",
          "orc": "兽人",
          "dark_mage": "暗黑法师",
          "ogre_chief": "食人魔首领",
          "dragon_whelp": "幼龙",
          "shadow_warrior": "暗影战士"
        },
        "equip": {
          "iron_sword": {
            "name": "铁剑",
            "desc": "一把普通的铁剑"
          },
          "steel_sword": {
            "name": "钢剑",
            "desc": "精良打造的钢剑"
          },
          "shadow_blade": {
            "name": "暗影之刃",
            "desc": "散发着暗影气息的利刃"
          },
          "leather_armor": {
            "name": "皮甲",
            "desc": "轻便的皮革护甲"
          },
          "wooden_shield": {
            "name": "木盾",
            "desc": "结实的橡木盾牌"
          },
          "mage_robe": {
            "name": "法师长袍",
            "desc": "蕴含魔法力量的长袍"
          },
          "dragon_scale": {
            "name": "龙鳞甲",
            "desc": "由龙鳞锻造的重甲"
          },
          "spider_ring": {
            "name": "蛛丝戒指",
            "desc": "轻巧的蛛丝编织戒指"
          },
          "crystal_ring": {
            "name": "水晶戒指",
            "desc": "闪耀着神秘光芒的水晶戒指"
          }
        },
        "consume": {
          "hp_potion": {
            "name": "生命药水",
            "desc": "恢复 40 HP"
          },
          "mp_potion": {
            "name": "魔法药水",
            "desc": "恢复 30 MP"
          }
        }
      },
    },
  },
  en: {
    translation: {
      common: {
        title: 'Boiling Point · Hotpot Ordering Demo',
        meta_desc: 'Boiling Point hotpot ordering and store fulfillment concept demo, unofficial',
        banner: 'Concept Demo / Unofficial · For service flow prototyping only',
        brand: '沸',
        brand_name: 'Boiling Point',
        subtitle: 'Hotpot Ordering',
        concept_badge: 'Concept Demo / Unofficial',
        concept_en: 'BOILING MOMENT · 沸点',
        open: 'Open Now',
        simulated_store: 'Simulated Store',
        store_name: 'Boiling Point · Galaxy Lane',
        back: 'Back to Orders',
        member_title: 'Membership & Queue',
        member_badge: 'Simulated Member',
        member_name: 'Gold Member · Yao Qian',
        growth_value: 'Growth Points',
        queue: 'Current Queue',
        queue_ahead: '3 tables ahead · ~18 min',
        benefits: 'Available Benefits',
        tickets: 'tickets',
        coupon: 'Includes ¥30 dish coupon',
        collab_title: 'Multi-user Collaboration',
        collab_desc: 'Dishes ordered by tablemates show "Table Ordered" to avoid duplicate orders.',
        view_cart: 'View Cart',
        nav_menu: 'Menu',
        nav_order: 'Orders',
        nav_service: 'Service',
        nav_demo: 'Demo',
        aria_service: 'Call Service',
        aria_member: 'Membership & Queue',
        aria_console: 'Demo Console',
        aria_lang: 'Switch language',
        aria_close: 'Close',
        aria_reduce: 'Decrease',
        aria_increase: 'Increase',
        preview_message: 'Preview mode · Table A08 bound',
        welcome_message: 'Welcome to the concept demo',
        unknown_area: '',
      },
      bind: {
        title_l1: 'Steam rising,',
        title_l2: 'great flavors begin now.',
        desc: 'From table binding and collaborative ordering to kitchen fulfillment and checkout — a complete digital hotpot dining experience.',
        feature1: 'Multi-user Ordering',
        feature2: 'Live Fulfillment',
        feature3: 'Tableside Service',
        qr_title: 'Table QR Code Detected',
        qr_desc: 'Select a table to simulate QR scan binding',
        seats: 'Seats {{count}}',
        quick_enter: 'Quick Enter Table A08',
        img_alt: 'Steaming hotpot dishes',
        area: {
          hall: 'Hall',
          booth: 'Booth',
          room: 'Private Room',
          window: 'Window Seat',
        },
      },
      home: {
        rpg_entry: 'Adventure Mode',
      },

      welcome: {
        badge: 'Welcome',
        title: 'Welcome to Boiling Point!',
        you_at: 'You are at',
        enter: 'Start Ordering',
        img_alt: 'Steaming hotpot',
      },
      menu: {
        hero_badge: "Today's best flavors are ready",
        hero_title: 'What shall we order together?',
        hero_diners: '{{count}} friends joined collaborative ordering',
        search_placeholder: 'Search broth, dishes or drinks',
        sold_out: 'Sold Out Today',
        ordered_table: 'Table Ordered {{count}}',
        from: 'from',
        standard: 'Standard',
        select_portion: 'Select Portion',
        select_flavor: 'Select Flavor',
        select_spicy: 'Select Spice Level',
        who_ordered: 'Who ordered?',
        add_to_cart: 'Add to Table Cart',
        super_spicy_warning_title: 'Risk Warning',
        super_spicy_warning: 'The "Super Hot" spice level is extremely high and may cause significant discomfort to your stomach. Please confirm you can handle this spice level before continuing.',
        super_spicy_confirm: 'I understand, continue ordering',
        super_spicy_cancel: 'Re-select',
        cat: {
          recommend: 'Recommended',
          broth: 'Broth',
          meat: 'Beef & Lamb',
          seafood: 'Seafood',
          veggie: 'Vegetables & Tofu',
          staple: 'Staples & Drinks',
        },
        badge: {
          popular: 'Top Pick',
          signature: 'Signature',
          chef: "Chef's Choice",
          new: 'New',
        },
        option: {
          half: 'Half Portion',
          full: 'Full Portion',
          original: 'Original',
          spicy_marinate: 'Spicy Marinated',
          tomato_beef: 'Tomato + Beef Tallow',
          mushroom_beef: 'Mushroom + Beef Tallow',
          mild: 'Mild',
          medium: 'Medium',
          heavy: 'Hot',
          super_spicy: 'Super Hot',
          less_ice: 'Less Ice',
          normal_ice: 'Normal Ice',
          no_ice: 'No Ice',
        },
        p1: { name: 'Golden Tomato Dual-Flavor Pot', desc: 'Slow-simmered tomato and rich beef tallow, two flavors in one pot' },
        p2: { name: 'Beef Tallow Spicy Pot', desc: 'Rich beef tallow with layered Sichuan peppercorn and chili' },
        p3: { name: 'Amber Tender Beef', desc: 'Fresh-cut tender beef, blanch about 30 seconds' },
        p4: { name: 'Marbled Beef Rolls', desc: 'Even marbling, tender and not greasy' },
        p5: { name: 'Fresh Shrimp Paste', desc: 'High shrimp content, bouncy and sweet' },
        p6: { name: 'Crisp Beef Tripe', desc: 'Dip up and down, crisp and flavorful' },
        p7: { name: 'Garden Veggie Platter', desc: 'Seasonal fresh vegetables, crisp and sweet' },
        p8: { name: 'Wild Mushroom Platter', desc: 'Various mushrooms, rich umami layers' },
        p9: { name: 'Handmade Wide Noodles', desc: 'Chewy and sauce-clinging, boils well' },
        p10: { name: 'Lemon Calamansi Drink', desc: 'Refreshing and cooling, best iced' },
      },
      cart: {
        empty_title: 'Your pot needs a little more love',
        empty_desc: 'Pick a broth and your favorite dishes,\norder together for more fun.',
        title: 'Table Cart',
        item_count: '{{count}} items',
        people: '{{count}} people',
        subtotal: 'Subtotal',
        estimated: 'Estimated Total',
        submit_new: 'Submit Additional',
        submit: 'Confirm & Submit Order',
        submit_hint: 'After submission, dishes will be sent to the kitchen',
        dialog_title: 'Table Cart',
        ordered_by: 'Ordered by {{name}}',
        confirmed_risk: 'Risk confirmed by customer',
      },
      order: {
        empty_title: 'No orders submitted yet',
        empty_desc: 'Go pick some dishes you like.',
        start: 'Start Ordering',
        badge: 'TABLE ORDER',
        title: 'Your pot is on the way',
        add_more: 'Add More',
        progress: 'Fulfillment Progress',
        realtime: 'Live Sync',
        waiting: 'Waiting for previous step',
        items_title: 'Ordered Dishes',
        order_no: 'Order #FD20260817018',
        item_count: '{{count}} items',
        cancel_pending: 'Cancel request under review',
        cancel: 'Cancel / Return',
        total: 'Total',
        view_detail: 'View Details',
        checkout: 'Checkout',
        ordered_by: 'Ordered by {{name}}',
        stage: {
          submitted: { label: 'Order Submitted', note: '19:28' },
          accepted: { label: 'Accepted by Kitchen', note: '~2 minutes' },
          cooking: { label: 'Cooking', note: '~8–12 minutes' },
          served: { label: 'Served', note: 'Enjoy while hot' },
        },
      },
      console: {
        title: 'Demo Console',
        desc: 'No need to wait for real time — quickly switch customer-side and store fulfillment states.',
        table_fulfillment: 'Table & Fulfillment',
        service_response: 'Service Response',
        waiting_count: '{{count}} pending',
        response_desc: 'Simulate server receiving tableside calls, batch update "waiting" to "responded".',
        respond_btn: 'Simulate Server Response',
        soldout_title: 'Sold-out Toggle',
        soldout_hint: 'Affects menu in real time',
        reset: 'Reset Demo',
        done: 'Done',
        stage: {
          submitted: 'Submitted',
          accepted: 'Accepted',
          cooking: 'Cooking',
          served: 'Served',
        },
      },
      checkout: {
        success_badge: 'PAYMENT SUCCESSFUL',
        success_title: 'Payment Complete',
        success_desc: 'Thank you for visiting Boiling Point.\nMay this pot of warmth\nmake your evening memorable.',
        paid: 'Amount Paid',
        back: 'Back to Orders',
        badge: 'CHECKOUT',
        title: 'Review Your Bill',
        subtotal: 'Subtotal',
        discount: 'Member Dish Coupon',
        payable: 'Total Payable',
        select_method: 'Select Payment Method',
        method_mobile: 'Mobile Pay',
        method_mobile_note: 'WeChat / Alipay',
        method_pos: 'Tableside POS',
        method_pos_note: 'Server assists at table',
        confirm_pay: 'Confirm Payment {{amount}}',
        question: 'Questions about the bill? View smart answers',
      },
      service: {
        title: 'Tableside Service',
        desc: 'Select the service you need, we will notify the nearest server immediately.',
        broth: { name: 'Add Broth', desc: 'Top up the current broth base' },
        drinks: { name: 'Add Drinks', desc: 'Call server for drink refill' },
        utensils: { name: 'Add Tableware', desc: 'Bring bowls, chopsticks or bibs' },
        bill: { name: 'Request Bill', desc: 'Server assists with bill review' },
        record: 'Call Records',
        empty: 'No calls yet, servers are patrolling nearby.',
        responded: 'Responded',
        waiting: 'Waiting',
        one_click_broth: 'One-tap Add Broth',
      },
      message: {
        bind_table: 'Table {{table}} bound, welcome!',
        add_cart: '{{name}} ordered {{dish}}',
        order_submitted: 'Order submitted successfully',
        order_additional: 'Additional dishes sent to kitchen',
        stage_submitted: 'Order submitted',
        stage_accepted: 'Accepted by kitchen',
        stage_cooking: 'Dishes are being cooked',
        stage_served: 'Dishes have been served',
        soldout_updated: 'Sold-out status updated',
        service_called: 'Called: {{service}}',
        service_responded: 'Server has responded to calls',
        cancel_requested: 'Cancel request submitted, waiting for server confirmation',
        paid: 'Payment complete, thank you for dining',
        reset: 'Demo has been reset',
        welcome: 'Welcome to the concept demo',
        preview: 'Preview mode · Table A08 bound',
      },
      rpg:       {
        "common": {
          "back": "Back",
          "gold": "Gold",
          "level": "Level",
          "exp": "EXP"
        },
        "create": {
          "title": "Create Your Adventurer",
          "subtitle": "Choose a class and embark on a fantasy journey",
          "name_label": "Character Name",
          "name_placeholder": "Enter your character name...",
          "name_error": "Please enter 2-12 characters",
          "select_class": "Choose Class",
          "start_btn": "Start Adventure",
          "save_found": "Welcome back, {{name}}! (Level {{level}})",
          "continue_btn": "Continue",
          "new_game_btn": "New Game",
          "confirm_new_title": "Start a new game?",
          "confirm_new_desc": "This will overwrite your existing save and cannot be undone.",
          "confirm_yes": "Yes, start new",
          "confirm_no": "Cancel"
        },
        "town": {
          "title": "Adventurer Town",
          "environment_desc": "A gathering place for adventurers. Gear up for your quest!",
          "quest_active": "Active Quest",
          "quest_btn": "Quest Board",
          "character_btn": "Character",
          "inventory_btn": "Inventory",
          "shop_btn": "Shop",
          "rest_btn": "Rest (Restore HP/MP)",
          "wilderness_title": "Explore Wilderness",
          "wilderness_enter": "Enter"
        },
        "character": {
          "title": "Character Info",
          "attributes": "Attributes",
          "equipment_slots": "Equipment",
          "weapon": "Weapon",
          "armor": "Armor",
          "accessory": "Accessory",
          "no_equipment": "None",
          "base_value": "Base",
          "bonus": "Bonus"
        },
        "inventory": {
          "title": "Inventory",
          "tab_equipment": "Equipment",
          "tab_consumable": "Consumables",
          "empty": "Your bag is empty. Go on an adventure!",
          "equip": "Equip",
          "unequip": "Unequip",
          "sell": "Sell",
          "use": "Use",
          "sell_price": "Sell Price"
        },
        "shop": {
          "title": "Adventure Shop",
          "buy": "Buy",
          "not_enough_gold": "Not enough gold!",
          "tab_equipment": "Equipment",
          "tab_consumable": "Consumables"
        },
        "battle": {
          "title": "Battle",
          "log_empty": "Battle begins...",
          "command_attack": "Attack",
          "command_skill": "Skill",
          "command_defend": "Defend",
          "command_item": "Item",
          "command_flee": "Flee",
          "skill_mp": "MP",
          "no_items": "No usable items",
          "flee_fail": "Flee failed!",
          "enemy_turn": "Enemy is acting...",
          "victory_title": "Victory!",
          "defeat_title": "Defeated...",
          "continue": "Continue",
          "drops": "Loot"
        },
        "battle_log": {
          "player_attack": "You dealt {{damage}} damage to the enemy",
          "player_skill": "You used {{skill}}, dealing {{damage}} damage",
          "player_defend": "You take a defensive stance",
          "player_flee_success": "You successfully fled!",
          "player_flee_fail": "Failed to flee!",
          "player_item": "You used an item",
          "enemy_attack": "Enemy dealt {{damage}} damage to you",
          "enemy_skill": "Enemy used a skill, dealing {{damage}} damage",
          "victory": "You won the battle!",
          "defeat": "You were defeated..."
        },
        "wild": {
          "unknown": "Unknown Area",
          "return": "Return to Town",
          "quest_hint": "Quest target area!",
          "exploring": "Exploring...",
          "explore": "Explore",
          "dark_forest": {
            "name": "Dark Forest",
            "desc": "Ancient trees block out the sky; rustling sounds echo in the darkness"
          },
          "ancient_ruins": {
            "name": "Ancient Ruins",
            "desc": "Crumbling remnants of a forgotten civilization"
          },
          "crystal_cave": {
            "name": "Crystal Cave",
            "desc": "Mysterious blue light shimmers on the cave walls"
          },
          "misty_swamp": {
            "name": "Misty Swamp",
            "desc": "Thick fog shrouds the soft ground; every step is uncertain"
          },
          "goblin_camp": {
            "name": "Goblin Camp",
            "desc": "Tattered tents and campfire remains — goblins have set up camp"
          },
          "haunted_graveyard": {
            "name": "Haunted Graveyard",
            "desc": "Chilly winds blow; shadows seem to drift between the tombstones"
          },
          "wolf_ridge": {
            "name": "Wolf Ridge",
            "desc": "Howls echo across the steep mountain ridge"
          },
          "orc_stronghold": {
            "name": "Orc Stronghold",
            "desc": "Rugged stone walls — the orcs have made their fortress"
          },
          "spider_lair": {
            "name": "Spider Lair",
            "desc": "Thick webs cover the cave entrance; the air reeks of prey"
          },
          "frost_peak": {
            "name": "Frost Peak",
            "desc": "Piercing cold winds; the summit is covered in eternal ice"
          },
          "dragon_valley": {
            "name": "Dragon Valley",
            "desc": "Massive claw marks scar the valley; the air smells of scorched earth"
          },
          "shadow_realm": {
            "name": "Shadow Realm",
            "desc": "A place where reality and shadow blur — an unsettling silence"
          }
        },
        "quest": {
          "title": "Quest Board",
          "active_title": "Active Quest",
          "complete_title": "Quest Complete",
          "accept": "Accept",
          "abandon": "Abandon",
          "claim": "Claim Reward",
          "empty": "No quests available. Complete other quest types first.",
          "target_kill": "Slay",
          "target_collect": "Collect",
          "target_reach": "Reach",
          "target_battle": "Battle",
          "slay_slime": {
            "name": "Slay the Slimes",
            "desc": "The slimes near town have become unusually aggressive"
          },
          "slay_goblin": {
            "name": "Goblin Hunt",
            "desc": "Goblins raided a trade caravan — teach them a lesson"
          },
          "slay_wolf": {
            "name": "Wolf Hunt",
            "desc": "A wolf pack threatens the farmers' livestock"
          },
          "slay_skeleton": {
            "name": "Purify the Skeletons",
            "desc": "Undead are rising in the ancient cemetery"
          },
          "slay_giant_spider": {
            "name": "Clear the Spiders",
            "desc": "Giant spiders are breeding in the caves"
          },
          "slay_orc": {
            "name": "Orc Hunter",
            "desc": "Orc patrols are getting bolder"
          },
          "slay_dark_mage": {
            "name": "Dark Mage",
            "desc": "Evil dark magic is corrupting the land"
          },
          "slay_ogre_chief": {
            "name": "Ogre Chief",
            "desc": "The ogre chief is rallying the tribes"
          },
          "slay_dragon_whelp": {
            "name": "Dragon Menace",
            "desc": "A whelp circles above the villages"
          },
          "slay_shadow_warrior": {
            "name": "Shadow Warrior",
            "desc": "Warriors from the shadow realm are invading"
          },
          "collect_slime": {
            "name": "Slime Gel",
            "desc": "Collect slime gel for alchemy"
          },
          "collect_goblin": {
            "name": "Goblin Daggers",
            "desc": "Seize goblin weapons as trophies"
          },
          "collect_wolf": {
            "name": "Wolf Pelts",
            "desc": "Collect wolf pelts for cold-weather gear"
          },
          "collect_skeleton": {
            "name": "Bone Fragments",
            "desc": "Collect skeletal fragments for research"
          },
          "collect_giant_spider": {
            "name": "Spider Silk",
            "desc": "Spider silk makes excellent rope material"
          },
          "collect_orc": {
            "name": "Orc Badges",
            "desc": "Orc badges serve as proof of your victories"
          },
          "collect_dark_mage": {
            "name": "Magic Shards",
            "desc": "Shards of magic lingering on dark mages"
          },
          "explore_dark_forest": {
            "name": "Explore Dark Forest",
            "desc": "Venture deep into the Dark Forest and chart new maps"
          },
          "explore_ancient_ruins": {
            "name": "Survey Ancient Ruins",
            "desc": "Explore the ruins and uncover lost civilization"
          },
          "explore_crystal_cave": {
            "name": "Investigate Crystal Cave",
            "desc": "Investigate the mysterious glow in the crystal caves"
          },
          "explore_misty_swamp": {
            "name": "Cross Misty Swamp",
            "desc": "Safely navigate through the Misty Swamp"
          },
          "explore_goblin_camp": {
            "name": "Scout Goblin Camp",
            "desc": "Scout the goblin camp's size and movements"
          },
          "elite_ogre_chief": {
            "name": "Bounty: Ogre Chief",
            "desc": "The guild posted a high bounty on the ogre chief"
          },
          "elite_dragon_whelp": {
            "name": "Dragon Hunt",
            "desc": "The king offers a bounty for the whelp's head"
          },
          "elite_shadow_warrior": {
            "name": "Light vs Shadow",
            "desc": "The shadow warrior threat must be eliminated"
          },
          "escort_slime": {
            "name": "Escort Caravan",
            "desc": "Protect a caravan traveling through dangerous territory"
          },
          "escort_goblin": {
            "name": "Escort Villagers",
            "desc": "Escort villagers through goblin territory"
          },
          "escort_wolf": {
            "name": "Supply Escort",
            "desc": "Deliver supplies through wolf country"
          },
          "escort_skeleton": {
            "name": "Night Escort",
            "desc": "Escort a missionary through undead territory at night"
          },
          "escort_giant_spider": {
            "name": "Miner Escort",
            "desc": "Escort miners through spider-infested mountain passes"
          },
          "escort_orc": {
            "name": "Emergency Evacuation",
            "desc": "Evacuate the wounded from the orc front line"
          },
          "escort_dark_mage": {
            "name": "Scholar Escort",
            "desc": "Escort a scholar researching dark magic"
          }
        },
        "message": {
          "heal": "Restored all HP and MP after resting!",
          "victory": "Victory!",
          "defeat": "You were defeated and lost some gold...",
          "level_up": "Level up! Attributes increased!",
          "not_enough_mp": "Not enough MP!",
          "not_enough_gold": "Not enough gold!",
          "item_used": "Item used",
          "item_bought": "Purchased!",
          "flee_success": "Successfully fled from battle!"
        },
        "class": {
          "warrior": {
            "name": "Warrior",
            "desc": "High HP and defense, excels in melee. Skill: Heavy Strike — 15 MP, deals 1.5× damage"
          },
          "mage": {
            "name": "Mage",
            "desc": "Powerful magic attacks, but fragile. Skill: Fireball — 20 MP, deals 2× damage"
          },
          "ranger": {
            "name": "Ranger",
            "desc": "High agility and crit rate, a nimble hunter. Skill: Double Shot — 12 MP, two hits at 0.8× each"
          }
        },
        "skill": {
          "heavy_strike": {
            "name": "Heavy Strike",
            "desc": "Focus strength into a powerful blow"
          },
          "fireball": {
            "name": "Fireball",
            "desc": "Launch a scorching fireball at the enemy"
          },
          "double_shot": {
            "name": "Double Shot",
            "desc": "Fire two arrows in quick succession"
          },
          "bite": {
            "name": "Bite",
            "desc": "Tear with sharp fangs"
          },
          "claw_swipe": {
            "name": "Claw Swipe",
            "desc": "Swipe with razor-sharp claws"
          },
          "shadow_strike": {
            "name": "Shadow Strike",
            "desc": "Ambush from the shadows"
          },
          "fire_breath": {
            "name": "Fire Breath",
            "desc": "Breathe scorching flames"
          }
        },
        "monster": {
          "slime": "Slime",
          "goblin": "Goblin",
          "wolf": "Gray Wolf",
          "skeleton": "Skeleton",
          "giant_spider": "Giant Spider",
          "orc": "Orc",
          "dark_mage": "Dark Mage",
          "ogre_chief": "Ogre Chief",
          "dragon_whelp": "Dragon Whelp",
          "shadow_warrior": "Shadow Warrior"
        },
        "equip": {
          "iron_sword": {
            "name": "Iron Sword",
            "desc": "A common iron sword"
          },
          "steel_sword": {
            "name": "Steel Sword",
            "desc": "A well-crafted steel sword"
          },
          "shadow_blade": {
            "name": "Shadow Blade",
            "desc": "A blade radiating dark energy"
          },
          "leather_armor": {
            "name": "Leather Armor",
            "desc": "Lightweight leather armor"
          },
          "wooden_shield": {
            "name": "Wooden Shield",
            "desc": "A sturdy oak shield"
          },
          "mage_robe": {
            "name": "Mage Robe",
            "desc": "A robe imbued with magical energy"
          },
          "dragon_scale": {
            "name": "Dragon Scale Armor",
            "desc": "Heavy armor forged from dragon scales"
          },
          "spider_ring": {
            "name": "Spider Silk Ring",
            "desc": "A lightweight ring woven from spider silk"
          },
          "crystal_ring": {
            "name": "Crystal Ring",
            "desc": "A ring shimmering with mysterious light"
          }
        },
        "consume": {
          "hp_potion": {
            "name": "HP Potion",
            "desc": "Restores 40 HP"
          },
          "mp_potion": {
            "name": "MP Potion",
            "desc": "Restores 30 MP"
          }
        }
      },
    },
  },
} as const

const STORAGE_KEY = 'i18nextLng'

function getInitialLanguage(): string {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'zh' || stored === 'en') return stored
  } catch {
    // localStorage 不可用时降级为默认中文
  }
  return 'zh'
}

void i18next.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng: 'zh',
  interpolation: {
    escapeValue: false,
  },
})

export default i18next
