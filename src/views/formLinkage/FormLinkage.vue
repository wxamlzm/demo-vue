<template>
  <div>
    <el-table :data="tableData" height="100%">
      <el-table-column prop="price" label="单价" width="120">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.price"
            size="mini"
            @change="price => onPriceChange(scope.row, price)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="volume" label="权重" width="120">
        <template slot-scope="scope">
          <el-input v-model="scope.row.volume" size="mini" />
        </template>
      </el-table-column>
      <el-table-column prop="hands" label="数量" width="120">
        <template slot-scope="scope">
          <el-input v-model="scope.row.hands" size="mini" />
        </template>
      </el-table-column>
      <el-table-column
        prop="balance"
        label="总价"
        width="120"
        :formatter="
          (row, column, cellValue, index) => numberFormatter(cellValue, 2)
        "
      >
        <template slot-scope="{ row }">
          <el-input v-model="row.balance" size="mini" />
        </template>
      </el-table-column>
    </el-table>

    <div>balance1 {{ balance1 }}</div>
    <div>balance2 {{ balance2 }}</div>
  </div>
</template>

<script>
export default {
  name: 'FormLinkage',

  data () {
    return {
      tableData: [
        {
          price: 1,
          volume: 1,
          hands: 1,
          balance: 1
        }
      ],
      balance1: '',
      balance2: ''
    }
  },

  methods: {
    getScop (scope) {
      console.log(scope)
    },

    numberFormatter (num, dp) {
      debugger
      return num.toFixed(dp)
    },

    onPriceChange (row, price) {
      console.log(row, price)

      const balance1 = (row.price * row.volume * row.hands).toFixed(4) + ''

      const balance2 =
        Number(row.price).toFixed(4) * row.volume * row.hands + ''

      this.balance1 = balance1
      this.balance2 = balance2
    }
  }
}
</script>
