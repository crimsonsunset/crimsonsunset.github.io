import {get} from 'lodash'

export default {
    methods: {
        getSassConfig(key){
            const fullConfig = JSON.parse(JSON.parse(window.getComputedStyle(
                document.getElementById('sassData'), '::before'
            ).content));
            return get(fullConfig, [key]) || {}
        },
        scrollToTop() {
            const scrollDuration = 500;
            const scrollStep = -window.scrollY / (scrollDuration / 15),
                scrollInterval = setInterval(function () {
                    if (window.scrollY != 0) {
                        window.scrollBy(0, scrollStep);
                    }
                    else clearInterval(scrollInterval);

                    
                }, 15);
        },
    }
}