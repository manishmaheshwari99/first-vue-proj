<template>
  <div class="container">
    <h1 class="user-heading">UserList</h1>
    <h3 v-if="loading">Loading...</h3>

    <table v-if="posts.length > 0">
      <thead>
        <th>S.No</th>
        <th>Title</th>
        <th>Body</th>
      </thead>
      <tbody>
        <tr v-for="post in posts" :key="post.id">
          <td>{{ post.id }}</td>
          <td>{{ post.title }}</td>
          <td>{{ post.body }}</td>
          <td>
            <button @click="editPost(post.id)">Edit</button
            ><button @click="deletePost(post.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <SavedModal
      v-show="showModal"
      :modalData="posts"
      :postId="currentId"
      @updatePosts="updatePost"
      @my-event="showModal = false"
    />
  </div>
</template>

<script>
import axios from "axios";
import SavedModal from "./UserModal.vue";

export default {
  name: "UserList",
  data() {
    return {
      posts: [],
      loading: false,
      showModal: false,
      currentId: 0,
    };
  },
  components: {
    SavedModal,
  },
  methods: {
    changeName() {
      return (this.user = "Changed Name");
    },
    async getPosts() {
      this.loading = true;
      const resp = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      this.loading = false;
      this.posts = resp.data;
    },
    async deletePost(id) {
      const resp = await axios.delete(
        "https://jsonplaceholder.typicode.com/posts/" + id
      );
      alert("Deleted Successfully");
      this.getPosts();
    },
    async updatePost(data) {
      console.log(data);
      const resp = await axios.put(
        "https://jsonplaceholder.typicode.com/posts/" + data.id,
        data
      );
      this.getPosts();
      console.log(resp);
    },
    editPost(id) {
      this.showModal = true;
      this.currentId = id;
    },
  },
  created() {
    this.getPosts();
  },
};
</script>

<style scoped>
.container {
  max-width: 1300px;
  margin: auto;
}

table {
  width: 100%;
}

th,
td {
  padding: 0px 15px;
}
.user-heading {
  text-align: center;
  padding-bottom: 25px;
  border-bottom: 1px solid grey;
}
</style>