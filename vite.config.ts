import reactRefresh from '@vitejs/plugin-react-refresh'
import path from 'path'
import babel from 'rollup-plugin-babel'
import visualizer from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import vitePluginImp from 'vite-plugin-imp'
import viteSvgIcons from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        babel({ runtimeHelpers: true, exclude: 'node_modules/**' }),
        reactRefresh(),
        visualizer({
            open: true,
            gzipSize: true,
            brotliSize: true,
            filename: 'dist/stats.html'
        }),
        viteSvgIcons({
            // Specify the icon folder to be cached
            iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
            // Specify symbolId format
            symbolId: 'icon-[dir]-[name]'
        })
        // vitePluginImp({
        //     libList: [
        //         {
        //             libName: 'antd',
        //             style: name => `antd/es/${name}/style`,
        //             libDirectory: 'es'
        //         }
        //     ]
        // })
    ],
    // optimizeDeps: {
    //     include: ['@ant-design/colors', '@ant-design/icons']
    // },
    css: {
        modules: {
            localsConvention: 'camelCaseOnly'
        },
        preprocessorOptions: {
            styl: {
                imports: [path.resolve(process.cwd(), 'src/assets/stylus/lib/mixin.styl')]
            },
            less: {
                javascriptEnabled: true,
                modifyVars: {
                    '@primary-color': '#1890ff'
                }
            }
        }
    },
    server: {
        open: true
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: [
                        'react',
                        'react-dom',
                        'react-router',
                        'react-router-dom',
                        'react-redux',
                        'redux',
                        'redux-actions',
                        'axios',
                        'i18next',
                        'react-i18next',
                        'i18next-browser-languagedetector'
                    ]
                }
            }
        }
    }
})
