import {
  ActionIcon,
  Anchor,
  Button,
  Card,
  colorsTuple,
  Container,
  createTheme,
  DEFAULT_THEME,
  DefaultMantineColor,
  Input,
  InputBase,
  InputWrapper,
  LoadingOverlay,
  MantineColorsTuple,
  Menu,
  Modal,
  NavLink,
  PasswordInput,
  rem,
  Scroller,
  Select,
  Table,
  TextInput,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";

import { RouterLink } from "@/components/RouterLink";
import { BRAND_NAME } from "@/utils";

import classes from "./theme.module.css";

export const theme = createTheme({
  activeClassName: `${BRAND_NAME}-active`,

  primaryColor: "orange",

  colors: {
    "app-primary": colorsTuple("#ff7528"),
  },

  fontFamily: `Open Sans, ${DEFAULT_THEME.fontFamily}`,

  headings: {
    sizes: {
      h1: {},
      h2: {},
      h3: {},
      h4: {},
    },
  },

  shadows: {},

  other: {
    "color-default-border": "red",
  },

  components: {
    InputBase: InputBase.extend({}),

    Input: Input.extend({}),

    InputWrapper: InputWrapper.extend({
      classNames: {
        root: classes.InputWrapper,
      },
    }),

    TextInput: TextInput.extend({
      defaultProps: {},
    }),

    PasswordInput: PasswordInput.extend({
      defaultProps: {},
    }),

    Select: Select.extend({
      defaultProps: {},
    }),

    DatePickerInput: DatePickerInput.extend({
      defaultProps: {},
    }),

    NavLink: NavLink.extend({
      defaultProps: {
        component: RouterLink,
      },
    }),
    Anchor: Anchor.extend({
      defaultProps: {
        component: RouterLink,
      },
    }),

    Container: Container.extend({
      defaultProps: {},
    }),

    ActionIcon: ActionIcon.extend({
      defaultProps: {},
    }),

    Menu: Menu.extend({
      defaultProps: {},
    }),

    Modal: Modal.extend({
      defaultProps: {},
    }),

    Scroller: Scroller.extend({
      defaultProps: {},
    }),

    Table: Table.extend({
      defaultProps: {},
    }),

    Card: Card.extend({
      defaultProps: {},
    }),

    LoadingOverlay: LoadingOverlay.extend({
      defaultProps: {
        visible: true,
        loaderProps: { color: "app-primary", type: "bars" },
      },
    }),

    Button: Button.extend({
      defaultProps: {},
    }),
  },
});

type ExtendedCustomColors =
  | "app-primary"
  | "app-secondary"
  | "app-background"
  | "app-black"
  | DefaultMantineColor;

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, MantineColorsTuple>;
  }
}
