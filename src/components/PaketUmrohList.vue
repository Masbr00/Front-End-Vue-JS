<template>
    <div class="list row">
        <div class="col-md-8">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="search by title" v-model="title">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" @click="searchTitle">search</button>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <h4>Daftar Paket Umroh</h4>
            <ul class="list-group">
                <li class="list-group-item"
                    :class="{ active: index == currentIndex }"
                    v-for="(paketumroh, index) in paketumroh.data"
                    :key="index"
                    @click="setActivePaketUmroh(paketumroh, index)"
                    >
                    {{ paketumroh.slug }}
                </li>
            </ul>

        </div>
        <div class="col-md-6">
            <div v-if="currentPaketUmroh">
                <h4>Paket Umroh</h4>
                <div>
                    <label><strong>Slug</strong></label> {{ currentPaketUmroh.slug }}
                </div>
                <div>
                    <label><strong>Title</strong></label> {{ currentPaketUmroh.title }}
                </div>
                <div>
                    <label><strong>Content</strong></label> {{ currentPaketUmroh.content }}
                </div>

                <a class="badge badge-warning" :href="'/paketumroh/' + currentPaketUmroh.slug" style="color: red">Edit</a>
            </div>
            <div v-else>
                <br />
                <p>Please click on a Product...</p>
            </div>
        </div>
    </div>
</template>

<script>
import PaketUmrohService from '../services/PaketUmrohService'

export default {
    name: "paketumroh-list",
    data() {
        return {
            paketumroh: [],
            currentPaketUmroh: null,
            currentIndex: -1,
            title: ""
        };
    },
    methods: {
        retrievePaketUmroh() {
            PaketUmrohService.getAll()
            .then(response => {
                this.paketumroh = response.data;
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        },

        refreshList() {
            this.retrievePaketUmroh();
            this.currentPaketUmroh = null;
            this.currentIndex = -1
        },

        setActivePaketUmroh(paketumroh, index) {
            this.currentPaketUmroh = paketumroh;
            this.currentIndex = index;
        },

        searchTitle() {
            PaketUmrohService.findByTitle(this.title)
                .then(response => {
                this.paketumroh = response.data;
                console.log(response.data);
                })
                .catch(e => {
                console.log(e);
                });
        }
    },
    mounted(){
        this.retrievePaketUmroh()
    }
};
</script>

<style>
.list {
    text-align: left;
    max-width: 750px;
    margin: auto;
}
</style>