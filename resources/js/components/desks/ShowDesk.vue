<template>
    <div class="container">
        <div class="form-group mb-3">
            <input type="text" @blur="saveName" v-model="name" class="form-control"
                   :class="{ 'is-invalid': $v.name.$error }">
            <div class="invalid-feedback" v-if="!$v.name.required">
                Это обязательное поле
            </div>
            <div class="invalid-feedback" v-if="!$v.name.maxLength">
                Максимальное количество символов: {{ $v.name.$params.maxLength.max }}
            </div>
        </div>
        <form @submit.prevent="addNewDeskList">
            <input type="text" v-model="desk_list_name" class="form-control" placeholder="Название списка"
                   :class="{ 'is-invalid': $v.desk_list_name.$error }">
            <div class="invalid-feedback" v-if="!$v.desk_list_name.required">
                Это обязательное поле
            </div>
            <div class="invalid-feedback" v-if="!$v.desk_list_name.maxLength">
                Максимальное количество символов: {{ $v.desk_list_name.$params.maxLength.max }}
            </div>
            <button type="submit" class="btn btn-primary mt-3">Добавить</button>
        </form>
        <div class="row">
            <div v-for="desk_list in desk_lists" class="col-lg-4">
                <div class="card mt-3">
                    <div class="card-body">
                        <form @submit.prevent="updateDeskList(desk_list.id,desk_list.name)" v-if="desk_list_input_id === desk_list.id" class="d-flex align-items-center">
                            <input type="text" v-model="desk_list.name" class="form-control" placeholder="Название задачи"
                                   :class="{ 'is-invalid': $v.desk_list_name.$error }">
                            <button @click="desk_list_input_id = null" type="button" class="btn-close" aria-label="Close"></button>
                        </form>
                        <h4 v-else @click="desk_list_input_id = desk_list.id" class="card-title d-flex justify-content-between align-items-center" style="cursor: pointer;">
                            {{ desk_list.name }}<i class="fas fa-pen" style="font-size: 15px;"></i></h4>
                    </div>
                    <button @click.prevent="deleteDeskList(desk_list.id)" type="button"
                            class="btn btn-outline-danger mt-3">
                        Удалить
                    </button>
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

import {required, maxLength} from 'vuelidate/lib/validators'

export default {
    props: [
        'id'
    ],
    data() {
        return {
            name: null,
            desk_list_name: null,
            errored: false,
            loading: true,
            desk_lists: null,
            desk_list_input_id: null,
        }
    },
    mounted() {
        axios.get('/api/V1/desks/' + this.id)
            .then(res => {
                this.name = res.data.data.name
            })
            .catch(err => {
                console.log(err);
                this.errored = true
            })
            .finally(() => {
                this.loading = false
            })
        this.getDeskLists()
    },

    methods: {
        saveName() {
            this.$v.name.$touch()
            if (this.$v.name.$anyError) {
                return;
            }
            axios.put('/api/V1/desks/' + this.id, {
                method: 'PUT',
                name: this.name
            })
                .then(res => {

                })
                .catch(err => {
                    console.log(err);
                    this.errored = true
                })
                .finally(() => {
                    this.loading = false
                })
        },
        getDeskLists() {
            axios.get('/api/V1/desk_lists/', {
                params: {
                    desk_id: this.id
                }
            })
                .then(res => {
                    this.desk_lists = res.data.data;
                })
                .catch(err => {
                    this.errored = true
                })
                .finally(() => {
                    this.loading = false
                })
        },
        addNewDeskList() {
            this.$v.$touch()
            if (this.$v.$anyError) {
                return;
            }
            axios.post('/api/V1/desk_lists/', {
                name: this.desk_list_name,
                desk_id: this.id
            })
                .then(res => {
                    this.desk_list_name = ''
                    this.desk_lists = []
                    this.getDeskLists()
                })
                .catch(err => {
                    this.errored = true
                    // if (err.response.data.errors.name) {
                    //     this.errors = []
                    //     this.errors.push(err.response.data.errors.name[0])
                    // }
                })
                .finally(() => {
                    this.loading = false
                })

        },
        deleteDeskList(id) {
            if (confirm('Вы действительно хотите удалить список?')) {
                axios.post('/api/V1/desk_lists/' + id, {
                    _method: 'DELETE',
                    id: id
                })
                    .then(res => {
                        this.desk_lists = []
                        this.getDeskLists()
                    })
                    .catch(err => {
                        this.errored = true
                    })
                    .finally(() => {
                        this.loading = false
                    })
            }
        },
        updateDeskList(id, name) {
            axios.post('/api/V1/desk_lists/'+id, {
                _method: 'PUT',
                name
            })
                .then(res => {
                    this.desk_list_input_id = null
                })
                .catch(err => {
                    this.errored = true
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
        },
        desk_list_name: {
            required,
            maxLength: maxLength(255)
        }
    }

}
</script>

<style scoped>

</style>
