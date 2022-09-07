<template>
<!-- <pre v-if="formData">
  {{JSON.stringify(formData, null, 2)}}
</pre> -->
  <div class="modal-overlay">
    <div class="modal">
      <form @submit.prevent="submitForm">
        <input type="text" v-model="formData.title" />
        <br>
        <button @click="updatePost(formData)">Update Post</button>
      </form>
    </div>
    <div class="close">
      <button class="close-img" @click="buttonClick">X</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      postData: {},
      formData: {
        title: '',
      },
    };
  },
  methods: {
    buttonClick() {
      this.$emit("my-event");
    },
    updatePost(formData) {
      this.formData.id = this.postId;
      this.$emit("updatePosts", formData)
    },
    submitForm() {
      this.buttonClick();
      console.log('Form Submit')
    }
  },
  props: {
    modalData: Object,
    postId: Number,
  },
  mounted() {
    this.formData.title = this.modalData[this.postId-1]?.title;
    this.postData = this.modalData[this.postId-1];
  },
  watch: {
    postId(oldId, newId) {
      this.formData.title = this.modalData[this.postId-1].title;
      this.postData = this.modalData[newId-1];
    }
  }

};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
}

.modal {
  text-align: center;
  background-color: white;
  height: 500px;
  width: 500px;
  margin-top: 10%;
  padding: 60px 0;
  border-radius: 20px;
}
.close {
  margin: 10% 0 0 16px;
  cursor: pointer;
}

.close-img {
  width: 25px;
}

.check {
  width: 150px;
}

h6 {
  font-weight: 500;
  font-size: 28px;
  margin: 20px 0;
}

p {
  font-size: 16px;
  margin: 20px 0;
}

button {
  background-color: #ac003e;
  width: 150px;
  height: 40px;
  color: white;
  font-size: 14px;
  border-radius: 16px;
  margin-top: 50px;
}
</style>