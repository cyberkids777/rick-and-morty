import { defineConfig ,presetWebFonts, presetUno, presetIcons } from 'unocss';

export default defineConfig({
    presets: [
        presetUno(),
        presetIcons({
            cdn: 'https://fonts.googleapis.com/icon?family=Material+Icons',
        }),
        presetWebFonts({
            fonts: {
                poppins: [
                    {
                        name: 'Poppins',
                        weights: [
                            '400', '500',
                        ],
                        italic: true,
                    },
                    {
                        name: 'sans-serif',
                        provider: 'none',
                    },
                ],
            },
        }),
    ],
    rules: [
        [
            'flex-c-1', { flex: '0 1 167px' },
        ],
        [
            'flex-c-2', { flex: '0 1 212px' },
        ],
        [
            'flex-c-3', { flex: '0 1 227px' },
        ],
    ],
    theme: {
        colors: {
            primary: '#11B0C8',
            secondary: '#E5EAF4',
            thirdiary: '#A9B1BD',
        },
    },
    shortcuts: {
        'style-reset': 'bg-transparent border-none appearance-none',
        'poppins-500': 'font-poppins font-500',
    },
})