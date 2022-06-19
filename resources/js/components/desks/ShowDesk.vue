<template>
    <div class="container">
        <div class="form-group">
            <input type="text" @blur="saveName" v-model="name" class="form-control" :class="{ 'is-invalid': $v.name.$error }">
            <div class="invalid-feedback" v-if="!$v.name.required">
                Это обязательное поле
            </div>
            <div class="invalid-feedback" v-if="!$v.name.maxLength">
                Максимальное количество символов: {{$v.name.$params.maxLength.max}}
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

import { required, maxLength } from 'vuelidate/lib/validators'
export default {
    props: [
        'id'
    ],
    data() {
        return {
            name: null,
            errored: false,
            loading: true
        }
    },
    mounted() {
        axios.get('/api/V1/desks/' + this.id)
            .then( res => {
                 this.name = res.data.data.name
            })
            .catch( err => {
                console.log(err);
                this.errored = true
            })
            .finally(() => {
                this.loading = false
            })
    },

    methods: {
        saveName() {
            this.$v.$touch()
            if(this.$v.$anyError){
                return;
            }
            axios.put('/api/V1/desks/' + this.id, {
                method: 'PUT',
                name: this.name
            })
                .then( res => {

                })
                .catch( err => {
                    console.log(err);
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
        }
    }


}
</script>

<style scoped>

</style>
