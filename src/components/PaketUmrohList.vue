<template>
    <div class="list row">
        <div class="col-md-8">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="search by slug" v-model="paketumroh.slug">
                <div class="input-group-append">
                    <div v-if="paketumroh.slug">
                        <button class="btn btn-outline-secondary" type="button" @click="searchSlug">Search</button>
                    </div>
                    <div v-else>
                        <button class="btn btn-outline-secondary" type="button" @click="retrievePaketUmroh">Search</button>
                    </div>
                    <button class="btn btn-outline-secondary ml-3" type="button" @click="refreshList">Refresh List</button>
                </div>
            </div>
        </div>
        <div class="col-md-12">
            <div class="mb-3">
                <label for="range">Total Items Per Page </label>
                <div id="range">
                    <table class="mb-3">
                        <tr>
                            <td>
                                <input class="form-control form-range" type="range" min="1" max="30" step="1" v-model="pageSize" @change="handlePageSizeChange($event)" style="width: 148px">
                            </td>
                            <td>
                                <input class="form-control-plaintext ml-3" type="number" v-model="pageSize" style="width: 40px" readonly disabled/>
                            </td>
                        </tr>
                    </table>
                </div>
                <b-pagination
                    v-model="page"
                    :total-rows="count"
                    :per-page="pageSize"
                    prev-text="Prev"
                    next-text="Next"
                    @change="handlePageChange"
                ></b-pagination>
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
                    {{ paketumroh.title }}
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
                <div >
                    <label><strong>Content `</strong></label>{{ currentPaketUmroh.content }}
                </div>
                <div>
                    <div v-if="toggleCategory">
                        <label><strong>Category</strong></label> {{ currentPaketUmroh.category.category }}
                    </div>
                    <div v-if="!toggleCategory">
                        <label><strong>Category</strong></label>
                        <ul>
                            <li>
                                Category   : {{currentPaketUmroh.category.category[0].category}}
                            </li>
                            <li>
                                Deskripsi   : {{currentPaketUmroh.category.category[0].description}}
                            </li>
                        </ul>
                    </div>
                </div>
                <div>
                    <label><strong>Price</strong></label> {{ currentPaketUmroh.price }}
                </div>
                <div>
                    <label><strong>Quota</strong></label> {{ currentPaketUmroh.quota }}
                </div>
                <div>
                    <label><strong>Paylater</strong></label> {{ currentPaketUmroh.paylater }}
                </div>
                <div>
                    <label><strong>Cashback</strong></label><br>
                    <div class="table-responsive-sm">
                        <table class="table table-responsive table-striped table-hover text-center table-bordered">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Jamaah</th>
                                    <th scope="col">Agent Standard</th>
                                    <th scope="col">Agent VIP</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">
                                        Model
                                    </th>
                                    <td>
                                        {{ currentPaketUmroh.cashback.jamaah.model }}
                                    </td>
                                    <td>
                                        {{ currentPaketUmroh.cashback.agent_standard.model }}
                                    </td>
                                    <td>
                                        {{ currentPaketUmroh.cashback.agent_vip.model }}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        Nominal
                                    </th>
                                    <td>
                                        {{ currentPaketUmroh.cashback.jamaah.nominal }}
                                    </td>
                                    <td>
                                        {{ currentPaketUmroh.cashback.agent_standard.nominal }}
                                    </td>
                                    <td>
                                        {{ currentPaketUmroh.cashback.agent_vip.nominal }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <label><strong>Schedule Umroh</strong></label><br>
                    <div class="table-responsive-sm">
                        <table class="table table-responsive table-striped table-hover text-center table-bordered">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">Manasik Date</th>
                                    <th scope="col">Takeoff Date</th>
                                    <th scope="col">Home Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        {{ currentPaketUmroh.schedule_umroh.manasik_date | formatDate }}
                                    </td>
                                    <td>
                                        {{ currentPaketUmroh.schedule_umroh.takeoff_date | formatDate }}
                                    </td>
                                    <td>
                                        {{ currentPaketUmroh.schedule_umroh.home_date | formatDate }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <label><strong>Maskapai</strong></label> {{ currentPaketUmroh.accommodate.maskapai }}
                </div>

                <div>
                    <label><strong>Kamar</strong></label><br>
                    <div class="table-responsive-sm">
                        <table  class="table table-striped table-hover text-center table-bordered">
                            <tr v-if="!toggleKamar">
                                <th>
                                    Room Name
                                </th>
                                <td v-for="(room_name,item) in currentPaketUmroh.accommodate.kamar" :key="item">
                                    <template v-for="name in room_name.detail_kamar">
                                        {{name[item].name}}
                                    </template>
                                </td>
                            </tr>
                            <tr v-if="!toggleKamar">
                                <th>
                                    Available
                                </th>
                                <td v-for="(room_status,item) in currentPaketUmroh.accommodate.kamar" :key="item">
                                    <template v-for="status in room_status.detail_kamar">
                                        {{status[item].available}}
                                    </template>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Room Type
                                </th>
                                <td v-for="(type,item) in currentPaketUmroh.accommodate.kamar" :key="item">
                                    {{type.type_kamar}}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Quota
                                </th>
                                <td v-for="(kuota,item) in currentPaketUmroh.accommodate.kamar" :key="item">
                                    {{kuota.kuota}}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    price
                                </th>
                                <td v-for="(price,item) in currentPaketUmroh.accommodate.kamar" :key="item">
                                    {{price.price}}
                                </td>
                            </tr>
                        </table>
                        <!-- when searching with slug -->
                        <!-- <table v-if="!toggleKamar" class="table table-striped table-hover text-center table-bordered">
                            <tr>
                                <th>
                                    Room Type
                                </th>
                                <td v-for="(type,item) in currentPaketUmroh.accommodate.kamar" :key="item">
                                    asdsf
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Quota
                                </th>
                                <td>
                                    xcvxcv
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    price
                                </th>
                                <td>
                                    bvnvb
                                </td>
                            </tr>
                        </table> -->
                    </div>
                </div>

                <div>
                    <label><strong>Image</strong></label>
                    <br>
                    <button @click='toggleImg = !toggleImg'>Show Image </button>
                    <img class="mt-3" v-show="toggleImg" v-bind:src="currentPaketUmroh.image" height="162">
                </div>
                
                <!-- Bagian Vendor -->
                <hr>
                <button class="mb-3" @click='toggleVendor = !toggleVendor'>Vendor Detail </button>
                <div v-show="toggleVendor">
                    <div>
                        <label><strong>Vendor ID</strong></label> {{ currentPaketUmroh.vendor.id }}
                    </div>
                    <div>
                        <label><strong>Vendor Name</strong></label> {{ currentPaketUmroh.vendor.vendor_name }}
                    </div>
                    <div>
                        <label><strong>Vendor Email</strong></label> {{ currentPaketUmroh.vendor.email }}
                    </div>
                    <div>
                        <label><strong>Vendor Phone</strong></label> {{ currentPaketUmroh.vendor.phone }}
                    </div>
                </div>
                <br>
                <a class="btn btn-warning px-4" :href="'/paketumroh/' + currentPaketUmroh.slug">Edit</a>
                <button class="btn btn-danger ml-3" @click="removeSlug">Delete</button>
            </div>
            <div v-else>
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
            title: "",
            toggleVendor: false,
            toggleImg: false,
            toggleCategory: true,
            toggleKamar: true,

            page : 1,
            pageSize: 10,
            count: 0,
        };
    },
    methods: {
        retrievePaketUmroh() {
            const params = this.getRequestParams(
                this.page,
                this.pageSize
            )

            PaketUmrohService.getAll(params)
            .then(response => {
                this.paketumroh = response.data
                const totalItems = response.data
                this.count = totalItems.totalDoc
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        },

        refreshList() {
            this.retrievePaketUmroh();
            this.toggleKamar = true
            this.toggleCategory = true
            this.currentPaketUmroh = null;
            this.currentIndex = -1
        },

        setActivePaketUmroh(paketumroh, index) {
            this.currentPaketUmroh = paketumroh;
            this.currentIndex = index;
        },

        searchSlug() {
            this.toggleKamar = false
            this.toggleCategory = false
            if (!this.paketumroh.slug) {
                this.retrievePaketUmroh()
            }
            PaketUmrohService.findBySlug(this.paketumroh.slug)
                .then(response => {
                this.paketumroh = response.data;
                console.log(response.data);
                })
                .catch(e => {
                console.log(e);
                });
        },

        removeSlug() {
            PaketUmrohService.delete(this.currentPaketUmroh.slug)
                .then(response => {
                // this.paketumroh = response.data;
                this.refreshList()
                console.log(response.data);
                })
                .catch(e => {
                console.log(e);
                });
        },

        getRequestParams(page, pageSize) {
            let params = {};

            if (page) {
                params["page"] = page
            }

            if (pageSize) {
                params["limit"] = pageSize
            }

            return params;
        },

        handlePageChange(value) {
            this.page = value;
            this.retrievePaketUmroh();
        },

        handlePageSizeChange(event) {
            this.pageSize = event.target.value;
            this.page = 1;
            this.retrievePaketUmroh();
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