export interface NavMenuItem {
  title: string;
  icon: string;
  href?: string;
  url?: string;
  active?: boolean;
  subItems?: NavMenuItem[];
  disabled?: boolean;
  divider?: boolean;
  roles?: string[];
  permissions?: string[];
}
