<template>
    <div class="container">
        <h1>Доски</h1>
        <form>
            <input type="text" v-model="name" class="form-control" placeholder="Название доски"
                   :class="{ 'is-invalid': $v.name.$error }">
            <div class="invalid-feedback" v-if="!$v.name.required">
                Это обязательное поле
            </div>
            <div class="invalid-feedback" v-if="!$v.name.maxLength">
                Максимальное количество символов: {{ $v.name.$params.maxLength.max }}
            </div>
            <button type="submit" @click.prevent="addNewDesk" class="btn btn-primary mt-3">Добавить</button>
        </form>
        <div class="alert alert-danger mt-3" role="alert" v-if="errored">
            Ошибка загрузки данных! <br>
            {{ errors[0] }}
        </div>
        <div class="row">
            <div v-for="desk in desks" class="col-lg-4">
                <div class="card mt-3">
                    <router-link :to="{name: 'showDesk', params: {id: desk.id}}" class="card-body">
                        <h4 class="card-title">
                            {{ desk.name }}
                        </h4>
                    </router-link>
                    <button @click.prevent="deleteDesk(desk.id)" type="button" class="btn btn-outline-danger mt-3">
                        Удалить
                    </button>
                </div>
            </div>
        </div>
        <div class="spinner-grow text-warning" role="status" v-if="loading">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</template>

<script>
import {required, maxLength} from 'vuelidate/lib/validators'

export default {
    name: "Desk",
    data() {
        return {
            desks: [],
            errored: false,
            errors: [],
            loading: true,
            name: null,
        }
    },
    mounted() {
        this.getDesks()
    },

    methods: {
        getDesks() {
            axios.get('/api/V1/desks')
                .then(res => {
                    this.desks = res.data.data
                })
                .catch(err => {
                    this.errored = true
                })
                .finally(() => {
                    this.loading = false
                })
        },
        deleteDesk(id) {
            if (confirm('Вы действительно хотите удалить доску?')) {
                axios.post('/api/V1/desks/' + id, {
                    _method: 'DELETE',
                    id: id
                })
                    .then(res => {
                        this.desks = []
                        this.getDesks()
                    })
                    .catch(err => {
                        this.errored = true
                    })
                    .finally(() => {
                        this.loading = false
                    })
            }
        },
        addNewDesk() {
            this.$v.$touch()
            if (this.$v.$anyError) {
                return;
            }
            axios.post('/api/V1/desks/', {
                name: this.name
            })
                .then(res => {
                    this.desks = []
                    this.getDesks()
                    this.name = ''
                })
                .catch(err => {
                    this.errored = true
                    if (err.response.data.errors.name) {
                        this.errors = []
                        this.errors.push(err.response.data.errors.name[0])
                    }
                })
                .finally(() => {
                    this.loading = false
                })

        }
    },
    validations: {
        name: {
            required,
            maxLength: maxLength(255)
        }
    }
}
</script>

<style scoped>

</style>
