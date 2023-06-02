<script lang="ts">
import { defineComponent, type PropType } from 'vue';

export interface Header {
    name: string;
    key: string;
    formatter?: (arg0: any) => string;
    align?: string;
    type: string;
    buttonOnClickHandler?: (arg0: any) => null;
    buttonValue?: string;
    sortable?: boolean;
}

export default defineComponent({
    props: {
        headers: {
            type: Object as PropType<Header[]>,
            required: true,
        },
        data: {
            type: Object as PropType<any[]>,
            required: true,
        },
        showRowNumbers: {
            type: Boolean,
        },
        rowClickHandler: {
            type: Function,
        }
    },
    data() {
        return {
            active: -1,
            currentSortKey: '',
            sortOrderAsc: false,
        };
    },
    methods: {
        getClass(alignment: string | undefined) {
            if (alignment === 'right') {
                return 'text-end';
            } else if (alignment === 'center') {
                return 'text-center';
            } else {
                return '';
            }
        },
        getRowClass(index: number) {
            if (this.active === index) return 'table-active';
            return '';
        },
        tableRowClickHandler(index: number) {
            if (this.rowClickHandler) {
                this.rowClickHandler(index);
                this.active = index;
            }
        },
        sortDataByKey(sortHeader: Header) {
            if (!sortHeader.sortable) {
                return;
            }
            if (sortHeader.key === this.currentSortKey) {
                this.sortOrderAsc = !this.sortOrderAsc;
            } else {
                this.currentSortKey = sortHeader.key;
                this.sortOrderAsc = true;
            }

            this.data.sort((a: any, b: any) => {
                let keyA = a[sortHeader.key];
                let keyB = b[sortHeader.key];
                if (sortHeader.type === 'text') {
                    return this.sortOrderAsc ? keyA.localeCompare(keyB) : keyB.localeCompare(keyA);
                }
                return this.sortOrderAsc ? keyA - keyB : keyB - keyA;
            });
        }
    }
});
</script>

<template>
    <table class="table table-hover">
        <thead>
            <tr>
                <th v-if="showRowNumbers">#</th>
                <th v-for="(head) in headers" v-bind:key="head.name" v-bind:class="getClass(head.align)"
                    @click="() => sortDataByKey(head)" scope="col">{{
                        head.name
                    }} <span v-if="currentSortKey === head.key">{{ sortOrderAsc ? '&#8593;' : '&#8595;' }}</span></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in data" v-bind:key="index" @click="() => tableRowClickHandler(index)"
                v-bind:class="getRowClass(index)">
                <th v-if="showRowNumbers">{{ index + 1 }}</th>
                <td v-for="(head) in headers" v-bind:key="head.name" v-bind:class="getClass(head.align)">
                    <span v-if="head.type === 'button'">
                        <button variant="outline-light" class="btn btn-link" @click="() => {
                            if (head.buttonOnClickHandler) return head.buttonOnClickHandler(index)
                        }">
                            {{ head.buttonValue }}
                        </button>
                    </span>
                    <span v-else>
                        {{
                            item[head.key] ?
                            (head.formatter ? head.formatter(item[head.key]) : item[head.key])
                            : '-'
                        }}
                    </span>
                </td>
            </tr>
        </tbody>
    </table>
</template>
