import http from "../http-common";

class PaketUmrohService {
    getAll() {
        return http.get("/paketumroh");
    }

    get(slug) {
        return http.get(`/paketumroh/${slug}`)
    }

    create(data) {
        return http.post("/paketumroh", data)
    }

    update(slug, data){
        return http.put(`/paketumroh/${slug}`, data)
    }

    delete(slug){
        return http.delete(`/paketumroh/${slug}`)
    }

    findByTitle(title) {
        return http.get(`/paketumroh?title=${title}`);
    }

    deleteAll() {
        return http.delete(`/paketumroh`);
    }
}

export default new PaketUmrohService();