import type { ThemeConfig } from 'antd'
import type { Theme } from '@renderer/components/PersonalizeProvider'
import color from 'color'
import tw from 'tailwindcss/colors'

export const getThemeConfig = (theme: Theme = 'light', primary?: string) => {
  return theme === 'dark' ? darkThemeConfig : lightThemeConfig(primary)
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
        itemHoverBg: tw.neutral[100],
        itemActiveBg: tw.neutral[300],
        itemSelectedBg: color(primary).alpha(0.1).hexa(),
        itemBorderRadius: 2
      },
      Tooltip: {
        colorBgSpotlight: tw.white,
        colorTextLightSolid: tw.neutral[700],
      }
    }
  }
}

export const darkThemeConfig: ThemeConfig = {
  token: {
    colorSplit: tw.neutral[700]
  },
  components: {
    Menu: {
      itemBg: 'transparent',
      activeBarBorderWidth: 0,
      subMenuItemBg: 'transparent'
    },
    Dropdown: {
      colorBgElevated: tw.neutral[700]
    },
    Popover: {
      colorBgElevated: tw.neutral[700]
    },
  }
}
