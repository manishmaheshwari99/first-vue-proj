<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal-header" id="modalTitle">
          <p>Post</p>
          <button
            type="button"
            class="close-btn"
            @click="close"
            aria-label="Close Modal"
          >
            x
          </button>
        </header>

        <main class="modal-body" id="modalDescription">
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label>Title</label>
              <input
                class="form-control"
                type="text"
                v-model="formData.title"
              />
            </div>
            <div class="form-group">
              <label>Description</label>
              <input
                class="form-control"
                type="text"
                v-model="formData.description"
              />
            </div>
            <div class="form-group">
              <label>Role</label>
              <!-- <input class="form-control" type="text" v-model="formData.role" /> -->
              <select v-model="formData.role" class="form-control">
                <option selected value="">All</option>
                <option>Admin</option>
                <option>Manager</option>
                <option>Panel</option>
              </select>
            </div>
            <button class="btn-submit">Submit</button>
          </form>
        </main>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
  data() {
    return {
      formData: {
        title: "",
        description: "",
        role: "",
      },
    };
  },
  methods: {
    submitForm() {
      this.close();
      if (this.postId === 0) {
        this.$emit("createPost", this.formData);
      } else {
        this.$emit("updatePosts", this.formData);
      }
    },
    close() {
      this.$emit("close");
    },
  },
  props: {
    modalData: Object,
    postId: Number,
  },
  mounted() {
    this.form = this.modalData[this.postId - 1];
  },
  updated() {
    if (this.postId !== 0) {
      this.formData = this.modalData[this.postId - 1];
      console.log(this.postId);
    } else {
      this.formData = {
        title: "",
        description: "",
      };
    }
  },
  watch: {
    postId(oldId, newId) {
      if (this.postId !== 0) {
        this.formData = this.modalData[this.postId - 1];
      } else {
        this.formData = {
          title: "",
          description: "",
        };
      }
    },
  },
};
</script>
<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  width: 80%;
  max-width: 500px;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid rgb(227, 231, 233);
  color: blue;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid rgb(227, 231, 233);
  flex-direction: column;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.close-btn {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: red;
  background: transparent;
}

.btn-open-modal {
  color: white;
  background: green;
  border: 1px solid green;
  border-radius: 4px;
  margin: 20px auto;
  padding: 5px;
  width: 40%;
}
.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
.form-control {
  box-sizing: border-box;
  display: block;
  height: 35px;
  margin-bottom: 1rem;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
label {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}
.btn-submit {
  width: 100%;
  padding: 10px;
  background-color: #04aa6d;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 19px;
  cursor: pointer;
}
</style>