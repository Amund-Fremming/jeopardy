# Style (Claude.ai dark + orange)

**Colors:** BG:#1E1E1E/#2D2D2D/#181818, Text:#ECECEC/#A8A8A8, Orange:#CC785C(primary)/#E08B6D(hover)/#B36B4F(active), Func:success#4CAF50/error#EF4444/warning#FFA726, Border:#404040

**Type:** Fonts:system-ui,SF Pro,Segoe UI | Sizes:h1=2.5r(700),h2=2r(600),h3=1.5r(600),h4=1.125r(600),base=1r

**Space:** 1=.25r,2=.5r,3=.75r,4=1r,6=1.5r,8=2r | Radius:sm=.25r,md=.5r,lg=.75r,xl=1r | Shadow:sm/md/lg/xl

**Layout:**

```css
.board {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: var(--space-3);
  padding: var(--space-6);
  max-width: 1920px;
  margin: 0 auto;
}
@media (max-width: 1024px) {
  .board {
    gap: var(--space-2);
    padding: var(--space-4);
  }
}
@media (max-width: 768px) {
  .board {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

**Components:** Headers=orange 600-700 | Cell=bg-secondary border-medium radius-md hover:elevated+orange+transform | Category=bg-tertiary orange uppercase 2px-border | Button:primary=orange,secondary=transparent+orange-hover | Modal=bg-secondary radius-xl shadow-xl orange-header | Anim:fadeIn/slideUp/pulse | WCAG AA✓
