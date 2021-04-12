<template>
    <div :style="{'direction': $vs.rtl ? 'rtl' : 'ltr'}" v-if="params.value.suser == false">
        <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="editRecord"/>
        <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer"
                      @click="confirmDeleteRecord"/>
    </div>
</template>

<script>
    export default {
        name: 'CellRendererActions',
        mounted() {

        },
        methods: {
            editRecord() {
                this.$router.push('/user-edit/' + this.params.value.id);
            },
            confirmDeleteRecord() {
                this.$vs.dialog({
                    type: 'confirm',
                    color: 'danger',
                    title: 'Confirm Delete',
                    text: `You are about to delete`,
                    accept: this.deleteRecord,
                    acceptText: 'Delete'
                })
            },
            deleteRecord() {
                var data = {
                    id: this.params.value.id,
                }
                axios.post('/api/user-list/delete/user', data)
                    .then(response => {
                        this.$parent.$parent.loadData();
                        this.notificationAlert(response);

                    })
                    .catch(e => {
                        this.notificationAlert(e.response);
                    })

            },
        }
    }
</script>
