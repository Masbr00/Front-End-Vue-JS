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
        <div class="col-md-12 mb-3">
            <button class="btn btn-secondary" v-on:click="filter= !filter">Filter</button>
            <div class="row mt-1 py-3" v-if="filter">
                <div class="row mb-3">
                    <div class="col-2">
                        <button class="btn btn-md btn-primary" v-on:click="filterTitle= !filterTitle">Title</button>
                    </div>
                    <div class="col" v-if="filterTitle">
                        <input type="text" class="form-control" v-model="filteringTitle">
                    </div>
                    <div class="col" v-if="filterTitle">
                        <button class="btn btn-md btn-outline-secondary" @click="cleartitle">Clear filter</button>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-2">
                        <button class="btn btn-md btn-primary" v-on:click="filterCat= !filterCat">Category</button>
                    </div>
                    <div class="col" v-if="filterCat">
                        <input type="text" class="form-control" v-model="filteringCat">
                    </div>
                    <div class="col" v-if="filterCat">
                        <button class="btn btn-md btn-outline-secondary" @click="clearcategory">Clear filter</button>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-2">
                        <button class="btn btn-md btn-primary" v-on:click="filterPaylater= !filterPaylater">Paylater</button>
                    </div>
                    <div class="col" v-if="filterPaylater">
                        <div class="form-check form-check-inline pt-2">
                            <input class="form-check-input" type="radio" id="inlineRadio1" v-model="filteringPaylater" value="true">
                            <label class="form-check-label" for="inlineRadio1">Yes</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="inlineRadio2" v-model="filteringPaylater" value="false">
                            <label class="form-check-label" for="inlineRadio2">No</label>
                        </div>
                    </div>
                    <div class="col" v-if="filterPaylater">
                        <button class="btn btn-md btn-outline-secondary" @click="clearpaylater">Clear filter</button>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-2">
                        <button class="btn btn-md btn-primary" v-on:click="filterStart_date= !filterStart_date">Start Date</button>
                    </div>
                    <div class="col pt-2" v-if="filterStart_date">
                        <input type="date" class="form-control" v-model="filteringStart_date">
                    </div>
                    <div class="col pt-2" v-if="filterStart_date">
                        <button class="btn btn-md btn-outline-secondary" @click="clearstart_date">Clear filter</button>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-2">
                        <button class="btn btn-md btn-primary" v-on:click="filterEnd_date= !filterEnd_date">End Date</button>
                    </div>
                    <div class="col" v-if="filterEnd_date">
                        <input type="date" class="form-control" v-model="filteringEnd_date">
                    </div>
                    <div class="col" v-if="filterEnd_date">
                        <button class="btn btn-md btn-outline-secondary" @click="clearend_date">Clear filter</button>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-2">
                        <button class="btn btn-md btn-primary" v-on:click="filterStart_price= !filterStart_price">Start Price</button>
                    </div>
                    <div class="col pt-2" v-if="filterStart_price">
                        <input type="number" class="form-control" v-model="filteringStart_price">
                    </div>
                    <div class="col pt-2" v-if="filterStart_price">
                        <button class="btn btn-md btn-outline-secondary" @click="clearstart_price">Clear filter</button>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-2">
                        <button class="btn btn-md btn-primary" v-on:click="filterEnd_price= !filterEnd_price">End Price</button>
                    </div>
                    <div class="col" v-if="filterEnd_price">
                        <input type="number" class="form-control" v-model="filteringEnd_price" >
                    </div>
                    <div class="col" v-if="filterEnd_price">
                        <button class="btn btn-md btn-outline-secondary" @click="clearend_price">Clear filter</button>
                    </div>
                </div>

                <button class="btn btn-md btn-success mb-3 ml-3" @click="refreshList" style="width: 87.66px">Submit Filter</button>
            </div>
        </div>
        <div class="col-md-6 mb-5">
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
        <div class="col-md-6 mb-3">
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
                                <td v-for="(room_name,item) in currentPaketUmroh.accommodate.datakamar" :key="item">
                                    <template v-for="nama in room_name">
                                        {{nama.name}}
                                    </template>
                                </td>
                            </tr>
                            <tr v-if="!toggleKamar">
                                <th>
                                    Available
                                </th>
                                <td v-for="(room_status,item) in currentPaketUmroh.accommodate.datakamar" :key="item">
                                    <template v-for="status in room_status">
                                        {{status.available}}
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
                <!-- <a class="btn btn-warning px-4" :href="'/paketumroh/' + currentPaketUmroh.slug">Edit</a> -->
                <!-- <button class="btn btn-danger ml-3" @click="removeSlug">Delete</button> -->
                <button class="btn btn-danger" @click="removeSlug">Delete</button>
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

            filter: false,
            filterTitle: false,
            filteringTitle: null,
            filterCat: false,
            filteringCat: null,
            filterPaylater: false,
            filteringPaylater: null,
            filterStart_date: false,
            filteringStart_date: null,
            filterEnd_date: false,
            filteringEnd_date: null,
            filterStart_price: false,
            filteringStart_price: null,
            filterEnd_price: false,
            filteringEnd_price: null,

            page : 1,
            pageSize: 10,
            count: 0,
        };
    },
    methods: {
        retrievePaketUmroh() {
            const params = this.getRequestParams(
                this.page,
                this.pageSize,
                this.filteringTitle,
                this.filteringCat,
                this.filteringPaylater,
                this.filteringStart_date,
                this.filteringEnd_date,
                this.filteringStart_price,
                this.filteringEnd_price
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
            this.page = 1
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

        getRequestParams(page, pageSize, filteringTitle, filteringCat, filteringPaylater,
        filteringStart_date, filteringEnd_date, filteringStart_price, filteringEnd_price) {
            let params = {};

            if (page) {
                params["page"] = page
            }

            if (pageSize) {
                params["limit"] = pageSize
            }

            if (filteringTitle) {
                params["title"] = filteringTitle
            }

            if (filteringCat) {
                params["category"] = filteringCat
            }

            if (filteringPaylater) {
                let x = null
                if (filteringPaylater == "true") {
                    x = true
                }else {
                    x= false
                }
                params["paylater"] = x
            }

            if (filteringStart_date) {
                params["start_date"] = filteringStart_date
            }

            if (filteringEnd_date) {
                params["end_date"] = filteringEnd_date
            }

            if (filteringStart_price) {
                params["start_price"] = filteringStart_price
            }

            if (filteringEnd_price) {
                params["end_price"] = filteringEnd_price
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
        },

        cleartitle() {
            this.filteringTitle = null
        },

        clearcategory() {
            this.filteringCat = null
        },

        clearpaylater() {
            this.filteringPaylater = null
        },

        clearstart_date() {
            this.filteringStart_date = null
        },

        clearend_date() {
            this.filteringEnd_date = null
        },

        clearstart_price() {
            this.filteringStart_price = null
        },

        clearend_price() {
            this.filteringEnd_price = null
        },
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