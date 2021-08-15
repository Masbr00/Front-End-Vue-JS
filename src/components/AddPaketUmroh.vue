<template>
    <div class = "submit-form">
        <div v-if = "!submited">

            <div class="form-group">
                <div class = "form-group">
                    <label for="vendor_id">Vendor ID</label>
                    <input
                        type="text"
                        class="form-control"
                        id="vendor_id"
                        required
                        v-model="paketumroh.vendor_id"
                        name="vendor_id"
                    />
                </div>

                <div class = "form-group">
                    <label for="vendor_name">Vendor Name</label>
                    <input
                        type="text"
                        class="form-control"
                        id="vendor_name"
                        required
                        v-model="paketumroh.vendor_name"
                        name="vendor_name"
                    />
                </div>

                <div class = "form-group">
                    <label for="vendor_email">Vendor Email</label>
                    <input
                        type="email"
                        class="form-control"
                        id="vendor_email"
                        required
                        v-model="paketumroh.vendor_email"
                        name="vendor_email"
                    />
                </div>

                <div class = "form-group">
                    <label for="vendor_phone">Vendor Phone</label>
                    <input
                        type="number"
                        class="form-control"
                        id="vendor_phone"
                        required
                        v-model="paketumroh.vendor_phone"
                        name="vendor_phone"
                    />
                </div>
            </div>

            <div class = "form-group">
                <label for="title">Title</label>
                <input
                    type="text"
                    class="form-control"
                    id="title"
                    required
                    v-model="paketumroh.title"
                    name="title"
                />
            </div>

            <div class="form-group">
                <label for="content">Content</label>
                <input
                    type="text"
                    class="form-control"
                    id="content"
                    required
                    v-model="paketumroh.content"
                    name="content"
                />
            </div>

            <div class="form-group">
                <label for="category_desc">Category</label>
                <input
                    type="text"
                    class="form-control"
                    id="category_desc"
                    required
                    v-model="paketumroh.category_desc"
                    name="category_desc"
                />
            </div>

            <!-- <div class="form-group">
                <label for="image">Image</label>
                <input type="file" class="form-control" name="image" id="image">
            </div> -->

            <button @click="savePaketUmroh" class="btn btn-success">Submit</button>
        </div>

        <div v-else>
            <h4>You submited succesfully!</h4>
            <button class="btn btn-success" @click="newPaketUmroh">Add</button>
        </div>
    </div>
</template>

<script>
import PaketUmrohService from '../services/PaketUmrohService';

export default{
    name: "add-paketumroh",
    data() {
        return {
            paketumroh: {
                _id: null,
                vendor_id: "",
                vendor_name: "",
                vendor_email: "",
                vendor_phone: null,
                title: "",
                content: "",
                // image: null,
                deleted: false
            },
            submited: false
        };
    },
    methods: {
        savePaketUmroh(){
            var data = {
                vendor_id: this.paketumroh.vendor_id,
                vendor_name: this.paketumroh.vendor_name,
                vendor_email: this.paketumroh.vendor_email,
                vendor_phone: this.paketumroh.vendor_phone,
                title: this.paketumroh.title,
                content: this.paketumroh.content,
                // image: this.paketumroh.image
            };
            
            PaketUmrohService.create(data)
            .then(response => {
                this.paketumroh._id = response.data._id;
                console.log(response.data);
                this.submited = true;
            })
            .catch(e => {
                console.log(e);
            })
        },
        
        newPaketUmroh() {
            this.submited = false;
            this.paketumroh = {};
        }
    }
};
</script>

<style>
.submit-form {
    max-width: 300px;
    margin: auto;
}
</style>