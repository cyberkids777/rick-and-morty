import { defineConfig ,presetWebFonts, presetUno } from 'unocss';

export default defineConfig({
    presets: [
        presetUno(),
        presetWebFonts({
            fonts: {
                poppins: [
                    {
                        name: 'Poppins',
                        weights: [
                            '500',
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
})