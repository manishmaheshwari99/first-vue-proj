<template>
  <div class="container">
    <h1 class="user-heading">UserList</h1>
    <h3 v-if="loading">Loading...</h3>
    <div class="flex form-group">
      <div>
        <p>Select Role</p>
        <select class="form-control" @change="filterPost" v-model="selected">
          <option value="">All</option>
          <option>Admin</option>
          <option>Manager</option>
        </select>
      </div>
      <div>
        <p>Search by Text</p>
        <input class="form-control" v-model="searchText" />
      </div>
    </div>

    <button class="btn" @click="openModal">Create</button>

    <table
      class="table table-striped"
      v-if="filteredPost.length > 0 && !loading"
    >
      <thead>
        <th>S.No</th>
        <th @click="sortList('title')">Title</th>
        <th @click="sortList('description')">Descripton</th>
        <th @click="sortList('role')">Role</th>
        <th>Actions</th>
      </thead>
      <tbody>
        <template  v-for="(post, index) in filteredPost" :key="post.id">
          <User
            :post="post"
            :index="index"
            :searchText="searchText"
            @editPost="editPost"
            @deletePost="deletePost"
          />
        </template>
      </tbody>
    </table>

    <!-- <SavedModal
      v-show="showModal"
      :modalData="posts"
      :postId="currentId"
      @updatePosts="updatePost"
      @my-event="showModal = false"
    /> -->
    <Modal
      v-show="showModal"
      @close="close"
      :modalData="filteredPost"
      :postId="currentRow"
      @updatePosts="updatePost"
      @createPost="create"
    />
  </div>
</template>

<script>
import axios from "axios";
import { createToast } from "mosha-vue-toastify";

// import SavedModal from "./UserModal.vue";
import Modal from "./Modal.vue";
import User from "./User.vue";

export default {
  name: "UserList",
  data() {
    return {
      posts: [],
      filteredPost: [],
      loading: false,
      showModal: false,
      currentRow: 0,
      selected: "",
      searchText: "",
      sortCol: "",
      sortedbyASC: true,
    };
  },
  components: {
    // SavedModal,
    Modal,
    User,
  },

  methods: {
    changeName() {
      return (this.user = "Changed Name");
    },

    openModal() {
      this.showModal = true;
      this.currentRow = 0;
    },

    close() {
      this.showModal = false;
    },

    sortList(sortBy) {
      if (this.sortedbyASC) {
        this.filteredPost.sort((x, y) =>
          x[sortBy].toLowerCase() > y[sortBy].toLowerCase() ? -1 : 1
        );
        this.sortedbyASC = false;
      } else {
        this.filteredPost.sort((x, y) =>
          x[sortBy].toLowerCase() < y[sortBy].toLowerCase() ? -1 : 1
        );
        this.sortedbyASC = true;
      }
    },

    filterPost() {
      if (this.selected) {
        this.filteredPost = this.posts.filter((post) => {
          return post.role === this.selected;
        });
      } else {
        this.filteredPost = this.posts;
      }
    },
    // searchByText(event) {
    //   const { value } = event.target;
    //   if (value == "") {
    //     this.filteredPost = this.posts;
    //     return;
    //   }
    //   this.filteredPost = this.posts.filter((post) => {
    //     return (
    //       (post.description.toLowerCase().search(value.toLowerCase()) !== -1 ||
    //         post.title.toLowerCase().search(value.toLowerCase())) !== -1
    //     );
    //   });
    // },
    async create(data) {
      this.loading = true;
      const resp = await axios.post(
        "https://62e26aca3891dd9ba8e7b588.mockapi.io/users/user",
        data
      );
      createToast({ title: "User created successfully" }, { type: "success" });
      this.loading = false;
      this.getPosts();
    },
    async getPosts() {
      this.loading = true;
      const resp = await axios.get(
        "https://62e26aca3891dd9ba8e7b588.mockapi.io/users/user"
      );
      this.loading = false;
      this.posts = resp.data;
      this.filteredPost = resp.data;
    },
    async deletePost(id) {
      const resp = await axios.delete(
        "https://62e26aca3891dd9ba8e7b588.mockapi.io/users/user/" + id
      );
      createToast(
        { title: "User deleted Successfully !!" },
        { type: "success" }
      );

      this.getPosts();
    },
    async updatePost(data) {
      const resp = await axios.put(
        "https://62e26aca3891dd9ba8e7b588.mockapi.io/users/user/" + data.id,
        data
      );
      createToast({ title: "User updated successfully" }, { type: "success" });
      this.getPosts();
    },
    editPost(row) {
      console.log("edit", row);
      this.openModal();
      this.currentRow = Number(row + 1);
    },
  },
  created() {
    this.getPosts();
  },
};
</script>

<style>
.table {
  width: 100%;
  max-width: 100%;
  margin-bottom: 1rem;
  background-color: transparent;
}
.container {
  max-width: 1300px;
  margin: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}
.table-striped tr:nth-child(even) {
  background-color: #f2f2f2;
}

.table-striped tr:hover {
  background-color: #ddd;
}
.table-striped td,
.table-striped th {
  border: 1px solid #ddd;
  padding: 8px;
}

.table-striped th {
  padding: 12px 5px;
  text-align: center;
  background-color: #04aa6d;
  color: white;
}
.table-striped td {
  padding: 12px 5px;
  text-align: center;
}
.user-heading {
  text-align: center;
  padding-bottom: 25px;
  border-bottom: 1px solid grey;
}
.flex {
  display: flex;
}

.flex div {
  width: 30%;
  margin-right: 25px;
}
.btn {
  padding: 10px 15px;
  background-color: lightgrey;
  border: none;
  border-radius: 2px;
  margin-bottom: 15px;
  cursor: pointer;
}
.buttons .btn {
  margin: 0px 10px;
}
.btn-edit {
  background-color: green;
  color: white;
  font-size: 1rem;
}
.btn-danger {
  background-color: #dc3545;
  color: white;
  font-size: 1rem;
}
.table.table-striped .highlight {
  background-color: lightsteelblue;
}
</style>