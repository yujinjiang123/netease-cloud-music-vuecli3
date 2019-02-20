<template>
    <div class="player-info">
        <div class="bg" :style="{backgroundImage: 'url(' + imgUrl+')'}">
            <div class="hs"></div>
        </div>
        <div class="container">
            <el-row :gutter="10">
                <el-col :xs="24" :sm="24" :md="10" :lg="12">
                    <div class="image-container">
                        <div v-if="show" ref="surround1" class="surround" :style="{borderColor:imgColor}">
                            <span class="circle circle1" :style="{backgroundColor:imgColor}"></span>
                        </div>
                        <div v-if="show" ref="surround2" class="surround" :style="{borderColor:imgColor}">
                            <span class="circle circle2" :style="{backgroundColor:imgColor}"></span>
                        </div>
                        <div v-if="show" ref="surround3" class="surround" :style="{borderColor:imgColor}">
                            <span class="circle circle3" :style="{backgroundColor:imgColor}"></span>
                        </div>
                        <img ref="img" :src="imgUrl" :class="{image:true,rotate:!isPlay}"/>
                    </div>
                </el-col>
                <el-col :sm="24" :md="14" :lg="12" class="hidden-xs-only">
                    <div class="grid-content bg-purple-light"></div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>

    export default {
        name: "PlayerInfo",
        props: {
            imgUrl: {
                type: String
            },
            isPlay: {
                type: Boolean,
                require: true
            }
        },
        data() {
            return {
                show: false,
                imgColor: 'blue',
                surroundList: [],
            }
        },
        watch: {
            imgUrl(val) {
                this.pauseSuuround();
            }
        },
        methods: {
            getColor() {
                const URL = `http://${location.host}/img${this.imgUrl.slice('https://p1.music.126.net'.length)}`;
                RGBaster.colors(URL, {
                    paletteSize: 1,
                    success: (payload) => {
                        this.imgColor = payload.secondary;
                        this.playSuuround();
                    }
                })
            },
            handlerSurround(handle){
                let time=1;
                for(let i in this.$refs){
                    if(i.indexOf('surround')!==-1){
                            this.$refs[i].style.animationPlayState=handle;
                    }
                    time++;
                }
            },
            pauseSuuround() {
                this.show = false;
            },
            playSuuround() {
                this.show = true;
                this.$nextTick(() => {
                    this.surroundList=[];
                    for (let i in this.$refs) {
                        if (i.indexOf('surround') !== -1) {
                            this.surroundList.push(this.$refs[i])
                        }
                    }
                    this.surroundList.forEach(item => item.style.animationPlayState = 'paused');
                    this.surroundList.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.animationPlayState = 'running'
                        }, (index + 1) * 1000);
                    })
                })
            }
        },
        mounted() {
            this.$refs.img.onload = () => {
                this.getColor();
            };
            this.$watch(() => this.isPlay, (val) => {
                if (val) {
                    this.$refs.img.style.animationPlayState = 'running';
                    this.handlerSurround('running');
                } else {
                    this.$refs.img.style.animationPlayState = 'paused';
                    this.handlerSurround('paused')
                }
            }, {
                immediate: true
            });
        },
        created() {
        }
    }
</script>

<style scoped>

    .el-row {
        height: 70%;
    }

    .el-col {
        height: 100%;
    }

    .player-info {
        position: relative;
    }

    .player-info .container {
        position: absolute;
        z-index: 2;
        width: 80%;
        top: 100px;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }

    @media (max-width: 768px) {
        .player-info .container {
            width: 100%;
            top: 20px;
            display: flex;
            align-items: center;
        }

        .image-container .image {
            width: 68%;
        }
    }

    .image-container {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .surround {
        width: 95%;
        height: 0;
        padding-bottom: 95%;
        position: absolute;
        border: 1px solid red;
        border-radius: 50%;
        animation: round 3s infinite linear;
    }

    .circle {
        border-radius: 50%;
        background-color: red;
        position: absolute;
        margin: auto;
        opacity: inherit;
        overflow: auto;
    }

    .circle1 {
        width: 10px;
        height: 10px;
        top: -5px;
        left: 0;
        right: 0;
    }

    .circle2{
        width: 15px;
        height: 15px;
        top: -8px;
        left: 0;
        right: 0;
    }

    .circle3{
        width: 8px;
        height: 8px;
        top: -4px;
        left: 0;
        right: 0;
    }

    .image {
        width: 70%;
        border-radius: 70%;
        border: 5px solid rgba(181, 181, 181, 0.4);
        animation: rotate-x 17s infinite linear;
        animation-fill-mode: backwards;
    }

    .bg {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        overflow: hidden;
        filter: blur(13px);
    }

    .hs {
        background: hsla(0, 0%, 44%, .5);
        width: 100%;
        height: 100%;
    }


    @keyframes rotate-x {
        from {
        }
        to {
            transform: rotate(360deg)
        }
    }

    @keyframes round {
        from {
            opacity: .8;
            width: 60%;
            padding-bottom: 60%;
        }
        to {
            transform: rotate(-280deg);
            opacity: 0;
        }
    }
</style>
