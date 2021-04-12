<template>
    <div>
        <vs-table max-items="10" search pagination stripe :data="my_pending">
            <template slot="thead">
                <vs-th sort-key="request_id">Request ID</vs-th>
                <vs-th sort-key="created_at">Date</vs-th>
                <vs-th sort-key="pending_for">Pending For</vs-th>
                <vs-th sort-key="request_by_name">Request By</vs-th>
            </template>
            <template slot-scope="{data}">
                <vs-tr :key="indextr" v-for="(tr, indextr) in data">

                    <vs-td :data="tr.request_id">
                        <span class="cursor-pointer text-primary"
                              @click="$router.push({path: `${tr.url}?id=${tr.req_id}&request_id=${tr.request_id}&ref_id=${tr.ref_id}`})">{{ tr.request_id }}
                        </span>
                    </vs-td>

                    <vs-td :data="tr.created_at">
                        {{ tr.created_at}}
                    </vs-td>

                    <vs-td :data="tr.pending_for">
                        {{ tr.pending_for }}
                    </vs-td>

                    <vs-td :data="tr.request_by_name">
                        {{tr.request_by_name}}
                    </vs-td>
                </vs-tr>
            </template>
        </vs-table>
    </div>
</template>

<script>
export default {
    name: "MyPending",

    data() {
        return {
            other: 0,
            my_pending: [],
        }
    },
    created() {
        this.fetchMyPending();
    },

    mounted() {
    },

    methods:{
        fetchMyPending(){
            axios.get(`/api/dashboard/pending/${this.other}`)
                .then(response => {
                    //console.log(response);
                    if (response.status === 200) {
                        this.my_pending = response.data.pending;
                    }
                })
                .catch(err => {
                    this.notificationAlert(err.response);
                    console.log(err);
                });
        }
    }
}
</script>

<style scoped>

</style>
