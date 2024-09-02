import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/main.scss'

const app = createApp(App)

function getSum(a: number, b: number): number {
    return a + b
}

console.log(getSum(1, 2))

app.use(router)
app.mount('#app')