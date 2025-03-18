# Theming Guide

Dred provides a flexible theming system that allows you to customize the appearance of your applications.

## Theme Structure

Themes in Dred are defined using a combination of CSS variables and Tailwind CSS utilities.

### Basic Theme Configuration

```js
// dred.theme.js
export default {
    colors: {
        primary: {
            light: '#f472b6',
            DEFAULT: '#ec4899',
            dark: '#be185d'
        },
        secondary: {
            light: '#a5b4fc',
            DEFAULT: '#6366f1',
            dark: '#4338ca'
        },
        background: {
            light: '#ffffff',
            DEFAULT: '#f9fafb',
            dark: '#111827'
        }
    },
    typography: {
        fontFamily: {
            sans: ['Inter', 'sans-serif'],
            mono: ['Fira Code', 'monospace']
        },
        fontSize: {
            base: '1rem',
            lg: '1.125rem',
            xl: '1.25rem'
        }
    },
    spacing: {
        container: '2rem',
        content: '1.5rem'
    }
}
```

## CSS Variables

Dred uses CSS variables for dynamic theming:

```css
:root {
    /* Colors */
    --dred-primary: theme('colors.pink.500');
    --dred-secondary: theme('colors.violet.500');
    --dred-background: theme('colors.white');
    
    /* Typography */
    --dred-font-sans: theme('fontFamily.sans');
    --dred-font-mono: theme('fontFamily.mono');
    
    /* Spacing */
    --dred-spacing-sm: theme('spacing.4');
    --dred-spacing-md: theme('spacing.6');
    --dred-spacing-lg: theme('spacing.8');
}

.dark {
    --dred-primary: theme('colors.pink.400');
    --dred-secondary: theme('colors.violet.400');
    --dred-background: theme('colors.gray.900');
}
```

## Component Theming

### Message Components

```css
.dred-message {
    @apply bg-white dark:bg-gray-800;
    @apply rounded-lg shadow-sm;
    @apply p-4;
}

.dred-message-header {
    @apply text-sm font-medium;
    @apply text-gray-700 dark:text-gray-300;
}

.dred-message-content {
    @apply mt-1 text-sm;
    @apply text-gray-500 dark:text-gray-400;
}
```

### Input Components

```css
.dred-input {
    @apply block w-full rounded-md;
    @apply border-gray-300 dark:border-gray-700;
    @apply bg-white dark:bg-gray-800;
    @apply text-gray-900 dark:text-gray-100;
    @apply shadow-sm;
    @apply focus:border-primary-500 focus:ring-primary-500;
}
```

## Custom Theme Example

Here's how to create and apply a custom theme:

```js
// custom-theme.js
import { createTheme } from '@dred/theming'

export const customTheme = createTheme({
    name: 'custom',
    colors: {
        primary: {
            light: '#93c5fd',
            DEFAULT: '#3b82f6',
            dark: '#1d4ed8'
        }
    },
    // Extend the default theme
    extend: {
        borderRadius: {
            DEFAULT: '0.5rem'
        },
        shadows: {
            DEFAULT: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
        }
    }
})
```

Apply the theme in your application:

```js
import { ThemeProvider } from '@dred/theming'
import { customTheme } from './custom-theme'

function App() {
    return (
        <ThemeProvider theme={customTheme}>
            <YourApp />
        </ThemeProvider>
    )
}
```

## Best Practices

- Use CSS variables for values that need to change dynamically
- Leverage Tailwind's utility classes for consistent styling
- Create theme variations using the dark mode selector
- Keep color schemes accessible with sufficient contrast
- Use semantic color names in your theme configuration

## Next Steps

- Explore our [Component Library](./components) for more styling options
- Learn about [Dark Mode](./dark-mode) implementation
- See [Theme Examples](./theme-examples) for inspiration
- Check out our [Accessibility Guide](./accessibility) for creating inclusive themes 