
export default defineNuxtPlugin((nuxtApp) => {
    const store = useStore();
    return {
        provide: {
            store
        }
    }
});