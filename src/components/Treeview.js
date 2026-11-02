import { escape } from './utils.js';

const FOLDER_ICON = '<svg viewBox="0 0 16 16" width="14" height="14"><path d="M1.5 3.5h5l1.5 1.5h6.5v8h-13z" fill="none" stroke="currentColor"/></svg>';
const COMPONENT_ICON = '<svg viewBox="0 0 16 16" width="14" height="14"><rect x="2.5" y="2.5" width="11" height="11" rx="1.5" fill="none" stroke="currentColor"/><path d="M8 2.5v11M2.5 8h11" stroke="currentColor"/></svg>';

// Accessible: ARIA tree pattern with roving tabindex and arrow-key navigation.
// Inaccessible: clickable divs only, no roles, not keyboard reachable.
export function Treeview({ label = 'Components', items, accessible = true }) {
  const root = document.createElement(accessible ? 'ul' : 'div');
  root.className = 'c-tree';
  if (accessible) {
    root.setAttribute('role', 'tree');
    root.setAttribute('aria-label', label);
  }

  const groupOf = (item) => item.querySelector(':scope > .c-tree__group');
  const setExpanded = (item, open) => {
    item.dataset.expanded = String(open);
    item.setAttribute('aria-expanded', String(open));
    groupOf(item).hidden = !open;
  };

  const build = (nodes, container, level) => {
    nodes.forEach((node) => {
      const item = document.createElement(accessible ? 'li' : 'div');
      item.className = 'c-tree__item';
      const hasChildren = Boolean(node.children?.length);
      const row = document.createElement('span');
      row.className = 'c-tree__row';
      row.style.paddingLeft = `${(level - 1) * 20 + 4}px`;
      row.innerHTML = `<span class="c-tree__toggle" aria-hidden="true"></span><span class="c-tree__icon" aria-hidden="true">${hasChildren ? FOLDER_ICON : COMPONENT_ICON}</span>${escape(node.label)}`;
      item.append(row);
      if (accessible) {
        item.setAttribute('role', 'treeitem');
        item.setAttribute('aria-level', level);
        item.setAttribute('aria-selected', 'false');
        item.tabIndex = -1;
      }
      if (hasChildren) {
        const group = document.createElement(accessible ? 'ul' : 'div');
        group.className = 'c-tree__group';
        if (accessible) group.setAttribute('role', 'group');
        build(node.children, group, level + 1);
        item.append(group);
        setExpanded(item, Boolean(node.expanded));
      }
      container.append(item);
    });
  };
  build(items, root, 1);

  const visibleItems = () => [...root.querySelectorAll('.c-tree__item')].filter((item) => !item.closest('[hidden]'));
  const focusItem = (item) => {
    if (!item || !accessible) return;
    root.querySelectorAll('.c-tree__item').forEach((i) => (i.tabIndex = -1));
    item.tabIndex = 0;
    item.focus();
  };
  const select = (item) => {
    root.querySelectorAll('.is-selected').forEach((i) => {
      i.classList.remove('is-selected');
      if (accessible) i.setAttribute('aria-selected', 'false');
    });
    item.classList.add('is-selected');
    if (accessible) item.setAttribute('aria-selected', 'true');
  };
  const activate = (item) => {
    if (groupOf(item)) setExpanded(item, item.dataset.expanded !== 'true');
    select(item);
  };

  if (accessible) root.querySelector('.c-tree__item').tabIndex = 0;

  root.addEventListener('click', (event) => {
    const row = event.target.closest('.c-tree__row');
    if (!row) return;
    activate(row.parentElement);
    focusItem(row.parentElement);
  });

  if (accessible) {
    root.addEventListener('keydown', (event) => {
      const item = event.target.closest('.c-tree__item');
      const items = visibleItems();
      const index = items.indexOf(item);
      const expandable = Boolean(groupOf(item));
      const expanded = item.dataset.expanded === 'true';
      switch (event.key) {
        case 'ArrowDown': focusItem(items[index + 1]); break;
        case 'ArrowUp': focusItem(items[index - 1]); break;
        case 'Home': focusItem(items[0]); break;
        case 'End': focusItem(items.at(-1)); break;
        case 'ArrowRight':
          if (expandable && !expanded) setExpanded(item, true);
          else if (expandable) focusItem(groupOf(item).firstElementChild);
          break;
        case 'ArrowLeft':
          if (expandable && expanded) setExpanded(item, false);
          else focusItem(item.parentElement.closest('.c-tree__item'));
          break;
        case 'Enter':
        case ' ': activate(item); break;
        default: return;
      }
      event.preventDefault();
    });
  }
  return root;
}
