import { Injectable } from '@angular/core';

/* The ThemeService class provides methods to set light and dark theme colors by updating
CSS variables in the document root element. */
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly _lightThemeColors: { [key: string]: string } = {
    // Primary theme colors
    '--orange': '#E9380B',
    '--yellow': '#FBC52D',
    '--dark-charcoal': '#333843',
    '--deep-gray': '#393B3D',
    '--slate-gray': '#667085',
    '--surface-1': '#FAFAFA',
    '--text-color-light': '#ffffff',
    '--text-color-medium': '#667085',
    '--text-color-dark': '#333843',
    // Grayscale
    '--white': '#fff',
    '--gray-100': '#f8f9fa',
    '--gray-200': '#e9ecef',
    '--gray-300': '#dee2e6',
    '--gray-400': '#ced4da',
    '--gray-500': '#adb5bd',
    '--gray-600': '#868e96',
    '--gray-700': '#495057',
    '--gray-800': '#343a40',
    '--gray-900': '#212529',
    '--black': '#000',
    // ... Add any additional light theme colors
  };

  private readonly _darkThemeColors: { [key: string]: string } = {
    // Adjusted primary theme colors for dark theme
    '--orange': '#D15F41',
    '--yellow': '#C2A44D',
    '--dark-charcoal': '#2B2F33',
    '--deep-gray': '#2F3134',
    '--slate-gray': '#4A5059',
    '--surface-1': '#202124',
    '--text-color-light': '#212529',
    '--text-color-medium': '#ced4da',
    '--text-color-dark': '#f8f9fa',
    // Inverted Grayscale for Dark Theme
    '--white': '#212529',
    '--gray-100': '#343a40',
    '--gray-200': '#495057',
    '--gray-300': '#868e96',
    '--gray-400': '#adb5bd',
    '--gray-500': '#ced4da',
    '--gray-600': '#dee2e6',
    '--gray-700': '#e9ecef',
    '--gray-800': '#f8f9fa',
    '--gray-900': '#fff',
    '--black': '#f8f9fa',
    // ... Add any additional dark theme colors
  };

  constructor() {}

  setLightTheme(): void {
    this._setTheme(this._lightThemeColors);
  }

  setDarkTheme(): void {
    this._setTheme(this._darkThemeColors);
  }

  private _setTheme(colors: Record<string, string>): void {
    const root = document.documentElement;
    Object.keys(colors).forEach((key) => {
      root.style.setProperty(key, colors[key]);
    });
  }
}
