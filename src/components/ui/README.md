# LetterPagination 组件使用说明

## 简介
`LetterPagination` 是一个用于信件内容分页的组件，支持平滑的翻页动画和页码导航。

## 基本用法

```tsx
import { LetterPagination } from '@/components';

function MyLetter() {
  return (
    <LetterPagination
      pages={[
        // 第一页内容
        <>
          <p>这是第一页的内容</p>
        </>,
        
        // 第二页内容
        <>
          <p>这是第二页的内容</p>
        </>,
        
        // 第三页内容
        <>
          <p>这是第三页的内容</p>
        </>
      ]}
    />
  );
}
```

## Props

| 属性      | 类型        | 必需 | 默认值 | 说明                           |
| --------- | ----------- | ---- | ------ | ------------------------------ |
| pages     | ReactNode[] | 是   | -      | 页面内容数组，每个元素代表一页 |
| className | string      | 否   | ""     | 自定义样式类名                 |

## 功能特性

- ✅ 点击"上一页"/"下一页"按钮翻页
- ✅ 点击页码指示器快速跳转到指定页
- ✅ 平滑的翻页过渡动画（使用 GSAP）
- ✅ 翻页时防止重复点击
- ✅ 自动禁用边界按钮（首页禁用"上一页"，末页禁用"下一页"）
- ✅ 响应式设计，适配移动端

## 在 LetterTemplate 中使用

```tsx
<LetterTemplate
  title="我的信件"
  date="2025年1月1日"
  sender="发件人"
>
  <LetterPagination
    pages={[
      <div key={1}>第一页内容</div>,
      <div key={2}>第二页内容</div>,
      <div key={3}>第三页内容</div>
    ]}
  />
</LetterTemplate>
```

## 配合 letter.css 样式使用

可以在页面内容中使用预定义的样式类：

```tsx
<LetterPagination
  pages={[
    <>
      <p className="letter-header">标题</p>
      <p className="letter-text">正文内容</p>
      <div className="letter-quote">
        <p>引用内容</p>
        <footer>—— 引用来源</footer>
      </div>
    </>,
    // 更多页面...
  ]}
/>
```

## 自定义样式

可以通过 `className` 属性添加自定义样式：

```tsx
<LetterPagination
  className="my-custom-pagination"
  pages={pages}
/>
```

## 注意事项

1. 建议每页内容不要过长，以保证阅读体验
2. 页面内容使用 React Fragment (`<>...</>`) 包裹
3. 组件依赖 GSAP 库进行动画，确保项目已安装
4. 翻页动画期间会禁用所有交互，避免动画冲突
