import { useMemo } from 'react';

import { ItemTags } from '@/layouts/ExtendedSidebarLayout/Sidebar/SidebarMenu/items';

import menuItems, { MenuItem } from './items';

const checkTag = (tag: string | number[] | number, check: string | number) => {
  if (Array.isArray(tag)) {
    return tag.includes(check as number);
  }
  return tag === check;
};

export const useFilteredSidebarItems = () => {
  const flagFilteredMenuItems = useMemo(() => {
    return menuItems();
  }, []);

  const sidebarItems = useMemo(() => {
    const filterCheck = (item: MenuItem): boolean => {
      if (checkTag(item.tag, ItemTags.HideItem)) return false;
      return true;
    };

    const itemsFilter = (items?: MenuItem[]): MenuItem[] => {
      return items?.filter(filterCheck).map((item) => ({
        ...item,
        items: itemsFilter(item.items)
      }));
    };

    return flagFilteredMenuItems
      .map((section) => ({
        ...section,
        items: itemsFilter(section.items)
      }))
      .filter((section) => section.items?.length);
  }, [flagFilteredMenuItems]);

  return sidebarItems;
};
