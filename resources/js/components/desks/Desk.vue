<template>
    <div class="container">
        <h1>Доски</h1>
        <div class="row">
            <div v-for="desk in desks" class="col-lg-4">
                <div class="card mt-3">
                    <a href="#" class="card-body">
                        <h5 class="card-title">{{ desk.name }}</h5>

                    </a>
                </div>
            </div>
        </div>
        <div class="alert alert-danger" role="alert" v-if="errored">
            Ошибка загрузки данных!
        </div>
        <div class="spinner-grow text-warning" role="status" v-if="loading">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "Desk",
    data() {
        return {
            desks: [],
            errored: false,
            loading: true
        }
    },
    mounted() {
        axios.get('/api/V1/desks')
        .then( res => {
            this.desks = res.data.data
        })
        .catch( err => {
            console.log(err);
            this.errored = true
        })
        .finally(() => {
            this.loading = false
        })
    },
}
</script>

<style scoped>

</style>
