<template>
    <v-card>
        <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
            <swiper-slide v-for="image in images" :key="image.index" class="slide-img">
                <img :src="image.link" alt="">
            </swiper-slide>

        </swiper>
        <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
            <swiper-slide v-for="image in images" :key="image.index" class="slide-img">
                <img :src="image.link" alt="">
            </swiper-slide>
            <div class="swiper-button-next" slot="button-next"/>
            <div class="swiper-button-prev" slot="button-prev"/>
        </swiper>
    </v-card>
</template>

<script>
  import {swiper} from "vue-awesome-swiper";

  export default {
    name: "SliderWidget",
    components: {
      swiper
    },
    data: () => ({
      images: [],
      swiperOptionTop: {
        spaceBetween: 10,
        effect: 'fade',
        loop: true,
        loopedSlides: 5, //looped slides should be the same
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      swiperOptionThumbs: {
        spaceBetween: 10,
        slidesPerView: 4,
        touchRatio: 0.2,
        loop: true,
        centeredSlides: true,
        slideToClickedSlide: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }),
    mounted() {
      this.$nextTick(() => {
        const swiperTop = this.$refs.swiperTop.swiper;
        const swiperThumbs = this.$refs.swiperThumbs.swiper;
        swiperTop.controller.control = swiperThumbs;
        swiperThumbs.controller.control = swiperTop;
      });
      this.loadImages()
    },
    methods: {
      loadImages() {
        for (let i = 0; i < 10; i++) {
          this.images.push({
            link: `https://picsum.photos/id/${Math.ceil(Math.random() * 100)}/1920/1080`
          })
        }
      }
    }
  }

</script>

<style lang="scss" scoped>
    .swiper-container {
        background-color: #919191;
    }

    .gallery-top {
        height: 40% !important;
        width: 100%;
    }

    .gallery-thumbs {
        box-sizing: border-box;
        padding: 10px 0;

        .swiper-slide {
            width: 25%;
            height: 100%;
            opacity: 0.4;
        }

        .swiper-slide-active {
            opacity: 1;
        }
    }

    img {
        width: inherit;
        height: inherit;
    }
</style>
