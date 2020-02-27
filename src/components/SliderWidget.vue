<template>
    <v-card>
        <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
            <swiper-slide v-for="image in images" :key="image.link" class="slide-img">
                <img :src="image.link" alt="">
                <p class="slide-text">{{image.text}}</p>
            </swiper-slide>
        </swiper>
        <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
            <swiper-slide v-for="image in images" :key="image.link" class="slide-img">
                <div class="wrap" @mouseover="image.isShown = true"
                     @mouseleave="image.isShown = false">
                    <img :src="image.link" alt="">
                    <transition name="fade">
                        <p class="slide-text" v-if="image.isShown" @mouseenter="image.isShown = true">{{image.text}}</p>
                    </transition>
                </div>

            </swiper-slide>
            <div class="swiper-button-next" slot="button-next"/>
            <div class="swiper-button-prev" slot="button-prev"/>
        </swiper>
    </v-card>
</template>
<script> import {swiper} from "vue-awesome-swiper";

export default {
    name: "SliderWidget",
    components: {swiper},
    data: () => ({
        images: [
            {
                link: "https://picsum.photos/id/7/1080/1080",
                text: "Image 1",
                isShown: false
            },
            {
                link: "https://picsum.photos/id/56/1920/1080",
                text: "Image 2",
                isShown: false
            },
            {
                link: "https://picsum.photos/id/92/1080/1080",
                text: "Image 3",
                isShown: false
            },
            {
                link: "https://picsum.photos/id/49/1920/1080",
                text: "Image 4",
                isShown: false
            },
            {
                link: "https://picsum.photos/id/85/1080/1080",
                text: "Image 5",
                isShown: false
            },
            {
                link: "https://picsum.photos/id/5/1920/1080",
                text: "Image 6",
                isShown: false
            },
            {
                link: "https://picsum.photos/id/87/1080/1080",
                text: "Image 7",
                isShown: false
            },
            {
                link: "https://picsum.photos/id/91/1920/1080",
                text: "Image 8",
                isShown: false
            },
            {
                link: "https://picsum.photos/id/90/1080/1080",
                text: "Image 9",
                isShown: false
            },
            {
                link: "https://picsum.photos/id/17/1920/1080",
                text: "Image 10",
                isShown: false
            }
        ],
        hover: false,
        swiperOptionTop: {
            spaceBetween: 10,
            autoHeight: true,
        },
        swiperOptionThumbs: {
            spaceBetween: 10,
            slidesPerView: 5,
            touchRatio: 0.3,
            centeredSlides: true,
            slideToClickedSlide: true,
            navigation: {nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev'}
        }
    }),
    mounted() {
        this.$nextTick(() => {
            const swiperTop = this.$refs.swiperTop.swiper;
            const swiperThumbs = this.$refs.swiperThumbs.swiper;

            swiperTop.controller.control = swiperThumbs;
            swiperThumbs.controller.control = swiperTop;

        });
    },
    methods: {}
} </script>
<style lang="scss" scoped>
    .swiper-container {
        background-color: #919191;
    }

    .gallery-thumbs {
        padding: 10px 0;
    }

    .gallery-thumbs .swiper-slide {
        width: 25%;
        height: 100%;
        opacity: 0.4;
    }

    .gallery-thumbs .swiper-slide-active {
        opacity: 1;
    }

    img {
        width: inherit;
        height: 100%;
        padding: 0;
        margin: 0;
    }

    .swiper-button-next {
        height: 30px;
        margin-top: -15px;
    }

    .swiper-button-prev {
        height: 30px;
        margin-top: -15px;
    }


    .slide-text {
        position: absolute;
        bottom: 20px;
        max-width: 50%;
        padding: 7px;
        background: #007aff;
        color: white;
        left: 50%;
        transform: translateX(-50%);
        font-size: 14px;
    }

    p {
        margin: 0;
        padding: 0;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity 200ms;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */
    {
        opacity: 0;
    }

    .wrap {
        width: 100%;
        height: auto;
    }

    @media screen and (max-width: 600px) {
        .swiper-button-next {
            height: 18px;
            margin-top: -9px;
        }
        .swiper-button-prev {
            height: 18px;
            margin-top: -9px;
        }
    }
</style>