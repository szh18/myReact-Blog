---
title: Vue 2 与 Vue 3 的核心区别
date: 2026-05-15
category: 前端
tags:
  - Vue
  - Vue3
  - JavaScript
  - 框架对比
excerpt: 深入分析 Vue 2 和 Vue 3 在响应式系统、组合式 API、性能、TypeScript 支持等方面的核心差异。
---

## 概述

Vue 3 于 2020 年 9 月正式发布，相比 Vue 2 进行了底层重写。虽然保持了相似的模板语法，但内部机制和开发体验发生了根本性改变。

---

## 1. 响应式系统

### Vue 2 — Object.defineProperty

```javascript
// Vue 2 响应式原理
function observe(obj) {
  Object.keys(obj).forEach(key => {
    let value = obj[key];
    Object.defineProperty(obj, key, {
      get() {
        console.log(`读取 ${key}`);
        return value;
      },
      set(newVal) {
        console.log(`设置 ${key} = ${newVal}`);
        value = newVal;
        // 触发更新
      }
    });
  });
}
```

**Vue 2 的局限：**
- 无法检测对象属性的添加和删除（需要 `Vue.set` / `Vue.delete`）
- 无法直接监听数组索引变化和 `length` 修改
- 初始化时需要递归遍历所有属性，性能开销大

### Vue 3 — Proxy

```javascript
// Vue 3 响应式原理
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      console.log(`读取 ${key}`);
      // 依赖收集
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      console.log(`设置 ${key} = ${value}`);
      // 触发更新
      return Reflect.set(target, key, value, receiver);
    },
    deleteProperty(target, key) {
      console.log(`删除 ${key}`);
      return Reflect.deleteProperty(target, key);
    }
  });
}
```

**Vue 3 的优势：**
- 可以检测属性添加、删除、数组索引等所有操作
- 惰性响应式——只有被访问到的数据才会被代理
- 支持 Map、Set、WeakMap、WeakSet 等数据结构

---

## 2. API 风格：选项式 vs 组合式

### Vue 2 — 选项式 API

```javascript
export default {
  data() {
    return {
      count: 0,
      user: { name: '' }
    };
  },
  computed: {
    doubleCount() {
      return this.count * 2;
    }
  },
  methods: {
    increment() {
      this.count++;
    }
  },
  mounted() {
    this.fetchUser();
  }
};
```

**问题：** 同一功能的逻辑分散在 `data`、`computed`、`methods`、`mounted` 中，组件大了难以维护。

### Vue 3 — 组合式 API

```javascript
import { ref, computed, onMounted } from 'vue';

function useCounter() {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  const increment = () => count.value++;

  onMounted(() => {
    console.log('Counter ready');
  });

  return { count, doubleCount, increment };
}

export default {
  setup() {
    const { count, doubleCount, increment } = useCounter();
    return { count, doubleCount, increment };
  }
};
```

**优势：** 同一功能的代码聚合在一起，可以提取为可复用的组合函数。

---

## 3. 性能提升

| 方面 | Vue 2 | Vue 3 |
|------|-------|-------|
| 初始化速度 | 较慢（递归代理） | 快（惰性代理） |
| 内存占用 | 较高 | 更低 |
| 包体积 | ~23KB gzip | ~16KB gzip |
| Diff 算法 | 全量比较 | 静态标记 + 靶向更新 |
| 编译优化 | 无 | 静态提升、预字符串化 |

### 编译优化示例

```html
<!-- Vue 3 编译时自动识别静态节点 -->
<template>
  <div>
    <h1>这是静态标题</h1>        <!-- 不会参与 diff -->
    <p>{{ dynamicText }}</p>      <!-- 只有这个会更新 -->
  </div>
</template>
```

Vue 3 的编译器会在模板中标记动态节点（PatchFlag），运行时跳过静态节点的比较，大幅提升更新效率。

---

## 4. TypeScript 支持

### Vue 2

- TypeScript 支持通过 `vue-class-component` 或 `vue-property-decorator` 实现
- 类型推导不完善，需要额外配置
- 源码本身是 JavaScript 写的

### Vue 3

- 源码用 TypeScript 重写
- 组合式 API 天然支持类型推导
- `defineProps` 和 `defineEmits` 提供完善的泛型支持

```typescript
// Vue 3 + TypeScript
interface Props {
  title: string;
  count?: number;
}

const props = withDefaults(defineProps<Props>(), {
  count: 0
});

const emit = defineEmits<{
  update: [value: number];
}>();
```

---

## 5. Fragment、Teleport、Suspense

Vue 3 引入了三个新内置组件：

**Fragment — 多根节点：**
```html
<!-- Vue 3 支持多个根元素，不需要额外包裹 div -->
<template>
  <header>标题</header>
  <main>内容</main>
  <footer>页脚</footer>
</template>
```

**Teleport — 传送门：**
```html
<template>
  <button @click="showModal = true">打开弹窗</button>
  <Teleport to="body">
    <div v-if="showModal" class="modal">
      弹窗内容 — 直接渲染到 body 下
    </div>
  </Teleport>
</template>
```

**Suspense — 异步加载：**
```html
<Suspense>
  <template #default>
    <AsyncComponent />
  </template>
  <template #fallback>
    <LoadingSpinner />
  </template>
</Suspense>
```

---

## 6. 生命周期变化

| Vue 2 | Vue 3 组合式 API |
|-------|-------------------|
| `beforeCreate` | `setup()` 本身 |
| `created` | `setup()` 本身 |
| `beforeMount` | `onBeforeMount` |
| `mounted` | `onMounted` |
| `beforeUpdate` | `onBeforeUpdate` |
| `updated` | `onUpdated` |
| `beforeDestroy` | `onBeforeUnmount` |
| `destroyed` | `onUnmounted` |

---

## 7. 生态与迁移

### 已迁移到 Vue 3 的库
- Vue Router 4
- Vuex 4 / Pinia（官方推荐替代 Vuex）
- Vite（官方推荐替代 Vue CLI）
- Element Plus、Ant Design Vue 3、Naive UI

### 仍在 Vue 2 的库
- 部分小众 UI 库可能尚未适配

### 迁移建议
1. 新项目直接用 Vue 3 + Vite + Pinia
2. Vue 2 老项目可以通过 `@vue/compat` 渐进迁移
3. Vue 2 已于 2023 年底停止维护，建议尽早升级

---

## 总结

| 维度 | Vue 2 | Vue 3 |
|------|-------|-------|
| 响应式 | `Object.defineProperty` | `Proxy` |
| API 风格 | 选项式 | 选项式 + 组合式 |
| TypeScript | 弱支持 | 一等公民 |
| 性能 | 一般 | 提升 2~3 倍 |
| 包体积 | ~23KB | ~16KB |
| 多根节点 | 不支持 | 支持 |
| 维护状态 | 已停止 | 活跃开发 |

**结论：** 如果刚开始学 Vue，直接从 Vue 3 入手。如果是 Vue 2 老项目，建议尽快制定迁移计划。
