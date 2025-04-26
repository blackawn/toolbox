import type { ThemeConfig } from 'antd'
import type { Theme } from '@renderer/components/PersonalizeProvider'
import color from 'color'
import tw from 'tailwindcss/colors'

export const getThemeConfig = (theme: Theme = 'light', primary?: string) => {
  if (theme === 'light') {
    return lightThemeConfig(primary)
  } else if (theme === 'dark') {
    return darkThemeConfig(primary)
  } else {
    const darkMatches = window.matchMedia('(prefers-color-scheme: dark)').matches
    return darkMatches ? darkThemeConfig(primary) : lightThemeConfig(primary)
  }
}

export const lightThemeConfig = (primary?: string): ThemeConfig => {
  return {
    token: {
      colorSplit: tw.neutral[50]
    },
    components: {
      Menu: {
        itemBg: 'transparent',
        activeBarBorderWidth: 0,
        subMenuItemBg: 'transparent',
        itemHoverBg: tw.neutral[200],
        itemActiveBg: tw.neutral[300],
        itemSelectedBg: color(primary).alpha(0.1).hexa(),
        itemBorderRadius: 2
      },
      Tooltip: {
        colorBgSpotlight: tw.white,
        colorTextLightSolid: tw.neutral[700]
      },
      Tabs: {
        horizontalItemPadding: '0px 0px 8px'
      }
    }
  }
}

export const darkThemeConfig = (primary?: string): ThemeConfig => {
  return {
    token: {
      colorSplit: tw.neutral[700]
    },
    components: {
      Menu: {
        itemBg: 'transparent',
        activeBarBorderWidth: 0,
        subMenuItemBg: 'transparent',
        itemHoverBg: tw.neutral[700],
        itemActiveBg: tw.neutral[600],
        itemSelectedBg: color(primary).alpha(0.1).hexa(),
        itemSelectedColor: color(primary).lighten(0.5).hexa(),
        itemBorderRadius: 2
      },
      Dropdown: {
        colorBgElevated: tw.neutral[700]
      },
      Popover: {
        colorBgElevated: tw.neutral[700]
      },
      Tabs: {
        horizontalItemPadding: '0px 0px 8px'
      },
    }
  }
}
