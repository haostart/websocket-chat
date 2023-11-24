<template>
  <avue-crud
    ref="crud"
    :option="option"
    :data="data"
    @row-update="addUpdate"
    @row-save="rowSave"
  ></avue-crud>
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          id: 0,
          sex: 1,
          age: 18,
          $cellEdit: true,
        },
        {
          id: 1,
          name: "李四",
          age: 18,
          sex: 0,
        },
      ],
      option: {
        addBtn: false,
        addRowBtn: true,
        cellBtn: true,
        menuWidth: 250,
        column: [
          {
            label: "姓名",
            prop: "name",
            cell: true,
            rules: [
              {
                required: true,
                message: "请输入姓名",
                trigger: "blur",
              },
            ],
          },
          {
            label: "性别",
            prop: "sex",
            type: "select",
            dicData: [
              {
                label: "男",
                value: 0,
              },
              {
                label: "女",
                value: 1,
              },
            ],
            cell: true,
          },
          {
            label: "年龄",
            prop: "age",
            dicData: [
              {
                label: "男",
                value: 0,
              },
              {
                label: "女",
                value: 1,
              },
            ],
            rules: [
              {
                required: true,
                message: "请输入年龄",
                trigger: "blur",
              },
            ],
            cell: true,
          },
          {
            label: "开关",
            prop: "switch",
            type: "switch",
            cell: true,
          },
        ],
      },
    };
  },
  methods: {
    rowSave(form, done) {
      this.$message.success("新增数据" + JSON.stringify(form));
      done();
    },
    addUpdate(form, index, done, loading) {
      this.$message.success("模拟网络请求");
      setTimeout(() => {
        this.$message.success("关闭按钮等待");
        loading();
      }, 1000);
      setTimeout(() => {
        this.$message.success(
          "编辑数据" + JSON.stringify(form) + "数据序号" + index
        );
        done();
      }, 2000);
    },
  },
};
</script>
